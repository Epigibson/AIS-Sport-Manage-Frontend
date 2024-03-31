import { TablesComponent } from "../../TablesComponent.jsx";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../../../api/UserService.jsx";
import { LoaderIconUtils } from "../../../utils/LoaderIconUtils.jsx";
import { UsersInscribedColumns } from "./UsersInscribedColumns.jsx";
import { getAllGroups } from "../../../api/GroupService.jsx";

export const UsersInscribedLayout = () => {
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
    // Encuentra todos los grupos que coincidan con los IDs en athletes.group_id
    const userGroups = groupsData?.filter((group) =>
      user.groups?.includes(group._id),
    );
    return { ...user, groups: userGroups }; // Añade el array de grupos al objeto de usuario
  });

  if (isLoading) return <LoaderIconUtils />;
  if (isError) return <h1>Error...</h1>;

  return (
    <TablesComponent data={enrichedUsersData} columns={UsersInscribedColumns} />
  );
};
