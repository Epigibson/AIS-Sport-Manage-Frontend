export const AthletePrepareFilters = (data, dataIndex) => {
  if (!data) return [];

  // Extraer y aplanar los valores únicos de los nombres de los productos
  const uniqueValues = Array.from(
    new Set(
      data.flatMap((item) => {
        const itemsArray = item[dataIndex];
        return itemsArray ? itemsArray.map((subItem) => subItem.name) : [];
      }),
    ),
  );

  return uniqueValues.map((value) => ({
    text: value.toString(),
    value,
  }));
};
