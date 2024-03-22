import PropTypes from "prop-types";
import { notification } from "antd";

export const toastNotify = ({ type, message, description }) => {
  notification[type]({
    message: message,
    description: description,
  });
};

toastNotify.propTypes = {
  type: PropTypes.oneOf(["success", "info", "warning", "error"]).isRequired,
  message: PropTypes.string.isRequired,
};
