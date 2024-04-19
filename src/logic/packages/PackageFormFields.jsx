export const packageFormFields = [
  {
    name: "product_name",
    label: "Nombre",
    rules: [{ required: true }],
    inputType: "input", // Indica el tipo de control de entrada
  },
  {
    name: "product_description",
    label: "Descripcion",
    rules: [{ required: true }],
    inputType: "input",
    // valuePropName: "checked",
    // tooltip:
    //   "Selecciona esta opción para agregar la solución del ticket a la Base de Conocimientos, donde otros usuarios pueden beneficiarse de ella.",
    // Puedes omitir 'rules' si no es necesario para un campo específico
  },
  {
    name: "price",
    label: "Precio",
    rules: [{ required: true }],
    inputType: "input", // Indica el tipo de control de entrada
  },
  {
    name: "category",
    label: "Categoria",
    rules: [{ required: true }],
    inputType: "select",
    optionsSource: "categories", // Utiliza un identificador para las opciones
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
    name: "is_temporary",
    label: "Es temporal",
    inputType: "checkbox",
    tooltip:
      "Selecciona esta opción para agregar el producto a la lista de temporales.",
  },
  {
    name: "week_duration",
    label: "Semanas de duración",
    rules: [{ required: true }],
    inputType: "input",
    dependencies: {
      fieldName: "is_temporary",
      value: true,
    },
  },
  {
    name: "start_date",
    label: "Fecha de Inicio",
    rules: [{ required: true }],
    inputType: "datePicker",
    dependencies: {
      fieldName: "is_temporary",
      value: true,
    },
  },
  {
    name: "end_date",
    label: "Fecha de Finalizacion",
    rules: [{ required: true }],
    inputType: "datePicker",
    dependencies: {
      fieldName: "is_temporary",
      value: true,
    },
  },
];
