import { Tag } from "antd";

export const MembersGroupsColumns = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    align: "center",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Tutor",
    dataIndex: "tutors_name",
    key: "tutors_name",
    align: "center",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: "center",
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
