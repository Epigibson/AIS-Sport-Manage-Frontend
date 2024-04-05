import {
  FileTextOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const statisticCardsData = (data, fontSize) => [
  {
    backgroundClass: "bg-gradient-to-r from-cyan-50 to-blue-200",
    statistics: [
      {
        title: "Usuarios",
        value: data?.athlete_count,
        prefix: <UserOutlined />,
        fontSize: fontSize, // Asegúrate de que esto se maneje adecuadamente en tu estructura de datos o en el componente padre
      },
    ],
  },
  {
    backgroundClass: "bg-gradient-to-r from-cyan-50 to-blue-200",
    statistics: [
      {
        title: "Coaches",
        value: data?.couch_count,
        prefix: <TeamOutlined />,
        fontSize: fontSize, // Asegúrate de que esto se maneje adecuadamente en tu estructura de datos o en el componente padre
      },
    ],
  },
  {
    backgroundClass: "bg-gradient-to-r from-cyan-50 to-blue-200",
    statistics: [
      {
        title: "Inscripciones",
        value: data?.inscription_count,
        prefix: <FileTextOutlined />,
        fontSize: fontSize, // Asegúrate de que esto se maneje adecuadamente en tu estructura de datos o en el componente padre
      },
    ],
  },
  {
    backgroundClass: "bg-gradient-to-r from-indigo-50 to-purple-200",
    statistics: [
      {
        title: "Recibos Pagados",
        value: `Elementos: ${data?.count_receipts_payed}`,
        fontSize: fontSize, // Asegúrate de que esto se maneje adecuadamente en tu estructura de datos o en el componente padre
      },
      {
        title: "",
        value: `Monto: $${parseFloat(data?.amount_payed).toLocaleString(
          "es-MX",
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
        )} MXN`,
        fontSize: fontSize, // Asegúrate de que esto se maneje adecuadamente en tu estructura de datos o en el componente padre
      },
    ],
  },
  {
    backgroundClass: "bg-gradient-to-r from-indigo-50 to-purple-200",
    statistics: [
      {
        title: "Recibos Pendientes",
        value: `Elementos: ${data?.count_receipts_pending}`,
        fontSize: fontSize, // Asegúrate de que esto se maneje adecuadamente en tu estructura de datos o en el componente padre
      },
      {
        title: "",
        value: `Monto: $${parseFloat(data?.amount_pending).toLocaleString(
          "es-MX",
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
        )} MXN`,
        fontSize: fontSize, // Asegúrate de que esto se maneje adecuadamente en tu estructura de datos o en el componente padre
      },
    ],
  },
  {
    backgroundClass: "bg-gradient-to-r from-indigo-50 to-purple-200",
    statistics: [
      {
        title: "Recibos Vencidos",
        value: `Elementos: ${data?.count_receipts_expired}`,
        fontSize: fontSize, // Asegúrate de que esto se maneje adecuadamente en tu estructura de datos o en el componente padre
      },
      {
        title: "",
        value: `Monto: $${parseFloat(data?.amount_expired).toLocaleString(
          "es-MX",
          {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          },
        )} MXN`,
        fontSize: fontSize, // Asegúrate de que esto se maneje adecuadamente en tu estructura de datos o en el componente padre
      },
    ],
  },
  {
    backgroundClass: "bg-gradient-to-r from-red-100 to-orange-200",
    statistics: [
      {
        title: "Monto Total",
        value: `$${parseFloat(data?.total_amount).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: fontSize, // Asegúrate de que esto se maneje adecuadamente en tu estructura de datos o en el componente padre
      },
    ],
  },
];
