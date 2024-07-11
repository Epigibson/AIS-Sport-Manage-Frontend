import { useQuery } from "@tanstack/react-query";
import { getAllHistoryBalance } from "../../api/HistoryBalanceService.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";
import { TablesComponent } from "../../components/TablesComponent.jsx";
import { useHistoryBalanceColumns } from "./useHistoryBalanceColumns.jsx";
import { useState } from "react";

export const HistoryBalanceLogic = () => {
  const [clearFilters, setClearFIlters] = useState(false);
  const {
    data: historyBalance,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["historyBalance"], // Key to identify the query
    queryFn: getAllHistoryBalance,
  });

  const columns = useHistoryBalanceColumns({
    clearFilters: clearFilters,
    setClearFilters: setClearFIlters,
  });

  if (isLoading) return <LoaderIconUtils isLoading={true} />;
  if (error) return <p>Error: {error.message}</p>;

  return <TablesComponent data={historyBalance} columns={columns} />;
};
