export const groupMemberFields = [
  {
    name: "members",
    label: "Atletas",
    rules: [{ required: true }],
    inputType: "multipleSelect", // Indica el tipo de control de entrada
    optionsSource: "athletes",
  },
];
