import { Tag } from "antd";

export const UsersInscribedColumns = [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    align: "center",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Nombre del Tutor 1",
    dataIndex: "tutors_name_one",
    key: "tutors_name_one",
    align: "center",
  },
  {
    title: "Nombre del Tutor 2",
    dataIndex: "tutors_name_two",
    key: "tutors_name_two",
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
    title: "Celular 1",
    dataIndex: "phone",
    key: "phone",
    align: "center",
  },
  {
    title: "Celular 2",
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
