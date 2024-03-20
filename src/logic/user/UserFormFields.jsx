export const userFormFields = [
  {
    name: "name",
    label: "Nombre del Atleta",
    rules: [{ required: true }],
    inputType: "input", // Indica el tipo de control de entrada
  },
  {
    name: "tutors_name_one",
    label: "Nombre del Tutor 1",
    rules: [{ required: true }],
    inputType: "input", // Indica el tipo de control de entrada
  },
  {
    name: "tutors_name_two",
    label: "Nombre del Tutor 2",
    rules: [{ required: true }],
    inputType: "input", // Indica el tipo de control de entrada
  },
  {
    name: "username",
    label: "Usuario",
    rules: [{ required: true }],
    inputType: "input",
  },
  {
    name: "email",
    label: "Email de Contacto",
    rules: [{ required: true }],
    inputType: "input",
  },
  {
    name: "age",
    label: "Edad",
    rules: [{ required: true }],
    inputType: "input",
  },
  {
    name: "phone",
    label: "Celular 1",
    rules: [{ required: true }],
    inputType: "input",
  },
  {
    name: "mobile",
    label: "Celular 2",
    rules: [{ required: true }],
    inputType: "input",
  },
  {
    name: "gender",
    label: "Genero",
    rules: [{ required: true }],
    inputType: "select",
    options: [
      { label: "Masculino", value: "Masculino" },
      { label: "Femenino", value: "Femenino" },
    ],
  },
  // {
  //   name: "group_id",
  //   label: "Grupo",
  //   rules: [{ required: true }],
  //   inputType: "select", // Indica el tipo de control de entrada
  //   optionsSource: "groups", // Utiliza un identificador para las opciones
  // },
];
