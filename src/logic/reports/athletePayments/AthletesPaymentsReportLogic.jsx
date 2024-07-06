import { useQuery } from "@tanstack/react-query";
import { getAllAthletesEnriched } from "../../../api/AtheleService.jsx";
import { LoaderIconUtils } from "../../../utils/LoaderIconUtils.jsx";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { Button, Col, DatePicker, Row, Space } from "antd";
import { StatisticCard } from "../../../components/StatisticCardComponent.jsx";
import { TablesComponent } from "../../../components/TablesComponent.jsx";
import { useLoading } from "../../../hooks/LoadingContext/useLoading.jsx";
import * as XLSX from "xlsx";
import { PrepareFiltersColumn } from "../../../utils/PrepareFiltersColumn.jsx";
import { AthletesPaymentsExpandedColumns } from "./AthletesPaymentsExpandedColumns.jsx";
import { AthletesPaymentsReportColumns } from "./AthletesPaymentsReportColumns.jsx";
import { PrepareStatisticCardsData } from "./PrepareStaticCards.jsx";
import { CategorizePayments } from "./CategorizePayments.jsx";
import { AthletesPaymentMonthSelector } from "./AthletesPaymentMonthSelector.jsx";
import { DatePresets } from "../../../utils/DatePresets.jsx";

export const AthletesPaymentsReportLogic = () => {
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

  // Categorize payments
  const athletesEnrichedWithCategorizedPayments = useMemo(() => {
    return athletesEnriched?.map((athlete) => ({
      ...athlete,
      payments_by_month: CategorizePayments(athlete.payments),
    }));
  }, [athletesEnriched]);

  // console.log("NUEVOS", athletesEnrichedWithCategorizedPayments);

  const columns = useMemo(
    () =>
      athletesEnrichedWithCategorizedPayments
        ? AthletesPaymentsReportColumns(
            {
              name: PrepareFiltersColumn(
                athletesEnrichedWithCategorizedPayments,
                "name",
              ),
              status: PrepareFiltersColumn(
                athletesEnrichedWithCategorizedPayments,
                "status",
              ),
            },
            AthletesPaymentMonthSelector(),
          )
        : [],
    [athletesEnrichedWithCategorizedPayments],
  );

  const nestedColumns = AthletesPaymentsExpandedColumns;

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

  const statisticCardsDataUsed = PrepareStatisticCardsData(
    athletesEnrichedWithCategorizedPayments,
  );

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      athletesEnrichedWithCategorizedPayments,
    );
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
            data={athletesEnrichedWithCategorizedPayments}
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
