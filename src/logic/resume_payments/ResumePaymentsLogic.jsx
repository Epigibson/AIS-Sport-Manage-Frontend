import { useQuery } from "@tanstack/react-query";
import { getResume } from "../../api/ResumeService.jsx";
import { Col, Row } from "antd";
import { statisticCardsData } from "./StaticCardsData.jsx";
import { StatisticCard } from "../../components/StatisticCardComponent.jsx";
import { useResponsiveFontSize } from "../../hooks/ResponsiveFontSize/ResponsiveFontSizeHook.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";

export const ResumePaymentsLogic = () => {
  const fontSize = useResponsiveFontSize();
  const {
    data: data,
    isSuccess,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["getResume"],
    queryFn: getResume,
  });
  const statisticCardsDataUsed = statisticCardsData(data, fontSize);

  if (isError) {
    // console.log(error);
    return <div>Error: {error.message}</div>;
  }
  if (isPending) {
    return <LoaderIconUtils />;
  }
  if (isSuccess) {
    // console.log(data);
  }

  return (
    <div style={{ padding: "0px", height: "100%", paddingBottom: "20px" }}>
      <Row gutter={12} justify={"center"}>
        {statisticCardsDataUsed.map((card, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={8}>
            <StatisticCard
              statistics={card.statistics} // Pasando el array de estadísticas directamente
              backgroundClass={card.backgroundClass} // El fondo de la tarjeta
            />
          </Col>
        ))}
      </Row>
      {/* Puedes tener múltiples filas o incluso dinamizar las filas si es necesario */}
    </div>
  );
};
