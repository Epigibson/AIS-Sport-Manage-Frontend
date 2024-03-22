import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "./tokenUtils.jsx";
import PropTypes from "prop-types";

export const ProtectedRoute = ({ children }) => {
  if (getToken() === null) {
    return <Navigate to="/" />;
  }
  return children ? children : <Outlet />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node, // 'node' cubre cualquier cosa que pueda ser renderizada: números, strings, elementos o fragmentos
};
