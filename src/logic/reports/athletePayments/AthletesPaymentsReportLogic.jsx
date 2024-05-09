import { TablesComponent } from "../../../components/TablesComponent.jsx";
import { useQuery } from "@tanstack/react-query";
import { getListAthletesPayments } from "../../../api/ReportServce.jsx";
import { LoaderIconUtils } from "../../../utils/LoaderIconUtils.jsx";
import { AthletesPaymentsReportColumns } from "./AthletesPaymentsReportColumns.jsx";
import { AthletesPaymentsExpandedColumns } from "./AthletesPaymentsExpandedColumns.jsx";

export const AthletesPaymentsReportLogic = () => {
  const {
    data: getListAthlete,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getAthletes"],
    queryFn: getListAthletesPayments,
  });

  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth(); // Mes actual (indexado desde 0)
  const currentMonth = currentMonthIndex + 1; // Sumar 1 para obtener el mes real
  const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1; // Si es enero, el mes anterior es diciembre
  const nextMonth = currentMonth === 12 ? 1 : currentMonth + 1; // Si es diciembre, el siguiente mes es enero

  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const mesPasado = monthNames[lastMonth - 1];
  const mesActual = monthNames[currentMonthIndex];
  const mesSiguiente = monthNames[nextMonth - 1];

  const prepareFilters = (data, dataIndex) => {
    if (!data) return [];
    const uniqueValues = Array.from(
      new Set(data.map((item) => item[dataIndex])),
    );
    return uniqueValues.map((value) => ({
      text: value.toString(),
      value,
    }));
  };

  // Define las columnas con los filtros apropiados cuando los datos estén disponibles
  const columns = getListAthlete
    ? AthletesPaymentsReportColumns({
        name: prepareFilters(getListAthlete, "name"),
        status: prepareFilters(getListAthlete, "status"),
      })
    : [];

  const nestedColumns = AthletesPaymentsExpandedColumns(
    mesPasado,
    mesActual,
    mesSiguiente,
  );

  if (isLoading) return <LoaderIconUtils />;
  if (isError) return <h1>Error</h1>;

  return (
    <>
      <TablesComponent
        data={getListAthlete} // Asegúrate de que listaDeDatos esté bien formateada
        columns={columns}
        nestedColumns={nestedColumns} // Definir las columnas anidadas específicas aquí
        loading={isLoading} // Estado de carga
        expandable={true}
      />
    </>
  );
};
