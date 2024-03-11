import { Button, Tag, Typography } from "antd";

const { Text } = Typography;

export const PaymentReceiptColumns = [
  {
    title: "Folio de Recibo",
    dataIndex: "_id",
    key: "_id",
    align: "center",
  },
  {
    title: "Pago",
    dataIndex: "payment_link",
    key: "payment_link",
    align: "center",
    render: (_, record) => {
      console.log("LINK", record.payment_link);
      return (
        <Button
          onClick={() => window.open(record.payment_link, "_blank")}
          disabled={!record.payment_link}
          type={"primary"}
          className={"bg-primary-700"}
        >
          Pagar
        </Button>
      );
    },
  },
  {
    title: "Tipo de Recibo",
    dataIndex: "receipt_type",
    key: "receipt_type",
    align: "center",
    render: (type) => <Tag color={"blue"}>{type.toUpperCase()}</Tag>, // Ajusta "receipt_type" según tu modelo de datos
  },
  {
    title: "Cantidad",
    dataIndex: "receipt_amount",
    key: "receipt_amount",
    align: "center",
    render: (amount) => {
      const formattedAmount = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(amount);
      return <Text>{formattedAmount}</Text>;
    },
  },
  {
    title: "Descripcion",
    dataIndex: "receipt_description",
    key: "receipt_description",
    align: "center",
    ellipsis: true,
  },
];
