import { Tag } from "antd";
import { FormatCurrencyUtil } from "../../../utils/FormatCurrencyUtil.jsx";

export const AthletesEnrichedColumns = (filters) => [
  {
    title: "Matricula",
    dataIndex: "tuition",
    key: "tuition",
    align: "center",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.tuition - b.tuition,
  },
  {
    title: "Atleta",
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
  {
    title: "Monto Total",
    key: "amount",
    align: "center",
    width: 200,
    render: (_, record) => {
      let sum = 0;
      record.payments.map((payment) =>
        payment?.amount && payment?.status !== "Cancelado"
          ? (sum += payment.amount)
          : null,
      );
      return (
        <div className={"mt-2 pb-0"}>
          <strong>{FormatCurrencyUtil(sum)}</strong>
        </div>
      );
    },
  },
  {
    title: "Monto Pagado",
    key: "amount",
    align: "center",
    width: 200,
    render: (_, record) => {
      let sum = 0;
      record.payments.map((payment) =>
        payment?.amount && payment?.status === "Pagado"
          ? (sum += payment.amount)
          : null,
      );
      return (
        <div className={"mt-2 pb-0"}>
          <strong>{FormatCurrencyUtil(sum)}</strong>
        </div>
      );
    },
  },
  {
    title: "Monto Pendiente",
    key: "amount",
    align: "center",
    width: 200,
    render: (_, record) => {
      let sum = 0;
      record?.payments.forEach((payment) => {
        if (
          payment?.amount &&
          (payment?.status === "Pendiente" || payment?.status === "Creado")
        ) {
          sum += payment.amount;
        }
      });
      return (
        <div className={"mt-2 pb-0"}>
          <strong>{FormatCurrencyUtil(sum)}</strong>
        </div>
      );
    },
  },
];
