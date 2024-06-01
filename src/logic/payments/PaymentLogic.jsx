import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllHistoryPayments } from "../../api/PaymentService.jsx";
import { PaymentColumns } from "./PaymentColumns.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";
import { TablesComponent } from "../../components/TablesComponent.jsx";
import { getAllUsers } from "../../api/UserService.jsx";
import { getAllReceipts } from "../../api/ReceiptsService.jsx";
import { ModalComponent } from "../../components/ModalComponent.jsx";
import { useEffect, useMemo, useState } from "react";
import { PaymentReceiptColumns } from "./PaymentReceiptColumns.jsx";
import { PaymentFilters } from "./PaymentFilters.jsx";
import {
  useAddPaymentHistoryDiscountCode,
  useCancelReceipt,
  useCreatePayment,
  useEditPaymentHistoryAmount,
  useEditPaymentHistoryExtension,
  useEditPaymentHistoryLimitDate,
  useEditPaymentHistoryPeriodMonth,
  usePayReceipt,
  useRevertReceipt,
  useUpdatePaymentMethod,
} from "./PaymentLogicMutations.jsx";
import { getAllAthletes } from "../../api/AtheleService.jsx";
import { Card, Col, FloatButton, Form, Row, Statistic } from "antd";
import { PaymentExtensionFields } from "./PaymentExtensionFields.jsx";
import { PaymentFormFields } from "./PaymentFormFields.jsx";
import dayjs from "dayjs";
import { FileAddOutlined } from "@ant-design/icons";
import { PaymentCancelFields } from "./PaymentCancelFields.jsx";
import { getAllPackages } from "../../api/ProductService.jsx";

