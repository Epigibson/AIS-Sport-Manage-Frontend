import { getAllUsers } from "../../api/UserService.jsx";
import { TablesComponent } from "../../components/TablesComponent.jsx";
import { useQuery } from "@tanstack/react-query";
import { debtorsColumns } from "./DebtorsColumns.jsx";
import { useState } from "react";

export const DebtorsLogic = () => {
  const modifiedTable = useState(true);
  const {
    data: usersData,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["allUsers"], queryFn: getAllUsers });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <TablesComponent
      data={usersData}
      columns={debtorsColumns}
      modifiedTable={modifiedTable}
    ></TablesComponent>
  );
};
