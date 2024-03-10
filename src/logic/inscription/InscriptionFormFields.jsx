export const InscriptionFormFields = [
  {
    name: "email",
    label: "Email",
    rules: [{ required: true }],
    inputType: "input",
  },
  {
    name: "username",
    label: "Usuario",
    rules: [{ required: true }],
    inputType: "input",
  },
  {
    name: "tutors_name",
    label: "Tutor",
    rules: [{ required: true }],
    inputType: "input", // Indica el tipo de control de entrada
  },
  {
    name: "name",
    label: "Nombre",
    rules: [{ required: true }],
    inputType: "input", // Indica el tipo de control de entrada
  },
  {
    name: "gender",
    label: "Genero",
    rules: [{ required: true }],
    inputType: "select",
    options: [
      { label: "Masculino", value: "Masculino" },
      { label: "Femenino", value: "Femenino" },
      { label: "Otro", value: "Otro" },
    ],
  },
  {
    name: "age",
    label: "Edad",
    rules: [{ required: true }],
    inputType: "number",
  },
  {
    name: "sport_preference",
    label: "Deporte de Preferencia",
    rules: [{ required: true }],
    inputType: "input",
  },
  {
    name: "hobbies",
    label: "Hobbies",
    rules: [{ required: true }],
    inputType: "multipleSelect",
    options: [
      { label: "Soccer", value: "Soccer" },
      { label: "Basketball", value: "Basketball" },
      { label: "Baseball", value: "Baseball" },
      { label: "Box", value: "Box" },
      { label: "MMA", value: "MMA" },
      { label: "Racing", value: "Racing" },
    ],
  },
  {
    name: "phone",
    label: "Telefono",
    rules: [{ required: true }],
    inputType: "number",
  },
  {
    name: "mobile",
    label: "Celular",
    rules: [{ required: true }],
    inputType: "number",
  },
  {
    name: "products",
    label: "Paquete",
    rules: [{ required: true }],
    inputType: "multipleSelect",
    optionsSource: "products", // Utiliza un identificador para las opciones
  },
];
