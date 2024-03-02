import { TablesComponent } from "../../components/TablesComponent.jsx";
import { Button, Form, message } from "antd";
import { useState } from "react";
import { CouchColumns } from "./CouchColumns.jsx";
import { ModalComponent } from "../../components/ModalComponent.jsx";
import { couchFormFields } from "./CouchFormFields.jsx";
import {
  useCreateCouch,
  useDeleteCouch,
  useUpdateCouch,
} from "./CouchLoginMutations.jsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllCouches } from "../../api/UserService.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";

export const CouchLogic = () => {
  const queryClient = useQueryClient();
  const { mutateCreate } = useCreateCouch();
  const { mutateUpdate } = useUpdateCouch();
  const { mutateDelete } = useDeleteCouch();
  const [form] = Form.useForm();
  const [modalContext, setModalContext] = useState(""); // "create" o "edit"
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null); // Para guardar el registro seleccionado al editar
  const {
    data: couchesData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["couchList"],
    queryFn: getAllCouches,
  });

  const groups = queryClient.getQueryData(["groups"]);

  const enrichedUsersData = couchesData?.map((user) => {
    // Encuentra todos los grupos que coincidan con los IDs en user.group_id
    const userGroups = groups?.filter((group) =>
      user.group_id.includes(group._id),
    );
    return { ...user, groups: userGroups }; // Añade el array de grupos al objeto de usuario
  });

  console.log("DATAAAA", enrichedUsersData);

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
    setSelectedRecord(record);
    await mutateDelete(selectedRecord?.user_id);
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No").then((r) => r);
  };

  const columns = CouchColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onCancel: cancel,
  });

  if (isLoading) return <LoaderIconUtils />;
  if (isError) return <div>Error: {error.message} </div>;

  return (
    <>
      <div className="flex justify-end mb-3">
        <Button
          className={"bg-primary-700 text-white hover:bg-primary-800"}
          title={"Registrar Couch"}
          type={"primary"}
          onClick={showModal}
        >
          Registrar Couch
        </Button>
      </div>
      <ModalComponent
        form={form}
        formFields={couchFormFields}
        title={modalContext === "edit" ? "Editar Registro" : "Crear Registro"}
        onOk={handleSubmit}
        onOpen={isModalVisible}
        onClose={handleCancel}
      />
      <TablesComponent data={enrichedUsersData} columns={columns} />
    </>
  );
};
