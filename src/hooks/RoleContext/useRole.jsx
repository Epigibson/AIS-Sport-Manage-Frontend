import { useContext } from "react";
import RoleContext from "./RoleContext.jsx";

export const useRole = () => {
  useContext(RoleContext);
  return useContext(RoleContext);
};
