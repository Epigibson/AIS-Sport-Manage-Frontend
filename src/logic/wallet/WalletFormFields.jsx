export const WalletFormFields = [
  {
    name: "user",
    label: "Usuario",
    rules: [{ required: true, message: "El usuario es obligatorio" }],
    inputType: "select",
    optionsSource: "users",
  },
];
