export const groupFormFields = [
  {
    name: "group_name",
    label: "Nombre del grupo",
    rules: [{ required: true }],
    inputType: "input", // Indica el tipo de control de entrada
  },
  {
    name: "group_description",
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
    name: "group_status",
    label: "Estatus",
    rules: [{ required: true }],
    inputType: "select",
    optionsSource: { is_active: true, is_inactive: false }, // Utiliza un identificador para las opciones
  },
];
