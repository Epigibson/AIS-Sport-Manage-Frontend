import { TablesComponent } from "../../../components/TablesComponent.jsx";
import { useQuery } from "@tanstack/react-query";
import { getAllAthletesEnriched } from "../../../api/AtheleService.jsx";
import { AthletesEnrichedColumns } from "./AthletesEnrichedColumns.jsx";
import { LoaderIconUtils } from "../../../utils/LoaderIconUtils.jsx";
import { AthletesEnrichedNestedColumns } from "./AthletesEnrichedNestedColumns.jsx";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { Button, Col, DatePicker, Row, Space } from "antd";
import { StatisticCard } from "../../../components/StatisticCardComponent.jsx";
import { AthletesEnrichedStatisticCards } from "./AthletesEnrichedStatisticCards.jsx";
import { DatePresets } from "../../../utils/DatesUtils.jsx";
import { getAmountsByStatus } from "./AthletesEnrichedCalculateTotals.jsx";

export const AthletesEnrichedLogic = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const {
    data: athletesEnriched,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["athletesEnriched", { startDate, endDate }],
    queryFn: () =>
      getAllAthletesEnriched({ start_date: startDate, end_date: endDate }),
  });

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

  const columns = useMemo(
    () =>
      athletesEnriched
        ? AthletesEnrichedColumns({
            name: prepareFilters(athletesEnriched, "name"),
            status: prepareFilters(athletesEnriched, "status"),
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

  if (isError) return <h1>Error</h1>;
  if (isLoading) return <LoaderIconUtils />;

  return (
    <>
      <Row
        gutter={[16, 16]}
        wrap={true}
        align={"middle"}
        justify={"center"}
        className={"mb-6"}
      >
        {statisticCardsDataUsed.map((card, index) => (
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
        />
        <Button onClick={clearFilters}>Limpiar</Button>
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
  );
};
