import { TablesComponent } from "../../components/TablesComponent.jsx";
import { useQuery } from "@tanstack/react-query";
import { getAllGroups } from "../../api/GroupService.jsx";
import { GroupColumns } from "./GroupColumns.jsx";
import { getAllCouches } from "../../api/UserService.jsx";
import { Button, Form, message, Row } from "antd";
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
import moment from "moment";
import { groupMemberFields } from "./GroupMemberFields.jsx";
import { getAllAthletes } from "../../api/AtheleService.jsx";

export const GroupLogic = () => {
  const { mutateCreate } = useCreateGroup();
  const { mutateUpdate } = useUpdateGroup();
  const { mutateDelete } = useDeleteGroup();
  const [form] = Form.useForm();
  const [formAddUsers] = Form.useForm();
  const [modalContext, setModalContext] = useState(""); // "create" o "edit"
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalMembersVisible, setIsModalMembersVisible] = useState(false);
  const [isModalGroupAssignVisible, setIsModalGroupAssignVisible] =
    useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null); // Para guardar el registro seleccionado al editar
  const [selectedGroup, setSelectedGroup] = useState(null); // Para guardar el registro seleccionado al editar
  const {
    data: groupData,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["allGroups"], queryFn: getAllGroups });

  const { data: couchData } = useQuery({
    queryKey: ["couchList"],
    queryFn: getAllCouches,
  });

  const { data: athletesData } = useQuery({
    queryKey: ["allAthletes"],
    queryFn: getAllAthletes,
  });

  const enrichedGroupsData = groupData?.map((group) => {
    const couch = couchData?.find((couch) => couch._id === group.couch); // Ajusta según la estructura de tus datos
    return { ...group, couch }; // Añade la información del grupo al objeto de usuario
  });

  const enrichedGroupsMembersData = (membersIds) => {
    return athletesData
      ?.filter((athlete) => membersIds.includes(athlete._id))
      .map((athlete) => ({
        key: athlete._id,
        name: athlete.name,
        tuition: athlete.tuition,
        age: athlete.age,
        status: athlete.status,
        // Otros campos que quieras mostrar
      }));
  };

  // console.log("GRUPOS Miembros", enrichedGroupsMembersData);

  const showModalMembers = (value) => {
    const data = enrichedGroupsMembersData(value.members);
    // console.log("DATA PROCESADA", data);
    setSelectedRecord(data);
    setSelectedGroup(value);
    setIsModalMembersVisible(true);
  };
  const handleCancelMembers = () => {
    setSelectedRecord(null);
    setIsModalMembersVisible(false);
  };

  const showModalAssignGroup = (record) => {
    // console.log("RECORD", record);
    setModalContext("addUser");
    setIsModalGroupAssignVisible(true);
    setIsModalMembersVisible(false);
    formAddUsers.setFieldsValue({
      members: record.map(
        (item) => `${item.tuition} : ${item.name}`,
        // Mapea aquí cualquier otro campo que necesites
      ),
    }); // Ajusta esto según tu estructura de datos
  };

  const handleCancelGroupAssign = () => {
    setSelectedRecord(null);
    setIsModalGroupAssignVisible(false);
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
    let values = null;
    // console.log("Modales", modalContext);
    if (modalContext === "edit" || modalContext === "create") {
      values = await form.validateFields();
    } else if (modalContext === "addUser") {
      values = await formAddUsers.validateFields();
    }
    // Verifica si `schedule` está presente y es válido antes de convertir
    if (values?.schedule && values?.schedule[0] && values?.schedule[1]) {
      const [start, end] = values.schedule;
      values.schedule = [
        start.toISOString(), // Convertir de Moment.js a string ISO
        end.toISOString(),
      ];
    } else {
      // Maneja el caso donde `schedule` no esté definido o incompleto
      delete values?.schedule; // O establece un valor predeterminado si es necesario
    }

    // Ahora `values.schedule` está listo para ser enviado
    // console.log(values);

    if (modalContext === "addUser") {
      // console.log("SE AGREGA USER A GRUPO");
      // console.log("Datos", selectedRecord);
      await mutateUpdate({
        ...values,
        group_id: selectedGroup.group_id,
      });
    }

    if (modalContext === "edit") {
      // console.log("SE EDITA");
      await mutateUpdate({ ...values, group_id: selectedRecord.group_id });
    }
    if (modalContext === "create") {
      // console.log("SE CREA");
      await mutateCreate(values);
    }
    form.resetFields();
    formAddUsers.resetFields();
    setModalContext("");
    setIsModalGroupAssignVisible(false);
    setIsModalVisible(false);
    setSelectedRecord(null);
    setSelectedGroup(null);
  };

  const handleEdit = (record) => {
    setModalContext("edit");
    record.couch = record.couch?._id;
    // Convertir fechas ISO a objetos de Moment.js antes de establecer los valores
    if (record.schedule && record.schedule.length === 2) {
      const startISO = record.schedule[0];
      const endISO = record.schedule[1];
      const startMoment = moment(startISO);
      const endMoment = moment(endISO);

      // Prepara el registro con los valores convertidos para el RangePicker
      const recordWithMoment = {
        ...record,
        schedule: [startMoment, endMoment], // Asegúrate de que 'schedule' en tu formulario espera un arreglo
      };
      console.log("VALORES", record);
      form.setFieldsValue(recordWithMoment);
    } else {
      console.log("VALORES", record);
      form.setFieldsValue(record);
    }
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (record) => {
    // console.log("PARA ELIMINAR", record);
    setModalContext("delete");
    setSelectedRecord(record);
    await mutateDelete(selectedRecord?.group_id);
  };

  const cancel = () => {
    // console.log(e);
    message.error("Click on No").then((e) => e);
  };

  const columns = GroupColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onCancel: cancel,
    onShowMembers: showModalMembers,
  });

  if (isLoading) return <LoaderIconUtils isLoading={true} />;
  if (isError) return <div>Error</div>;

  return (
    <>
      <Row justify={"end"} className={"overflow-hidden"}>
        <Button
          className={"bg-primary-700 mb-3"}
          type={"primary"}
          onClick={showModal}
        >
          Crear nuevo grupo
        </Button>
      </Row>

      <ModalComponent
        form={formAddUsers}
        formFields={groupMemberFields}
        title={"Adicionar Miembros al Grupo"}
        onOpen={isModalGroupAssignVisible}
        onClose={handleCancelGroupAssign}
        onOk={handleSubmit}
      />
      <ModalComponent
        dataTable={selectedRecord}
        dataTableColumns={MembersGroupsColumns}
        title={"Miembros"}
        onOpen={isModalMembersVisible}
        onClose={handleCancelMembers}
        buttonModal={showModalAssignGroup}
        textButtonModal={"Asignar Usuario a un Grupo"}
        external={false}
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
