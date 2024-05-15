import { useQuery } from "@tanstack/react-query";
import {
  getAthletesPaidOrNot,
  getTotalsOfMonth,
} from "../../../api/ReportServce.jsx";
import { LoaderIconUtils } from "../../../utils/LoaderIconUtils.jsx";
import { TablesComponent } from "../../../components/TablesComponent.jsx";
import { AthletesPaidOrNotColumns } from "./AthletesPaidOrNotColumns.jsx";
import { Col, Row } from "antd";
import { StatisticCard } from "../../../components/StatisticCardComponent.jsx";
import { StatisticCardsReportData } from "./StatisticCardsReportData.jsx";
import { useResponsiveFontSize } from "../../../hooks/ResponsiveFontSize/ResponsiveFontSizeHook.jsx";

export const AthletesPaidOrNotLogic = () => {
  const fontSize = useResponsiveFontSize();
  const {
    data: athletesReportPayOrNot,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["athletesReportPaidOrNot"],
    queryFn: getAthletesPaidOrNot,
  });
  const { data: getTotalsOfMonthData, isError: totalsIsError } = useQuery({
    queryKey: ["getTotalsOfMonth"],
    queryFn: getTotalsOfMonth,
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

  // console.log("TOTALES DE MESES", getTotalsOfMonthData);

  const lastMonthName = monthNames[lastMonth - 1];
  const currentMonthName = monthNames[currentMonthIndex];
  const nextMonthName = monthNames[nextMonth - 1];

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

  const columns = athletesReportPayOrNot
    ? AthletesPaidOrNotColumns(
        {
          user_name: prepareFilters(athletesReportPayOrNot, "user_name"),
          name: prepareFilters(athletesReportPayOrNot, "name"),
          status: prepareFilters(athletesReportPayOrNot, "status"),
        },
        lastMonthName,
        currentMonthName,
        nextMonthName,
      )
    : [];

  const statisticCardsDataReportUsed = StatisticCardsReportData(
    getTotalsOfMonthData,
    fontSize,
    lastMonthName,
    currentMonthName,
    nextMonthName,
  );

  if (isLoading) return <LoaderIconUtils />;
  if (isError || totalsIsError) return <h1>Error</h1>;

  return (
    <>
      <Row
        gutter={[16, 16]}
        wrap={true}
        align={"middle"}
        justify={"center"}
        className={"mb-6"}
      >
        {statisticCardsDataReportUsed.map((card, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <StatisticCard
              statistics={card.statistics} // Pasando el array de estadísticas directamente
              backgroundClass={card.backgroundClass} // El fondo de la tarjeta
            />
          </Col>
        ))}
      </Row>
      <TablesComponent
        data={athletesReportPayOrNot} // Asegúrate de que listaDeDatos esté bien formateada
        columns={columns}
        loading={isLoading} // Estado de carga
        expandable={false}
      />
    </>
  );
};
