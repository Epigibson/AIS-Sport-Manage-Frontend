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
        title: "Usuarios Nuevos",
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
        title: "Coaches Nuevos",
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
        title: "Inscripciones Nuevas",
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
        value: `Elementos: ${data?.paid_by_month_count.currentMonth ? data?.paid_by_month_count.currentMonth : 0}`,
        fontSize: fontSize, // Asegúrate de que esto se maneje adecuadamente en tu estructura de datos o en el componente padre
      },
      {
        title: "",
        value: `Monto: $${parseFloat(
          data?.paid_by_month?.currentMonth,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: fontSize, // Asegúrate de que esto se maneje adecuadamente en tu estructura de datos o en el componente padre
      },
    ],
  },
  {
    backgroundClass: "bg-gradient-to-r from-indigo-50 to-purple-200",
    statistics: [
      {
        title: "Recibos Pendientes",
        value: `Elementos: ${data?.pending_by_month_count.currentMonth ? data?.pending_by_month_count.currentMonth : 0}`,
        fontSize: fontSize, // Asegúrate de que esto se maneje adecuadamente en tu estructura de datos o en el componente padre
      },
      {
        title: "",
        value: `Monto: $${parseFloat(
          data?.pending_by_month?.currentMonth,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: fontSize, // Asegúrate de que esto se maneje adecuadamente en tu estructura de datos o en el componente padre
      },
    ],
  },
  {
    backgroundClass: "bg-gradient-to-r from-indigo-50 to-purple-200",
    statistics: [
      {
        title: "Recibos Vencidos y Cancelados",
        value: `Elementos: ${data?.cancelled_by_month_count.currentMonth ? data?.cancelled_by_month_count.currentMonth : 0}`,
        fontSize: fontSize, // Asegúrate de que esto se maneje adecuadamente en tu estructura de datos o en el componente padre
      },
      {
        title: "",
        value: `Monto: $${parseFloat(
          data?.cancelled_by_month?.currentMonth
            ? data?.cancelled_by_month.currentMonth
            : 0,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: fontSize, // Asegúrate de que esto se maneje adecuadamente en tu estructura de datos o en el componente padre
      },
    ],
  },
  {
    backgroundClass: "bg-gradient-to-r from-red-100 to-orange-200",
    statistics: [
      {
        title: "Monto Total",
        value: `$${parseFloat(
          data?.total_by_month?.currentMonth,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: fontSize, // Asegúrate de que esto se maneje adecuadamente en tu estructura de datos o en el componente padre
      },
    ],
  },
];
