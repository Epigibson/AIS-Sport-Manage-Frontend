export const UserListFormFields = [
  {
    name: "balance_amount",
    label: "Saldo",
    rules: [{ required: true, message: "El saldo es obligatorio" }],
    inputType: "number",
    formatter: "money",
  },
  {
    name: "payment_method",
    label: "Metodo de Pago",
    rules: [{ required: true, message: "El metodo de pago es obligatorio" }],
    inputType: "select",
    options: [
      { label: "Efectivo", value: "Efectivo" },
      { label: "Transferencia", value: "Transferencia" },
    ],
  },
];
