import { Tag } from "antd";

export const PaymentColumns = [
  {
    title: "Folio de Recibo",
    dataIndex: "receipt_id",
    key: "receipt_id",
    align: "center",
  },
  {
    title: "Usuario",
    dataIndex: "user",
    key: "user",
    align: "center",
    render: (group) =>
      group ? <Tag color={"blue"}>{group.name}</Tag> : <span>No Group</span>, // Ajusta "group_name" según tu modelo de datos
  },
  {
    title: "Cantidad",
    dataIndex: "amount",
    key: "amount",
    align: "center",
  },
  {
    title: "Estatus",
    dataIndex: "status",
    key: "status",
    align: "center",
    render: (status) => {
      if (status) {
        return <Tag color={"green"}>{status}</Tag>;
      } else {
        return <Tag color={"volcano"}>{status}</Tag>;
      }
    },
  },
  {
    title: "Tipo de Pago",
    dataIndex: "payment_type",
    key: "payment_type",
    align: "center",
  },
  {
    title: "Metodo de Pago",
    dataIndex: "payment_method",
    key: "payment_method",
    align: "center",
    render: (_, record) =>
      record.payment_method ? (
        <Tag color="blue">{record.payment_method}</Tag>
      ) : (
        <Tag color="blue">No especificado</Tag>
      ),
  },
  {
    title: "Fecha de Pago",
    dataIndex: "created_at",
    key: "created_at",
    align: "center",
  },
];
