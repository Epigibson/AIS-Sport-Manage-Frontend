import { useQuery } from "@tanstack/react-query";
import { Col, Row } from "antd";
import { StatisticCard } from "../../components/StatisticCardComponent.jsx";
import { useResponsiveFontSize } from "../../hooks/ResponsiveFontSize/ResponsiveFontSizeHook.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";
import { getAllAthletesEnriched } from "../../api/AtheleService.jsx";
import { useMemo } from "react";
import { CategorizePayments } from "../reports/athletePayments/CategorizePayments.jsx";
import { AthletesPaymentsReportCalculateTotals } from "../reports/athletePayments/AthletesPaymentsReportCalculateTotals.jsx";
import { statisticCardsData } from "./StaticCardsData.jsx";

export const ResumePaymentsLogic = () => {
  const fontSize = useResponsiveFontSize();
  const {
    data: athletesEnriched,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["athletesEnriched"],
    queryFn: getAllAthletesEnriched,
    staleTime: 5 * 60 * 1000, // Datos son considerados frescos por 5 minutos
    cacheTime: 30 * 60 * 1000, // Datos permanecen en caché por 30 minutos
  });

  // Categorize payments
  const athletesEnrichedWithCategorizedPayments = useMemo(() => {
    return athletesEnriched?.map((athlete) => ({
      ...athlete,
      payments_by_month: CategorizePayments(athlete.payments),
    }));
  }, [athletesEnriched]);

  const totals = useMemo(
    () =>
      AthletesPaymentsReportCalculateTotals(
        athletesEnrichedWithCategorizedPayments,
      ),
    [athletesEnrichedWithCategorizedPayments],
  );

  const statisticCardsDataUsed = useMemo(
    () => statisticCardsData(totals, fontSize),
    [totals, fontSize],
  );

  console.log("estadisticas", totals);

  if (isError) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoading) {
    return <LoaderIconUtils isLoading={true} />;
  }

  return (
    <div style={{ padding: "0px", height: "100%", paddingBottom: "20px" }}>
      <Row gutter={12} justify={"center"}>
        {statisticCardsDataUsed?.map((card, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={8}>
            <StatisticCard
              statistics={card.statistics} // Pasando el array de estadísticas directamente
              backgroundClass={card.backgroundClass} // El fondo de la tarjeta
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};
