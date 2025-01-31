import { Tag } from "antd";
import { FormatCurrencyUtil } from "../../utils/FormatCurrencyUtil.jsx";
import { convertToMexicoCityTimeAndSubtractSixHours } from "../../utils/ConvertDateToMexicoTimeUtil.jsx";

export const SalesHistoryColumns = ({
  filters,
  // onEdit,
  // onDelete,
  // onCancel,
}) => [
  {
    title: "Fecha de Venta",
    key: "created_at",
    dataIndex: "created_at",
    align: "center",
    render: (created_at) => {
      const date = convertToMexicoCityTimeAndSubtractSixHours(created_at);
      return <Tag color={"cyan"}>{date}</Tag>;
    },
  },
  {
    title: "Producto",
    dataIndex: "product_name",
    key: "product_name",
    align: "center",
    filters: filters.product_name,
    filterSearch: true,
    onFilter: (value, record) => record.product_name.includes(value),
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Precio Unitario",
    dataIndex: "product_price",
    key: "product_price",
    align: "center",
    render: (product_price) => {
      return FormatCurrencyUtil(product_price);
    },
  },
  {
    title: "Cantidad",
    dataIndex: "product_quantity",
    key: "product_quantity",
    align: "center",
  },
  {
    title: "Precio Total",
    dataIndex: "total_price",
    key: "total_price",
    align: "center",
    render: (total_price) => {
      return FormatCurrencyUtil(total_price);
    },
  },
  {
    title: "Venta / Cortesia",
    key: "is_lost",
    dataIndex: "is_lost",
    align: "center",
    filters: [
      { text: "Cortesia", value: true },
      { text: "Venta", value: false },
    ],
    onFilter: (value, record) => record.is_lost === value,
    render: (is_lost) => {
      return <Tag color={"cyan"}>{is_lost ? "Cortesia" : "Venta"}</Tag>;
    },
  },
  {
    title: "Metodo de Pago",
    key: "payment_method",
    dataIndex: "payment_method",
    align: "center",
    filters: [
      { text: "Efectivo", value: "Efectivo" },
      { text: "Transferencia", value: "Transferencia" },
      { text: "Cortesia", value: "Cortesia" },
    ],
    onFilter: (value, record) => record.payment_method === value,
    render: (payment_method) => {
      if (payment_method) {
        return <Tag color={"green"}>{payment_method}</Tag>;
      } else {
        return <Tag color={"volcano"}>{payment_method}</Tag>;
      }
    },
  },
  // {
  //   title: "Acciones",
  //   key: "action",
  //   align: "center",
  //   width: 200,
  //   render: (_, record) => (
  //     <Space direction={"horizontal"} align={"center"}>
  //       <Button
  //         style={{ backgroundColor: "#fcba03" }}
  //         type="primary"
  //         onClick={() => onEdit(record)}
  //       >
  //         Editar
  //       </Button>
  //       <Popconfirm
  //         title="Eliminar producto"
  //         description="Estas seguro de eliminar el registro?"
  //         onConfirm={() => onDelete(record)}
  //         onCancel={onCancel}
  //         okText="Si"
  //         cancelText="No"
  //         okType={"default"}
  //       >
  //         <Button type={"primary"} danger>
  //           Borrar
  //         </Button>
  //       </Popconfirm>
  //     </Space>
  //   ),
  // },
];
