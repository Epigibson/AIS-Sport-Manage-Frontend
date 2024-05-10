import { Tag } from "antd"; // Función para formatear números como moneda

// Función para formatear números como moneda
const formatCurrency = (amount) => {
  const formatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  });
  return formatter.format(amount);
};

export const AthletesPaidOrNotColumns = (
  filters,
  lastMonthName,
  currentMontName,
  nextMonthName,
) => [
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
    title: "Tutor",
    dataIndex: "user_name",
    key: "user_name",
    align: "center",
    filters: filters.user_name,
    onFilter: (value, record) => record.name.includes(value),
    // defaultSortOrder: "descend",
    // sorter: (a, b) => a.tuition - b.tuition,
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
    title: lastMonthName,
    dataIndex: "last_month",
    key: "last_month",
    align: "center",
    render: (_, record) => {
      const statusColor =
        record?.last_month_status === "Pagado" ? "green" : "volcano";
      const formattedAmountLeft = formatCurrency(
        record?.last_month_amount_left || 0,
      );
      const formattedAmountPaid = formatCurrency(
        record?.last_month_amount_paid || 0,
      );

      return (
        <>
          <Tag color={statusColor}>{record.last_month_status}</Tag>
          {record?.last_month_amount_left ? (
            <div>Total a deber: {formattedAmountLeft}</div>
          ) : null}
          {record?.last_month_status === "Sin recibo" ? null : (
            <div>Total a pagado: {formattedAmountPaid}</div>
          )}
        </>
      );
    },
  },
  {
    title: currentMontName,
    dataIndex: "current_month",
    key: "current_month",
    align: "center",
    render: (_, record) => {
      const statusColor =
        record?.current_month_status === "Pagado" ? "green" : "volcano";
      const formattedAmountLeft = formatCurrency(
        record?.current_month_amount_left || 0,
      );
      const formattedAmountPaid = formatCurrency(
        record?.current_month_amount_paid || 0,
      );

      return (
        <>
          <Tag color={statusColor}>{record.current_month_status}</Tag>
          {record?.current_month_amount_left ? (
            <div>Total a deber: {formattedAmountLeft}</div>
          ) : null}
          {record?.current_month_status === "Sin recibo" ? null : (
            <div>Total pagado: {formattedAmountPaid}</div>
          )}{" "}
        </>
      );
    },
  },
  {
    title: nextMonthName,
    dataIndex: "next_month",
    key: "next_month",
    align: "center",
    render: (_, record) => {
      const statusColor =
        record?.next_month_status === "Pagado" ? "green" : "volcano";
      const formattedAmountLeft = formatCurrency(
        record?.next_month_amount_left || 0,
      );
      const formattedAmountPaid = formatCurrency(
        record?.next_month_amount_paid || 0,
      );

      return (
        <>
          <Tag color={statusColor}>{record.next_month_status}</Tag>
          {record?.next_month_amount_left ? (
            <div>Total a deber: {formattedAmountLeft}</div>
          ) : null}
          {record?.next_month_status === "Sin recibo" ? null : (
            <div>Total pagado: {formattedAmountPaid}</div>
          )}{" "}
        </>
      );
    },
  },
];
