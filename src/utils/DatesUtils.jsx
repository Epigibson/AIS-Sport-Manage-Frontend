import dayjs from "dayjs";

export const ConvertDatetimeToMonth = (datetime) => {
  return new Date(datetime).toLocaleString("default", { month: "long" });
};

export const DatePresets = [
  {
    label: "Ultimos 7 Dias",
    value: [dayjs().startOf("day").subtract(7, "days"), dayjs().endOf("day")],
  },
  {
    label: "Ultimos 30 Dias",
    value: [dayjs().startOf("day").subtract(30, "days"), dayjs().endOf("day")],
  },
  {
    label: "Ayer",
    value: [
      dayjs().startOf("day").subtract(1, "days"),
      dayjs().endOf("day").subtract(1, "days"),
    ],
  },
  {
    label: "Hoy",
    value: [dayjs().startOf("day"), dayjs().endOf("day").add(1, "days")],
  },
  {
    label: "Este Mes",
    value: [dayjs().startOf("month"), dayjs().endOf("month")],
  },
  {
    label: "Mes Pasado",
    value: [
      dayjs().startOf("month").subtract(1, "months"),
      dayjs().endOf("month").subtract(1, "months"),
    ],
  },
  {
    label: "Esta Semana",
    value: [dayjs().startOf("week"), dayjs().endOf("week")],
  },
];
