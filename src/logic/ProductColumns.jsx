import { Button, Space, Tag } from "antd";

export const PackagesColumns = [
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
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <Button className="bg-amber-500 text-white">Edit</Button>
        <Button type={"primary"} danger>
          Delete
        </Button>
      </Space>
    ),
  },
];
