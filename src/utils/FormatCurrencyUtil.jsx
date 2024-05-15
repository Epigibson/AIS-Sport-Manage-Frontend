import PropTypes from "prop-types";

export const FormatCurrencyUtil = (amount) => {
  const formatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  });
  return formatter.format(amount);
};

FormatCurrencyUtil.propTypes = {
  amount: PropTypes.number.isRequired,
};
