import { useQuery } from "@tanstack/react-query";
import { getAllRoles } from "../../api/RolesService.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";
import PropTypes from "prop-types";
import RolesContext from "./RolesContext.jsx";

export const RolesProvider = ({ children }) => {
  const {
    data: roles,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allRoles"],
    queryFn: getAllRoles,
  });

  if (isLoading) return <LoaderIconUtils />;
  if (isError) return <div>Error loading roles: {error?.message}</div>;

  return (
    <RolesContext.Provider value={{ roles }}>{children}</RolesContext.Provider>
  );
};

RolesProvider.propTypes = {
  children: PropTypes.node,
};
