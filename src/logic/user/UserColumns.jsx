import { Button, Popconfirm, Space, Tag } from "antd";
import { AvatarComponent } from "../../components/AvatarComponent.jsx";

export const UserColumns = ({
  onEdit,
  onDelete,
  onCancel,
  handleImageLoaded,
  screen,
}) => [
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
    align: "center",
    inputType: "avatar",
    render: (_, record) => {
      if (record) {
        // console.log("SOLO VER", record.avatar);
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
    title: "Matricula",
    dataIndex: "tuition",
    key: "tuition",
    align: "center",
    searchable: true, // Esta columna será buscable
    render: (text) => {
      if (text) {
        return <Tag color={"cyan"}>{text}</Tag>;
      } else {
        return <Tag color={"default"}>Sin Matricula</Tag>;
      }
    },
  },
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    align: "center",
    searchable: true, // Esta columna será buscable
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Tutor",
    dataIndex: "tutors_name",
    key: "tutors_name",
    align: "center",
    searchable: true, // Esta columna será buscable
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: "center",
    searchable: true, // Esta columna será buscable
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
    searchable: true, // Esta columna será buscable
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
    key: "groups",
    dataIndex: "groups",
    align: "center",
    render: (_, record) =>
      record.groups && record.groups.length > 0 ? (
        record.groups?.map((group) => (
          <Tag color="blue" key={group?._id}>
            {group.name}
          </Tag>
        ))
      ) : (
        <Tag color={"default"} key={record?._id}>
          No Group
        </Tag>
      ),
  },
  {
    title: "Acciones",
    key: "action",
    align: "center",
    width: 200,
    fixed: screen.xs ? undefined : "right",
    render: (_, record) => (
      <Space>
        <Button
          size={"middle"}
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
          <Button size={"middle"} type={"primary"} danger>
            Borrar
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
];
