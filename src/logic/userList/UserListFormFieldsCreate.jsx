export const UserListFormFieldsCreate = [
  {
    name: "email",
    label: "Correo",
    rules: [
      { required: true, message: "El correo electronico es obligatorio" },
    ],
    inputType: "input",
  },
  {
    name: "password",
    label: "Contraseña",
    rules: [{ required: true, message: "La contraseña es obligatoria" }],
    inputType: "password",
  },
  {
    name: "name",
    label: "Nombre",
    rules: [{ required: true, message: "El nombre es obligatorio" }],
    inputType: "input",
  },
];
