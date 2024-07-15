import { useQuery } from "@tanstack/react-query";
import { Col, Row } from "antd";
import { StatisticCard } from "../../components/StatisticCardComponent.jsx";
import { useResponsiveFontSize } from "../../hooks/ResponsiveFontSize/ResponsiveFontSizeHook.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";
import { getAllAthletesEnriched } from "../../api/AtheleService.jsx";
import { useEffect, useMemo, useState } from "react";
import { CategorizePayments } from "../reports/athletePayments/CategorizePayments.jsx";
import { AthletesPaymentsReportCalculateTotals } from "../reports/athletePayments/AthletesPaymentsReportCalculateTotals.jsx";
import { statisticCardsData } from "./StaticCardsData.jsx";
import { getAllCouches } from "../../api/UserService.jsx";

export const ResumePaymentsLogic = () => {
  const fontSize = useResponsiveFontSize();
  const [coachesCount, setCoachesCount] = useState(0);
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
  const { data: coaches } = useQuery({
    queryKey: ["coaches"],
    queryFn: getAllCouches,
  });

  useEffect(() => {
    console.log("coaches", coaches);
    const activeCoaches = coaches?.filter((coach) => coach.status);
    setCoachesCount(activeCoaches.length);
  }, [coaches]);

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
    () => statisticCardsData(totals, coachesCount, fontSize),
    [totals, coachesCount, fontSize],
  );

  console.log("estadisticas", totals);
  console.log("coachesCount", coachesCount);

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
