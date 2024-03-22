import PropTypes from "prop-types";
import { notification } from "antd";

export const toastNotify = ({ type, message }) => {
  notification[type]({
    message: message,
    description: "This is the content of the notification.",
  });
};

toastNotify.propTypes = {
  type: PropTypes.oneOf(["success", "info", "warning", "error"]).isRequired,
  message: PropTypes.string.isRequired,
};
