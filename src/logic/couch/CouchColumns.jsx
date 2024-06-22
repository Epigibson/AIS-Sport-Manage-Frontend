import { Button, Popconfirm, Space, Tag } from "antd";
import { AvatarComponent } from "../../components/AvatarComponent.jsx";

export const CouchColumns = ({
  onEdit,
  onDelete,
  onCancel,
  handleImageLoaded,
}) => [
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
    align: "center",
    inputType: "avatar",
    width: 150,
    render: (_, record) => {
      if (record) {
        return (
          <AvatarComponent
            onImageLoaded={(file) => handleImageLoaded(file, record)}
            existingImageUrl={record.avatar}
          />
        );
      } else {
        return <AvatarComponent />;
      }
    },
  },
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    align: "center",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Usuario",
    dataIndex: "username",
    key: "username",
    align: "center",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: "center",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Genero",
    dataIndex: "gender",
    key: "gender",
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
  {
    title: "Grupos",
    key: "groups",
    dataIndex: "groups",
    align: "center",
    render: (_, record) => {
      if (record.groups && record.groups.length > 0) {
        return record.groups?.map((group) => (
          <Tag color="blue" key={group._id}>
            {group.name}
          </Tag>
        ));
      } else {
        return <span>No Group</span>;
      }
    },
  },
  {
    title: "Acciones",
    key: "action",
    align: "center",
    width: 200,
    render: (_, record) => (
      <Space direction={"horizontal"} align={"center"}>
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
