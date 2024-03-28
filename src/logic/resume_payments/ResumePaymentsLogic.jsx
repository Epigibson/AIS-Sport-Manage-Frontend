import { useQuery } from "@tanstack/react-query";
import { getResume } from "../../api/ResumeService.jsx";
import { Card, Col, Row, Statistic } from "antd";
import {
  FileTextOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const ResumePaymentsLogic = () => {
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

  if (isError) {
    console.log(error);
    return <div>Error: {error.message}</div>;
  }
  if (isPending) {
    return <div>Cargando elementos...</div>;
  }
  if (isSuccess) {
    console.log(data);
  }

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={16}>
        {/* Usuarios */}
        <Col span={8}>
          <Card
            className={"shadow-md bg-gradient-to-r from-cyan-50 to-blue-200"}
          >
            <Statistic
              title="Usuarios"
              value={data?.user_count}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>

        {/* Coaches */}
        <Col span={8}>
          <Card
            className={"shadow-md bg-gradient-to-r from-cyan-50 to-blue-200"}
          >
            <Statistic
              title="Coaches"
              value={data?.couch_count}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>

        {/* Inscripciones */}
        <Col span={8}>
          <Card
            className={"shadow-md bg-gradient-to-r from-cyan-50 to-blue-200"}
          >
            <Statistic
              title="Inscripciones"
              value={data.inscription_count}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "20px" }}>
        {/* Recibos Pagados */}
        <Col span={8}>
          <Card
            className={
              "shadow-md bg-gradient-to-r from-indigo-50 to-purple-200"
            }
          >
            <Statistic
              title="Recibos Pagados"
              value={`Elementos: ${data.count_receipts_payed}`}
            />
            <Statistic
              value={`Monto: $${parseFloat(data.amount_payed).toLocaleString(
                "es-MX",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                },
              )} MXN`}
            />
          </Card>
        </Col>

        {/* Recibos Pendientes */}
        <Col span={8}>
          <Card
            className={
              "shadow-md bg-gradient-to-r from-indigo-50 to-purple-200"
            }
          >
            <Statistic
              title="Recibos Pendientes"
              value={`Elementos: ${data.count_receipts_pending}`}
            />
            <Statistic
              value={`Monto: $${parseFloat(data.amount_pending).toLocaleString(
                "es-MX",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                },
              )} MXN`}
            />
          </Card>
        </Col>

        {/* Recibos Vencidos */}
        <Col span={8}>
          <Card
            className={
              "shadow-md bg-gradient-to-r from-indigo-50 to-purple-200"
            }
          >
            <Statistic
              title="Recibos Vencidos"
              value={`Elementos: ${data.count_receipts_expired}`}
            />
            <Statistic
              value={`Monto: $${parseFloat(data.amount_expired).toLocaleString(
                "es-MX",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                },
              )} MXN`}
            />
          </Card>
        </Col>
      </Row>

      {/* Monto Total */}
      <Row style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Card
            className={"shadow-md bg-gradient-to-r from-red-100 to-orange-200"}
          >
            <Statistic
              title="Monto Total"
              value={`$${parseFloat(data.total_amount).toLocaleString("es-MX", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })} MXN`}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
