import { useNavigate } from "react-router-dom";
import { Button, Card, Layout, Result, Typography } from "antd";
import { FrownOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;

export const PaymentFailedPage = () => {
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
            icon={<FrownOutlined style={{ color: "#ea4747" }} />}
            title={
              <Title level={2} style={{ fontWeight: "bold" }}>
                Pago Fallido
              </Title>
            }
            subTitle="Tu pago no se ha podido procesar. Intenta de nuevo."
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
