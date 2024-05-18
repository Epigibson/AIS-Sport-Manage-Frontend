export const AthletesPaymentMonthSelector = () => {
  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth(); // Mes actual (indexado desde 0)
  const currentMonth = currentMonthIndex + 1; // Sumar 1 para obtener el mes real
  const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1; // Si es enero, el mes anterior es diciembre
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1; // Si es diciembre, el siguiente mes es enero

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const lastMonthName = monthNames[lastMonth - 1];
  const currentMonthName = monthNames[currentMonthIndex];
  const nextMonthName = monthNames[nextMonth - 1];

  return { lastMonthName, currentMonthName, nextMonthName };
};