export const PaymentLogic = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isExtensionModalVisible, setIsExtensionModalVisible] = useState(false);
  const [isCancelModalVisible, setIsCancelModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [formCreate] = Form.useForm();
  const [formCancel] = Form.useForm();
  const [selectedReceipt, setSelectedReceipt] = useState({});
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [userFilter, setUserFilter] = useState("");
  const [athleteFilter, setAthleteFilter] = useState("");
  const [statusPayFilter, setStatusPayFilter] = useState("");
  const [paymentTypeFilter, setPaymentTypeFilter] = useState("");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("");
  const [MembershipFilter, setMembershipFilter] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [editingKeyPaymentMethod, setEditingKeyPaymentMethod] = useState("");
  const [editingKeyAmount, setEditingKeyAmount] = useState("");
  const [editingKeyLimitDate, setEditingKeyLimitDate] = useState("");
  const [editingKeyPeriodMonth, setEditingKeyPeriodMonth] = useState("");
  const [editingKeyDiscountCode, setEditingKeyDiscountCode] = useState("");
  const [editingPaymentMethod, setEditingPaymentMethod] = useState("");
  const [editingAmount, setEditingAmount] = useState("");
  const [editingLimitDate, setEditingLimitDate] = useState("");
  const [editingPeriodMonth, setEditingPeriodMonth] = useState("");
  const [editingDiscountCode, setEditingDiscountCode] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [autoFetchEnabled, setAutoFetchEnabled] = useState(true);
  const [firstCharge, setFirstCharge] = useState(0);
  const [isLoadingEnrichedData, setIsLoadingEnrichedData] = useState(true);
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

  const {
    data: usersData,
    isLoading: isUsersLoading,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  const {
    data: athletesData,
    isLoading: isAthletesLoading,
    refetch: refetchAthletes,
  } = useQuery({
    queryKey: ["allAthletes"],
    queryFn: getAllAthletes,
  });

  const {
    data: receiptsData,
    isLoading: isReceiptsLoading,
    refetch: refetchReceipts,
  } = useQuery({
    queryKey: ["allReceipts"],
    queryFn: getAllReceipts,
  });

  const { data: membershipData } = useQuery({
    queryKey: ["allMemberships"],
    queryFn: getAllPackages,
  });

  const userLogged = queryClient.getQueryData(["userLogged"]);

  const handleSearch = async () => {
    await queryClient.invalidateQueries({
      queryKey: [
        "allHistoryPayments",
        "allAthletes",
        "allUsers",
        "allReceipts",
      ],
    });
    await refetch();
    await refetchUsers();
    await refetchAthletes();
    await refetchReceipts();
  };

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

    let filteredData = historyPaymentData?.map((historyPayment) => {
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
    if (MembershipFilter) {
      filteredData = filteredData.filter(
        (payment) => payment.receipt?.receipt_package === MembershipFilter,
      );
    }

    return filteredData;
  }, [
    historyPaymentData,
    usersData,
    athletesData,
    receiptsData,
    MembershipFilter,
  ]);

  // console.log("DATA", enrichedHistoryPaymentsData);

  useEffect(() => {
    // console.log("AUTOFETCH", autoFetchEnabled);
    if (historyPaymentData && firstCharge <= 0) {
      setFirstCharge(firstCharge + 2);
    } else {
      setAutoFetchEnabled(false);
    }
  }, [
    receiptsData,
    historyPaymentData,
    usersData,
    athletesData,
    firstCharge,
    autoFetchEnabled,
  ]);

  const { mutateUpdatePaymentMethod } = useUpdatePaymentMethod(handleSearch);
  const { mutateUpdate } = usePayReceipt(handleSearch);
  const { mutateUpdateCancelReceipt } = useCancelReceipt(handleSearch);
  const { mutateRevertReceipt } = useRevertReceipt(handleSearch);
  const { mutateEditHistoryPaymentExtension } =
    useEditPaymentHistoryExtension(handleSearch);
  const { mutateEditHistoryPaymentAmount } =
    useEditPaymentHistoryAmount(handleSearch);
  const { mutateCreate } = useCreatePayment(handleSearch);
  const { mutateEditHistoryPaymentLimitDate } =
    useEditPaymentHistoryLimitDate(handleSearch);
  const { mutateEditHistoryPaymentPeriodMonth } =
    useEditPaymentHistoryPeriodMonth(handleSearch);

  const { mutateAddHistoryPaymentDiscountCode } =
    useAddPaymentHistoryDiscountCode(handleSearch);

  const getTotal = () => {
    let total = 0;
    let totalCanceled = 0;
    historyPaymentData?.forEach((payment) => {
      if (payment.status === "Cancelado") {
        totalCanceled += payment.amount;
      } else {
        total += payment.amount;
      }
    });
    return { total: total, totalCanceled: totalCanceled };
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

  const showCreateModal = () => {
    setIsCreateModalVisible(true);
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

  const handleCloseCancelModal = () => {
    setIsCancelModalVisible(false);
  };

  const handleCloseExtensionModal = () => {
    setIsExtensionModalVisible(false);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalVisible(false);
    formCreate.resetFields();
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
    setMembershipFilter("");
    setDateRange([]);
  };

  const handleCreatePayment = async () => {
    const values = await formCreate.validateFields();
    await mutateCreate(values);
    formCreate.resetFields();
    setIsCreateModalVisible(false);
  };

  const handleEditExtension = async () => {
    const values = await form.validateFields();
    values.history_payment_id = selectedPayment.history_payment_id;
    await mutateEditHistoryPaymentExtension(values);
    form.resetFields();
    setIsExtensionModalVisible(false);
  };

  const handlePayReceipt = async (record) => {
    await mutateUpdate(record.receipt_id);
    await handleSearch();
    await refetch();
  };

  const handleCancelReceipt = async (record) => {
    setSelectedReceipt(record);
    setIsCancelModalVisible(true);
  };

  const submitCancelReceipt = async () => {
    const values = await formCancel.validateFields();
    values.receipt_id = selectedReceipt.receipt_id;
    await mutateUpdateCancelReceipt(values);
    await handleSearch();
    await refetch();
    setIsCancelModalVisible(false);
  };

  const handleRevertReceipt = async (record) => {
    await mutateRevertReceipt(record.receipt_id);
    await handleSearch();
    await refetch();
  };

  const filterOption = (input, option) => option?.search?.includes(input);

  const handleDateChange = (dates) => {
    if (dates) {
      const formattedDates = dates?.map((date) =>
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

  const handleChangeMembership = async (value) => {
    await setMembershipFilter(value);
    // console.log(`selected ${value}`);
  };

  const edit = (record, type) => {
    if (type === "payment_method") {
      setEditingKeyPaymentMethod(record?._id);
      setEditingPaymentMethod(record?.payment_method);
    } else if (type === "amount") {
      setEditingKeyAmount(record?._id);
      setEditingAmount(record?.amount);
    } else if (type === "limit_date") {
      setEditingKeyLimitDate(record?._id);
      setEditingLimitDate(dayjs(record?.limit_date));
    } else if (type === "period_month") {
      setEditingKeyPeriodMonth(record?._id);
      setEditingPeriodMonth(
        record?.period_month ? dayjs(record?.period_month) : dayjs(new Date()),
      );
    } else if (type === "discount_code") {
      setEditingKeyDiscountCode(record?._id);
      setEditingDiscountCode(record?.discount_code);
    }
  };

  const cancel = () => {
    setEditingKeyPaymentMethod("");
    setEditingKeyLimitDate("");
    setEditingKeyPeriodMonth("");
    setEditingKeyAmount("");
    setEditingKeyPeriodMonth("");
    setEditingKeyDiscountCode("");
    setEditingPaymentMethod("");
    setEditingAmount("");
    setEditingLimitDate("");
    setEditingDiscountCode("");
  };

  const handleSave = async (record, field) => {
    if (field === "payment_method") {
      const data = {
        history_payment_id: record?.history_payment_id,
        payment_method: editingPaymentMethod,
      };
      console.log("Payment Method", data);
      await mutateUpdatePaymentMethod(data);
    }
    if (field === "amount") {
      const data = {
        history_payment_id: record?.history_payment_id,
        amount: editingAmount,
      };
      console.log("Cantidad", data);
      await mutateEditHistoryPaymentAmount(data);
    }
    if (field === "limit_date") {
      const data = {
        history_payment_id: record?.history_payment_id,
        limit_date: dayjs(editingLimitDate).format("YYYY-MM-DD HH:mm"),
      };
      console.log("Limit Date", data);
      await mutateEditHistoryPaymentLimitDate(data);
    }
    if (field === "period_month") {
      const data = {
        history_payment_id: record?.history_payment_id,
        period_month: dayjs(editingPeriodMonth).format("YYYY-MM-DD HH:mm"),
      };
      console.log("Period Month", data);
      await mutateEditHistoryPaymentPeriodMonth(data);
    }
    if (field === "discount_code") {
      const data = {
        history_payment_id: record?.history_payment_id,
        discount_code: editingDiscountCode,
      };
      console.log("Codigo de Descuento", data);
      await mutateAddHistoryPaymentDiscountCode(data);
    }
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
    editingKeyPaymentMethod: editingKeyPaymentMethod,
    editingKeyAmount: editingKeyAmount,
    editingKeyLimitDate: editingKeyLimitDate,
    editingKeyPeriodMonth: editingKeyPeriodMonth,
    editingKeyDiscountCode: editingKeyDiscountCode,

    editingPaymentMethod: editingPaymentMethod,
    editingAmount: editingAmount,
    editingLimitDate: editingLimitDate,
    editingPeriodMonth: editingPeriodMonth,
    editingDiscountCode: editingDiscountCode,

    setEditingPaymentMethod: setEditingPaymentMethod,
    setEditingAmount: setEditingAmount,
    setEditingLimitDate: setEditingLimitDate,
    setEditingPeriodMonth: setEditingPeriodMonth,
    setEditingDiscountCode: setEditingDiscountCode,
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

  if (isLoading || isUsersLoading || isAthletesLoading || isReceiptsLoading)
    return <LoaderIconUtils isLoading={true} />;
  if (isError) return <h1>Error...</h1>;

  // console.log("RECIBO", selectedReceipt);

  return (
    <>
      {userLogged.user_type === "Admin" ||
      userLogged.user_type === "SuperAdmin" ? (
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
                title={
                  <div style={{ fontSize: 12 }}>
                    Ingreso Estimado: (Pendiente + Pagado)
                  </div>
                }
                value={parseMoney(total.total)}
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
                title="No Pagado: (Creado + Pendiente)"
                value={parseMoney(totals?.pending)}
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
                value={parseMoney(totals?.paid)}
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
                value={parseMoney(totals?.cancelled)}
                valueStyle={{ fontSize: 18 }} // Asegúrate de pasar fontSize correctamente
              />
            </Card>
          </Col>
        </Row>
      ) : (
        <></>
      )}
      <Row gutter={[16, 16]} wrap={true} align={"middle"} justify={"center"}>
        <Col className="gutter-row" xs={24} sm={12} md={10} lg={24} xl={24}>
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
            showCreateModal={showCreateModal}
            handleChangeReceiptPackageName={handleChangeMembership}
            receiptPackageNames={membershipData}
          />
        </Col>
      </Row>
      <ModalComponent
        form={formCreate}
        formFields={PaymentFormFields}
        onOk={handleCreatePayment}
        title={"Crear Recibo"}
        onOpen={isCreateModalVisible}
        onClose={handleCloseCreateModal}
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
        form={formCancel}
        formFields={PaymentCancelFields}
        onOk={submitCancelReceipt}
        title={"Cancelar Recibo"}
        onOpen={isCancelModalVisible}
        onClose={handleCloseCancelModal}
      />
      <ModalComponent
        dataTable={selectedReceipt}
        dataTableColumns={PaymentReceiptColumns}
        title={"Recibo"}
        onOpen={isModalVisible}
        onClose={handleCloseModal}
      />
      <FloatButton
        icon={<FileAddOutlined />}
        type="primary"
        shape="square"
        tooltip={<div>Crear Recibo</div>}
        onClick={showCreateModal}
      >
        Crear Pago
      </FloatButton>
      <TablesComponent
        data={enrichedHistoryPaymentsData}
        columns={columns}
        loading={
          isLoading || isUsersLoading || isAthletesLoading || isReceiptsLoading
        }
      />
    </>
  );
};
