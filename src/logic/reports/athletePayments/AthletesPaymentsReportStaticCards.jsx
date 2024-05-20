export const AthletesPaymentsReportStaticCards = (data, monthSelector) => [
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
    backgroundClass: "shadow-md bg-gradient-to-r from-yellow-50 to-green-200",
    statistics: [
      {
        title: monthSelector.lastMonthName,
        value: `Total Estimado: $${parseFloat(
          data.total_by_month["previousMonth"] !== undefined
            ? data.total_by_month["previousMonth"]
            : 0,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: 12,
        fontWeight: "bold",
      },
      {
        title: "",
        value: `Total Pagado: $${parseFloat(
          data.paid_by_month["previousMonth"] !== undefined
            ? data.paid_by_month["previousMonth"]
            : 0,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: 12,
      },
      {
        title: "",
        value: `Total Pendiente: $${parseFloat(
          data.pending_by_month["previousMonth"] !== undefined
            ? data.pending_by_month["previousMonth"]
            : 0,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: 12,
      },
    ],
  },
  {
    backgroundClass: "shadow-md bg-gradient-to-r from-green-50 to-yellow-200",
    statistics: [
      {
        title: monthSelector.currentMonthName,
        value: `Total Estimado: $${parseFloat(
          data.total_by_month["currentMonth"] !== undefined
            ? data.total_by_month["currentMonth"]
            : 0,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: 12,
        fontWeight: "bold",
      },
      {
        title: "",
        value: `Total Pagado: $${parseFloat(
          data.paid_by_month["currentMonth"] !== undefined
            ? data.paid_by_month["currentMonth"]
            : 0,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: 12,
      },
      {
        title: "",
        value: `Total Pendiente: $${parseFloat(
          data.pending_by_month["currentMonth"] !== undefined
            ? data.pending_by_month["currentMonth"]
            : 0,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: 12,
      },
    ],
  },
  {
    backgroundClass: "shadow-md bg-gradient-to-r from-orange-50 to-blue-200",
    statistics: [
      {
        title: monthSelector.nextMonthName,
        value: `Total Estimado: $${parseFloat(
          data.total_by_month["nextMonth"] !== undefined
            ? data.total_by_month["nextMonth"]
            : 0,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: 12,
        fontWeight: "bold",
      },
      {
        title: "",
        value: `Total Pagado: $${parseFloat(
          data.paid_by_month["nextMonth"] !== undefined
            ? data.paid_by_month["nextMonth"]
            : 0,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: 12,
      },
      {
        title: "",
        value: `Total Pendiente: $${parseFloat(
          data.pending_by_month["nextMonth"] !== undefined
            ? data.pending_by_month["nextMonth"]
            : 0,
        ).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: 12,
      },
    ],
  },
];
