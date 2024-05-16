export const PrepareFilters = (data, dataIndex) => {
  if (!data) return [];
  const uniqueValues = Array.from(new Set(data.map((item) => item[dataIndex])));
  return uniqueValues.map((value) => ({
    text: value.toString(),
    value,
  }));
};
