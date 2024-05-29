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

export const getDataSource = (
  source,
  { categories, couches, groups, users, athletes, packages, products },
) => {
  return {
    categories: categories || [],
    couches: couches || [],
    groups: groups || [],
    users: users || [],
    athletes: athletes || [],
    products: (packages || []).filter((p) => p.product_name !== "Inscripcion"),
    salesProducts: products || [],
  }[source];
};

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
