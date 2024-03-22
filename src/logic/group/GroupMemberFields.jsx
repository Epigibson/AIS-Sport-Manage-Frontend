export const groupMemberFields = [
  {
    name: "members",
    label: "Usuarios",
    rules: [{ required: true }],
    inputType: "multipleSelect", // Indica el tipo de control de entrada
    optionsSource: "users",
  },
];
