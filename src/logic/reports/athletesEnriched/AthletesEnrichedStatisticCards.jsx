export const AthletesEnrichedStatisticCards = (data) => [
  {
    backgroundClass: "shadow-md bg-gradient-to-r from-cyan-50 to-purple-200",
    statistics: [
      {
        title: "",
        value: `Atletas activos: ${data?.active_athletes}`,
        fontSize: 14,
      },

      {
        title: "",
        value: `Atletas Inactivos: ${data?.inactive_athletes}`,
        fontSize: 14,
      },
    ],
  },
  {
    backgroundClass: "shadow-md bg-gradient-to-r from-orange-50 to-blue-200",
    statistics: [
      {
        title: "Total",
        value: `$${parseFloat(data?.total).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: 14,
        fontWeight: "bold",
      },
    ],
  },
  {
    backgroundClass: "shadow-md bg-gradient-to-r from-yellow-50 to-green-200",
    statistics: [
      {
        title: "Pagado",
        value: `$${parseFloat(data?.paid).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: 14,
        fontWeight: "bold",
      },
    ],
  },
  {
    backgroundClass: "shadow-md bg-gradient-to-r from-green-50 to-yellow-200",
    statistics: [
      {
        title: "Pendiente",
        value: `$${parseFloat(data?.pending).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: 14,
        fontWeight: "bold",
      },
    ],
  },
  {
    backgroundClass: "shadow-md bg-gradient-to-r from-orange-50 to-red-200",
    statistics: [
      {
        title: "Cancelado",
        value: `$${parseFloat(data?.cancelled).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: 14,
        fontWeight: "bold",
      },
    ],
  },
];
