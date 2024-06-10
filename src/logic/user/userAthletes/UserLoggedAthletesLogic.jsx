import { useQuery } from "@tanstack/react-query";
import { getUserAthletes } from "../../../api/UserLoggedService.jsx";
import { LoaderIconUtils } from "../../../utils/LoaderIconUtils.jsx";
import { TablesComponent } from "../../../components/TablesComponent.jsx";
import { getUserSession } from "../../../api/UserService.jsx";
import { getAllPackages } from "../../../api/ProductService.jsx";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { UserLoggedAthletesColumns } from "./UserLoggedAthletesColumns.jsx";

export const UserLoggedAthletesLogic = () => {
  const {
    data: athletesFromUserLogged,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["paymentsFromUserLogged"],
    queryFn: () => getUserAthletes(),
  });

  const { data: userLogged } = useQuery({
    queryKey: ["userLogged"],
    queryFn: () => getUserSession(),
  });

  const { data: membershipsData } = useQuery({
    queryKey: ["membershipsData"],
    queryFn: () => getAllPackages(),
  });
  const [isLoadingEnrichedData, setIsLoadingEnrichedData] = useState(true);

  useEffect(() => {
    if (athletesFromUserLogged && userLogged && membershipsData) {
      setIsLoadingEnrichedData(false);
    }
  }, [athletesFromUserLogged, userLogged, membershipsData]);

  const enrichedAthletesData = useMemo(() => {
    if (!athletesFromUserLogged || !userLogged || !membershipsData) {
      return [];
    }

    return athletesFromUserLogged.map((athlete) => {
      const tutorsData = userLogged;

      const packages = membershipsData
        .filter((packageObject) =>
          athlete.products_which_inscribed?.some(
            (productInscribed) => productInscribed === packageObject._id,
          ),
        )
        .filter((packageObject) => packageObject.product_name !== "Inscripcion")
        .map((packageObject) => ({
          id: packageObject._id,
          name: packageObject.product_name,
        }));

      return {
        ...athlete,
        tutors: tutorsData,
        tutors_name_one: tutorsData?.tutors_name_one,
        tutors_name_two: tutorsData?.tutors_name_two,
        email: tutorsData?.email,
        phone: tutorsData?.phone,
        mobile: tutorsData?.mobile,
        products_which_inscribed: packages,
        name: athlete.name || "N/A",
        age: athlete.age || "N/A",
        gender: athlete.gender || "N/A",
        sport_preference: athlete.sport_preference || "N/A",
        hobbies: athlete.hobbies || "N/A",
        start_date: athlete.start_date
          ? dayjs(athlete.start_date).format("YYYY-MM-DD")
          : "No Especificado",
      };
    });
  }, [athletesFromUserLogged, userLogged, membershipsData]);

  if (isError) return <div>{error.message}</div>;
  if (isLoading || isLoadingEnrichedData)
    return <LoaderIconUtils isLoading={true} />;

  return (
    <TablesComponent
      data={enrichedAthletesData}
      columns={UserLoggedAthletesColumns}
      loading={isLoading}
    />
  );
};
