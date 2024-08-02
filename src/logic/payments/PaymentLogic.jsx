import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllHistoryPayments } from "../../api/PaymentService.jsx";
import { PaymentColumns } from "./PaymentColumns.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";
import { TablesComponent } from "../../components/TablesComponent.jsx";
import { getAllReceipts } from "../../api/ReceiptsService.jsx";
import { ModalComponent } from "../../components/ModalComponent.jsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PaymentReceiptColumns } from "./PaymentReceiptColumns.jsx";
import { PaymentFilters } from "./PaymentFilters.jsx";
import {
  useAddPaymentHistoryDiscountCode,
  useCancelReceipt,
  useCreatePayment,
  useDeletePaymentHistory,
  useEditPaymentHistoryAmount,
  useEditPaymentHistoryExtension,
  useEditPaymentHistoryLimitDate,
  useEditPaymentHistoryPeriodMonth,
  usePayReceipt,
  useRevertReceipt,
  useSubtractAmountReceiptWithBalance,
  useUpdatePaymentMethod,
} from "./PaymentLogicMutations.jsx";
import { getAllAthletes } from "../../api/AtheleService.jsx";
import { Col, FloatButton, Form, message, Row } from "antd";
import { PaymentExtensionFields } from "./PaymentExtensionFields.jsx";
import { PaymentFormFields } from "./PaymentFormFields.jsx";
import dayjs from "dayjs";
import { FileAddOutlined } from "@ant-design/icons";
import { PaymentCancelFields } from "./PaymentCancelFields.jsx";
import { getAllPackages } from "../../api/ProductService.jsx";
import { useNavigate } from "react-router-dom";
import { useUsers } from "../../hooks/UserContext/useUsers.jsx";

