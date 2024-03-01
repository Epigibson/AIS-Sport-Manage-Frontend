import { useQuery } from "@tanstack/react-query";
import { getAllHistoryPayments } from "../../api/PaymentService.jsx";
import { PaymentColumns } from "./PaymentColumns.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";
import { TablesComponent } from "../../components/TablesComponent.jsx";

export const PaymentLogic = () => {
  const {
    data: historyPaymentData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allHistoryPayments"],
    queryFn: getAllHistoryPayments,
  });

  // const { data: groupsData } = useQuery({
  //     queryKey: ["allGroups"],
  //     queryFn: getAllGroups,
  // });
  //
  // const enrichedUsersData = usersData?.map((user) => {
  //     const group = groupsData?.find((group) => group._id === user.group_id); // Ajusta según la estructura de tus datos
  //     return { ...user, group }; // Añade la información del grupo al objeto de usuario
  // });

  if (isLoading) return <LoaderIconUtils />;
  if (isError) return <h1>Error...</h1>;

  return <TablesComponent data={historyPaymentData} columns={PaymentColumns} />;
};
