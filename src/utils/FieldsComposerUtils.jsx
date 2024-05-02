import dayjs from "dayjs";

export const prepareRecord = (record) => {
  Object.entries(record).forEach(([key, value]) => {
    if (
      Array.isArray(value) &&
      value.length > 0 &&
      typeof value[0] === "object" &&
      value[0]._id
    ) {
      record[key] = value.map((item) => item._id);
    } else if (
      Array.isArray(value) &&
      value.length > 0 &&
      typeof value[0] === "object" &&
      value[0].id
    ) {
      record[key] = value.map((item) => item.id);
    } else if (
      Array.isArray(value) &&
      value.length > 0 &&
      typeof value[0] === "object" &&
      value[0].name
    ) {
      record[key] = value.map((item) => item.name);
    } else if (
      Array.isArray(value) &&
      value.length > 0 &&
      typeof value[0] === "object" &&
      value[0].title
    ) {
      record[key] = value.map((item) => item.title);
    } else if (
      Array.isArray(value) &&
      value.length > 0 &&
      typeof value[0] === "object" &&
      value[0].description
    ) {
      record[key] = value.map((item) => item.description);
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
