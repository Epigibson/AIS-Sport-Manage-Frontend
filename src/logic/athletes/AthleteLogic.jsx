// noinspection UnresolvedVariable
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {TablesComponent} from "../../components/TablesComponent.jsx";
import {getAllGroups} from "../../api/GroupService.jsx";
import {Button, Form, Grid, message, Row} from "antd";
import {useEffect, useMemo, useState} from "react";
import {
  useChangeAthleteStatus,
  useChangeAvatar,
  useCreateAthlete,
  useDeleteAthlete,
  useUpdateAthlete,
} from "./AthleteLogicMutations.jsx";
import {ModalComponent} from "../../components/ModalComponent.jsx";
import {athleteFormFields} from "./AthleteFormFields.jsx";
import {AthleteColumns} from "./AthleteColumns.jsx";
import {LoaderIconUtils} from "../../utils/LoaderIconUtils.jsx";
import {useNavigate} from "react-router-dom";
import {getAllAthletes} from "../../api/AtheleService.jsx";
import {getAllUsers} from "../../api/UserService.jsx";
import {getAllPackages} from "../../api/ProductService.jsx";
import {useColumnSearchProps} from "../../utils/useColumnSearchProps.jsx";
import dayjs from "dayjs";

const { useBreakpoint } = Grid;

export const AthleteLogic = () => {
  const navigate = useNavigate();
  const screen = useBreakpoint();
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [modalContext, setModalContext] = useState(""); // "create" o "edit"
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null); // Para guardar el registro seleccionado al editar
  const [isLoadingEnrichedData, setIsLoadingEnrichedData] = useState(true);
  const {
    data: athletesData,
    isLoading: isAthletesLoading,
    isError: isAthletesError,
  } = useQuery({ queryKey: ["allAthletes"], queryFn: getAllAthletes });

  const { data: groupsData } = useQuery({
    queryKey: ["allGroups"],
    queryFn: getAllGroups,
  });

  const { data: usersData } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  const { data: packagesData } = useQuery({
    queryKey: ["allPackages"],
    queryFn: getAllPackages,
  });

  useEffect(() => {
    if (athletesData && groupsData && usersData && packagesData) {
      setIsLoadingEnrichedData(false);
    }
  }, [athletesData, groupsData, usersData, packagesData]);

  const enrichedUsersData = useMemo(() => {
    if (!athletesData || !groupsData || !usersData || !packagesData) {
      return [];
    }

    return athletesData.map((athlete) => {
      const athleteGroups = groupsData.filter((group) =>
        athlete.groups?.includes(group._id),
      );

      const tutorsData = usersData.filter((user) =>
        user.athletes.includes(athlete._id),
      );

      const packages = packagesData
        .filter((packageObject) =>
          athlete.products_which_inscribed?.some(
            (productInscribed) => productInscribed === packageObject._id,
          ),
        )
        .filter((packageObject) => packageObject.product_name !== "Inscripcion")
        .map((packageObject) => ({
          id: packageObject._id,
          name: packageObject.product_name,
        }));

      const firstTutor = tutorsData.length > 0 ? tutorsData[0] : null;

      return {
        ...athlete,
        groups: athleteGroups,
        tutors: tutorsData,
        tutors_name_one: firstTutor?.tutors_name_one,
        tutors_name_two: firstTutor?.tutors_name_two,
        email: firstTutor?.email,
        phone: firstTutor?.phone,
        mobile: firstTutor?.mobile,
        products_which_inscribed: packages,
      };
    });
  }, [athletesData, groupsData, usersData, packagesData]);

  const handleSearch = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["allAthletes"],
    });
  };

  const { mutateCreate } = useCreateAthlete(handleSearch);
  const { mutateUpdate } = useUpdateAthlete(handleSearch);
  const { mutateUpdateStatus } = useChangeAthleteStatus(handleSearch);
  const { mutateDelete } = useDeleteAthlete(handleSearch);
  const { mutateUpdateAvatar } = useChangeAvatar(handleSearch);

  const handleCancel = () => {
    setModalContext("");
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleCleanAfterCreateOrEdit = async () => {
    form.resetFields();
    setModalContext("");
    setSelectedRecord(null);
    setIsModalVisible(false);
  };

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (modalContext === "edit") {
      await mutateUpdate({ ...values, athlete_id: selectedRecord.athlete_id });
    }
    if (modalContext === "create") {
      await mutateCreate(values);
    }
    form.resetFields();
    await handleCleanAfterCreateOrEdit();
  };

  const handleEdit = (record) => {
    setModalContext("edit");
    record.start_date = dayjs(record.start_date);
    console.log("Campos", record);
    form.setFieldsValue(record);
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleChangeStatus = async (record) => {
    setModalContext("delete");
    await mutateUpdateStatus(record.athlete_id);
  };

  const handleDelete = async (record) => {
    setModalContext("delete");
    await mutateDelete(record.athlete_id);
  };

  const cancel = () => {
    message.error("Click on No").then((e) => e);
  };

  const handleImageLoaded = async (file, record) => {
    await handleChanceAvatar(file, record);
  };

  const handleChanceAvatar = async (file, record) => {
    try {
      // console.log(selectedRecord);
      const data = {};
      const formData = new FormData();
      formData.append("file", file);
      data.athlete_id = record.athlete_id;
      data.file = formData;
      // console.log("DATA", data);
      await mutateUpdateAvatar(data);
    } catch (error) {
      console.log("Error al guardar la imagen:", error);
    }
  };

  const nameSearchProps = useColumnSearchProps("name", "athlete", "Nombre");
  const phoneSearchProps = useColumnSearchProps("phone", "athlete", "Celular");
  const statusSearchProps = useColumnSearchProps(
    "status",
    "athlete",
    "Estatus",
  );
  const tuitionSearchProps = useColumnSearchProps(
    "tuition",
    "athlete",
    "Matricula",
  );

  const columns = AthleteColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onCancel: cancel,
    handleImageLoaded: handleImageLoaded,
    setSelectedRecord,
    screen: screen,
    navigate,
    nameSearchProps,
    phoneSearchProps,
    statusSearchProps,
    tuitionSearchProps,
    handleChangeStatus,
  });

  if (isAthletesLoading || isLoadingEnrichedData)
    return <LoaderIconUtils isLoading={true} />;
  if (isAthletesError) return <h1>Error...</h1>;

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
