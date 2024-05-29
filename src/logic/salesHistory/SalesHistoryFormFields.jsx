export const SalesHistoryFormFields = [
  {
    name: "product_id",
    label: "Producto",
    rules: [{ required: true, message: "El nombre es obligatorio" }],
    inputType: "select",
    optionsSource: "salesProducts",
    dependentFields: [
      {
        name: "product_price",
        sourceField: "price",
      },
      {
        name: "quantity_stock",
        sourceField: "quantity_stock",
      },
      {
        name: "total_price",
        sourceField: "price",
        calculate: (productPrice, quantity) => productPrice * quantity,
        relatedFields: ["product_quantity"],
      },
    ],
  },
  {
    name: "is_lost",
    label: "Es Cortesia",
    rules: [
      { required: true, message: "Definir si es cortesia es obligatorio" },
    ],
    inputType: "checkbox",
    tooltip: "Selecciona esta opción para indicar si sera cortesia.",
  },
  {
    name: "product_price",
    label: "Precio",
    rules: [{ required: true, message: "El precio es obligatorio" }],
    inputType: "number",
    formatter: "money",
    disabled: true,
  },
  {
    name: "product_quantity",
    label: "Cantidad",
    rules: [
      { required: true, message: "La cantidad es obligatoria" },
      ({ getFieldValue }) => ({
        validator(_, value) {
          const quantityStock = getFieldValue("quantity_stock");
          if (value > quantityStock) {
            return Promise.reject(
              new Error("La cantidad no puede superar las existencias"),
            );
          }
          return Promise.resolve();
        },
      }),
    ],
    inputType: "number",
  },
  {
    name: "quantity_stock",
    label: "Existencias",
    rules: [{ required: true, message: "La cantidad es obligatoria" }],
    inputType: "number",
    disabled: true,
  },
  {
    name: "total_price",
    label: "Precio Total",
    rules: [{ required: true, message: "El precio total es obligatorio" }],
    inputType: "number",
    formatter: "money",
    disabled: true,
  },
  {
    name: "payment_method",
    label: "Método de Pago",
    rules: [{ required: true, message: "El metodo de pago es obligatorio" }],
    inputType: "select",
    options: [
      { label: "Efectivo", value: "Efectivo" },
      { label: "Transferencia", value: "Transferencia" },
    ],
  },
];
