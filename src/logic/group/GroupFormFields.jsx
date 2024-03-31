export const groupFormFields = [
  {
    name: "name",
    label: "Nombre del grupo",
    rules: [{ required: false }],
    inputType: "input", // Indica el tipo de control de entrada
  },
  {
    name: "description",
    label: "Descripcion del grupo",
    rules: [{ required: false }],
    inputType: "input",
  },
  {
    name: "couch",
    label: "Coach",
    rules: [{ required: true }],
    inputType: "select", // Indica el tipo de control de entrada
    optionsSource: "couches", // Utiliza un identificador para las opciones
  },
  {
    name: "status",
    label: "Estatus",
    rules: [{ required: false }],
    inputType: "select",
    options: [
      { label: "Activo", value: "Activo" },
      { label: "Deshabilitado", value: "Deshabilitado" },
    ],
  },
  {
    name: "capacity",
    label: "Capacidad",
    rules: [{ required: false }],
    inputType: "input", // Indica el tipo de control de entrada
  },
  {
    name: "schedule",
    label: "Horarios",
    rules: [{ required: false }],
    inputType: "schedule", // Indica el tipo de control de entrada
  },
  {
    name: "schedule_initial_final",
    label: "Dias",
    rules: [{ required: false }],
    inputType: "multipleSelect", // Indica el tipo de control de entrada
    options: [
      { label: "Lunes", value: "L" },
      { label: "Martes", value: "M" },
      { label: "Miercoles", value: "X" },
      { label: "Jueves", value: "J" },
      { label: "Viernes", value: "V" },
      { label: "Sábado", value: "S" },
      { label: "Domingo", value: "D" },
    ],
  },
];
