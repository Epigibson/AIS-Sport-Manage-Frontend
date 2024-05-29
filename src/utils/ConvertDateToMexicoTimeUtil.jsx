import { format, subHours } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";

const timeZone = "America/Mexico_City";

export const convertToMexicoCityTimeAndSubtractSixHours = (date) => {
  // Convertir a la zona horaria de la Ciudad de México
  const mexicoCityDate = formatInTimeZone(
    new Date(date),
    timeZone,
    "yyyy-MM-dd HH:mm:ssXXX",
  );
  // Restar 6 horas
  const adjustedDate = subHours(new Date(mexicoCityDate), 6);
  // Formatear la fecha ajustada
  return format(new Date(adjustedDate), "dd/MM/yyyy");
};
