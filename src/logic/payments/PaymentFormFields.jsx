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
      field: "user", // Field this one depends on
      fromCollection: "users", // Collection to get data from
      relatedKey: "athletes", // Key in the user data to filter athletes
      type: "relation", // Indicate this is a relation dependency
    },
    visible: true,
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
    label: "Recibo correspondiente al mes de:",
    rules: [{ required: true, message: "Ingresa el concepto." }],
    inputType: "datePicker",
    picker: "month",
  },
  {
    name: "period_year",
    label: "Del año:",
    rules: [{ required: true, message: "Ingresa el concepto." }],
    inputType: "datePicker",
    picker: "year",
  },
];
