import { Button, Popconfirm, Tag, Typography } from "antd";
import "./PaymentsStyle.css";

const { Text } = Typography;

export const PaymentColumns = ({ showReceipts, handlePayReceipt }) => [
  {
    title: "Matricula",
    dataIndex: "user",
    key: "user",
    align: "center",
    render: (user) =>
      user ? (
        <>
          <Tag color={"blue"} className={"mb-2"}>
            <Text>{user.tuition}</Text>
          </Tag>
        </>
      ) : (
        <span>Sin Usuario</span>
      ), // Ajusta "group_name" según tu modelo de datos
  },
  {
    title: "Usuario",
    dataIndex: "user",
    key: "user",
    align: "center",
    ellipsis: true,
    render: (user) =>
      user ? (
        <>
          <Tag color={"blue"} className={"mb-2"}>
            <Text>{user.name}</Text>
          </Tag>
          {/*<br/>*/}
          {/*<Tag color={"cyan"}>*/}
          {/*    <Text>{user.email}</Text>*/}
          {/*</Tag>*/}
        </>
      ) : (
        <span>Sin Usuario</span>
      ), // Ajusta "group_name" según tu modelo de datos
  },
  {
    title: "Tipo de Pago",
    dataIndex: "payment_type",
    key: "payment_type",
    align: "center",
  },
  {
    title: "Cantidad",
    dataIndex: "amount",
    key: "amount",
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
    title: "Estatus",
    dataIndex: "status",
    key: "status",
    align: "center",
    searchable: true, // Esta columna será buscable
    render: (status) => {
      if (status === "Pagado") {
        return <Tag color={"green"}>{status}</Tag>;
      } else {
        return <Tag color={"warning"}>{status}</Tag>;
      }
    },
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
  {
    title: "Pago",
    dataIndex: "receipt_id",
    key: "receipt_id",
    align: "center",
    width: 250,
    render: (_, record) => {
      return (
        <div className={"flex flex-row items-center justify-center"}>
          <Popconfirm
            title="Confirmar Pago"
            description={`Estas seguro de pagar $${record?.amount}?`}
            onConfirm={() => handlePayReceipt(record)}
            okText="Si"
            cancelText="No"
          >
            <Button
              disabled={record.status === "Pagado"}
              type={"primary"}
              className="ant-btn-custom px-2 mr-2"
              style={
                record.status !== "Pagado" ? { backgroundColor: "#48bb78" } : {}
              }
              size={"small"}
              // onClick={() => handlePayReceipt(record)}
            >
              Confirmar Pago
            </Button>
          </Popconfirm>
          <Button
            disabled={record.status !== "Pagado"}
            type={"primary"}
            size={"small"}
            className={"bg-primary-700 px-2"}
            onClick={() => showReceipts(record)}
          >
            Ver Recibo
          </Button>
        </div>
      );
    },
  },
];
