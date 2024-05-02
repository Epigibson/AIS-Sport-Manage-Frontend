import { Button, Popconfirm, Space, Tag } from "antd";

export const DiscountsColumns = ({ onEdit, onDelete, onCancel }) => [
  {
    title: "Titulo de Descuento",
    dataIndex: "discount_name",
    key: "discount_name",
    align: "center",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Descripcion",
    dataIndex: "discount_description",
    key: "discount_description",
    align: "center",
  },
  {
    title: "Membresia",
    key: "membership",
    dataIndex: "membership",
    align: "center",
    render: (membership) => {
      if (membership) {
        return <Tag color={"blue"}>{membership.product_name}</Tag>;
      } else {
        return <Tag>Sin Membresia</Tag>;
      }
    },
  },
  {
    title: "Porcentaje",
    dataIndex: "discount_percentage",
    key: "discount_percentage",
    align: "center",
    render: (discount_percentage) => {
      return <div>{discount_percentage} %</div>;
    },
  },
  {
    title: "Porcentaje en monto",
    dataIndex: "discount_amount",
    key: "discount_amount",
    align: "center",
    render: (discount_amount) =>
      new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(discount_amount),
  },
  {
    title: "Codigo de Descuento",
    dataIndex: "discount_code",
    key: "discount_code",
    align: "center",
    render: (discount_code) => <Tag color={"blue"}>{discount_code}</Tag>,
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
    title: "Atletas",
    key: "athletes",
    dataIndex: "athletes",
    align: "center",
    render: (athletes) => {
      if (athletes && athletes.length > 0) {
        return athletes.map((athlete) => (
          <Tag key={athlete._id} color={"blue"}>
            {athlete.name}
          </Tag>
        ));
      } else {
        return <Tag>Sin Atletas</Tag>;
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
          title="Eliminar descuento"
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
