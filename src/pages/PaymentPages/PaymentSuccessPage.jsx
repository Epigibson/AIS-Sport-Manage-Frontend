import { useNavigate } from "react-router-dom";
import { Button, Card, Layout, Result, Typography } from "antd";
import { SmileOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;

export const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/home");
  };

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
            icon={<SmileOutlined style={{ color: "#52c41a" }} />}
            title={
              <Title level={2} style={{ fontWeight: "bold" }}>
                Pago Exitoso
              </Title>
            }
            subTitle="Tu pago se ha procesado correctamente. ¡Gracias por tu compra!"
            extra={[
              <Button
                type="primary"
                className="bg-primary-700"
                key="console"
                onClick={handleBack}
              >
                Volver al Inicio
              </Button>,
            ]}
          />
        </Card>
      </Content>
    </Layout>
  );
};
