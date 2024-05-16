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
import dayjs from "dayjs";

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
    if (record?.start_date && record?.end_date) {
      const startMoment = dayjs(record.start_date);
      const endMoment = dayjs(record.end_date);
      // Asegúrate de asignar correctamente los objetos moment a las propiedades correspondientes
      const recordWithMoment = {
        ...record,
        start_date: startMoment, // Aquí se debe asignar startMoment
        end_date: endMoment, // Aquí se debe asignar endMoment
      };
      // Usar el objeto actualizado para establecer los valores del formulario
      form.setFieldsValue(recordWithMoment);
    } else {
      // Si no hay fechas, establecer los valores del formulario directamente
      form.setFieldsValue(record);
    }
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

  if (isLoading) return <LoaderIconUtils isLoading={true} />;
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
