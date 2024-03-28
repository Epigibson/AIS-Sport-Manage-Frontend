import { Tag, Typography } from "antd";

const { Text } = Typography;

export const debtorsColumns = [
  {
    title: "Matricula",
    dataIndex: "user",
    key: "user",
    align: "center",
    render: (user) =>
      user ? (
        <>
          <Tag color={"blue"} className={"mb-2"}>
            <Text>{user.tuition}</Text>
          </Tag>
        </>
      ) : (
        <span>Sin Usuario</span>
      ), // Ajusta "group_name" según tu modelo de datos
  },
  // {
  //   title: "Nombre",
  //   dataIndex: "name",
  //   key: "name",
  //   align: "center",
  //   ellipsis: true,
  //   render: (text) => (
  //     <Tooltip placement="topLeft" title={text}>
  //       <a>{text}</a>,{" "}
  //     </Tooltip>
  //   ),
  // },
  // {
  //   title: "Nombre del Tutor 1",
  //   dataIndex: "tutors_name_one",
  //   key: "tutors_name_one",
  //   align: "center",
  //   ellipsis: true,
  //   render: (text) => (
  //     <Tooltip placement="topLeft" title={text}>
  //       <a>{text}</a>,{" "}
  //     </Tooltip>
  //   ),
  // },
  // {
  //   title: "Nombre del Tutor 2",
  //   dataIndex: "tutors_name_two",
  //   key: "tutors_name_two",
  //   align: "center",
  //   ellipsis: true,
  //   render: (text) => (
  //     <Tooltip placement="topLeft" title={text}>
  //       <a>{text}</a>,{" "}
  //     </Tooltip>
  //   ),
  // },
  // {
  //   title: "Email",
  //   dataIndex: "email",
  //   key: "email",
  //   align: "center",
  //   ellipsis: true,
  //   render: (text) => (
  //     <Tooltip placement="topLeft" title={text}>
  //       <a>{text}</a>,{" "}
  //     </Tooltip>
  //   ),
  // },
  // {
  //   title: "Edad",
  //   dataIndex: "age",
  //   key: "age",
  //   align: "center",
  // },
  // {
  //   title: "Celular 1",
  //   dataIndex: "phone",
  //   key: "phone",
  //   align: "center",
  // },
  // {
  //   title: "Celular 2",
  //   dataIndex: "mobile",
  //   key: "mobile",
  //   align: "center",
  // },
  // {
  //   title: "Genero",
  //   dataIndex: "gender",
  //   key: "gender",
  //   align: "center",
  // },
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
        record.groups?.map((group) => (
          <Tag color="blue" key={group._id}>
            {group.name}
          </Tag>
        ))
      ) : (
        <span>No Group</span>
      ),
  },
];
