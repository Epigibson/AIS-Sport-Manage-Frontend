import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { getAllGroups } from "../api/GroupService.jsx";
import { LoaderIconUtils } from "../utils/LoaderIconUtils.jsx";
import PropTypes from "prop-types";

const GroupsContext = createContext(undefined);

export const GroupsProvider = ({ children }) => {
  const {
    data: groups,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["groups"],
    queryFn: getAllGroups,
  });

  if (isLoading) return <LoaderIconUtils />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <GroupsContext.Provider value={{ groups }}>
      {children}
    </GroupsContext.Provider>
  );
};

// Define las PropTypes para GroupsProvider
GroupsProvider.propTypes = {
  children: PropTypes.node.isRequired, // Indica que children es un nodo React y es requerido
};

export const useGroups = () => useContext(GroupsContext);
