export const ConfigurationFields = [
  {
    fieldName: "generation_receipts",
    label: "Generacion de recibos",
    inputType: "select",
    optionSource: [
      { label: "Mes siguiente", value: "Mes siguiente" },
      { label: "Mes actual", value: "Mes actual" },
    ],
  },
  {
    fieldName: "email_notifications",
    label: "Correos para notificaciones",
    inputType: "multipleSelect",
    optionSource: "users",
  },
];
