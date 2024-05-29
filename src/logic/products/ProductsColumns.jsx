import { Button, Popconfirm, Space, Tag } from "antd";
import { FormatCurrencyUtil } from "../../utils/FormatCurrencyUtil.jsx";

export const ProductsColumns = ({ onEdit, onAddStock, onDelete, onCancel }) => [
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    align: "center",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Precio",
    dataIndex: "price",
    key: "price",
    align: "center",
    render: (price) => {
      return <a>{FormatCurrencyUtil(price)}</a>;
    },
  },
  {
    title: "Existencias",
    dataIndex: "quantity_stock",
    key: "quantity_stock",
    align: "center",
  },
  {
    title: "Descripcion",
    dataIndex: "description",
    key: "description",
    align: "center",
  },
  {
    title: "Estatus",
    key: "status",
    dataIndex: "status",
    align: "center",
    render: (status) => {
      if (status) {
        return <Tag color={"green"}>En existencia</Tag>;
      } else {
        return <Tag color={"volcano"}>Agotado</Tag>;
      }
    },
  },
  {
    title: "Ingresar a Stock",
    key: "stock",
    align: "center",
    width: 200,
    render: (_, record) => (
      <Button
        style={{ backgroundColor: "#1d4ed8" }}
        type={"primary"}
        onClick={() => onAddStock(record)}
      >
        Ingresar a Stock
      </Button>
    ),
  },
  {
    title: "Acciones",
    key: "action",
    align: "center",
    width: 200,
    render: (_, record) => (
      <Space direction={"horizontal"} align={"center"}>
        <Button
          style={{ backgroundColor: "#fcba03" }}
          type="primary"
          onClick={() => onEdit(record)}
        >
          Editar
        </Button>
        <Popconfirm
          title="Eliminar producto"
          description="Estas seguro de eliminar el registro?"
          onConfirm={() => onDelete(record)}
          onCancel={onCancel}
          okText="Si"
          cancelText="No"
          okType={"default"}
        >
          <Button type={"primary"} danger>
            Borrar
          </Button>
        </Popconfirm>
      </Space>
    ),
  },
];
