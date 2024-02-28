import { TablesComponent } from "../components/TablesComponent.jsx";
import { useQuery } from "@tanstack/react-query";
import { getAllGroups } from "../api/GroupService.jsx";
import { GroupColumns } from "./GroupColumns.jsx";
import { getAllCouches } from "../api/UserService.jsx";

export const GroupLogic = () => {
  const {
    data: groupData,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["allGroups"], queryFn: getAllGroups });

  const { data: couchData } = useQuery({
    queryKey: ["couchList"],
    queryFn: getAllCouches,
  });

  const enrichedGroupsData = groupData?.map((group) => {
    const couch = couchData?.find((couch) => couch._id === group.group_couch); // Ajusta según la estructura de tus datos
    return { ...group, couch }; // Añade la información del grupo al objeto de usuario
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return <TablesComponent data={enrichedGroupsData} columns={GroupColumns} />;
};
