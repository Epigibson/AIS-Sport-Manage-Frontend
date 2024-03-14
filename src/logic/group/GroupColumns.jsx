import { Button, DatePicker, Popconfirm, Space, Tag } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;

const onChange = (time, timeString) => {
  console.log(time, timeString);
};

export const GroupColumns = ({
  onEdit,
  onDelete,
  onCancel,
  onShowMembers,
  screen,
}) => [
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
    render: (schedule) => {
      // Asume que `schedule` es un array con dos elementos: inicio y fin.
      if (schedule && schedule.length === 2) {
        const startTime = moment(schedule[0]).format("HH:mm a");
        const endTime = moment(schedule[1]).format("HH:mm a");
        return `${startTime} - ${endTime}`;
      }
      return "No definido"; // Manejo para cuando no hay horarios definidos o el formato es incorrecto
    },
  },
  {
    title: "Dias",
    dataIndex: "schedule_initial_final",
    key: "schedule_initial_final",
    align: "center",
    render: (schedule_initial_final) => {
      if (schedule_initial_final) {
        return schedule_initial_final.map((day) => (
          <Tag color={"blue"} key={day} className={"m-0 text-xs "}>
            {day}
          </Tag>
        ));
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
