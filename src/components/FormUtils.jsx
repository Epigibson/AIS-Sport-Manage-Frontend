export const formatMoney = (value) => {
  return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const parseMoney = (value) => {
  return value ? value.replace(/\$\s?|(,*)/g, "") : "";
};

export const formatPercentage = (value) => {
  return `${value}%`;
};

export const parsePercentage = (value) => {
  return value ? value.replace("%", "") : "";
};

// Función para obtener la fuente de datos de manera más genérica
export const getDataSource = (source, dataQueries) => {
  return dataQueries[source] || [];
};

// Función para manejar las dependencias de los campos de manera más genérica
export const handleFieldDependencies = (
  field,
  allValues,
  dependencies,
  form,
) => {
  const dependentFields = field.dependentFields;
  const selectedItem = dependencies.salesProducts.find(
    (product) => product._id === allValues[field.name],
  );

  if (selectedItem) {
    let updatedValues = { ...allValues };
    dependentFields.forEach((depField) => {
      if (depField.calculate) {
        const relatedValues = depField.relatedFields.map(
          (f) => allValues[f] || 0,
        );
        updatedValues[depField.name] = depField.calculate(
          selectedItem[depField.sourceField],
          ...relatedValues,
        );
      } else {
        updatedValues[depField.name] = selectedItem[depField.sourceField];
      }
    });
    form.setFieldsValue(updatedValues);
    return updatedValues;
  }
  return allValues;
};

// Función para manejar las dependencias de tipo relación
export const handleRelationDependency = (field, allValues, dataQueries) => {
  if (field.dependentOn && field.dependentOn.type === "relation") {
    const dependentFieldValue = allValues[field.dependentOn.field];
    if (dependentFieldValue) {
      const originData = getDataSource(
        field.dependentOn.fromCollection,
        dataQueries,
      );

      const selectedParent = originData.find(
        (item) => item._id === dependentFieldValue,
      );

      if (selectedParent && selectedParent[field.dependentOn.relatedKey]) {
        return selectedParent[field.dependentOn.relatedKey]
          .map((athleteId) =>
            dataQueries.athletes.find((athlete) => athlete._id === athleteId),
          )
          .filter((athlete) => athlete !== undefined)
          .map((athlete) => ({
            label: athlete.name || athlete.username,
            value: athlete._id,
          }));
      }
    }
  }
  return [];
};
