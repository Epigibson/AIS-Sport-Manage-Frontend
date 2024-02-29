import { Button, Popconfirm, Space, Tag } from "antd";

export const PackagesColumns = ({ onEdit, onDelete, onCancel }) => [
  {
    title: "Nombre",
    dataIndex: "product_name",
    key: "product_name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Descripcion",
    dataIndex: "product_description",
    key: "product_description",
  },
  {
    title: "Precio",
    dataIndex: "price",
    key: "price",
    render: (price) =>
      new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(price),
  },
  {
    title: "Estatus",
    key: "is_active",
    dataIndex: "is_active",
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
    render: (_, record) => (
      <Space size="middle">
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