export const PaymentLogic = () => {
  const navigate = useNavigate();
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
  const [membershipFilter, setMembershipFilter] = useState("");
  const [showFilters, setShowFilters] = useState(true);
  const [editingKeyPaymentMethod, setEditingKeyPaymentMethod] = useState("");
  const [editingKeyBalanceAmount, setEditingKeyBalanceAmount] = useState("");
  const [editingKeyAmount, setEditingKeyAmount] = useState("");
  const [editingKeyLimitDate, setEditingKeyLimitDate] = useState("");
  const [editingKeyPeriodMonth, setEditingKeyPeriodMonth] = useState("");
  const [editingKeyDiscountCode, setEditingKeyDiscountCode] = useState("");
  const [editingKeyBalancePayment, setEditingKeyBalancePayment] = useState("");
  const [editingPaymentMethod, setEditingPaymentMethod] = useState("");
  const [editingBalanceAmount, setEditingBalanceAmount] = useState("");
  const [editingBalancePayment, setEditingBalancePayment] = useState("");
  const [editingAmount, setEditingAmount] = useState("");
  const [editingLimitDate, setEditingLimitDate] = useState("");
  const [editingPeriodMonth, setEditingPeriodMonth] = useState("");
  const [editingDiscountCode, setEditingDiscountCode] = useState("");
  const [dateRange, setDateRange] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({});
  const [firstCharge, setFirstCharge] = useState(0);
  const [isLoadingEnrichedData, setIsLoadingEnrichedData] = useState(true);
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Tamaño de página fijo, puedes hacerlo dinámico si es necesario

  const fetchPayments = useCallback(() => {
    return getAllHistoryPayments({
      user: appliedFilters.userFilter || undefined,
      athlete: appliedFilters.athleteFilter || undefined,
      status_pay: appliedFilters.statusPayFilter || undefined,
      payment_type: appliedFilters.paymentTypeFilter || undefined,
      payment_method: appliedFilters.paymentMethodFilter || undefined,
      membership: appliedFilters.membershipFilter || undefined,
      init_date: appliedFilters.dateRange
        ? appliedFilters.dateRange[0]
        : undefined,
      end_date: appliedFilters.dateRange
        ? appliedFilters.dateRange[1]
        : undefined,
      page,
      page_size: pageSize,
    });
  }, [appliedFilters, page, pageSize]);

  const {
    data: historyPaymentData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [
      "allHistoryPayments",
      appliedFilters.userFilter || "",
      appliedFilters.athleteFilter || "",
      appliedFilters.statusPayFilter || "",
      appliedFilters.paymentTypeFilter || "",
      appliedFilters.paymentMethodFilter || "",
      appliedFilters.membershipFilter || "",
      appliedFilters.dateRange?.length > 0
        ? appliedFilters.dateRange[0]
        : undefined,
      appliedFilters.dateRange?.length > 1
        ? appliedFilters.dateRange[1]
        : undefined,
      page,
      pageSize,
    ],
    queryFn: fetchPayments,
    enabled: true,
    keepPreviousData: true, // Mantener datos anteriores mientras se cargan nuevos
  });

  const { users, isLoadingUsers, refetchUsers } = useUsers();
  const usersData = users;

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

  const handleSearch = useCallback(async () => {
    setAppliedFilters({
      userFilter,
      athleteFilter,
      statusPayFilter,
      paymentTypeFilter,
      membershipFilter,
      paymentMethodFilter,
      dateRange,
    });
    await refetch();
    await refetchUsers();
    await refetchAthletes();
    await refetchReceipts();
    setPage(1); // Reset page to 1 when applying new filters
  }, [
    userFilter,
    athleteFilter,
    statusPayFilter,
    paymentTypeFilter,
    membershipFilter,
    paymentMethodFilter,
    dateRange,
    refetch,
    refetchUsers,
    refetchAthletes,
    refetchReceipts,
  ]);

  const handleResetFilters = useCallback(() => {
    setAthleteFilter("");
    setUserFilter("");
    setStatusPayFilter("");
    setPaymentTypeFilter("");
    setPaymentMethodFilter("");
    setMembershipFilter("");
    setDateRange([]);
    setAppliedFilters({});
    setPage(1); // Reset page to 1 when resetting filters
  }, []);

  useEffect(() => {
    if (Object.keys(appliedFilters).length > 0) {
      refetch();
    }
  }, [appliedFilters, refetch]);

  const cancel = useCallback(() => {
    setEditingKeyPaymentMethod("");
    setEditingKeyBalanceAmount("");
    setEditingKeyLimitDate("");
    setEditingKeyPeriodMonth("");
    setEditingKeyAmount("");
    setEditingKeyPeriodMonth("");
    setEditingKeyDiscountCode("");
    setEditingKeyBalancePayment("");
    setEditingPaymentMethod("");
    setEditingBalanceAmount("");
    setEditingAmount("");
    setEditingLimitDate("");
    setEditingDiscountCode("");
    setEditingBalancePayment("");
  }, []);

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

    return historyPaymentData?.results?.map((historyPayment) => {
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

  useEffect(() => {
    if (historyPaymentData && firstCharge <= 0) {
      setFirstCharge(firstCharge + 2);
    }
  }, [receiptsData, historyPaymentData, usersData, athletesData, firstCharge]);

  const { mutateUpdatePaymentMethod, updatePaymentMethodPending } =
    useUpdatePaymentMethod(handleSearch, cancel);
  const { mutateUpdate, mutateUpdatePending } = usePayReceipt(
    handleSearch,
    cancel,
  );
  const {
    mutateSubtractAmountReceiptWithBalance,
    mutateSubtractAmountReceiptWithBalancePending,
  } = useSubtractAmountReceiptWithBalance(handleSearch, cancel);
  const { mutateDeleteHistoryPayment } = useDeletePaymentHistory(handleSearch);
  const { mutateUpdateCancelReceipt } = useCancelReceipt(handleSearch);
  const { mutateRevertReceipt } = useRevertReceipt(handleSearch);
  const { mutateEditHistoryPaymentExtension } = useEditPaymentHistoryExtension(
    handleSearch,
    cancel,
  );
  const { mutateEditHistoryPaymentAmount } = useEditPaymentHistoryAmount(
    handleSearch,
    cancel,
  );
  const { mutateCreate } = useCreatePayment(handleSearch, cancel);
  const { mutateEditHistoryPaymentLimitDate } = useEditPaymentHistoryLimitDate(
    handleSearch,
    cancel,
  );
  const { mutateEditHistoryPaymentPeriodMonth } =
    useEditPaymentHistoryPeriodMonth(handleSearch, cancel);

  const { mutateAddHistoryPaymentDiscountCode } =
    useAddPaymentHistoryDiscountCode(handleSearch, cancel);

  const showCreateModal = useCallback(() => {
    setIsCreateModalVisible(true);
  }, []);

  const showReceipts = useCallback((record) => {
    setSelectedReceipt([record.receipt]);
    setIsModalVisible(true);
  }, []);

  const showExtensionModal = useCallback(
    async (record) => {
      form.setFieldsValue({
        extension: record.extension,
      });
      setSelectedPayment(record);
      setIsExtensionModalVisible(true);
    },
    [form],
  );

  const handleCloseCancelModal = useCallback(() => {
    setIsCancelModalVisible(false);
  }, []);

  const handleCloseExtensionModal = useCallback(() => {
    setIsExtensionModalVisible(false);
  }, []);

  const handleCloseCreateModal = useCallback(() => {
    setIsCreateModalVisible(false);
    formCreate.resetFields();
  }, [formCreate]);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleCreatePayment = useCallback(async () => {
    const values = await formCreate.validateFields();
    await mutateCreate(values);
    formCreate.resetFields();
    setIsCreateModalVisible(false);
  }, [formCreate, mutateCreate]);

  const handleEditExtension = useCallback(async () => {
    const values = await form.validateFields();
    values.history_payment_id = selectedPayment.history_payment_id;
    await mutateEditHistoryPaymentExtension(values);
    form.resetFields();
    setIsExtensionModalVisible(false);
  }, [form, mutateEditHistoryPaymentExtension, selectedPayment]);

  const handlePayReceipt = useCallback(
    async (record, type) => {
      if (type === "balance") {
        const data = {
          receipt_id: record?.receipt._id,
          amount_to_apply: record?.receipt.receipt_amount,
        };
        await mutateSubtractAmountReceiptWithBalance(data);
      } else if (type === "payment") {
        await mutateUpdate(record.receipt_id);
      }
      await handleSearch();
      await refetch();
    },
    [
      handleSearch,
      mutateSubtractAmountReceiptWithBalance,
      mutateUpdate,
      refetch,
    ],
  );

  const handleCancelReceipt = useCallback(async (record) => {
    setSelectedReceipt(record);
    setIsCancelModalVisible(true);
  }, []);

  const submitCancelReceipt = useCallback(async () => {
    const values = await formCancel.validateFields();
    values.receipt_id = selectedReceipt.receipt_id;
    await mutateUpdateCancelReceipt(values);
    await handleSearch();
    await refetch();
    setIsCancelModalVisible(false);
  }, [
    formCancel,
    handleSearch,
    mutateUpdateCancelReceipt,
    refetch,
    selectedReceipt,
  ]);

  const handleRevertReceipt = useCallback(
    async (record) => {
      await mutateRevertReceipt(record.receipt_id);
      await handleSearch();
      await refetch();
    },
    [handleSearch, mutateRevertReceipt, refetch],
  );

  const handleDeleteReceipt = useCallback(
    async (record) => {
      await mutateDeleteHistoryPayment(record.history_payment_id);
      await handleSearch();
      await refetch();
    },
    [handleSearch, mutateDeleteHistoryPayment, refetch],
  );

  const filterOption = (input, option) => option?.search?.includes(input);

  const handleDateChange = useCallback((dates) => {
    if (dates) {
      const formattedDates = dates?.map((date) =>
        date.format("YYYY-MM-DD HH:mm"),
      );
      setDateRange(formattedDates);
    } else {
      setDateRange([]);
    }
  }, []);

  const handleUserChange = (value, option) => {
    setUserFilter(option.key);
  };

  const handleAthleteChange = (value) => {
    setAthleteFilter(value);
  };

  const handleChangeStatus = (value) => {
    setStatusPayFilter(value);
  };

  const handleChangePaymentType = (value) => {
    setPaymentTypeFilter(value);
  };

  const handleChangePaymentMethod = (value) => {
    setPaymentMethodFilter(value);
  };

  const handleChangeMembership = (value) => {
    console.log("Valor si hay membresia final", value);
    setMembershipFilter(value);
  };

  const edit = useCallback((record, type, paymentMethod) => {
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
    } else if (type === "balance_amount") {
      setEditingKeyBalanceAmount(record?._id);
      setEditingBalanceAmount(0);
    } else if (type === "balance_payment") {
      setEditingKeyBalancePayment(record?._id);
      setEditingBalancePayment(record?.amount_balance_updated);
      setEditingPaymentMethod(paymentMethod);
    }
  }, []);

  const handleSave = useCallback(
    async (record, field, paymentMethod) => {
      if (field === "payment_method") {
        const data = {
          history_payment_id: record?.history_payment_id,
          payment_method: editingPaymentMethod,
        };
        await mutateUpdatePaymentMethod(data);
      }
      if (field === "amount") {
        const data = {
          history_payment_id: record?.history_payment_id,
          amount: editingAmount,
        };
        await mutateEditHistoryPaymentAmount(data);
      }
      if (field === "limit_date") {
        const data = {
          history_payment_id: record?.history_payment_id,
          limit_date: dayjs(editingLimitDate).format("YYYY-MM-DD HH:mm"),
        };
        await mutateEditHistoryPaymentLimitDate(data);
      }
      if (field === "period_month") {
        const data = {
          history_payment_id: record?.history_payment_id,
          period_month: dayjs(editingPeriodMonth).format("YYYY-MM-DD HH:mm"),
        };
        await mutateEditHistoryPaymentPeriodMonth(data);
      }
      if (field === "discount_code") {
        const data = {
          history_payment_id: record?.history_payment_id,
          discount_code: editingDiscountCode,
        };
        await mutateAddHistoryPaymentDiscountCode(data);
      }
      if (field === "balance_amount") {
        let values = 0;
        const saldoAFavor = record?.user?.positive_balance;
        const montoRestante = record?.amount_balance_updated;
        const monto = record?.amount;
        if (saldoAFavor === 0 || monto === 0) {
          values = 0;
        } else if (saldoAFavor > monto) {
          if (montoRestante === 0) {
            values = monto;
          } else {
            values = montoRestante;
          }
        } else if (saldoAFavor <= monto) {
          if (montoRestante === 0) {
            values = saldoAFavor;
          } else {
            values = montoRestante;
          }
        } else if (montoRestante === 0) {
          values = 0;
        }
        if (editingBalanceAmount < 0 || editingBalanceAmount > values) {
          message.error(`El valor del pago debe estar entre $0 y $${values}`);
          return;
        }

        if (editingBalanceAmount > montoRestante) {
          message.error(
            `El valor del pago parcial no puede ser mayor que el monto restante`,
          );
          return;
        }

        if (editingBalanceAmount > saldoAFavor) {
          message.error(
            `El valor del pago parcial no puede ser mayor que el saldo a favor del usuario`,
          );
          return;
        }

        const data = {
          receipt_id: record?.receipt._id,
          amount_to_apply: editingBalancePayment || editingBalanceAmount,
          payment_method: editingPaymentMethod
            ? editingPaymentMethod
            : paymentMethod,
        };
        console.log("Balance Amount", data);
        await mutateSubtractAmountReceiptWithBalance(data);
      }
    },
    [
      editingPaymentMethod,
      mutateUpdatePaymentMethod,
      editingAmount,
      mutateEditHistoryPaymentAmount,
      editingLimitDate,
      mutateEditHistoryPaymentLimitDate,
      editingPeriodMonth,
      mutateEditHistoryPaymentPeriodMonth,
      editingDiscountCode,
      mutateAddHistoryPaymentDiscountCode,
      editingBalanceAmount,
      editingBalancePayment,
      mutateSubtractAmountReceiptWithBalance,
    ],
  );

  const columns = useMemo(
    () =>
      PaymentColumns({
        showReceipts: showReceipts,
        showExtensionModal: showExtensionModal,
        handlePayReceipt: handlePayReceipt,
        handleCancelReceipt: handleCancelReceipt,
        handleRevertReceipt: handleRevertReceipt,
        edit: edit,
        cancel: cancel,
        handleSave: handleSave,
        handleDeleteReceipt: handleDeleteReceipt,

        checkUser: userLogged?.email,
        navigate: navigate,

        editingKeyPaymentMethod: editingKeyPaymentMethod,
        editingKeyBalanceAmount: editingKeyBalanceAmount,
        editingKeyBalancePayment: editingKeyBalancePayment,
        editingKeyAmount: editingKeyAmount,
        editingKeyLimitDate: editingKeyLimitDate,
        editingKeyPeriodMonth: editingKeyPeriodMonth,
        editingKeyDiscountCode: editingKeyDiscountCode,

        editingPaymentMethod: editingPaymentMethod,
        editingBalanceAmount: editingBalanceAmount,
        editingBalancePayment: editingBalancePayment,
        editingAmount: editingAmount,
        editingLimitDate: editingLimitDate,
        editingPeriodMonth: editingPeriodMonth,
        editingDiscountCode: editingDiscountCode,

        setEditingBalancePayment: setEditingBalancePayment,
        setEditingPaymentMethod: setEditingPaymentMethod,
        setEditingBalanceAmount: setEditingBalanceAmount,
        setEditingAmount: setEditingAmount,
        setEditingLimitDate: setEditingLimitDate,
        setEditingPeriodMonth: setEditingPeriodMonth,
        setEditingDiscountCode: setEditingDiscountCode,

        mutateSubtractAmountReceiptWithBalancePending:
          mutateSubtractAmountReceiptWithBalancePending,
        updatePaymentMethodPending: updatePaymentMethodPending,
        mutateUpdatePending: mutateUpdatePending,
      }),
    [
      showReceipts,
      showExtensionModal,
      handlePayReceipt,
      handleCancelReceipt,
      handleRevertReceipt,
      edit,
      cancel,
      handleSave,
      handleDeleteReceipt,
      userLogged,
      navigate,
      editingKeyPaymentMethod,
      editingKeyBalanceAmount,
      editingKeyBalancePayment,
      editingKeyAmount,
      editingKeyLimitDate,
      editingKeyPeriodMonth,
      editingKeyDiscountCode,
      editingPaymentMethod,
      editingBalanceAmount,
      editingBalancePayment,
      editingAmount,
      editingLimitDate,
      editingPeriodMonth,
      editingDiscountCode,
      mutateSubtractAmountReceiptWithBalancePending,
      updatePaymentMethodPending,
      mutateUpdatePending,
    ],
  );

  const handleTableChange = useCallback((pagination, filters, sorter) => {
    console.log("Table change:", pagination, filters, sorter);
    setPage(pagination.current);
    setPageSize(pagination.pageSize);
  }, []);

  if (isLoading || isLoadingUsers || isAthletesLoading || isReceiptsLoading)
    return <LoaderIconUtils isLoading={true} />;
  if (isError) return <h1>Error...</h1>;

  return (
    <>
      {userLogged?.user_type === "Admin" ||
      userLogged?.user_type === "SuperAdmin" ? (
        <></>
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
            handleChangeReceiptPackageName={handleChangeMembership}
            dateRange={dateRange}
            handleDateChange={handleDateChange}
            handleResetFilters={handleResetFilters}
            isLoading={isLoading}
            showCreateModal={showCreateModal}
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
          isLoading || isLoadingUsers || isAthletesLoading || isReceiptsLoading
        }
        pagination={{
          current: page,
          pageSize: pageSize,
          total: historyPaymentData?.total || 0, // Asumiendo que el backend devuelve el total de registros
          showSizeChanger: true, // Permite cambiar el tamaño de página
        }}
        onChange={handleTableChange}
      />
    </>
  );
};
