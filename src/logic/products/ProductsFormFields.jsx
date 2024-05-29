export const ProductsFormFields = [
  {
    name: "name",
    label: "Nombre",
    rules: [{ required: true, message: "El nombre es obligatorio" }],
    inputType: "input",
  },
  {
    name: "price",
    label: "Precio",
    rules: [{ required: true, message: "El precio es obligatorio" }],
    inputType: "number",
    formatter: "money",
  },
  {
    name: "quantity_stock",
    label: "Cantidad",
    rules: [{ required: true, message: "La cantidad es obligatoria" }],
    inputType: "number",
  },
  {
    name: "description",
    label: "Descripcion",
    rules: [{ required: true, message: "La descripcion es obligatoria" }],
    inputType: "input",
  },
  {
    name: "status",
    label: "Disponibilidad",
    rules: [{ required: true, message: "La disponibilidad es obligatoria" }],
    inputType: "select",
    options: [
      { label: "Disponible", value: true },
      { label: "No Disponible", value: false },
    ],
  },
];
