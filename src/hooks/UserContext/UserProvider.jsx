import { useQuery } from "@tanstack/react-query";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";
import PropTypes from "prop-types";
import { getAllUsers } from "../../api/UserService.jsx";
import UsersContext from "./UserContext.jsx";

export const UserProvider = ({ children }) => {
  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
    error,
    refetch: refetchUsers,
  } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  if (isLoadingUsers) return <LoaderIconUtils isLoading={isLoadingUsers} />;
  if (isErrorUsers)
    return <div>Error loading categories: {error?.message}</div>;

  return (
    <UsersContext.Provider value={{ users, refetchUsers }}>
      {children}
    </UsersContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node,
};
