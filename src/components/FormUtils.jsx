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
  const selectedItem = dependencies.salesProducts?.find(
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
