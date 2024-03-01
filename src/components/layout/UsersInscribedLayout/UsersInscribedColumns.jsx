import { Tag } from "antd";

export const UsersInscribedColumns = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Tutor",
    dataIndex: "tutors_name",
    key: "tutors_name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Edad",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Celular",
    dataIndex: "mobile",
    key: "mobile",
  },
  {
    title: "Genero",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Estatus",
    key: "status",
    dataIndex: "status",
    render: (status) => {
      if (status) {
        return <Tag color={"green"}>Activo</Tag>;
      } else {
        return <Tag color={"volcano"}>Inactivo</Tag>;
      }
    },
  },
  {
    title: "Grupo",
    key: "group",
    dataIndex: "group",
    render: (group) =>
      group ? <Tag color={"blue"}>{group.name}</Tag> : <span>No Group</span>, // Ajusta "group_name" según tu modelo de datos
  },
];
