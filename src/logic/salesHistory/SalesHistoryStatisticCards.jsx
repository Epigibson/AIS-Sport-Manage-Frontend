export const SalesHistoryStatisticCards = (data) => [
  {
    backgroundClass: "shadow-md bg-gradient-to-r from-yellow-50 to-green-200",
    statistics: [
      {
        title: "Total de Venta",
        value: `$${parseFloat(data?.ventas).toLocaleString("es-MX", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} MXN`,
        fontSize: 14,
        fontWeight: "bold",
      },
    ],
  },
  {
    backgroundClass: "shadow-md bg-gradient-to-r from-cyan-50 to-purple-200",
    statistics: [
      {
        title: "",
        value: `Cantidad de Cortesias: ${data?.cant_cortesias}`,
        fontSize: 14,
      },
    ],
  },
  {
    backgroundClass: "shadow-md bg-gradient-to-r from-cyan-50 to-purple-200",
    statistics: [
      {
        title: "",
        value: `Cantidad de Ventas: ${data?.cant_ventas}`,
        fontSize: 14,
      },
    ],
  },
];
