export const LoginFormFields = [
  {
    name: "username",
    label: "Usuario o Correo",
    width: 250,
    rules: [
      {
        required: true,
        message: "Porfavor ingresa tu correo electrocnico.",
      },
    ],
    inputType: "input", // Indica el tipo de control de entrada
  },
  {
    name: "password",
    label: "Contraseña",
    rules: [
      {
        required: true,
        message: "Porfavor ingresa una contraseña.",
      },
    ],
    inputType: "password", // Indica el tipo de control de entrada
  },
];
