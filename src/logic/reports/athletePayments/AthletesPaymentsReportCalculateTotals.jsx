export const AthletesPaymentsReportCalculateTotals = (data) => {
  const totals = {
    active_athletes: 0,
    inactive_athletes: 0,
    pending: 0,
    paid: 0,
    cancelled: 0,
    created: 0,
    total: 0,

    pending_by_month: {},
    paid_by_month: {},
    cancelled_by_month: {},
    created_by_month: {},
    total_by_month: {},
    pending_by_month_count: {},
    paid_by_month_count: {},
    cancelled_by_month_count: {},
    created_by_month_count: {},
    total_by_month_count: {},
    athletes_created_by_month: {},
    active_athletes_by_month: {},
    inactive_athletes_by_month: {},
  };

  data?.forEach((athlete) => {
    athlete.status === true
      ? (totals.active_athletes += 1)
      : (totals.inactive_athletes += 1);

    const creationMonth = athlete?.start_date?.slice(0, 7); // Asumiendo que la fecha es en formato YYYY-MM-DD

    if (!totals.athletes_created_by_month[creationMonth])
      totals.athletes_created_by_month[creationMonth] = 0;
    if (!totals.active_athletes_by_month[creationMonth])
      totals.active_athletes_by_month[creationMonth] = 0;
    if (!totals.inactive_athletes_by_month[creationMonth])
      totals.inactive_athletes_by_month[creationMonth] = 0;

    totals.athletes_created_by_month[creationMonth] += 1;
    if (athlete.status === true) {
      totals.active_athletes_by_month[creationMonth] += 1;
    } else {
      totals.inactive_athletes_by_month[creationMonth] += 1;
    }
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

    const paymentPeriods = Object.keys(athlete.payments_by_month);
    paymentPeriods.forEach((period) => {
      athlete.payments_by_month[period].forEach((payment) => {
        if (!totals.pending_by_month[period])
          totals.pending_by_month[period] = 0;
        if (!totals.paid_by_month[period]) totals.paid_by_month[period] = 0;
        if (!totals.cancelled_by_month[period])
          totals.cancelled_by_month[period] = 0;
        if (!totals.created_by_month[period])
          totals.created_by_month[period] = 0;
        if (!totals.total_by_month[period]) totals.total_by_month[period] = 0;

        if (!totals.pending_by_month_count[period])
          totals.pending_by_month_count[period] = 0;
        if (!totals.paid_by_month_count[period])
          totals.paid_by_month_count[period] = 0;
        if (!totals.cancelled_by_month_count[period])
          totals.cancelled_by_month_count[period] = 0;
        if (!totals.created_by_month_count[period])
          totals.created_by_month_count[period] = 0;
        if (!totals.total_by_month_count[period])
          totals.total_by_month_count[period] = 0;

        switch (payment.status) {
          case "Pendiente":
            totals.pending_by_month[period] += payment.amount;
            totals.pending_by_month_count[period] += 1;
            break;
          case "Pagado":
            totals.paid_by_month[period] += payment.amount;
            totals.paid_by_month_count[period] += 1;
            break;
          case "Cancelado":
            totals.cancelled_by_month[period] += payment.amount;
            totals.cancelled_by_month_count[period] += 1;
            break;
          case "Creado":
            totals.pending_by_month[period] += payment.amount;
            totals.pending_by_month_count[period] += 1;
            break;
          default:
            break;
        }
        totals.total_by_month[period] +=
          payment.status !== "Cancelado" ? payment.amount : 0;
        totals.total_by_month_count[period] += 1;
      });
    });
  });

  return totals;
};
