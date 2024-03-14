export const groupFormFields = [
  {
    name: "name",
    label: "Nombre del grupo",
    rules: [{ required: true }],
    inputType: "input", // Indica el tipo de control de entrada
  },
  {
    name: "description",
    label: "Descripcion del grupo",
    rules: [{ required: true }],
    inputType: "input",
  },
  // {
  //   name: "couch",
  //   label: "Couch",
  //   rules: [{ required: true }],
  //   inputType: "select", // Indica el tipo de control de entrada
  //   optionsSource: "couches", // Utiliza un identificador para las opciones
  // },
  {
    name: "status",
    label: "Estatus",
    rules: [{ required: true }],
    inputType: "select",
    options: [
      { label: "Activo", value: "Activo" },
      { label: "Deshabilitado", value: "Deshabilitado" },
    ],
  },
  {
    name: "capacity",
    label: "Capacidad",
    rules: [{ required: true }],
    inputType: "input", // Indica el tipo de control de entrada
  },
  {
    name: "schedule",
    label: "Horarios",
    rules: [{ required: true }],
    inputType: "schedule", // Indica el tipo de control de entrada
  },
  {
    name: "schedule_initial_final",
    label: "Dias",
    rules: [{ required: true }],
    inputType: "multipleSelect", // Indica el tipo de control de entrada
    options: [
      { label: "Lunes", value: "Lunes" },
      { label: "Martes", value: "Martes" },
      { label: "Miercoles", value: "Miercoles" },
      { label: "Jueves", value: "Jueves" },
      { label: "Viernes", value: "Viernes" },
      { label: "Sabado", value: "Sabado" },
      { label: "Domingo", value: "Domingo" },
    ],
  },
];
