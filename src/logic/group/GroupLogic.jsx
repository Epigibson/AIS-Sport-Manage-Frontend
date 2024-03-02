import { TablesComponent } from "../../components/TablesComponent.jsx";
import { useQuery } from "@tanstack/react-query";
import { getAllGroups } from "../../api/GroupService.jsx";
import { GroupColumns } from "./GroupColumns.jsx";
import { getAllCouches, getAllUsers } from "../../api/UserService.jsx";
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
import { MembersGroupsColumns } from "./MembersGroupsColumns.jsx";

export const GroupLogic = () => {
  const { mutateCreate } = useCreateGroup();
  const { mutateUpdate } = useUpdateGroup();
  const { mutateDelete } = useDeleteGroup();
  const [form] = Form.useForm();
  const [modalContext, setModalContext] = useState(""); // "create" o "edit"
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalMembersVisible, setIsModalMembersVisible] = useState(false);
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

  const { data: usersData } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  const enrichedGroupsData = groupData?.map((group) => {
    const couch = couchData?.find((couch) => couch._id === group.couch); // Ajusta según la estructura de tus datos
    return { ...group, couch }; // Añade la información del grupo al objeto de usuario
  });

  const enrichedGroupsMembersData = (membersIds) => {
    return usersData
      ?.filter((user) => membersIds.includes(user._id))
      .map((user) => ({
        key: user._id,
        name: user.name,
        email: user.email,
        age: user.age,
        status: user.status,
        tutors_name: user.tutors_name,
        // Otros campos que quieras mostrar
      }));
  };

  // console.log("GRUPOS Miembros", enrichedGroupsMembersData);

  const showModalMembers = (value) => {
    const data = enrichedGroupsMembersData(value.members);
    console.log("DATA PROCESADA", data);
    setSelectedRecord(data);
    setIsModalMembersVisible(true);
  };
  const handleCancelMembers = () => {
    setSelectedRecord(null);
    setIsModalMembersVisible(false);
  };

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
      await mutateUpdate({ ...values, group_id: selectedRecord.group_id });
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
    message.error("Click on No").then((e) => e);
  };

  if (isLoading) return <LoaderIconUtils />;
  if (isError) return <div>Error</div>;

  const columns = GroupColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onCancel: cancel,
    onShowMembers: showModalMembers,
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
        dataTable={selectedRecord}
        dataTableColumns={MembersGroupsColumns}
        title={"Miembros"}
        onOpen={isModalMembersVisible}
        onClose={handleCancelMembers}
      />
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
