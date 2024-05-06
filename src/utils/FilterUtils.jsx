export const filterByName = (value, record) => {
  return record?.some((element) =>
    element.name.toLowerCase().includes(value.toLowerCase()),
  );
};

export const filterByNameTutors = (value, record) => {
  return record?.some((element) =>
    element?.tutors_name_one.toLowerCase().includes(value.toLowerCase()),
  );
};

export const filterByNameInArray = (value, record) => {
  return record?.filter((product) =>
    product?.name.toLowerCase().includes(value.toLowerCase()),
  );
};
