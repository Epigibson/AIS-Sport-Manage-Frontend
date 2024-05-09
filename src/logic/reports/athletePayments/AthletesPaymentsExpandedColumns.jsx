import { Tag } from "antd";

export const AthletesPaymentsExpandedColumns = (
  mesPasado,
  mesActual,
  mesSiguiente,
) => [
  {
    title: mesPasado,
    key: "last_month_payments",
    align: "center",
    width: 200,
    render: (_, record) => {
      return (
        <>
          {record.last_month_payments.map((item) => (
            <Tag
              key={item._id} // Ensure each Tag has a unique key
              color={item.status === "Pagado" ? "green" : "volcano"}
            >
              {item.membership} - {item.status} - {item.amount}
            </Tag>
          ))}
        </>
      );
    },
  },

  // You should repeat this setup for current_month_payments and next_month_payments
  {
    title: mesActual,
    key: "current_month_payments",
    align: "center",
    width: 200,
    render: (_, record) => {
      return (
        <>
          {record.current_month_payments.map((item) => (
            <Tag
              key={item._id} // Ensure each Tag has a unique key
              color={item.status === "Pagado" ? "green" : "volcano"}
            >
              {item.membership} - {item.status} - {item.amount}
            </Tag>
          ))}
        </>
      );
    },
  },
  {
    title: mesSiguiente,
    key: "next_month_payments",
    align: "center",
    width: 200,
    render: (_, record) => {
      if (
        !record.next_month_payments ||
        record.next_month_payments.length === 0
      )
        return <Tag>Sin Recibos</Tag>;
      return (
        <>
          {record.next_month_payments.map((item) => (
            <Tag
              key={item._id} // Ensure each Tag has a unique key
              color={item.status === "Pagado" ? "green" : "volcano"}
            >
              {item.membership} - {item.status} - {item.amount}
            </Tag>
          ))}
        </>
      );
    },
  },
];
