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
