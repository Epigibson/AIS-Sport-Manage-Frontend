export const PrepareFiltersColumn = (data, dataIndex) => {
  if (!data) return [];

  const uniqueValues = Array.from(new Set(data.map((item) => item[dataIndex])));

  return uniqueValues.map((value) => {
    // Handle null, undefined, and other data types appropriately
    const displayValue =
      value !== null && value !== undefined ? value.toString() : "N/A";
    return {
      text: displayValue,
      value,
    };
  });
};
