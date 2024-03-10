import { useQuery } from "@tanstack/react-query";
import { getAllHistoryPayments } from "../../api/PaymentService.jsx";
import { PaymentColumns } from "./PaymentColumns.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";
import { TablesComponent } from "../../components/TablesComponent.jsx";
import { getAllUsers } from "../../api/UserService.jsx";
import { getAllReceipts } from "../../api/ReceiptsService.jsx";
import { ModalComponent } from "../../components/ModalComponent.jsx";
import { useEffect, useState } from "react";
import { PaymentReceiptColumns } from "./PaymentReceiptColumns.jsx";

export const PaymentLogic = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState({});
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

  const { data: receiptsData } = useQuery({
    queryKey: ["allReceipts"],
    queryFn: getAllReceipts,
  });

  const enrichedHistoryPaymentsData = historyPaymentData?.map(
    (historyPayment) => {
      const user = usersData?.find((user) => user._id === historyPayment.user); // Ajusta según la estructura de tus datos
      const receipt = receiptsData?.find(
        (receipt) => receipt._id === historyPayment.receipt_id,
      ); // Ajusta según la estructura de tus datos
      return { ...historyPayment, user, receipt }; // Añade la información del grupo al objeto de usuario
    },
  );

  const showReceipts = (record) => {
    console.log("DATA DE EL RECIBO SELECCIONADO", record.receipt);
    setSelectedReceipt([record.receipt]);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    console.log("DATA RECORD", selectedReceipt);
  }, [selectedReceipt]);

  if (isLoading) return <LoaderIconUtils />;
  if (isError) return <h1>Error...</h1>;

  const columns = PaymentColumns({
    showReceipts: showReceipts,
  });

  return (
    <>
      <ModalComponent
        dataTable={selectedReceipt}
        dataTableColumns={PaymentReceiptColumns}
        title={"Recibo"}
        onOpen={isModalVisible}
        onClose={handleCloseModal}
      />
      <TablesComponent data={enrichedHistoryPaymentsData} columns={columns} />
    </>
  );
};
