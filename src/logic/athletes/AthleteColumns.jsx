import { Button, Popconfirm, Space, Tag, Typography } from "antd";
import { AvatarComponent } from "../../components/AvatarComponent.jsx";
import { EyeFilled } from "@ant-design/icons";

const { Text } = Typography;

export const AthleteColumns = ({
  onEdit,
  onDelete,
  onCancel,
  handleImageLoaded,
  navigate,
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
    width: 100,
    searchable: true, // Esta columna será buscable
    render: (_, record) => {
      if (record?.tuition) {
        return <Tag color={"cyan"}>{record?.tuition}</Tag>;
      } else {
        return <Tag color={"default"}>Sin Matricula</Tag>;
      }
    },
  },
  {
    title: "Nombre del Atleta",
    dataIndex: "name",
    key: "name",
    align: "center",
    width: 150,
    searchable: true, // Esta columna será buscable
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Nombre del Tutor",
    dataIndex: "tutors",
    key: "tutors",
    align: "center",
    width: 200,
    searchable: true, // Esta columna será buscable
    render: (_, record) =>
      record.tutors ? (
        record.tutors?.map((tutors) => (
          <div
            key={tutors?._id}
            className={"flex flex-col justify-center items-center gap-1"}
          >
            {/*<Button*/}
            {/*  onClick={() => navigate("/asignacion_de_grupos")}*/}
            {/*  icon={<EyeFilled />}*/}
            {/*  type="primary"*/}
            {/*  shape="circle"*/}
            {/*  size={"middle"}*/}
            {/*  title={"Editar"}*/}
            {/*  style={{ backgroundColor: "#fcba03" }}*/}
            {/*  key={group?._id}*/}
            {/*/>*/}
            <Tag color="blue" key={tutors?._id}>
              {tutors.tutors_name_one}
            </Tag>
          </div>
        ))
      ) : (
        <Tag>Sin Tutor</Tag>
      ),
  },
  // {
  //   title: "Nombre del Tutor 2",
  //   dataIndex: "tutors_name_two",
  //   key: "tutors_name_two",
  //   align: "center",
  //   width: 200,
  //   searchable: true, // Esta columna será buscable
  //   render: (text) => {
  //     if (text) {
  //       return <Tag color={"blue"}>{text}</Tag>;
  //     } else {
  //       return <Tag color={"default"}>Sin Tutor</Tag>;
  //     }
  //   },
  // },
  // {
  //   title: "Email de Contacto",
  //   dataIndex: "email",
  //   key: "email",
  //   align: "center",
  //   width: 200,
  //   searchable: true, // Esta columna será buscable
  // },
  // {
  //   title: "Edad",
  //   dataIndex: "age",
  //   key: "age",
  //   align: "center",
  //   width: 100,
  // },
  {
    title: "Celular",
    dataIndex: "phone",
    key: "phone",
    align: "center",
    width: 150,
    searchable: true, // Esta columna será buscable
    render: (_, record) =>
      record.tutors ? (
        record.tutors?.map((tutors) => (
          <div
            key={tutors?._id}
            className={"flex flex-col justify-center items-center gap-1"}
          >
            {/*<Button*/}
            {/*  onClick={() => navigate("/asignacion_de_grupos")}*/}
            {/*  icon={<EyeFilled />}*/}
            {/*  type="primary"*/}
            {/*  shape="circle"*/}
            {/*  size={"middle"}*/}
            {/*  title={"Editar"}*/}
            {/*  style={{ backgroundColor: "#fcba03" }}*/}
            {/*  key={group?._id}*/}
            {/*/>*/}
            <Text color="blue" key={tutors?._id}>
              {tutors.phone}
            </Text>
          </div>
        ))
      ) : (
        <Text>Sin Celular</Text>
      ),
  },
  // {
  //   title: "Celular 2",
  //   dataIndex: "phone",
  //   key: "phone",
  //   align: "center",
  //   width: 150,
  //   searchable: true, // Esta columna será buscable
  // },
  // {
  //   title: "Genero",
  //   dataIndex: "gender",
  //   key: "gender",
  //   align: "center",
  //   width: 100,
  // },
  {
    title: "Estatus",
    key: "status",
    dataIndex: "status",
    align: "center",
    width: 100,
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
    width: 200,
    render: (_, record) => (
      <Button
        className={"bg-primary-700"}
        onClick={() => navigate(`/asignacion_de_grupos/${record.athlete_id}`)} // Asegúrate de que `record.key` es el ID del usuario
        icon={<EyeFilled />}
        type="primary"
        shape="round"
        size={"middle"}
      >
        Administrar
      </Button>
    ),
    // record.groups && record.groups.length > 0 ? (
    //   record.groups?.map((group) => (
    //     <div
    //       key={group?._id}
    //       className={"flex flex-col justify-center items-center gap-1"}
    //     >
    //
    //       <Tag color="blue" key={group?._id}>
    //         {group.name}
    //       </Tag>
    //     </div>
    //   ))
    // ) : (
    //   <Tag>Sin Grupos</Tag>
    // ),
  },
  {
    title: "Acciones",
    key: "action",
    align: "center",
    width: 200,
    // fixed: screen.xs ? undefined : "right",
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
