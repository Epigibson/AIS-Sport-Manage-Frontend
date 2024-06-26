export const DiscountsFormFields = [
  {
    name: "discount_name",
    label: "Nombre del descuento",
    rules: [{ required: true }],
    inputType: "input", // Indica el tipo de control de entrada
  },
  {
    name: "discount_description",
    label: "Descripcion",
    rules: [{ required: true }],
    inputType: "input",
  },
  {
    name: "discount_percentage",
    label: "Porcentaje",
    rules: [{ required: true }],
    inputType: "number", // Indica el tipo de control de entrada
  },
  {
    name: "discount_code",
    label: "Codigo de Descuento",
    rules: [{ required: true }],
    inputType: "input",
  },
  {
    name: "is_active",
    label: "Estatus",
    rules: [{ required: false }],
    inputType: "select",
    options: [
      { label: "Activo", value: true },
      { label: "Deshabilitado", value: false },
    ],
  },
  {
    name: "is_recurrent",
    label: "Es recurrente",
    inputType: "checkbox",
    tooltip:
      "Selecciona esta opción para agregar el producto a la lista de temporales.",
  },
  {
    name: "athletes",
    label: "Atletas",
    inputType: "multipleSelect",
    optionsSource: "athletes",
    dependentOn: {
      field: "is_recurrent",
      value: true,
      type: "visible",
    },
  },
  {
    name: "product_id",
    label: "Membresia",
    inputType: "select",
    optionsSource: "packages",
    dependentOn: {
      field: "is_recurrent",
      value: true,
      type: "visible",
    },
  },
];
