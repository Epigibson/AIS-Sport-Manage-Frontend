import { Button, Space, Tag } from "antd";

export const UserColumns = [
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
      group ? (
        <Tag color={"blue"}>{group.group_name}</Tag>
      ) : (
        <span>No Group</span>
      ), // Ajusta "group_name" según tu modelo de datos
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <Button className="bg-amber-500 text-white">Edit</Button>
        <Button type={"primary"} danger>
          Delete
        </Button>
      </Space>
    ),
  },
];
