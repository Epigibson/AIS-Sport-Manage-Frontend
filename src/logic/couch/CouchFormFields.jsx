export const couchFormFields = [
  {
    name: "name",
    label: "Nombre",
    rules: [{ required: true, message: "El nombre es obligatorio" }],
    inputType: "input", // Indica el tipo de control de entrada
  },
  {
    name: "username",
    label: "Usuario",
    rules: [{ required: true, message: "El usuario es obligatorio" }],
    inputType: "input",
  },
  {
    name: "email",
    label: "Email",
    rules: [{ required: true, message: "El email es obligatorio" }],
    inputType: "input",
  },
  {
    name: "age",
    label: "Edad",
    rules: [{ required: true, message: "La edad es obligatoria" }],
    inputType: "input",
  },
  {
    name: "gender",
    label: "Genero",
    rules: [{ required: true, message: "El genero es obligatorio" }],
    inputType: "select",
    options: [
      { label: "Masculino", value: "Masculino" },
      { label: "Femenino", value: "Femenino" },
      { label: "Otro", value: "Otro" },
    ],
  },
  {
    name: "groups",
    label: "Grupo",
    rules: [{ required: true, message: "El grupo es obligatorio" }],
    inputType: "multipleSelect", // Indica el tipo de control de entrada
    optionsSource: "groups", // Utiliza un identificador para las opciones
  },
];
