import { useQuery } from "@tanstack/react-query";
import { TablesComponent } from "../../../components/TablesComponent.jsx";
import { LoaderIconUtils } from "../../../utils/LoaderIconUtils.jsx";
import { UserLoggedPaymentsColumns } from "./UserLoggedPaymentsColumns.jsx";
import { useEffect, useMemo, useState } from "react";
import { getAllHistoryPayments } from "../../../api/PaymentService.jsx";
import { getAllUsers } from "../../../api/UserService.jsx";
import { getAllAthletes } from "../../../api/AtheleService.jsx";
import { getAllReceipts } from "../../../api/ReceiptsService.jsx";

export const UserLoggedPaymentsLogic = () => {
  const [isLoadingEnrichedData, setIsLoadingEnrichedData] = useState(true);

  const {
    data: historyPaymentData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allHistoryPayments"],
    queryFn: getAllHistoryPayments,
  });

  const { data: usersData } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  const { data: athletesData } = useQuery({
    queryKey: ["allAthletes"],
    queryFn: getAllAthletes,
  });

  const { data: receiptsData } = useQuery({
    queryKey: ["allReceipts"],
    queryFn: getAllReceipts,
  });

  useEffect(() => {
    if (
      historyPaymentData &&
      usersData &&
      athletesData &&
      receiptsData &&
      isLoadingEnrichedData
    ) {
      setIsLoadingEnrichedData(false);
    }
  }, [
    isLoadingEnrichedData,
    historyPaymentData,
    usersData,
    athletesData,
    receiptsData,
  ]);

  const enrichedHistoryPaymentsData = useMemo(() => {
    if (!historyPaymentData || !usersData || !athletesData || !receiptsData) {
      return [];
    }
    historyPaymentData?.map((historyPayment) => {
      const user = usersData?.find(
        (user) => user?._id === historyPayment?.user,
      );
      const athlete = athletesData?.find(
        (athlete) => athlete?._id === historyPayment?.athlete,
      );
      const receipt = receiptsData?.find(
        (receipt) => receipt?._id === historyPayment?.receipt_id,
      );
      return {
        ...historyPayment,
        user,
        athlete,
        receipt,
        limit_date: receipt?.limit_date,
        updated_at: receipt?.updated_at,
      };
    });
    return historyPaymentData?.map((historyPayment) => {
      const user = usersData?.find(
        (user) => user?._id === historyPayment?.user,
      );
      const athlete = athletesData?.find(
        (athlete) => athlete?._id === historyPayment?.athlete,
      );
      const receipt = receiptsData?.find(
        (receipt) => receipt?._id === historyPayment?.receipt_id,
      );
      return {
        ...historyPayment,
        user,
        athlete,
        receipt,
        limit_date: receipt?.limit_date,
        updated_at: receipt?.updated_at,
      };
    });
  }, [historyPaymentData, usersData, athletesData, receiptsData]);

  if (isError) return <div>{error.message}</div>;
  if (isLoadingEnrichedData) return <LoaderIconUtils isLoading={true} />;
  return (
    <TablesComponent
      data={enrichedHistoryPaymentsData}
      loading={isLoading}
      columns={UserLoggedPaymentsColumns}
    />
  );
};
