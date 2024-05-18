import { Card, Statistic } from "antd";
import PropTypes from "prop-types";

export const StatisticCard = ({ statistics, backgroundClass }) => (
  // <Col xs={24} sm={12} md={8} lg={4}>
  <Card className={`mt-3 shadow-md ${backgroundClass}`}>
    {statistics.map((stat, index) => (
      <Statistic
        key={index}
        valueStyle={{
          fontSize: stat.fontSize,
          fontWeight: stat.fontWeight,
        }} // Asegúrate de pasar fontSize correctamente
        title={<strong className={"font-black"}>{stat.title}</strong>}
        value={stat.value}
        prefix={stat.prefix}
      />
    ))}
  </Card>
  // </Col>
);

StatisticCard.propTypes = {
  statistics: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
        .isRequired,
      prefix: PropTypes.element,
      fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]), // Asegúrate de que esto se maneje adecuadamente en tu estructura de datos o en el componente padre
    }),
  ).isRequired,
  backgroundClass: PropTypes.string,
};
