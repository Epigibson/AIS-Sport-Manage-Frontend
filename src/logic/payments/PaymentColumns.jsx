import { Tag } from "antd";

export const PaymentColumns = [
  {
    title: "Folio de Recibo",
    dataIndex: "receipt_id",
    key: "receipt_id",
  },
  {
    title: "Usuario",
    dataIndex: "user",
    key: "user",
    render: (group) =>
      group ? <Tag color={"blue"}>{group.name}</Tag> : <span>No Group</span>, // Ajusta "group_name" según tu modelo de datos
  },
  {
    title: "Cantidad",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Estatus",
    dataIndex: "status",
    key: "status",
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
  },
  {
    title: "Metodo de Pago",
    dataIndex: "payment_method",
    key: "payment_method",
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
  },
];
