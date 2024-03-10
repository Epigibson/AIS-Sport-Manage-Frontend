import { Button, Tag, Typography } from "antd";

const { Text } = Typography;

export const PaymentColumns = ({ showReceipts }) => [
  {
    title: "Folio de Recibo",
    dataIndex: "receipt_id",
    key: "receipt_id",
    align: "center",
    render: (_, record) => {
      return (
        <Button
          type={"primary"}
          className={"bg-primary-700 px-8"}
          onClick={() => showReceipts(record)}
        >
          Ver
        </Button>
      );
    },
  },
  {
    title: "Usuario",
    dataIndex: "user",
    key: "user",
    align: "center",
    render: (user) =>
      user ? (
        <>
          <Tag color={"blue"} className={"mb-2"}>
            <Text>{user.name}</Text>
          </Tag>
          <br />
          <Tag color={"cyan"}>
            <Text>{user.email}</Text>
          </Tag>
        </>
      ) : (
        <span>Sin Usuario</span>
      ), // Ajusta "group_name" según tu modelo de datos
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
    render: (created_at) => {
      const date = new Date(created_at);
      const formattedDate = [
        `0${date.getDate()}`.slice(-2), // Añade un cero al inicio y luego obtiene los últimos dos dígitos
        `0${date.getMonth() + 1}`.slice(-2), // Añade un cero al inicio y luego obtiene los últimos dos dígitos, +1 porque getMonth() retorna de 0 a 11
        date.getFullYear(), // Año completo
      ].join("/"); // Junta los componentes con guiones
      return <Text>{formattedDate}</Text>;
    },
  },
];
