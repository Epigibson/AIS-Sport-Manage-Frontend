import { Tag } from "antd";

export const MembersGroupsColumns = [
  {
    title: "Matricula",
    dataIndex: "tuition",
    key: "tuition",
    align: "center",
    render: (text) => <Tag color={"green"}>{text}</Tag>,
  },
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    align: "center",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Edad",
    dataIndex: "age",
    key: "age",
    align: "center",
  },
  {
    title: "Estatus",
    key: "status",
    dataIndex: "status",
    align: "center",
    render: (status) => {
      if (status) {
        return <Tag color={"green"}>Activo</Tag>;
      } else {
        return <Tag color={"volcano"}>Inactivo</Tag>;
      }
    },
  },
];
