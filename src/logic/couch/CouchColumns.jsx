import { Button, Space, Tag } from "antd";

export const CouchColumns = [
  {
    title: "Nombre",
    dataIndex: "group_name",
    key: "group_name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Descripcion",
    dataIndex: "group_description",
    key: "group_description",
  },
  {
    title: "Couch",
    dataIndex: "couch",
    key: "couch",
    render: (couch) =>
      couch ? <Tag color={"blue"}>{couch.name}</Tag> : <span>No Couch</span>, // Ajusta "group_name" según tu modelo de datos
  },
  {
    title: "Miembros",
    dataIndex: "group_members",
    key: "group_members",
  },
  {
    title: "Estatus",
    key: "group_status",
    dataIndex: "group_status",
    render: (status) => {
      if (status) {
        return <Tag color={"green"}>Activo</Tag>;
      } else {
        return <Tag color={"volcano"}>Inactivo</Tag>;
      }
    },
  },
  {
    title: "Capacidad",
    dataIndex: "group_capacity",
    key: "group_capacity",
  },
  {
    title: "Horarios",
    dataIndex: "group_schedule",
    key: "group_schedule",
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
