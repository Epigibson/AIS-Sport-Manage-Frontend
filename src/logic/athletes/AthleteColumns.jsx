import { Button, Popconfirm, Space, Tag, Typography } from "antd";
import { AvatarComponent } from "../../components/AvatarComponent.jsx";
import { EyeFilled } from "@ant-design/icons";

const { Text } = Typography;

export const AthleteColumns = ({
  onEdit,
  handleChangeStatus,
  onCancel,
  handleImageLoaded,
  navigate,
  filters,
  nameSearchProps,
  phoneSearchProps,
  tuitionSearchProps,
  tutorSearchProps,
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
    title: "Matricula",
    dataIndex: "tuition",
    key: "tuition",
    align: "center",
    width: 100,
    ...tuitionSearchProps,
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
    ...nameSearchProps,
    render: (_, record) => <a>{record.name}</a>,
  },
  {
    title: "Nombre del Tutor",
    dataIndex: "tutors",
    key: "tutors",
    align: "center",
    width: 200,
    ...tutorSearchProps,
    render: (_, record) =>
      record.tutors ? (
        record.tutors?.map((tutors) => (
          <div
            key={tutors?._id}
            className={"flex flex-col justify-center items-center gap-1"}
          >
            <Tag color="blue" key={tutors?._id}>
              {tutors.tutors_name_one}
            </Tag>
          </div>
        ))
      ) : (
        <Tag>Sin Tutor</Tag>
      ),
  },
  {
    title: "Celular",
    dataIndex: "phone",
    key: "phone",
    align: "center",
    width: 150,
    ...phoneSearchProps,
    render: (phone) =>
      phone ? (
        <Text color="blue" key={phone}>
          {phone}
        </Text>
      ) : (
        <Text>Sin Celular</Text>
      ),
  },
  {
    title: "Estatus",
    key: "status",
    dataIndex: "status",
    align: "center",
    width: 100,
    filters: [
      { text: "Activo", value: true },
      { text: "Inactivo", value: false },
    ],
    onFilter: (value, record) => record.status === value,
    render: (status) => {
      if (status) {
        return <Tag color={"green"}>Activo</Tag>;
      } else {
        return <Tag color={"volcano"}>Inactivo</Tag>;
      }
    },
  },
  {
    title: "Membresías",
    key: "products_which_inscribed",
    dataIndex: "products_which_inscribed",
    align: "center",
    width: 200,
    filters: filters.products_which_inscribed,
    filterSearch: true,
    onFilter: (value, record) =>
      record.products_which_inscribed.some((product) =>
        product.name.includes(value),
      ),
    render: (products_which_inscribed) =>
      products_which_inscribed && products_which_inscribed.length > 0 ? (
        products_which_inscribed.map((product) => (
          <Tag key={product.id} color={"cyan"}>
            {product.name}
          </Tag>
        ))
      ) : (
        <Tag color={"volcano"}>Sin Paquete</Tag>
      ),
  },
  {
    title: "Fecha de Inicio",
    dataIndex: "start_date",
    key: "start_date",
    align: "center",
    width: 100,
    render: (start_date) => {
      if (start_date) {
        const date = new Date(start_date);
        const formattedDate = [
          `0${date.getDate()}`.slice(-2),
          `0${date.getMonth() + 1}`.slice(-2),
          date.getFullYear(),
        ].join("/");
        return <Tag color={"blue"}>{formattedDate}</Tag>;
      } else {
        return <Tag>Sin especificar</Tag>;
      }
    },
  },
  {
    title: "Administrar",
    key: "groups",
    dataIndex: "groups",
    align: "center",
    width: 200,
    render: (_, record) => (
      <Button
        className={"bg-primary-700"}
        onClick={() => navigate(`/atleta/${record.athlete_id}`)}
        icon={<EyeFilled />}
        type="primary"
        shape="round"
        size={"middle"}
      >
        Administrar
      </Button>
    ),
  },
  {
    title: "Acciones",
    key: "action",
    align: "center",
    width: 200,
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
          title={record.status ? "Inactivar atleta" : "Activar Atleta"}
          description={
            record.status
              ? "Estas seguro de inactivar al atleta?"
              : "Estas seguro de activar al atleta?"
          }
          onConfirm={() => handleChangeStatus(record)}
          onCancel={onCancel}
          okText="Si"
          cancelText="No"
          okType={"primary"}
        >
          <Button
            size={"middle"}
            type={"primary"}
            className={record.status ? "bg-red-500" : "bg-primary-700"}
            danger={!!record.status}
          >
            {record.status ? "Inactivar" : "Activar"}
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
];
