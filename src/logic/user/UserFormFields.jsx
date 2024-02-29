export const userFormFields = [
  {
    name: "name",
    label: "Nombre",
    rules: [{ required: true }],
    inputType: "input", // Indica el tipo de control de entrada
  },
  {
    name: "username",
    label: "Usuario",
    rules: [{ required: true }],
    inputType: "input",
  },
  {
    name: "email",
    label: "Email",
    rules: [{ required: true }],
    inputType: "input",
  },
  {
    name: "age",
    label: "Edad",
    rules: [{ required: true }],
    inputType: "input",
  },
  {
    name: "mobile",
    label: "Celular",
    rules: [{ required: true }],
    inputType: "input",
  },
  {
    name: "gender",
    label: "Genero",
    rules: [{ required: true }],
    inputType: "select",
    options: [
      { label: "Masculino", value: "Masculino" },
      { label: "Femenino", value: "Femenino" },
      { label: "Otro", value: "Otro" },
    ],
  },
  {
    name: "group_id",
    label: "Grupo",
    rules: [{ required: true }],
    inputType: "select", // Indica el tipo de control de entrada
    optionsSource: "groups", // Utiliza un identificador para las opciones
  },
];
