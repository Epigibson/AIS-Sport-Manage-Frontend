export const StatisticCardsReportData = (
  data,
  fontSize,
  lastMonth,
  currentMonth,
  nextMonth,
) => [
  {
    backgroundClass: "shadow-md bg-gradient-to-r from-cyan-50 to-blue-200",
    statistics: [
      {
        title: lastMonth,
        value: `Total estimado: $${parseFloat(
          data?.last_month_total,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: fontSize,
      },
      {
        title: "",
        value: `Pagado: $${parseFloat(
          data?.last_month_total_paid,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: fontSize,
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
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: fontSize,
      },
      {
        title: "",
        value: `Pagado: $${parseFloat(
          data?.current_month_total_paid,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: fontSize,
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
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: fontSize,
      },
      {
        title: "",
        value: `Pagado: $${parseFloat(
          data?.next_month_total_paid,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: fontSize,
      },
    ],
  },
];
