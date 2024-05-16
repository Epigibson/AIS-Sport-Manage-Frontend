import { useQuery } from "@tanstack/react-query";
import { getAllMovements } from "../../api/MovementService.jsx";
import { MovementsColumns } from "./MovementsColumns.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";
import { useColumnSearchProps } from "../../utils/useColumnSearchProps.jsx";
import { TablesComponent } from "../../components/TablesComponent.jsx";

export const MovementsLogic = () => {
  const {
    data: movements,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movements"],
    queryFn: getAllMovements,
  });

  const typeSearchProps = useColumnSearchProps("type", "movement", "Tipo");
  const actionSearchProps = useColumnSearchProps(
    "action",
    "movement",
    "Accion",
  );
  const moduleSearchProps = useColumnSearchProps(
    "module",
    "movement",
    "Modulo",
  );
  const responsibleNameSearchProps = useColumnSearchProps(
    "responsible_name",
    "athlete",
    "Responsable",
  );
  const modelFieldHelperSearchProps = useColumnSearchProps(
    "model_field_helper",
    "athlete",
    "Referencia",
  );

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <LoaderIconUtils isLoading={true} />;

  const columns = MovementsColumns({
    typeSearchProps,
    actionSearchProps,
    moduleSearchProps,
    responsibleNameSearchProps,
    modelFieldHelperSearchProps,
  });

  return (
    <TablesComponent data={movements} loading={isLoading} columns={columns} />
  );
};
