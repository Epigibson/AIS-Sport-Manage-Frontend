export const ConvertDatetimeToMonth = (datetime) => {
  return new Date(datetime).toLocaleString("default", { month: "long" });
};
