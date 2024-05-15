export const getAmountsByStatus = (data) => {
  const totals = {
    active_athletes: 0,
    inactive_athletes: 0,
    pending: 0,
    paid: 0,
    cancelled: 0,
    created: 0,
    total: 0, // Añadir total global
  };

  data?.forEach((athlete) => {
    athlete.status === true
      ? (totals.active_athletes += 1)
      : (totals.inactive_athletes += 1);
    athlete?.payments.forEach((payment) => {
      switch (payment.status) {
        case "Pendiente":
          totals.pending += payment.amount;
          break;
        case "Pagado":
          totals.paid += payment.amount;
          break;
        case "Cancelado":
          totals.cancelled += payment.amount;
          break;
        case "Creado":
          totals.pending += payment.amount;
          break;
        default:
          // Handle unexpected status or do nothing
          break;
      }
      totals.total += payment.status !== "Cancelado" ? payment.amount : 0; // Actualizar total global
    });
  });

  return totals;
};
