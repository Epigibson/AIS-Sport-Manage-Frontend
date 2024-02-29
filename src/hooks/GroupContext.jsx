import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";
import { getAllGroups } from "../api/GroupService.jsx";

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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <GroupsContext.Provider value={{ groups }}>
      {children}
    </GroupsContext.Provider>
  );
};

export const useGroups = () => useContext(GroupsContext);
