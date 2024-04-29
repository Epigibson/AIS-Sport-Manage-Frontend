export const PaymentFormFields = [
  {
    name: "user",
    label: "Usuario",
    rules: [{ required: true, message: "Ingresa el Usuario." }],
    inputType: "select",
    optionsSource: "users",
  },
  {
    name: "athlete",
    label: "Atleta",
    rules: [{ required: true, message: "Ingresa el Atleta." }],
    inputType: "select",
    optionsSource: "athletes",
    dependentOn: {
      field: "user", // El campo del cual depende
      relatedKey: "athletes", // La clave en los datos de atletas que corresponde al valor en el campo usuario
    },
  },
  {
    name: "package",
    label: "Paquete",
    rules: [{ required: true, message: "Ingresa la membresia." }],
    inputType: "select",
    optionsSource: "products",
  },
  {
    name: "receipt_type",
    label: "Tipo de Recibo",
    rules: [{ required: true, message: "Ingresa el tipo de recibo." }],
    inputType: "select",
    options: [
      { label: "Pago", value: "payment" },
      { label: "Inscripcion", value: "inscription" },
      { label: "Mensualidad", value: "product" },
      { label: "Ajuste", value: "refund" },
    ],
  },
  {
    name: "amount",
    label: "Cantidad",
    rules: [{ required: true, message: "Ingresa el monto." }],
    inputType: "number",
  },
  {
    name: "concept",
    label: "Concepto",
    rules: [{ required: true, message: "Ingresa el concepto." }],
    inputType: "input",
  },
  {
    name: "period_month",
    label: "Mes",
    rules: [{ required: true, message: "Ingresa el concepto." }],
    inputType: "datePicker",
    picker: "month",
  },
  {
    name: "period_year",
    label: "Año",
    rules: [{ required: true, message: "Ingresa el concepto." }],
    inputType: "datePicker",
    picker: "year",
  },
];
