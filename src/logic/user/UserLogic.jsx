import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUsers } from "../../api/UserService.jsx";
import { TablesComponent } from "../../components/TablesComponent.jsx";
import { getAllGroups } from "../../api/GroupService.jsx";
import { Button, Form, message } from "antd";
import { useState } from "react";
import {
  useChangeAvatarWithoutRegister,
  useCreateUser,
  useDeleteUser,
  useUpdateUser,
} from "./UserLogicMutations.jsx";
import { ModalComponent } from "../../components/ModalComponent.jsx";
import { userFormFields } from "./UserFormFields.jsx";
import { UserColumns } from "./UserColumns.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";

export const UserLogic = () => {
  const queryClient = useQueryClient();
  const { mutateCreate } = useCreateUser();
  const { mutateUpdate } = useUpdateUser();
  const { mutateDelete } = useDeleteUser();
  const [form] = Form.useForm();
  const [modalContext, setModalContext] = useState(""); // "create" o "edit"
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null); // Para guardar el registro seleccionado al editar
  // const [profileImage, setProfileImage] = useState(false);
  const {
    data: usersData,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["allUsers"], queryFn: getAllUsers });

  const { data: groupsData } = useQuery({
    queryKey: ["allGroups"],
    queryFn: getAllGroups,
  });

  const { mutateUpdateAvatar } = useChangeAvatarWithoutRegister();

  const enrichedUsersData = usersData?.map((user) => {
    // Encuentra todos los grupos que coincidan con los IDs en user.group_id
    const userGroups = groupsData?.filter((group) =>
      user.groups?.includes(group._id),
    );
    return { ...user, groups: userGroups }; // Añade el array de grupos al objeto de usuario
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
      console.log("VER SI CAMBIA", values);
      await mutateUpdate({ ...values, user_id: selectedRecord.user_id });
    }
    if (modalContext === "create") {
      console.log("SE CREA");
      console.log("VER SI CAMBIA", values);
      await mutateCreate(values);
    }
    form.resetFields();
    setModalContext("");
    setSelectedRecord(null);
    setIsModalVisible(false);
    await queryClient.invalidateQueries({ queryKey: ["couchList"] }); // Invalidar la consulta "allPackages"
  };

  const handleEdit = (record) => {
    setModalContext("edit");
    form.setFieldsValue(record);
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (record) => {
    setModalContext("delete");
    await mutateDelete(record.user_id);
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No").then((e) => e);
  };

  const handleImageLoaded = async (file, record) => {
    await handleChanceAvatar(file, record);
  };

  const handleChanceAvatar = async (file, record) => {
    try {
      console.log(selectedRecord);
      const data = {};
      const formData = new FormData();
      formData.append("file", file);
      data.username = record.username;
      data.file = formData;
      console.log("DATA", data);
      await mutateUpdateAvatar(data);
    } catch (error) {
      console.error("Error al guardar la imagen:", error);
    }
  };

  const columns = UserColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onCancel: cancel,
    handleImageLoaded: handleImageLoaded,
    setSelectedRecord,
  });

  if (isLoading) return <LoaderIconUtils />;
  if (isError) return <h1>Error...</h1>;

  return (
    <>
      <div className="flex justify-end mb-3">
        <Button
          className={"bg-primary-700 text-white hover:bg-primary-800"}
          title={"Registrar Usuario"}
          type={"primary"}
          onClick={showModal}
        >
          Registrar Usuario
        </Button>
      </div>
      <ModalComponent
        form={form}
        formFields={userFormFields}
        title={modalContext === "edit" ? "Editar Registro" : "Crear Registro"}
        onOk={handleSubmit}
        onOpen={isModalVisible}
        onClose={handleCancel}
      />
      <TablesComponent data={enrichedUsersData} columns={columns} />
    </>
  );
};
