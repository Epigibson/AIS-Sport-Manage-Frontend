import { useQuery } from "@tanstack/react-query";
import { getAllDiscounts } from "../../api/DiscountService.jsx";
import { TablesComponent } from "../../components/TablesComponent.jsx";
import { DiscountsColumns } from "./DiscountsColumns.jsx";
import { FloatButton, Form } from "antd";
import { ModalComponent } from "../../components/ModalComponent.jsx";
import { useCallback, useState } from "react";
import { DiscountsFormFields } from "./DiscountsFormFields.jsx";
import {
  useCreateDiscount,
  useDeleteDiscount,
  useUpdateDiscount,
} from "./DiscountsLogicMutations.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";
import { getAllPackages } from "../../api/ProductService.jsx";
import { getAllAthletes } from "../../api/AtheleService.jsx";
import { prepareRecord } from "../../utils/FieldsComposerUtils.jsx";
import { FileAddOutlined } from "@ant-design/icons";
import { enrichDiscounts } from "./DiscountsEnrichedFunction.jsx";

export const DiscountsLogic = () => {
  /**
   * @property {bool} is_recurrent
   */
  const [form] = Form.useForm();
  const [modalContext, setModalContext] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const {
    data: discounts,
    isLoading: isLoadingDiscounts,
    isError: isErrorDiscounts,
    refetch: refetchDiscounts,
  } = useQuery({
    queryKey: ["discounts"],
    queryFn: getAllDiscounts,
  });

  const {
    data: packagesData,
    isLoading: isLoadingPackages,
    isError: isErrorPackages,
    refetch: refetchPackages,
  } = useQuery({
    queryKey: ["allPackages"],
    queryFn: getAllPackages,
  });

  const {
    data: athletesData,
    isLoading: isLoadingAthletes,
    isError: isErrorAthletes,
    refetch: refetchAthletes,
  } = useQuery({
    queryKey: ["allAthletes"],
    queryFn: getAllAthletes,
  });

  const handleRefetchData = useCallback(async () => {
    await refetchDiscounts();
    await refetchPackages();
    await refetchAthletes();
  }, [refetchAthletes, refetchDiscounts, refetchPackages]);

  const enrichedDiscounts = useCallback(() => {
    if (!discounts || !packagesData || !athletesData) return [];
    return enrichDiscounts(discounts, packagesData, athletesData);
  }, [athletesData, discounts, packagesData]);

  const showModal = useCallback(() => {
    setIsModalVisible(true);
    setModalContext("create");
  }, []);

  const handleSuccess = useCallback(async () => {
    setIsModalVisible(false);
    setModalContext("");
    setSelectedRecord(null);
    form.resetFields();
    await handleRefetchData();
  }, [form, handleRefetchData]);

  const handleCancel = useCallback(async () => {
    setIsModalVisible(false);
    setModalContext("");
    setSelectedRecord(null);
    form.resetFields();
    await handleRefetchData();
  }, [form, handleRefetchData]);

  const { mutateCreateDiscount, isPendingCreatingDiscount } =
    useCreateDiscount(handleSuccess);
  const { mutateUpdateDiscount, isPendingUpdatingDiscount } =
    useUpdateDiscount(handleSuccess);
  const { mutateDeleteDiscount, isPendingDeletingDiscount } =
    useDeleteDiscount(handleSuccess);

  const handleEdit = useCallback(
    async (record) => {
      setSelectedRecord(record);
      setIsModalVisible(true);
      const record_ready = prepareRecord(record);
      form.setFieldsValue(record_ready);
      setModalContext("edit");
    },
    [form],
  );

  const handleDelete = useCallback(
    async (record) => {
      await mutateDeleteDiscount(record.discount_id);
      await handleRefetchData();
    },
    [handleRefetchData, mutateDeleteDiscount],
  );

  const handleSubmit = useCallback(async () => {
    const values = await form.validateFields();
    if (modalContext === "edit") {
      if (values.is_recurrent === false) {
        !values.athletes ? (values.athletes = []) : values.athletes;
        !values.product_id ? (values.product_id = null) : values.athletes;
      }
      await mutateUpdateDiscount({
        ...values,
        discount_id: selectedRecord.discount_id,
      });
    }
    if (modalContext === "create") {
      await mutateCreateDiscount(values);
    }
  }, [
    form,
    modalContext,
    mutateCreateDiscount,
    mutateUpdateDiscount,
    selectedRecord,
  ]);

  const columns = DiscountsColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onCancel: handleCancel,
  });

  if (isLoadingDiscounts || isLoadingPackages || isLoadingAthletes)
    return <LoaderIconUtils isLoading={true} />;
  if (isErrorDiscounts || isErrorPackages || isErrorAthletes)
    return <div>{Error}</div>;

  return (
    <>
      <FloatButton
        icon={<FileAddOutlined />}
        type="primary"
        shape="square"
        tooltip={<div>Crear Descuento</div>}
        onClick={showModal}
      >
        Crear nuevo descuento
      </FloatButton>
      <ModalComponent
        form={form}
        formFields={DiscountsFormFields}
        title={modalContext === "edit" ? "Editar Registro" : "Crear Registro"}
        onOk={handleSubmit}
        onOpen={isModalVisible}
        onClose={handleCancel}
        confirmLoading={
          isPendingCreatingDiscount ||
          isPendingUpdatingDiscount ||
          isPendingDeletingDiscount
        }
      />
      <TablesComponent data={enrichedDiscounts()} columns={columns} />
    </>
  );
};
