export const GroupAssignFields = [
  {
    name: "users",
    label: "Usuario",
    rules: [{ required: true }],
    inputType: "multipleSelect", // Indica el tipo de control de entrada
    optionsSource: "users", // Utiliza un identificador para las opciones
  },
  {
    name: "group",
    label: "Grupo",
    rules: [{ required: true }],
    inputType: "select", // Indica el tipo de control de entrada
    optionsSource: "groups", // Utiliza un identificador para las opciones
  },
];
