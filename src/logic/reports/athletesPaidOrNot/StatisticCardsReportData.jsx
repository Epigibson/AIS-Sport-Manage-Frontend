export const StatisticCardsReportData = (
  data,
  fontSize,
  lastMonth,
  currentMonth,
  nextMonth,
) => [
  {
    backgroundClass: "shadow-md bg-gradient-to-r from-cyan-50 to-purple-200",
    statistics: [
      {
        title: "Atletas",
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
    backgroundClass: "shadow-md bg-gradient-to-r from-cyan-50 to-blue-200",
    statistics: [
      {
        title: lastMonth,
        value: `Total estimado: $${parseFloat(
          data?.last_month_total,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: fontSize,
        fontWeight: "bold",
      },

      {
        title: "",
        value: `Pagado: $${parseFloat(
          data?.last_month_total_paid,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: 14,
      },
      {
        title: "",
        value: `Restante: $${parseFloat(
          data?.last_month_total_left,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: 14,
      },
    ],
  },
  {
    backgroundClass: "shadow-md bg-gradient-to-r from-orange-50 to-yellow-200",
    statistics: [
      {
        title: currentMonth,
        value: `Total estimado: $${parseFloat(
          data?.current_month_total,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: fontSize,
        fontWeight: "bold",
      },
      {
        title: "",
        value: `Pagado: $${parseFloat(
          data?.current_month_total_paid,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: 14,
      },
      {
        title: "",
        value: `Restante: $${parseFloat(
          data?.current_month_total_left,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: 14,
      },
    ],
  },
  {
    backgroundClass: "shadow-md bg-gradient-to-r from-orange-50 to-red-200",
    statistics: [
      {
        title: nextMonth,
        value: `Total estimado: $${parseFloat(
          data?.next_month_total,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: fontSize,
        fontWeight: "bold",
      },
      {
        title: "",
        value: `Pagado: $${parseFloat(
          data?.next_month_total_paid,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: 14,
      },
      {
        title: "",
        value: `Restante: $${parseFloat(
          data?.next_month_total_left,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: 14,
      },
    ],
  },
];
