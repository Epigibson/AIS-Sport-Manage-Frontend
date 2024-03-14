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
import { Select, Space } from "antd";

export const PaymentLogic = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState({});
  const [userFilter, setUserFilter] = useState("");
  const [userId, setUserId] = useState("");
  const [statusPayFilter, setStatusPayFilter] = useState("");
  const [paymentTypeFilter, setPaymentTypeFilter] = useState("");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("");
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
    // console.log("DATA DE EL RECIBO SELECCIONADO", record.receipt);
    setSelectedReceipt([record.receipt]);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  if (isLoading) return <LoaderIconUtils />;
  if (isError) return <h1>Error...</h1>;

  const columns = PaymentColumns({
    showReceipts: showReceipts,
  });

  // Función para manejar la búsqueda cuando se presiona el botón
  const handleSearch = () => {
    refetch();
  };

  // Asegúrate de incluir esta parte dentro de tu componente
  const handleUserChange = (value, option) => {
    // Aquí actualizamos el estado userId basado en la selección
    setUserId(value); // Aquí asumimos que el valor de la opción es el _id del usuario
    setUserFilter(option.key); // Opcional, si quieres guardar también el nombre del usuario seleccionado
    handleSearch();
  };

  const handleChangeStatus = (value) => {
    setStatusPayFilter(value);
    console.log(`selected ${value}`);
    handleSearch();
  };

  const handleChangePaymentType = (value) => {
    setPaymentTypeFilter(value);
    console.log(`selected ${value}`);
    handleSearch();
  };

  const handleChangePaymentMethod = (value) => {
    setPaymentMethodFilter(value);
    console.log(`selected ${value}`);
    handleSearch();
  };

  return (
    <>
      <Space wrap className={"flex justify-end mb-5"}>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="-- Seleccionar Usuario --"
          optionFilterProp="children"
          onChange={handleUserChange}
          loading={isLoading}
        >
          {usersData?.map((user, index) => (
            <Option key={user._id || index} value={user._id}>
              {user.name}
            </Option>
          ))}
        </Select>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="-- Seleccionar Estatus --"
          onChange={handleChangeStatus}
          options={[
            { value: "Creado", label: "Creado" },
            { value: "Pendiente", label: "Pendiente" },
            { value: "Pagado", label: "Pagado" },
            { value: "Vencido", label: "Vencido" },
          ]}
        />
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="-- Seleccionar Tipo de Pago --"
          onChange={handleChangePaymentType}
          options={[
            { value: "inscription", label: "Inscripcion" },
            { value: "paquete", label: "Paquete" },
          ]}
        />
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="-- Seleccionar Metodo de Pago --"
          onChange={handleChangePaymentMethod}
          options={[
            { value: "Efectivo", label: "Efectivo" },
            { value: "Tarjeta", label: "Tarjeta" },
            { value: "Transferencia", label: "Transferencia" },
            {
              value: "Tienda de Conveniencia",
              label: "Tienda de Conveniencia",
            },
          ]}
        />
      </Space>
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
