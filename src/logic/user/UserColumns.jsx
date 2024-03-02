import { Button, Popconfirm, Space, Tag } from "antd";

export const UserColumns = ({ onEdit, onDelete, onCancel }) => [
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
    title: "Celular",
    dataIndex: "mobile",
    key: "mobile",
    align: "center",
  },
  {
    title: "Genero",
    dataIndex: "gender",
    key: "gender",
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
  {
    title: "Grupos",
    key: "group_id",
    dataIndex: "group_id",
    align: "center",
    render: (_, record) =>
      record.groups && record.groups.length > 0 ? (
        record.groups.map((group) => (
          <Tag color="blue" key={group._id}>
            {group.name}
          </Tag>
        ))
      ) : (
        <span>No Group</span>
      ),
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
