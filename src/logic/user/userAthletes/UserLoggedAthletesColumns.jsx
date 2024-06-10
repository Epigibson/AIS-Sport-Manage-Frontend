import { AvatarComponent } from "../../../components/AvatarComponent.jsx";
import { Tag, Typography } from "antd";

const { Text } = Typography;

export const UserLoggedAthletesColumns = [
  {
    title: "Avatar",
    dataIndex: "avatar",
    key: "avatar",
    align: "center",
    inputType: "avatar",
    width: 150,
    render: (_, record) => {
      if (record) {
        return <AvatarComponent existingImageUrl={record.avatar} />;
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
    render: (_, record) => <a>{record.name}</a>,
  },
  {
    title: "Nombre del Tutor",
    dataIndex: "tutors",
    key: "tutors",
    align: "center",
    width: 200,
    render: (_, record) =>
      record.tutors_name_one || record.tutors_name_two ? (
        <div
          key={record._id}
          className={"flex flex-col justify-center items-center gap-1"}
        >
          <Tag color="blue" key={record.tutors?._id}>
            {record.tutors_name_one || record.tutors_name_two}
          </Tag>
        </div>
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
        return <Tag color={"blue"}>{start_date}</Tag>;
      } else {
        return <Tag>Sin especificar</Tag>;
      }
    },
  },
  // {
  //     title: "Administrar",
  //     key: "groups",
  //     dataIndex: "groups",
  //     align: "center",
  //     width: 200,
  //     render: (_, record) => (
  //         <Button
  //             className={"bg-primary-700"}
  //             onClick={() => navigate(`/atleta/${record.athlete_id}`)} // Asegúrate de que `record.key` es el ID del usuario
  //             icon={<EyeFilled />}
  //             type="primary"
  //             shape="round"
  //             size={"middle"}
  //         >
  //             Administrar
  //         </Button>
  //     ),
  // },
  // {
  //     title: "Acciones",
  //     key: "action",
  //     align: "center",
  //     width: 200,
  //     // fixed: screen.xs ? undefined : "right",
  //     render: (_, record) => (
  //         <Space>
  //             <Button
  //                 size={"middle"}
  //                 style={{ backgroundColor: "#fcba03" }}
  //                 type="primary"
  //                 onClick={() => onEdit(record)}
  //             >
  //                 Editar
  //             </Button>
  //             <Popconfirm
  //                 title={record.status ? "Inactivar atleta" : "Activar Atleta"}
  //                 description={
  //                     record.status
  //                         ? "Estas seguro de inactivar al atleta?"
  //                         : "Estas seguro de activar al atleta?"
  //                 }
  //                 onConfirm={() => handleChangeStatus(record)}
  //                 onCancel={onCancel}
  //                 okText="Si"
  //                 cancelText="No"
  //                 okType={"primary"}
  //             >
  //                 <Button
  //                     size={"middle"}
  //                     type={"primary"}
  //                     className={record.status ? "bg-red-500" : "bg-primary-700"}
  //                     danger={!!record.status}
  //                 >
  //                     {record.status ? "Inactivar" : "Activar"}
  //                 </Button>
  //             </Popconfirm>
  //         </Space>
  //     ),
  // },
];
