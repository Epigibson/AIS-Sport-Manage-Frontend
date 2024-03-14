import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Divider, Grid, Layout, Menu, theme, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItems } from "./MenuItems.jsx";
import logoImage from "../../assets/logo-be.png";
import PropTypes from "prop-types";

const { Title } = Typography;

const { Header, Sider, Content } = Layout;
const { useBreakpoint } = Grid;

export const SideBarLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const appName = "Be +";
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (screens.xs) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [screens]);

  return (
    <Layout className="min-h-lvh w-full ">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth="0"
        breakpoint={"lg"}
      >
        <div className="pt-0 flex flex-col items-center justify-center ">
          <img src={logoImage} alt="Logo" style={{ maxHeight: "120px" }} />
          {/*{!collapsed && appName && (*/}
          {/*  <Title*/}
          {/*    level={5}*/}
          {/*    style={{*/}
          {/*      color: "white",*/}
          {/*      marginLeft: "8px",*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    {appName}*/}
          {/*  </Title>*/}
          {/*)}*/}
        </div>
        <Divider className="bg-blue-950" />
        <Menu
          style={{ width: "100%" }}
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={MenuItems.map((item) => ({
            key: item.key,
            label: item.label,
            icon: item.icon,
          }))}
          onClick={({ key }) => {
            const path = MenuItems.find((item) => item.key === key)?.path;
            if (path) {
              navigate(path);
            }
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "16px 16px",
            padding: 24,
            // padding: 24,
            // maxHeight: "100%",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

SideBarLayout.propTypes = {
  children: PropTypes.node, // 'node' cubre cualquier cosa que pueda ser renderizada: números, strings, elementos o fragmentos
};
