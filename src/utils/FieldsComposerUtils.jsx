import dayjs from "dayjs";

export const prepareRecord = (record) => {
  Object.entries(record).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0 && value[0].id) {
      record[key] = value.map((item) => item.id);
    } else if (value instanceof Date || typeof value === "string") {
      const dateAttempt = dayjs(value);
      if (dateAttempt.isValid()) {
        record[key] = dateAttempt;
      }
    }
    // Añadir más tipos y sus transformaciones como sea necesario
  });

  return record;
};
