export const DiscountsFormFields = [
  {
    name: "discount_name",
    label: "Nombre del descuento",
    rules: [
      {
        required: true,
        message: "Porfavor introduce el nombre del descuento.",
      },
    ],
    inputType: "input", // Indica el tipo de control de entrada
  },
  {
    name: "discount_description",
    label: "Descripcion",
    rules: [{ required: true, message: "Porfavor introduce una descripcion." }],
    inputType: "input",
  },
  {
    name: "discount_percentage",
    label: "Porcentaje",
    rules: [
      {
        required: true,
        message: "Porfavor introduce el porcentaje del descuento.",
      },
    ],
    inputType: "number", // Indica el tipo de control de entrada
  },
  {
    name: "discount_code",
    label: "Codigo de Descuento",
    rules: [
      {
        required: true,
        message: "Porfavor introduce el código que se utilizará.",
      },
    ],
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
    rules: [
      ({ getFieldValue }) => {
        return {
          validator: (_, value) => {
            const is_recurrent = getFieldValue("is_recurrent");
            if (is_recurrent && !value) {
              return Promise.reject(
                new Error("Debe seleccionar al menos un atleta"),
              );
            } else {
              return Promise.resolve();
            }
          },
        };
      },
    ],
    optionsSource: "athletes",
    dependentOn: {
      field: "is_recurrent",
      value: false,
      initialValueVisible: true,
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
      value: false,
      initialValueVisible: true,
      type: "visible",
    },
  },
];
