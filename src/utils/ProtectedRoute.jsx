import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext.jsx";

export const ProtectedRoute = ({ path, element }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return navigate(user ? "/home" : "/login");
};
