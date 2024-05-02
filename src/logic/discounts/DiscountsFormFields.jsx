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
    // valuePropName: "checked",
    // tooltip:
    //   "Selecciona esta opción para agregar la solución del ticket a la Base de Conocimientos, donde otros usuarios pueden beneficiarse de ella.",
    // Puedes omitir 'rules' si no es necesario para un campo específico
  },
  {
    name: "product_id",
    label: "Membresia",
    inputType: "select",
    optionsSource: "products",
  },
  // {
  //   name: "price",
  //   label: "Precio de Membresia",
  //   rules: [{ required: false }],
  //   inputType: "input",
  //   dependencies: {
  //     fieldName: "product_id",
  //     relatedKey: "price",
  //     value: true,
  //   },
  // },
  {
    name: "discount_percentage",
    label: "Porcentaje",
    rules: [{ required: true }],
    inputType: "number", // Indica el tipo de control de entrada
  },
  {
    name: "discount_amount",
    label: "Porcentaje en Monto",
    rules: [{ required: true }],
    inputType: "number",
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
    name: "athletes",
    label: "Atletas",
    inputType: "multipleSelect",
    optionsSource: "athletes",
  },
];
