import { useContext } from "react";
import UsersContext from "./UserContext.jsx";

export const useUsers = () => {
  useContext(UsersContext);
  return useContext(UsersContext);
};
