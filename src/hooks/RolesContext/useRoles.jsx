import { useContext } from "react";
import RolesContext from "./RolesContext.jsx";

export const useRoles = () => {
  useContext(RolesContext);
  return useContext(RolesContext);
};
