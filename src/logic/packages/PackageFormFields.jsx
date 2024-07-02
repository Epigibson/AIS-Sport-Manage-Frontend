export const packageFormFields = [
  {
    name: "product_name",
    label: "Nombre",
    rules: [{ required: true }],
    inputType: "input",
  },
  {
    name: "product_description",
    label: "Descripcion",
    rules: [{ required: true }],
    inputType: "input",
  },
  {
    name: "price",
    label: "Precio",
    rules: [{ required: true }],
    inputType: "input",
  },
  {
    name: "category",
    label: "Categoria",
    rules: [{ required: true }],
    inputType: "select",
    optionsSource: "categories",
  },
  {
    name: "payment_deadline",
    label: "Plazo de Pago",
    rules: [{ required: true }],
    inputType: "select",
    options: [
      { label: "8 días", value: 8 },
      { label: "15 días", value: 15 },
      { label: "30 días", value: 30 },
    ],
  },
  {
    name: "business_policy",
    label: "Politica de Negocio",
    rules: [{ required: false }],
    inputType: "checkbox",
    tooltip:
      "Selecciona esta opción para aplicar el descuento de mitad de precio del paquete si se inscribe despues del dia 15 del mes.",
  },
  {
    name: "is_temporary",
    label: "Es temporal",
    inputType: "checkbox",
    tooltip:
      "Selecciona esta opción para agregar el producto a la lista de temporales.",
  },
  {
    name: "week_duration",
    label: "Semanas de duración",
    rules: [{ required: false }],
    inputType: "input",
    dependentOn: {
      field: "is_temporary",
      value: false,
      initialValueVisible: false,
      type: "visible",
    },
  },
  {
    name: "start_date",
    label: "Fecha de Inicio",
    rules: [{ required: false }],
    inputType: "datePicker",
    dependentOn: {
      field: "is_temporary",
      value: false,
      initialValueVisible: false,
      type: "visible",
    },
  },
  {
    name: "end_date",
    label: "Fecha de Finalizacion",
    rules: [{ required: false }],
    inputType: "datePicker",
    dependentOn: {
      field: "is_temporary",
      value: false,
      initialValueVisible: false,
      type: "visible",
    },
  },
];
