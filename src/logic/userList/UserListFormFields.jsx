export const UserListFormFields = [
  {
    name: "balance_amount",
    label: "Saldo",
    rules: [{ required: true, message: "El saldo es obligatorio" }],
    inputType: "number",
    formatter: "money",
  },
];
