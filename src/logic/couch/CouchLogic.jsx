import { TablesComponent } from "../../components/TablesComponent.jsx";
import { UserColumns } from "../user/UserColumns.jsx";
import { useQuery } from "@tanstack/react-query";
import { getAllCouches } from "../../api/UserService.jsx";
import { getAllGroups } from "../../api/GroupService.jsx";

export const CouchLogic = () => {
  const {
    data: couchesData,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["allCouches"], queryFn: getAllCouches });

  const { data: groupsData } = useQuery({
    queryKey: ["allGroups"],
    queryFn: getAllGroups,
  });

  const enrichedUsersData = couchesData?.map((user) => {
    const group = groupsData?.find((group) => group._id === user.group_id); // Ajusta según la estructura de tus datos
    return { ...user, group }; // Añade la información del grupo al objeto de usuario
  });

  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return <h1>Error...</h1>;

  return <TablesComponent data={enrichedUsersData} columns={UserColumns} />;
};
