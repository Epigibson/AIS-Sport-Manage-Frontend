import { useQuery } from "@tanstack/react-query";
import { getAllCouches } from "../api/UserService.jsx";
import { createContext, useContext } from "react";

const CouchesContext = createContext();

export const CouchesProvider = ({ children }) => {
  const {
    data: couches,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["couches"],
    queryFn: getAllCouches,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <CouchesContext.Provider value={{ couches }}>
      {children}
    </CouchesContext.Provider>
  );
};

export const useCouches = () => useContext(CouchesContext);
