export const PaymentCancelFields = [
  {
    name: "cancel_reason",
    label: "Motivo de cancelacion",
    rules: [
      {
        required: true,
        message: "Especifica el motivo por el cual se cancelo el recibo.",
      },
    ],
    inputType: "input",
  },
];
