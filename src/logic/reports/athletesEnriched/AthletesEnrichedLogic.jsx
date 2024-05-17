import { useQuery } from "@tanstack/react-query";
import { getAllAthletesEnriched } from "../../../api/AtheleService.jsx";
import { AthletesEnrichedColumns } from "./AthletesEnrichedColumns.jsx";
import { LoaderIconUtils } from "../../../utils/LoaderIconUtils.jsx";
import { AthletesEnrichedNestedColumns } from "./AthletesEnrichedNestedColumns.jsx";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { AthletesEnrichedStatisticCards } from "./AthletesEnrichedStatisticCards.jsx";
import { getAmountsByStatus } from "./AthletesEnrichedCalculateTotals.jsx";
import { Button, Col, DatePicker, Row, Space } from "antd";
import { StatisticCard } from "../../../components/StatisticCardComponent.jsx";
import { DatePresets } from "../../../utils/DatesUtils.jsx";
import { TablesComponent } from "../../../components/TablesComponent.jsx";
import { useLoading } from "../../../hooks/LoadingContext/useLoading.jsx";
import { PrepareFilters } from "./AthletesEnrichedPrepareFilters.jsx";
import * as XLSX from "xlsx";

export const AthletesEnrichedLogic = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const {
    startLoading,
    stopLoading,
    isLoading: globalIsLoading,
  } = useLoading();

  const {
    data: athletesEnriched,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["athletesEnriched", { startDate, endDate }],
    queryFn: () =>
      getAllAthletesEnriched({ start_date: startDate, end_date: endDate }),
    onSuccess: () => {
      stopLoading();
    },
    onError: () => {
      stopLoading();
    },
  });

  // Solo actualizar el estado de carga cuando cambie `isLoading`
  useEffect(() => {
    if (isLoading) {
      startLoading();
    } else {
      stopLoading();
    }
  }, [isLoading, startLoading, stopLoading]);

  const columns = useMemo(
    () =>
      athletesEnriched
        ? AthletesEnrichedColumns({
            name: PrepareFilters(athletesEnriched, "name"),
            status: PrepareFilters(athletesEnriched, "status"),
          })
        : [],
    [athletesEnriched],
  );

  const nestedColumns = AthletesEnrichedNestedColumns;

  const onDateChange = (dates, dateStrings) => {
    setStartDate(dateStrings[0] ? dayjs(dateStrings[0]).toISOString() : null);
    setEndDate(dateStrings[1] ? dayjs(dateStrings[1]).toISOString() : null);
    refetch();
  };

  const clearFilters = () => {
    setStartDate(null);
    setEndDate(null);
    refetch();
  };

  const statisticCardsDataUsed = useMemo(
    () => AthletesEnrichedStatisticCards(getAmountsByStatus(athletesEnriched)),
    [athletesEnriched],
  );

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(athletesEnriched);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte de Ingresos");
    XLSX.writeFile(
      workbook,
      `reporte_de_ingresos${dayjs().format("YYYYMMDD_HHmmss")}.xlsx`,
    );
  };

  return (
    <>
      {globalIsLoading && <LoaderIconUtils isLoading={true} />}
      {isError && <h1>Error</h1>}
      {!globalIsLoading && !isError && (
        <>
          <Row
            gutter={[16, 16]}
            wrap={true}
            align={"middle"}
            justify={"center"}
            className={"mb-6"}
          >
            {statisticCardsDataUsed?.map((card, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={4}>
                <StatisticCard
                  statistics={card.statistics} // Pasando el array de estadísticas directamente
                  backgroundClass={card.backgroundClass} // El fondo de la tarjeta
                />
              </Col>
            ))}
          </Row>
          <Space direction="horizontal" size={12}>
            <DatePicker.RangePicker
              placeholder={["Inicio", "Fin"]}
              presets={DatePresets}
              onChange={onDateChange}
              value={
                startDate && endDate ? [dayjs(startDate), dayjs(endDate)] : []
              }
            />
            <Button onClick={clearFilters}>Limpiar</Button>
            <Button
              type="primary"
              className={"bg-primary-700"}
              onClick={exportToExcel}
            >
              Exportar a Excel
            </Button>
          </Space>
          <TablesComponent
            data={athletesEnriched}
            loading={isLoading}
            expandable={true}
            columns={columns}
            nestedColumns={nestedColumns}
            headerFixed={true}
          />
        </>
      )}
    </>
  );
};
