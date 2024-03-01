import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { getAllGroups } from "../api/GroupService.jsx";
import { LoaderIconUtils } from "../utils/LoaderIconUtils.jsx";

const GroupsContext = createContext();

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

export const useGroups = () => useContext(GroupsContext);
