import { TablesComponent } from "../../components/TablesComponent.jsx";
import { useQuery } from "@tanstack/react-query";
import { getAllPackages } from "../../api/ProductService.jsx";
import {
  useCreatePackage,
  useDeletePackage,
  useUpdatePackage,
} from "./PackageLogicMutations.jsx";
import { Button, Form, message, Row } from "antd";
import { useState } from "react";
import { ModalComponent } from "../../components/ModalComponent.jsx";
import { packageFormFields } from "./PackageFormFields.jsx";
import { PackagesColumns } from "./PackageColumns.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";

export const PackageLogic = () => {
  const { mutateCreate } = useCreatePackage();
  const { mutateUpdate } = useUpdatePackage();
  const { mutateDelete } = useDeletePackage();
  const [form] = Form.useForm();
  const [modalContext, setModalContext] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const {
    data: packagesData,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["allPackages"], queryFn: getAllPackages });

  const showModal = () => {
    setIsModalVisible(true);
    setModalContext("create");
  };

  const handleCancel = () => {
    setModalContext("");
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (modalContext === "edit") {
      console.log(values);
      await mutateUpdate({ ...values, product_id: selectedRecord.product_id });
    }
    if (modalContext === "create") {
      await mutateCreate(values);
    }
    form.resetFields();
    setModalContext("");
    setSelectedRecord(null);
    setIsModalVisible(false);
  };

  const handleEdit = (record) => {
    setModalContext("edit");
    form.setFieldsValue(record);
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (record) => {
    setModalContext("delete");
    await mutateDelete(record.product_id);
  };

  const cancel = () => {
    message?.error("Click on No");
  };

  if (isLoading) return <LoaderIconUtils />;
  if (isError) return <div>Error</div>;

  const columns = PackagesColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onCancel: cancel,
  });

  return (
    <>
      <Row justify={"end"} className={"overflow-hidden"}>
        <Button
          className={"bg-primary-700 mb-3"}
          type={"primary"}
          onClick={showModal}
        >
          Crear nueva membresía
        </Button>
      </Row>
      <ModalComponent
        form={form}
        formFields={packageFormFields}
        title={modalContext === "edit" ? "Editar Registro" : "Crear Registro"}
        onOk={handleSubmit}
        onOpen={isModalVisible}
        onClose={handleCancel}
      />
      <TablesComponent data={packagesData} columns={columns} />
    </>
  );
};
