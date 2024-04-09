export const prepareInitialValues = (fields) => {
  const initialValues = {};
  fields.forEach((field) => {
    if (field.inputType === "checkbox") {
      // Asumimos que cada campo de tipo checkbox tiene una propiedad `defaultValue`.
      initialValues[field.name] = field.defaultValue || false;
    } else {
      // Para otros tipos de campos, también puedes asignar valores iniciales si es necesario
      // Por ejemplo, si tienes valores por defecto específicos o si quieres inicializar todos los campos de texto con cadenas vacías, etc.
      initialValues[field.name] = field.defaultValue || "";
    }
  });
  return initialValues;
};
