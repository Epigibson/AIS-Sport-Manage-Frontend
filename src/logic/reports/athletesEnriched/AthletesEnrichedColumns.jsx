import { Avatar, Row, Tag, Tooltip } from "antd";
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
    title: "Membresias",
    dataIndex: "products_which_inscribed",
    key: "products_which_inscribed",
    align: "center",
    render: (products_which_inscribed) => {
      let names = products_which_inscribed
        .map((membership) => membership.product_name)
        .join("\n");

      return (
        <>
          <Tooltip
            color={"cyan"}
            title={<div style={{ whiteSpace: "pre-line" }}>{names}</div>}
            placement={"left"}
          >
            <Row align={"middle"} justify={"center"}>
              {products_which_inscribed.map((membership) => {
                const productName = membership?.product_name || "";
                const firstLetter = productName.charAt(0);
                const secondLetter = productName.charAt(1).toUpperCase();
                const lastLetter = productName.charAt(2).toUpperCase();

                return (
                  <Avatar
                    key={membership._id}
                    style={{ backgroundColor: "#cfd3fd", color: "#0045f5" }}
                    className={"mx-1"}
                  >
                    {firstLetter}
                    {secondLetter}
                    {lastLetter}
                  </Avatar>
                );
              })}
            </Row>
          </Tooltip>
        </>
      );
    },
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
    title: "Monto Pagado",
    key: "amount",
    align: "center",
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
  {
    title: "Total Esperado (Pagado + Pendiente)",
    key: "amount",
    align: "center",
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
];
