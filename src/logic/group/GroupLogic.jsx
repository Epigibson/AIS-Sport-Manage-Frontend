import { TablesComponent } from "../../components/TablesComponent.jsx";
import { useQuery } from "@tanstack/react-query";
import { getAllGroups } from "../../api/GroupService.jsx";
import { GroupColumns } from "./GroupColumns.jsx";
import { getAllCouches } from "../../api/UserService.jsx";
import { Button, Form, message } from "antd";
import { useState } from "react";
import {
  useCreateGroup,
  useDeleteGroup,
  useUpdateGroup,
} from "./GroupLogicMutations.jsx";
import { ModalComponent } from "../../components/ModalComponent.jsx";
import { groupFormFields } from "./GroupFormFields.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";

export const GroupLogic = () => {
  const { mutateCreate } = useCreateGroup();
  const { mutateUpdate } = useUpdateGroup();
  const { mutateDelete } = useDeleteGroup();
  const [form] = Form.useForm();
  const [modalContext, setModalContext] = useState(""); // "create" o "edit"
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null); // Para guardar el registro seleccionado al editar
  const {
    data: groupData,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["allGroups"], queryFn: getAllGroups });

  const { data: couchData } = useQuery({
    queryKey: ["couchList"],
    queryFn: getAllCouches,
  });

  const enrichedGroupsData = groupData?.map((group) => {
    const couch = couchData?.find((couch) => couch._id === group.group_couch); // Ajusta según la estructura de tus datos
    return { ...group, couch }; // Añade la información del grupo al objeto de usuario
  });

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
      console.log("SE EDITA");
      await mutateUpdate({ ...values, product_id: selectedRecord.product_id });
    }
    if (modalContext === "create") {
      console.log("SE CREA");
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
    setSelectedRecord(record);
    await mutateDelete(selectedRecord?.product_id);
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  if (isLoading) return <LoaderIconUtils />;
  if (isError) return <div>Error</div>;

  const columns = GroupColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onCancel: cancel,
  });

  return (
    <>
      <div className="flex justify-end mb-3">
        <Button
          className={"bg-primary-700 text-white hover:bg-primary-800"}
          title={"Crear nuevo paquete"}
          type={"primary"}
          onClick={showModal}
        >
          Crear nuevo grupo
        </Button>
      </div>
      <ModalComponent
        form={form}
        formFields={groupFormFields}
        title={modalContext === "edit" ? "Editar Registro" : "Crear Registro"}
        onOk={handleSubmit}
        onOpen={isModalVisible}
        onClose={handleCancel}
      />
      <TablesComponent data={enrichedGroupsData} columns={columns} />
    </>
  );
};
