import { useQuery } from "@tanstack/react-query";
import { getAthleteByUuid } from "../../api/AtheleService.jsx";
import error from "eslint-plugin-react/lib/util/error.js";
import { useParams } from "react-router-dom";
import { Button, Card, Form, Image, Row } from "antd";
import { GroupsFromAthletesColumns } from "./GroupsFromAthletesColumns.jsx";
import { getAllGroups } from "../../api/GroupService.jsx";
import { TablesComponent } from "../../components/TablesComponent.jsx";
import { ModalComponent } from "../../components/ModalComponent.jsx";
import { AthleteGroupAssignFields } from "./AthleteGroupAssignFields.jsx";
import { useState } from "react";
import {
  GroupAssignMutations,
  GroupRemoveMutations,
} from "./GroupAssignMutations.jsx";
import { getAllCouches } from "../../api/UserService.jsx";

export const GroupAssignLogic = () => {
  const { athleteId } = useParams();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { mutateCreate } = GroupAssignMutations();
  const { mutateRemove } = GroupRemoveMutations();

  const {
    data: currentAthlete,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["currentAthlete", athleteId],
    queryFn: () => getAthleteByUuid(athleteId),
    enabled: !!athleteId,
  });

  const { data: groupData } = useQuery({
    queryKey: ["allGroups"],
    queryFn: getAllGroups,
  });

  const { data: couchesData } = useQuery({
    queryKey: ["couchList"],
    queryFn: getAllCouches,
  });

  const enrichedGroupData = groupData
    ?.filter((group) => currentAthlete?.groups.includes(group._id))
    .map((group) => {
      // Encuentra el entrenador (couch) para este grupo
      const couch = couchesData?.find((c) => c._id === group.couch);

      // Retorna un nuevo objeto con toda la información del grupo
      // y añade la información del entrenador
      return {
        ...group,
        key: group._id, // Asegúrate de que usas el identificador correcto aquí
        name: group.name,
        description: group.description,
        status: group.status,
        couch: couch ? `${couch.name}` : "No asignado", // Ejemplo de cómo podrías combinar el nombre y la especialidad del entrenador
      };
    });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  const handleSubmit = async () => {
    const values = await form.validateFields();
    values.users = [currentAthlete._id];
    // console.log("Grupo Seleccionado", values);
    await mutateCreate(values);
    form.resetFields();
    setIsModalVisible(false);
    await refetch();
  };

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleDelete = async (record) => {
    const values = {
      group_id: record._id,
      user_id: currentAthlete._id,
    };
    // console.log("Eliminar del grupo", values);
    await mutateRemove(values);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = GroupsFromAthletesColumns({
    onDelete: handleDelete,
    onCancel: handleCancel,
  });

  return (
    <Card loading={isLoading}>
      <Image
        className={"rounded-full"}
        src={currentAthlete?.avatar}
        width={100}
      ></Image>
      <h1 className={"text-center text-lg font-bold"}>
        {currentAthlete?.name}
      </h1>
      <Row justify={"end"} className={"overflow-hidden"}>
        <Button
          className={"bg-primary-700 mb-3"}
          type={"primary"}
          // onClick={showModal}
          onClick={handleShowModal}
        >
          Asignar a un Grupo
        </Button>
      </Row>
      <ModalComponent
        form={form}
        formFields={AthleteGroupAssignFields}
        onOk={handleSubmit}
        onOpen={isModalVisible}
        onClose={handleCancel}
      />
      <TablesComponent data={enrichedGroupData} columns={columns} />
    </Card>
  );
};
