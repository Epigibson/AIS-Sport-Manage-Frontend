import { useNavigate } from "react-router-dom";
import { Button, Card, Layout, Result, Typography } from "antd";
import { HourglassOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export const PaymentPendingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/status"); // Cambia '/status' a la ruta deseada donde el usuario debe ser redirigido
    }, 5000); // 5000 ms = 5 segundos

    return () => clearTimeout(timer); // Limpia el timer si el componente se desmonta
  }, [navigate]);

  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Content
        style={{
          padding: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card style={{ maxWidth: 600, width: "100%" }}>
          <Result
            icon={<HourglassOutlined style={{ color: "#faad14" }} />}
            title={
              <Title level={2} style={{ fontWeight: "bold", color: "#d89614" }}>
                Pago Pendiente
              </Title>
            }
            subTitle="Tu pago está siendo procesado. Esto puede tomar algunos minutos. Te notificaremos una vez que el proceso haya concluido."
            extra={[
              <Paragraph key={1}>
                {" "}
                Serás redirigido automáticamente para verificar el estado del
                pago en 5 segundos.{" "}
              </Paragraph>,
              <Button
                type="primary"
                className="bg-primary-700"
                key="console"
                onClick={() => navigate("/home")}
              >
                Volver al Inicio
              </Button>,
              <Button key="status" onClick={() => navigate("/status")}>
                Ver Estado del Pago Ahora
              </Button>,
            ]}
            status="warning"
          />
        </Card>
      </Content>
    </Layout>
  );
};
