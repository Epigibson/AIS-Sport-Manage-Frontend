import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllHistoryPayments } from "../../api/PaymentService.jsx";
import { PaymentColumns } from "./PaymentColumns.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";
import { TablesComponent } from "../../components/TablesComponent.jsx";
import { getAllUsers } from "../../api/UserService.jsx";
import { getAllReceipts } from "../../api/ReceiptsService.jsx";
import { ModalComponent } from "../../components/ModalComponent.jsx";
import { useEffect, useState } from "react";
import { PaymentReceiptColumns } from "./PaymentReceiptColumns.jsx";
import { PaymentFilters } from "./PaymentFilters.jsx";
import {
  useCancelReceipt,
  useEditPaymentHistoryAmount,
  useEditPaymentHistoryExtension,
  usePayReceipt,
  useRevertReceipt,
  useUpdatePaymentMethod,
} from "./PaymentLogicMutations.jsx";
import { getAllAthletes } from "../../api/AtheleService.jsx";
import { Card, Col, Form, Row, Statistic } from "antd";
import { PaymentExtensionFields } from "./PaymentExtensionFields.jsx";

export const PaymentLogic = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isExtensionModalVisible, setIsExtensionModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedReceipt, setSelectedReceipt] = useState({});
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [userFilter, setUserFilter] = useState("");
  const [athleteFilter, setAthleteFilter] = useState("");
  const [statusPayFilter, setStatusPayFilter] = useState("");
  const [paymentTypeFilter, setPaymentTypeFilter] = useState("");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [editingKey, setEditingKey] = useState("");
  const [editingValue, setEditingValue] = useState("");
  const [editingAmount, setEditingAmount] = useState("");
  const [dateRange, setDateRange] = useState([]);
  // const [start = undefined, end = undefined] = dateRange || [];
  const [autoFetchEnabled, setAutoFetchEnabled] = useState(true);
  const [firstCharge, setFirstCharge] = useState(0);
  const { mutateUpdate } = usePayReceipt();
  const { mutateUpdateCancelReceipt } = useCancelReceipt();
  const { mutateRevertReceipt } = useRevertReceipt();
  const { mutateEditHistoryPaymentExtension } =
    useEditPaymentHistoryExtension();
  const { mutateEditHistoryPaymentAmount } = useEditPaymentHistoryAmount();
  const queryClient = useQueryClient();
  const {
    data: historyPaymentData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [
      "allHistoryPayments",
      userFilter,
      athleteFilter,
      statusPayFilter,
      paymentTypeFilter,
      paymentMethodFilter,
      dateRange.length > 0 ? dateRange[0] : undefined,
      dateRange.length > 1 ? dateRange[1] : undefined,
    ],
    queryFn: () =>
      getAllHistoryPayments({
        user: userFilter,
        athlete: athleteFilter,
        status_pay: statusPayFilter,
        payment_type: paymentTypeFilter,
        payment_method: paymentMethodFilter,
        init_date: dateRange[0],
        end_date: dateRange[1],
      }),
    enabled: autoFetchEnabled,
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
    console.log("AUTOFETCH", autoFetchEnabled);
    if (historyPaymentData && firstCharge <= 0) {
      setFirstCharge(firstCharge + 2);
    } else {
      setAutoFetchEnabled(false);
    }
  }, [historyPaymentData, firstCharge, autoFetchEnabled]);

  const handleSearch = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["allReceipts", "allHistoryPayments"],
    });
    await refetch();
  };

  const { mutateUpdatePaymentMethod } = useUpdatePaymentMethod(handleSearch);

  const enrichedHistoryPaymentsData = historyPaymentData?.map(
    (historyPayment) => {
      const user = usersData?.find((user) => user._id === historyPayment.user); // Ajusta según la estructura de tus datos
      const athlete = athletesData?.find(
        (athlete) => athlete._id === historyPayment.athlete,
      );
      const receipt = receiptsData?.find(
        (receipt) => receipt._id === historyPayment.receipt_id,
      ); // Ajusta según la estructura de tus datos
      return {
        ...historyPayment,
        user,
        athlete,
        receipt,
        limit_date: receipt?.limit_date,
        updated_at: receipt?.updated_at,
      }; // Añade la información del grupo al objeto de usuario
    },
  );

  const getTotal = () => {
    let total = 0;
    historyPaymentData?.forEach((payment) => {
      total += payment.amount;
    });
    return total;
  };

  const getAmountsByStatus = () => {
    const totals = {
      pending: 0,
      paid: 0,
      cancelled: 0,
      created: 0,
    };

    historyPaymentData?.forEach((payment) => {
      switch (payment.status) {
        case "Pendiente":
          totals.pending += payment.amount;
          break;
        case "Pagado":
          totals.paid += payment.amount;
          break;
        case "Cancelado":
          totals.cancelled += payment.amount;
          break;
        case "Creado":
          totals.pending += payment.amount;
          break;
        default:
          totals.total += payment.amount;
          break; // Handle unexpected status or do nothing
      }
    });

    return totals;
  };

  const showReceipts = (record) => {
    // console.log("DATA DE EL RECIBO SELECCIONADO", record.receipt);
    setSelectedReceipt([record.receipt]);
    setIsModalVisible(true);
  };

  const showExtensionModal = async (record) => {
    // console.log("DATA DE EL RECIBO SELECCIONADO", record.receipt);
    form.setFieldsValue({
      extension: record.extension,
    });
    setSelectedPayment(record);
    setIsExtensionModalVisible(true);
  };

  const handleCloseExtensionModal = () => {
    setIsExtensionModalVisible(false);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleResetFilters = async () => {
    setAthleteFilter("");
    setUserFilter("");
    setStatusPayFilter("");
    setPaymentTypeFilter("");
    setPaymentMethodFilter("");
  };

  if (isLoading) return <LoaderIconUtils />;
  if (isError) return <h1>Error...</h1>;

  const handleEditExtension = async () => {
    const values = await form.validateFields();
    values.history_payment_id = selectedPayment.history_payment_id;
    // console.log("Datos", values);
    await mutateEditHistoryPaymentExtension(values);
    await handleSearch();
    form.resetFields();
    setIsExtensionModalVisible(false);
    // console.log("Aumentado correctamente");
    // alert("Aumentado correctamente"); // Agrega esta línea para mostrar un mensaje de alerta al usuario
  };

  const handlePayReceipt = async (record) => {
    await mutateUpdate(record.receipt_id);
    setAutoFetchEnabled(true);
    await handleSearch();
    await queryClient.invalidateQueries({
      queryKey: ["allReceipts", "allHistoryPayments"],
    });
    await refetch();
    setAutoFetchEnabled(false);
  };

  const handleCancelReceipt = async (record) => {
    await mutateUpdateCancelReceipt(record.receipt_id);
    await queryClient.invalidateQueries({
      queryKey: ["allReceipts", "allHistoryPayments"],
    });
    setAutoFetchEnabled(true);
    await handleSearch();
    await refetch();
    setAutoFetchEnabled(false);
  };

  const handleRevertReceipt = async (record) => {
    await mutateRevertReceipt(record.receipt_id);
    await queryClient.invalidateQueries({
      queryKey: ["allReceipts", "allHistoryPayments"],
    });
    setAutoFetchEnabled(true);
    await handleSearch();
    await refetch();
    setAutoFetchEnabled(false);
  };

  const filterOption = (input, option) => option.search.includes(input);

  const handleDateChange = (dates, dateStrings) => {
    if (dates) {
      const formattedDates = dates.map((date) =>
        date.format("YYYY-MM-DD HH:mm"),
      );
      setDateRange(formattedDates);
    } else {
      setDateRange([]);
    }
  };

  const handleUserChange = async (value, option) => {
    await setUserFilter(option.key);
  };

  const handleAthleteChange = async (value) => {
    await setAthleteFilter(value);
    // console.log(`selected ${value}`);
  };

  const handleChangeStatus = async (value) => {
    await setStatusPayFilter(value);
    // console.log(`selected ${value}`);
  };

  const handleChangePaymentType = async (value) => {
    await setPaymentTypeFilter(value);
    // console.log(`selected ${value}`);
  };

  const handleChangePaymentMethod = async (value) => {
    await setPaymentMethodFilter(value);
    // console.log(`selected ${value}`);
  };

  const edit = (record) => {
    setEditingKey(record._id); // Usamos _id como clave de edición, ajusta según tu data
    setEditingValue(record.payment_method);
    setEditingAmount(record.amount);
  };

  const cancel = () => {
    setEditingKey("");
    setEditingValue("");
    setEditingAmount("");
  };

  const handleSave = async (record, field) => {
    // console.log("Guardando", record.history_payment_id, editingValue);
    const data = {
      history_payment_id: record.history_payment_id,
      payment_method: editingValue,
      amount: editingAmount,
    };
    if (field === "payment_method") {
      console.log("Metodo de pago");
      await mutateUpdatePaymentMethod(data);
    }
    if (field === "amount") {
      console.log("Cantidad");
      await mutateEditHistoryPaymentAmount(data);
    }
    await queryClient.invalidateQueries({
      queryKey: ["allReceipts", "allHistoryPayments"],
    });
    await handleSearch();
    await refetch();
    cancel(); // Restablece el estado de edición
  };

  const columns = PaymentColumns({
    showReceipts: showReceipts,
    showExtensionModal: showExtensionModal,
    handlePayReceipt: handlePayReceipt,
    handleCancelReceipt: handleCancelReceipt,
    handleRevertReceipt: handleRevertReceipt,
    edit: edit,
    cancel: cancel,
    handleSave: handleSave,
    editingKey: editingKey,
    editingValue: editingValue,
    editingAmount: editingAmount,
    setEditingValue: setEditingValue,
    setEditingAmount: setEditingAmount,
  });

  const totals = getAmountsByStatus();
  const total = getTotal();

  const parseMoney = (money) => {
    const parsedMoney = parseFloat(money).toLocaleString("es-MX", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `$${parsedMoney} MXN`;
  };

  return (
    <>
      <Row
        gutter={[16, 16]}
        wrap={true}
        align={"middle"}
        justify={"center"}
        className={"mb-6"}
      >
        <Col className="gutter-row" xs={24} sm={12} md={10} lg={6} xl={4}>
          <Card
            className={
              "mt-3 shadow-md bg-gradient-to-r from-cyan-50 to-blue-200"
            }
          >
            <Statistic
              title="Total"
              value={parseMoney(total)}
              valueStyle={{ fontSize: 18 }} // Asegúrate de pasar fontSize correctamente
            />
          </Card>
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={10} lg={6} xl={4}>
          <Card
            className={
              "mt-3 shadow-md bg-gradient-to-r from-orange-50 to-yellow-200"
            }
          >
            <Statistic
              title="Pendiente"
              value={parseMoney(totals.paid)}
              valueStyle={{ fontSize: 18 }} // Asegúrate de pasar fontSize correctamente
            />
          </Card>
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={10} lg={6} xl={4}>
          <Card
            className={
              "mt-3 shadow-md bg-gradient-to-r from-yellow-100 to-green-200"
            }
          >
            <Statistic
              title="Pagado"
              value={parseMoney(totals.pending)}
              valueStyle={{ fontSize: 18 }} // Asegúrate de pasar fontSize correctamente
            />
          </Card>
        </Col>
        <Col className="gutter-row" xs={24} sm={12} md={10} lg={6} xl={4}>
          <Card
            className={
              "mt-3 shadow-md bg-gradient-to-r from-orange-50 to-red-200"
            }
          >
            <Statistic
              title="Cancelado"
              value={parseMoney(totals.cancelled)}
              valueStyle={{ fontSize: 18 }} // Asegúrate de pasar fontSize correctamente
            />
          </Card>
        </Col>
      </Row>
      <PaymentFilters
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        athletesData={athletesData}
        handleChangeStatus={handleChangeStatus}
        handleChangePaymentType={handleChangePaymentType}
        handleChangePaymentMethod={handleChangePaymentMethod}
        handleSearch={handleSearch}
        filterOption={filterOption}
        handleUserChange={handleUserChange}
        handleAthleteChange={handleAthleteChange}
        dateRange={dateRange}
        handleDateChange={handleDateChange}
        handleResetFilters={handleResetFilters}
        isLoading={isLoading}
      />
      <ModalComponent
        form={form}
        formFields={PaymentExtensionFields}
        onOk={handleEditExtension}
        title={"Prorroga"}
        onOpen={isExtensionModalVisible}
        onClose={handleCloseExtensionModal}
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
