import { Button, Popconfirm, Space, Tag } from "antd";

export const GroupColumns = ({ onEdit, onDelete, onCancel, onShowMembers }) => [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    align: "center",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Descripcion",
    dataIndex: "description",
    key: "description",
    align: "center",
  },
  // {
  //   title: "Couch",
  //   dataIndex: "couch",
  //   key: "couch",
  //   render: (_, record) =>
  //     record.couch ? (
  //       <Tag color={"blue"}>{record.couch.name}</Tag>
  //     ) : (
  //       <span>No Couch</span>
  //     ), // Ajusta "group_name" según tu modelo de datos
  // },
  {
    title: "Miembros",
    dataIndex: "members",
    key: "members",
    align: "center",
    render: (_, record) => {
      return (
        <Button
          type={"primary"}
          className={"bg-primary-700"}
          onClick={() => onShowMembers(record)}
        >
          Ver
        </Button>
      );
    },
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
  {
    title: "Capacidad",
    dataIndex: "capacity",
    key: "capacity",
    align: "center",
  },
  {
    title: "Horarios",
    dataIndex: "schedule",
    key: "schedule",
    align: "center",
  },
  {
    title: "Acciones",
    key: "action",
    align: "center",

    render: (_, record) => (
      <Space size="middle">
        <Button
          style={{ backgroundColor: "#fcba03" }}
          type="primary"
          onClick={() => onEdit(record)}
        >
          Editar
        </Button>
        <Popconfirm
          title="Eliminar grupo"
          description="Estas seguro de eliminar el registro?"
          onConfirm={() => onDelete(record)}
          onCancel={onCancel}
          okText="Si"
          cancelText="No"
          okType={"default"}
        >
          <Button type={"primary"} danger>
            Borrar
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
];
