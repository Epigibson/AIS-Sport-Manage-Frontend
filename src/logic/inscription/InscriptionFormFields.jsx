export const InscriptionFormFields = [
  {
    name: "email",
    label: "Correo de Contacto",
    rules: [{ required: true, message: "El email es requerido" }],
    inputType: "input",
  },
  {
    name: "phone",
    label: "Celular 1",
    rules: [{ required: true, message: "El número de celular 1 es requerido" }],
    inputType: "number",
  },
  {
    name: "mobile",
    label: "Celular 2",
    rules: [
      { required: false, message: "El número de celular 2 es requerido" },
    ],
    inputType: "number",
  },
  {
    name: "tutors_name_one",
    label: "Nombre del Tutor 1",
    rules: [{ required: true, message: "El nombre del tutor 1 es requerido" }],
    inputType: "input", // Indica el tipo de control de entrada
  },
  {
    name: "tutors_name_two",
    label: "Nombre del Tutor 2",
    rules: [{ required: false, message: "El nombre del tutor 2 es requerido" }],
    inputType: "input", // Indica el tipo de control de entrada
  },
  {
    name: "name",
    label: "Nombre del Atleta",
    rules: [{ required: true, message: "El nombre del atleta es requerido" }],
    inputType: "input", // Indica el tipo de control de entrada
  },
  {
    name: "gender",
    label: "Genero",
    rules: [{ required: true, message: "El genero es requerido" }],
    inputType: "select",
    options: [
      { label: "Masculino", value: "Masculino" },
      { label: "Femenino", value: "Femenino" },
    ],
  },
  {
    name: "age",
    label: "Edad",
    rules: [{ required: true, message: "La edad es requerida" }],
    inputType: "number",
  },
  // {
  //   name: "username",
  //   label: "Usuario",
  //   rules: [{ required: true, message: "El usuario es requerido" }],
  //   inputType: "input",
  // },
  {
    name: "sport_preference",
    label: "Actividad de Prefreferencia",
    rules: [
      { required: true, message: "La actividad de preferencia es requerida" },
    ],
    inputType: "select",
    options: [
      { label: "Soccer", value: "Soccer" },
      { label: "Americano", value: "Americano" },
      { label: "Box", value: "Box" },
      { label: "Acondicionamiento", value: "Acondicionamiento" },
      { label: "Gimnasio", value: "Gimnasio" },
      { label: "Flag", value: "Flag" },
    ],
  },
  {
    name: "hobbies",
    label: "Otros Deportes",
    rules: [{ required: false, message: "Los hobbies son requeridos" }],
    inputType: "multipleSelect",
    options: [
      { label: "Soccer", value: "Soccer" },
      { label: "Americano", value: "Americano" },
      { label: "Box", value: "Box" },
      { label: "Acondicionamiento", value: "Acondicionamiento" },
      { label: "Gimnasio", value: "Gimnasio" },
      { label: "Flag", value: "Flag" },
      // { label: "Otros Deportes", value: "Otros Deportes" },
    ],
  },
  {
    name: "products",
    label: "Paquete",
    rules: [{ required: false, message: "El paquete es requerido" }],
    inputType: "multipleSelect",
    optionsSource: "packages", // Utiliza un identificador para las opciones
  },
  {
    name: "start_date",
    label: "Fecha de Inicio",
    rules: [{ required: false, message: "El paquete es requerido" }],
    inputType: "datePicker",
  },
];
