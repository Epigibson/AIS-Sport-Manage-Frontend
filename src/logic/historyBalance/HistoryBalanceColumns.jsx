import { Tag } from "antd";
import { FormatCurrencyUtil } from "../../utils/FormatCurrencyUtil.jsx";
import { convertToMexicoCityTimeAndSubtractSixHours } from "../../utils/ConvertDateToMexicoTimeUtil.jsx";

export const HistoryBalanceColumns = ({
  folioSearchProps,
  paymentMethodSearchProps,
  packageSearchProps,
  responsibleSearchProps,
}) => [
  {
    title: "Recibo (Folio)",
    dataIndex: "receipt_id",
    key: "receipt_id",
    align: "center",
    ...folioSearchProps,
    render: (receipt_id) => {
      // Mostrar los primeros 4 y los últimos 4 caracteres del folio
      const shortenedReceiptId = `${receipt_id.slice(0, 4)}...${receipt_id.slice(-4)}`;
      return <Tag color={"blue"}>{shortenedReceiptId}</Tag>;
    },
  },
  {
    title: "Responsable",
    dataIndex: "responsible_name",
    key: "responsible_name",
    align: "center",
    ...responsibleSearchProps,
    render: (responsible_name) => {
      return <Tag color={"blue"}>{responsible_name}</Tag>;
    },
  },
  {
    title: "Tutor",
    dataIndex: "user_name",
    key: "user_name",
    align: "center",
    render: (user_name) => <Tag color={"cyan"}>{user_name}</Tag>,
  },
  {
    title: "Atleta",
    dataIndex: "athlete_name",
    key: "athlete_name",
    align: "center",
    render: (athlete_name) => {
      return <Tag color={"blue"}>{athlete_name}</Tag>;
    },
  },
  {
    title: "Paquete",
    dataIndex: "package_name",
    key: "package_name",
    align: "center",
    ...packageSearchProps,
    render: (package_name) => {
      return <Tag color={"lime"}>{package_name}</Tag>;
    },
  },
  {
    title: "Metodo de Pago",
    dataIndex: "payment_method",
    key: "payment_method",
    align: "center",
    ...paymentMethodSearchProps,
    render: (payment_method) => {
      return <Tag color={"purple"}>{payment_method}</Tag>;
    },
  },
  {
    title: "Costo del Paquete",
    dataIndex: "original_amount_price",
    key: "original_amount_price",
    align: "center",
    render: (original_amount_price) => {
      return (
        <Tag color={"cyan"}>{FormatCurrencyUtil(original_amount_price)}</Tag>
      );
    },
  },
  {
    title: "Saldo aplicado",
    dataIndex: "amount_balance_applied",
    key: "amount_balance_applied",
    align: "center",
    render: (amount_balance_applied) => {
      return (
        <Tag color={"orange"}>{FormatCurrencyUtil(amount_balance_applied)}</Tag>
      );
    },
  },
  {
    title: "Fecha del movimiento",
    dataIndex: "created_at",
    key: "created_at",
    align: "center",
    render: (created_at) => {
      return (
        <Tag color={"blue"}>
          {convertToMexicoCityTimeAndSubtractSixHours(created_at)}
        </Tag>
      );
    },
  },
];
