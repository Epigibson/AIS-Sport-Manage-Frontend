import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/UserService.jsx";
import { UserColumns } from "./UserColumns.jsx";
import { TablesComponent } from "../components/TablesComponent.jsx";
import { getAllGroups } from "../api/GroupService.jsx";

export const UserLogic = () => {
  const {
    data: usersData,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["allUsers"], queryFn: getAllUsers });

  const { data: groupsData } = useQuery({
    queryKey: ["allGroups"],
    queryFn: getAllGroups,
  });

  const enrichedUsersData = usersData?.map((user) => {
    const group = groupsData?.find((group) => group._id === user.group_id); // Ajusta según la estructura de tus datos
    return { ...user, group }; // Añade la información del grupo al objeto de usuario
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error...</h1>;

  return (
    // <div>
    //   {usersData?.map((user) => (
    //     <div key={user.id}>{user.name}</div>
    //   ))}
    // </div>
    <TablesComponent data={enrichedUsersData} columns={UserColumns} />
  );
};
