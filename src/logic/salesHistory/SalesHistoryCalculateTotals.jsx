export const SalesHistoryCalculateTotals = (data) => {
  // Asegúrate de que 'data' es un array antes de proceder
  if (!Array.isArray(data)) {
    console.error("Data no es un array:", data);
    return { total: 0, cortesias: 0, ventas: 0 };
  }
  const totals = {
    ventas: 0, // Total de ventas
    cant_cortesias: 0, // Cantidad de cortesías
    cant_ventas: 0, // Cantidad de ventas
  };

  data.forEach((item) => {
    if (item.payment_method === "Cortesia") {
      totals.cant_cortesias += 1;
    } else {
      totals.ventas += item.total_price;
      totals.cant_ventas += 1;
    }
  });

  console.log("Ventas", data);
  console.log("Totales:", totals);

  return totals;
};
