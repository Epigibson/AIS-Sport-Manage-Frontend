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
  {
    name: "couch",
    label: "Couch",
    rules: [{ required: true }],
    inputType: "select", // Indica el tipo de control de entrada
    optionsSource: "couches", // Utiliza un identificador para las opciones
  },
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
    inputType: "input", // Indica el tipo de control de entrada
  },
];
