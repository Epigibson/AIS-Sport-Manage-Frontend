import { useQuery } from "@tanstack/react-query";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";
import PropTypes from "prop-types";
import { getAllRoles } from "../../api/RolesService.jsx";
import RoleContext from "./RoleContext.jsx";

export const RoleProvider = ({ children }) => {
  const {
    data: roles,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["Roles"],
    queryFn: getAllRoles,
  });

  if (isLoading) return <LoaderIconUtils isLoading={isLoading} />;
  if (isError) return <div>Error loading categories: {error?.message}</div>;

  return (
    <RoleContext.Provider value={{ roles }}>{children}</RoleContext.Provider>
  );
};

RoleProvider.propTypes = {
  children: PropTypes.node,
};
