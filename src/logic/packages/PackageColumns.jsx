import { Button, Popconfirm, Space, Tag } from "antd";

export const PackagesColumns = ({ onEdit, onDelete, onCancel }) => [
  {
    title: "Nombre",
    dataIndex: "product_name",
    key: "product_name",
    align: "center",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Descripcion",
    dataIndex: "product_description",
    key: "product_description",
    align: "center",
  },
  {
    title: "Precio",
    dataIndex: "price",
    key: "price",
    align: "center",
    render: (price) =>
      new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(price),
  },
  {
    title: "Plazo de Pago",
    dataIndex: "payment_deadline",
    key: "payment_deadline",
    align: "center",
    render: (payment_deadline) => {
      return <div>{payment_deadline} dias</div>;
    },
  },
  {
    title: "Estatus",
    key: "is_active",
    dataIndex: "is_active",
    align: "center",
    render: (status) => {
      if (status) {
        return <Tag color={"green"}>Activo</Tag>;
      } else {
        return <Tag color={"volcano"}>Inactivo</Tag>;
      }
    },
  },
  {
    title: "Acciones",
    key: "action",
    align: "center",
    width: 200,
    render: (_, record) => (
      <Space>
        <Button
          style={{ backgroundColor: "#fcba03" }}
          type="primary"
          onClick={() => onEdit(record)}
        >
          Editar
        </Button>
        <Popconfirm
          title="Eliminar paquete"
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
