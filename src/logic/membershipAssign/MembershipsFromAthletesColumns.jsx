import { Button, Popconfirm, Space, Tag } from "antd";

export const MembershipsFromAthletesColumns = ({ onDelete, onCancel }) => [
  {
    title: "Nombre",
    dataIndex: "product_name",
    key: "product_name",
    align: "center",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Descripcion",
    dataIndex: "product_description",
    key: "product_description",
    align: "center",
  },
  {
    title: "Estatus",
    key: "is_active",
    dataIndex: "is_active",
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
    title: "De Temporada",
    key: "is_temporary",
    dataIndex: "is_temporary",
    align: "center",
    render: (is_temporary) => {
      if (is_temporary === true) {
        return <Tag color={"green"}>Si</Tag>;
      } else {
        return <Tag color={"orange"}>No</Tag>;
      }
    },
  },
  {
    title: "Semanas de Duración",
    key: "week_duration",
    dataIndex: "week_duration",
    align: "center",
    render: (week_duration, record) => {
      if (week_duration && record.is_temporary) {
        return <Tag color={"blue"}>{week_duration} Semanas</Tag>;
      } else {
        return <Tag>No Aplica</Tag>;
      }
    },
  },
  {
    title: "Fecha de Inicio",
    key: "start_date",
    dataIndex: "start_date",
    align: "center",
    render: (start_date, record) => {
      if (start_date && record.is_temporary) {
        const date = new Date(start_date);
        const formattedDate = [
          `0${date.getDate()}`.slice(-2), // Añade un cero al inicio y luego obtiene los últimos dos dígitos
          `0${date.getMonth() + 1}`.slice(-2), // Añade un cero al inicio y luego obtiene los últimos dos dígitos, +1 porque getMonth() retorna de 0 a 11
          date.getFullYear(), // Año completo
        ].join("/"); // Junta los componentes con guiones
        return <Tag color={"magenta"}>{formattedDate}</Tag>;
      } else {
        return <Tag>No Aplica</Tag>;
      }
    },
  },
  {
    title: "Fecha de Finalizacion",
    key: "end_date",
    dataIndex: "end_date",
    align: "center",
    render: (end_date, record) => {
      if (end_date && record.is_temporary) {
        const date = new Date(end_date);
        const formattedDate = [
          `0${date.getDate()}`.slice(-2), // Añade un cero al inicio y luego obtiene los últimos dos dígitos
          `0${date.getMonth() + 1}`.slice(-2), // Añade un cero al inicio y luego obtiene los últimos dos dígitos, +1 porque getMonth() retorna de 0 a 11
          date.getFullYear(), // Año completo
        ].join("/"); // Junta los componentes con guiones
        return <Tag color={"magenta"}>{formattedDate}</Tag>;
      } else {
        return <Tag>No Aplica</Tag>;
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
        <Popconfirm
          title="Eliminar membresia"
          description="Estas seguro de eliminar el registro?"
          onConfirm={() => onDelete(record)}
          onCancel={onCancel}
          okText="Si"
          cancelText="No"
          okType={"default"}
        >
          <Button type={"primary"} danger>
            Remover
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
];
