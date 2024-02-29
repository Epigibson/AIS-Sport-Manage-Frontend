import { Button, Popconfirm, Space, Tag } from "antd";

export const UserColumns = ({ onEdit, onDelete, onCancel }) => [
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
  {
    title: "Acciones",
    key: "action",
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
