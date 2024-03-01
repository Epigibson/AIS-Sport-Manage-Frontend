import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Divider, Layout, Menu, theme } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MenuItems } from "./MenuItems.jsx";
import logoImage from "../../assets/logo.png";

const { Header, Sider, Content } = Layout;

export const SideBarLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className="min-h-lvh">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical px-4 m-0 pt-6 flex justify-around items-center">
          <img src={logoImage} alt="Logo" style={{ maxHeight: "32px" }} />
          <p className="text-amber-50">Sport Management</p>
        </div>
        <Divider className="bg-blue-950" />
        <Menu
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
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
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
