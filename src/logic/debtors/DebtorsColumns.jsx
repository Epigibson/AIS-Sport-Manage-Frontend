import { Tag, Typography } from "antd";

const { Text } = Typography;

export const debtorsColumns = [
  {
    title: "Matricula",
    dataIndex: "tuition",
    key: "tuition",
    align: "center",
    render: (tuition) =>
      tuition ? (
        <>
          <Tag color={"blue"} className={"mb-2"}>
            <Text>{tuition}</Text>
          </Tag>
        </>
      ) : (
        <span>Sin Usuario</span>
      ), // Ajusta "group_name" según tu modelo de datos
  },
  {
    title: "Estatus",
    key: "status",
    dataIndex: "status",
    align: "center",
    render: (status) => {
      if (status) {
        return <Tag color={"green"}>Activo</Tag>;
      } else {
        return <Tag color={"volcano"}>Inactivo</Tag>;
      }
    },
  },
  // {
  //   title: "Adeudo",
  //   key: "debt",
  //   dataIndex: "debt",
  //   align: "center",
  //   render: (debt) => {
  //     // Usando Intl.NumberFormat para dar formato de moneda MXN
  //     const formattedDebt = new Intl.NumberFormat("es-MX", {
  //       style: "currency",
  //       currency: "MXN",
  //     }).format(debt);
  //
  //     return <Text className={"text-white"}>{formattedDebt}</Text>;
  //   },
  // },
  {
    title: "Ultimo Pago",
    key: "last_payment",
    dataIndex: "last_payment",
    align: "center",
    render: (last_payment) => {
      const date = new Date(last_payment);
      const formattedDate = [
        `0${date.getDate()}`.slice(-2), // Añade un cero al inicio y luego obtiene los últimos dos dígitos
        `0${date.getMonth() + 1}`.slice(-2), // Añade un cero al inicio y luego obtiene los últimos dos dígitos, +1 porque getMonth() retorna de 0 a 11
        date.getFullYear(), // Año completo
      ].join("/"); // Junta los componentes con guiones
      return <Text className={"text-white"}>{formattedDate}</Text>;
    },
  },
];
