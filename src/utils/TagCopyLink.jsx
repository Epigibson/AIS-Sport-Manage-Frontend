import { message } from "antd";

export const TagCopyLink = async (record, fieldPath, type) => {
  if (record) {
    try {
      await navigator.clipboard.writeText(fieldPath);
      message.success(`${type} copiado al portapapeles`);
    } catch (err) {
      console.error(`Error al copiar el ${type}: `, err);
      message.error(`Error al copiar ${type}`);
    }
  } else {
    message.error(`${type} no encontrado`);
  }
};
