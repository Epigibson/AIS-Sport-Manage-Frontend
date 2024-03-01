import { useQuery } from "@tanstack/react-query";
import { getAllHistoryPayments } from "../../api/PaymentService.jsx";
import { PaymentColumns } from "./PaymentColumns.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";
import { TablesComponent } from "../../components/TablesComponent.jsx";
import { getAllUsers } from "../../api/UserService.jsx";

export const PaymentLogic = () => {
  const {
    data: historyPaymentData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allHistoryPayments"],
    queryFn: getAllHistoryPayments,
  });

  const { data: usersData } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  const enrichedHistoryPaymentsData = historyPaymentData?.map(
    (historyPayment) => {
      const user = usersData?.find((user) => user._id === historyPayment.user); // Ajusta según la estructura de tus datos
      return { ...historyPayment, user }; // Añade la información del grupo al objeto de usuario
    },
  );

  if (isLoading) return <LoaderIconUtils />;
  if (isError) return <h1>Error...</h1>;

  return (
    <TablesComponent
      data={enrichedHistoryPaymentsData}
      columns={PaymentColumns}
    />
  );
};
