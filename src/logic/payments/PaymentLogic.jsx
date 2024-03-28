import { useQuery } from "@tanstack/react-query";
import { getAllHistoryPayments } from "../../api/PaymentService.jsx";
import { PaymentColumns } from "./PaymentColumns.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";
import { TablesComponent } from "../../components/TablesComponent.jsx";
import { getAllUsers } from "../../api/UserService.jsx";
import { getAllReceipts } from "../../api/ReceiptsService.jsx";
import { ModalComponent } from "../../components/ModalComponent.jsx";
import { useState } from "react";
import { PaymentReceiptColumns } from "./PaymentReceiptColumns.jsx";
import { PaymentFilters } from "./PaymentFilters.jsx";
import {
  usePayReceipt,
  useUpdatePaymentMethod,
} from "./PaymentLogicMutations.jsx";

export const PaymentLogic = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState({});
  const [userFilter, setUserFilter] = useState("");
  const [statusPayFilter, setStatusPayFilter] = useState("");
  const [paymentTypeFilter, setPaymentTypeFilter] = useState("");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [editingKey, setEditingKey] = useState("");
  const [editingValue, setEditingValue] = useState("");
  const { mutateUpdate } = usePayReceipt();
  const { mutateUpdatePaymentMethod } = useUpdatePaymentMethod();
  const {
    data: historyPaymentData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [
      "allHistoryPayments",
      userFilter,
      statusPayFilter,
      paymentTypeFilter,
      paymentMethodFilter,
    ],
    queryFn: () =>
      getAllHistoryPayments({
        user: userFilter,
        status_pay: statusPayFilter,
        payment_type: paymentTypeFilter,
        payment_method: paymentMethodFilter,
      }),
    enabled: false, // no ejecutar la consulta automáticamente
  });

  const { data: usersData, refetch: refetchUsersData } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  const { data: receiptsData, refetch: refetchReceiptsData } = useQuery({
    queryKey: ["allReceipts"],
    queryFn: getAllReceipts,
  });

  const enrichedHistoryPaymentsData = historyPaymentData?.map(
    (historyPayment) => {
      const user = usersData?.find((user) => user._id === historyPayment.user); // Ajusta según la estructura de tus datos
      const receipt = receiptsData?.find(
        (receipt) => receipt._id === historyPayment.receipt_id,
      ); // Ajusta según la estructura de tus datos
      return {
        ...historyPayment,
        user,
        receipt,
        limit_date: receipt?.limit_date,
        updated_at: receipt?.updated_at,
      }; // Añade la información del grupo al objeto de usuario
    },
  );

  const showReceipts = (record) => {
    // console.log("DATA DE EL RECIBO SELECCIONADO", record.receipt);
    setSelectedReceipt([record.receipt]);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  if (isLoading) return <LoaderIconUtils />;
  if (isError) return <h1>Error...</h1>;

  const handlePayReceipt = async (record) => {
    console.log("PAGAR", record.receipt_id);
    await mutateUpdate(record.receipt_id);
    await handleSearch();
    console.log("Pago realizado correctamente");
    // alert("Pago realizado correctamente"); // Agrega esta línea para mostrar un mensaje de alerta al usuario
  };

  const handleSearch = async () => {
    await refetchReceiptsData();
    await refetchUsersData();
    await refetch();
  };

  const filterOption = (input, option) =>
    option.search.includes(input.toLowerCase());

  // Asegúrate de incluir esta parte dentro de tu componente
  const handleUserChange = (value, option) => {
    setUserFilter(option.key); // Opcional, si quieres guardar también el nombre del usuario seleccionado
  };

  const handleChangeStatus = (value) => {
    setStatusPayFilter(value);
    console.log(`selected ${value}`);
  };

  const handleChangePaymentType = (value) => {
    setPaymentTypeFilter(value);
    handleSearch().then((r) => r);
    console.log(`selected ${value}`);
  };

  const handleChangePaymentMethod = (value) => {
    setPaymentMethodFilter(value);
    console.log(`selected ${value}`);
  };

  const edit = (record) => {
    setEditingKey(record._id); // Usamos _id como clave de edición, ajusta según tu data
    setEditingValue(record.payment_method);
  };

  const cancel = () => {
    setEditingKey("");
    setEditingValue("");
  };

  const handleSave = async (record) => {
    console.log("Guardando", record.history_payment_id, editingValue);
    const data = {
      history_payment_id: record.history_payment_id,
      payment_method: editingValue,
    };
    await mutateUpdatePaymentMethod(data);
    cancel(); // Restablece el estado de edición
  };

  const columns = PaymentColumns({
    showReceipts: showReceipts,
    handlePayReceipt: handlePayReceipt,
    edit: edit,
    cancel: cancel,
    handleSave: handleSave,
    editingKey: editingKey,
    editingValue: editingValue,
    setEditingValue: setEditingValue,
  });

  return (
    <>
      <PaymentFilters
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        usersData={usersData}
        handleChangeStatus={handleChangeStatus}
        handleChangePaymentType={handleChangePaymentType}
        handleChangePaymentMethod={handleChangePaymentMethod}
        handleSearch={handleSearch}
        filterOption={filterOption}
        handleUserChange={handleUserChange}
        isLoading={isLoading}
      />
      <ModalComponent
        dataTable={selectedReceipt}
        dataTableColumns={PaymentReceiptColumns}
        title={"Recibo"}
        onOpen={isModalVisible}
        onClose={handleCloseModal}
      />
      <>
        <TablesComponent data={enrichedHistoryPaymentsData} columns={columns} />
      </>
    </>
  );
};
