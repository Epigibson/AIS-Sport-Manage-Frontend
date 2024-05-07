import { useQuery } from "@tanstack/react-query";
import { getAllDiscounts } from "../../api/DiscountService.jsx";
import { TablesComponent } from "../../components/TablesComponent.jsx";
import { DiscountsColumns } from "./DiscountsColumns.jsx";
import { FloatButton, Form } from "antd";
import { ModalComponent } from "../../components/ModalComponent.jsx";
import { useState } from "react";
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

export const DiscountsLogic = () => {
  const [form] = Form.useForm();
  const [modalContext, setModalContext] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const {
    data: discounts,
    isError,
    Error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["discounts"],
    queryFn: getAllDiscounts,
  });

  const { data: packagesData } = useQuery({
    queryKey: ["allPackages"],
    queryFn: getAllPackages,
  });

  const { data: athletesData } = useQuery({
    queryKey: ["allAthletes"],
    queryFn: getAllAthletes,
  });

  const enrichedDiscounts = discounts?.map((discount) => {
    const membershipData = packagesData?.find(
      (membership) => membership._id === discount.product_id,
    );
    const athletesNewData = athletesData?.filter((athleteObject) =>
      discount.athletes?.some((athlete) => athlete === athleteObject._id),
    );
    return {
      ...discount,
      membership: membershipData,
      athletes: athletesNewData,
    };
  });

  const handleSuccess = async () => {
    setIsModalVisible(false);
    setModalContext("");
    setSelectedRecord(null);
    form.resetFields();
    await refetch();
  };

  const { mutateCreateDiscount, isPendingCreatingDiscount } =
    useCreateDiscount(handleSuccess);
  const { mutateUpdateDiscount, isPendingUpdatingDiscount } =
    useUpdateDiscount(handleSuccess);
  const { mutateDeleteDiscount, isPendingDeletingDiscount } =
    useDeleteDiscount(handleSuccess);

  const showModal = () => {
    setIsModalVisible(true);
    setModalContext("create");
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setIsModalVisible(true);
    const record_ready = prepareRecord(record);
    form.setFieldsValue(record_ready);
    setModalContext("edit");
  };

  const handleDelete = async (record) => {
    await mutateDeleteDiscount(record.discount_id);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setModalContext("");
    setSelectedRecord(null);
    form.resetFields();
  };

  const handleSubmit = async () => {
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
  };

  const columns = DiscountsColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onCancel: handleCancel,
  });

  if (isLoading) return <LoaderIconUtils />;
  if (isError) return <div>{Error}</div>;

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
      <TablesComponent data={enrichedDiscounts} columns={columns} />
    </>
  );
};
