export const packageFormFields = [
  {
    name: "product_name",
    label: "Nombre del producto",
    rules: [{ required: true }],
    inputType: "input", // Indica el tipo de control de entrada
  },
  {
    name: "product_description",
    label: "Descripcion del producto",
    rules: [{ required: true }],
    inputType: "input",
    // valuePropName: "checked",
    // tooltip:
    //   "Selecciona esta opción para agregar la solución del ticket a la Base de Conocimientos, donde otros usuarios pueden beneficiarse de ella.",
    // Puedes omitir 'rules' si no es necesario para un campo específico
  },
  {
    name: "price",
    label: "Precio del producto",
    rules: [{ required: true }],
    inputType: "input", // Indica el tipo de control de entrada
  },
  {
    name: "category",
    label: "Categoria del producto",
    rules: [{ required: true }],
    inputType: "input", // Indica el tipo de control de entrada
  },
];
