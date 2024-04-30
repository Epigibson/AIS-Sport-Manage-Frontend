export const AthleteMembershipAssignFields = [
  {
    name: "membership_id",
    label: "Membresias",
    inputType: "select",
    rules: [{ required: true, message: "Por favor ingrese la membresia." }],
    optionsSource: "products",
  },
];
