import { Tag } from "antd";

export const AthletesPaymentsReportColumns = (filters) => [
  {
    title: "Matricula",
    dataIndex: "tuition",
    key: "tuition",
    align: "center",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.tuition - b.tuition,
  },
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    align: "center",
    filters: filters.name,
    onFilter: (value, record) => record.name.includes(value),
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Estatus",
    key: "status",
    dataIndex: "status",
    align: "center",
    filters: [
      { text: "Activo", value: true },
      { text: "Inactivo", value: false },
    ],
    onFilter: (value, record) => record.status === value,
    render: (_, record) => {
      return record.status ? (
        <Tag color="green">Activo</Tag>
      ) : (
        <Tag color="volcano">Inactivo</Tag>
      );
    },
  },
];
