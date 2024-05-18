import dayjs from "dayjs";

export const CategorizePayments = (payments) => {
  const today = dayjs();
  const previousMonth = today.subtract(1, "month");
  const nextMonth = today.add(1, "month");

  return payments.reduce(
    (acc, payment) => {
      const paymentDate = dayjs(payment.period_month);
      if (paymentDate.isSame(previousMonth, "month")) {
        acc.previousMonth.push(payment);
      } else if (paymentDate.isSame(today, "month")) {
        acc.currentMonth.push(payment);
      } else if (paymentDate.isSame(nextMonth, "month")) {
        acc.nextMonth.push(payment);
      }
      return acc;
    },
    { previousMonth: [], currentMonth: [], nextMonth: [] },
  );
};
