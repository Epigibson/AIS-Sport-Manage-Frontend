import { Tag } from "antd";

export const MovementsColumns = ({
  typeSearchProps,
  actionSearchProps,
  moduleSearchProps,
  responsibleNameSearchProps,
  modelFieldHelperSearchProps,
}) => [
  {
    title: "Tipo",
    dataIndex: "type",
    key: "type",
    align: "center",
    ...typeSearchProps,
    render: (_, record) => <Tag color={"blue"}>{record.type}</Tag>,
  },
  {
    title: "Accion",
    dataIndex: "action",
    key: "action",
    align: "center",
    ...actionSearchProps,
    render: (_, record) => (
      <Tag color="cyan">{record.action.toUpperCase()}</Tag>
    ),
  },
  {
    title: "Modulo",
    dataIndex: "module",
    key: "module",
    align: "center",
    ...moduleSearchProps,
    render: (_, record) => (
      <Tag color="magenta">{record.module.toUpperCase()}</Tag>
    ),
  },
  {
    title: "Responsable",
    dataIndex: "responsible_name",
    key: "responsible_name",
    align: "center",
    ...responsibleNameSearchProps,
    render: (_, record) => <Tag color="orange">{record.responsible_name}</Tag>,
  },
  {
    title: "Referencia",
    dataIndex: "model_field_helper",
    key: "model_field_helper",
    align: "center",
    ...modelFieldHelperSearchProps,
    render: (_, record) => (
      <Tag color="geekblue">{record.model_field_helper}</Tag>
    ),
  },
  {
    title: "Fecha y Hora del Movimiento",
    dataIndex: "created_at",
    key: "created_at",
    align: "center",
    render: (created_at) => {
      const date = new Date(created_at);
      const formattedDate = [
        `0${date.getDate()}`.slice(-2),
        `0${date.getMonth() + 1}`.slice(-2),
        date.getFullYear(),
      ].join("/");
      const formattedTime = [
        `0${date.getHours()}`.slice(-2),
        `0${date.getMinutes()}`.slice(-2),
      ].join(":");
      return (
        <Tag
          color={"green"}
        >{`Fecha: ${formattedDate} - Hora: ${formattedTime}`}</Tag>
      );
    },
  },
];
