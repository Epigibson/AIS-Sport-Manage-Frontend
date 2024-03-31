import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TablesComponent } from "../../components/TablesComponent.jsx";
import { getAllGroups } from "../../api/GroupService.jsx";
import { Button, Form, Grid, message, Row } from "antd";
import { useState } from "react";
import {
  useChangeAvatar,
  useCreateAthlete,
  useDeleteAthlete,
  useUpdateAthlete,
} from "./AthleteLogicMutations.jsx";
import { ModalComponent } from "../../components/ModalComponent.jsx";
import { athleteFormFields } from "./AthleteFormFields.jsx";
import { AthleteColumns } from "./AthleteColumns.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";
import { useNavigate } from "react-router-dom";
import { getAllAthletes } from "../../api/AtheleService.jsx";
import { getAllUsers } from "../../api/UserService.jsx";

const { useBreakpoint } = Grid;

export const AthleteLogic = () => {
  const navigate = useNavigate();
  const screen = useBreakpoint();
  const queryClient = useQueryClient();
  const { mutateCreate } = useCreateAthlete();
  const { mutateUpdate } = useUpdateAthlete();
  const { mutateDelete } = useDeleteAthlete();
  const [form] = Form.useForm();
  const [modalContext, setModalContext] = useState(""); // "create" o "edit"
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null); // Para guardar el registro seleccionado al editar
  const {
    data: athletesData,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["allAthletes"], queryFn: getAllAthletes });

  const { data: groupsData } = useQuery({
    queryKey: ["allGroups"],
    queryFn: getAllGroups,
  });

  const { data: usersData } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  const { mutateUpdateAvatar } = useChangeAvatar();

  const enrichedUsersData = athletesData?.map((athlete) => {
    // Encuentra todos los grupos que coincidan con los IDs en athletes.group_id
    const athleteGroups = groupsData?.filter((group) =>
      athlete.groups?.includes(group._id),
    );
    const tutorsData = usersData?.filter((user) =>
      user.athletes.map((athlete) => athlete).includes(athlete._id)
        ? user
        : null,
    );
    return { ...athlete, groups: athleteGroups, tutors: tutorsData }; // Añade el array de grupos al objeto de usuario
  });

  console.log("enrichedUsersData", enrichedUsersData);

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
      console.log("VER QUE TRAE", selectedRecord);
      await mutateUpdate({ ...values, athlete_id: selectedRecord.athlete_id });
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
      data.athlete_id = record.athlete_id;
      data.file = formData;
      console.log("DATA", data);
      await mutateUpdateAvatar(data);
    } catch (error) {
      console.error("Error al guardar la imagen:", error);
    }
  };

  const columns = AthleteColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onCancel: cancel,
    handleImageLoaded: handleImageLoaded,
    setSelectedRecord,
    screen: screen,
    navigate,
  });

  if (isLoading) return <LoaderIconUtils />;
  if (isError) return <h1>Error...</h1>;

  return (
    <>
      <Row justify={"end"} className={"overflow-hidden"}>
        <Button
          className={"bg-primary-700 mb-3"}
          type={"primary"}
          // onClick={showModal}
          onClick={() => navigate("/inscripciones")}
        >
          Registrar Atleta
        </Button>
      </Row>
      <ModalComponent
        form={form}
        formFields={athleteFormFields}
        title={modalContext === "edit" ? "Editar Registro" : "Crear Registro"}
        onOk={handleSubmit}
        onOpen={isModalVisible}
        onClose={handleCancel}
      />
      <TablesComponent data={enrichedUsersData} columns={columns} />
    </>
  );
};
