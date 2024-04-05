import { useQuery } from "@tanstack/react-query";
import { getResume } from "../../api/ResumeService.jsx";
import { Row } from "antd";
import { statisticCardsData } from "./StaticCardsData.jsx";
import { StatisticCard } from "../../components/StatisticCardComponent.jsx";
import { useResponsiveFontSize } from "../../hooks/ResponsiveFontSize/ResponsiveFontSizeHook.jsx";

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
    return <div>Cargando elementos...</div>;
  }
  if (isSuccess) {
    // console.log(data);
  }

  return (
    <div style={{ padding: "0px", height: "100%", paddingBottom: "20px" }}>
      <Row gutter={12}>
        {statisticCardsDataUsed.map((card, index) => (
          <StatisticCard
            key={index}
            statistics={card.statistics} // Pasando el array de estadísticas directamente
            backgroundClass={card.backgroundClass} // El fondo de la tarjeta
          />
        ))}
      </Row>
      {/* Puedes tener múltiples filas o incluso dinamizar las filas si es necesario */}
    </div>
  );
};
