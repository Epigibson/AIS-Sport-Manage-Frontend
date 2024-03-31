import { Button, Popconfirm, Space, Tag, Tooltip } from "antd";
import moment from "moment";

export const GroupsFromAthletesColumns = ({ onDelete, onCancel }) => [
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
    ellipsis: true,
    render: (description) => (
      <Tooltip placement="topLeft" title={description}>
        {description}
      </Tooltip>
    ),
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
    ellipsis: true,
    render: (schedule_initial_final) => {
      if (schedule_initial_final) {
        // Convertir el array de días a un string para el Tooltip
        const daysString = schedule_initial_final.join(", ");

        // Retornar las etiquetas (tags) y el Tooltip
        return (
          <Tooltip placement="topLeft" title={daysString}>
            <div
              style={{
                overflowX: "auto",
                whiteSpace: "nowrap",
                paddingBottom: "1px",
              }}
            >
              <div style={{ paddingBottom: "-20px" }}>
                {schedule_initial_final.map((day) => (
                  <Tag
                    color="blue"
                    key={day}
                    className="mr-2 text-xs"
                    style={{ display: "inline-block" }}
                  >
                    {day}
                  </Tag>
                ))}
              </div>
            </div>
          </Tooltip>
        );
      }
      return null;
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
