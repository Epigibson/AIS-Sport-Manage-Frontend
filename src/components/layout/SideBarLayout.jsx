import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  Layout,
  Menu,
  Row,
  theme,
  Typography,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import logoImage from "../../assets/logo-be.png";
import PropTypes from "prop-types";
import { clearTokens } from "../../utils/tokenUtils.jsx";
import { MenuItems } from "./MenuItems.jsx";
import { getUserSession } from "../../api/UserService.jsx";
import { useQuery } from "@tanstack/react-query";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";

const { Title } = Typography;
const { Header, Sider, Footer, Content } = Layout;
const { useBreakpoint } = Grid;

const useUserSession = () => {
  return useQuery({
    queryKey: ["userLogged"],
    queryFn: getUserSession,
  });
};

const useMenuItems = (userLogged) => {
  return useMemo(() => {
    const userRole = userLogged?.user_type;
    return MenuItems.filter(
      (item) => !item.roles || item.roles.includes(userRole),
    ).map((item) => ({
      key: item.key,
      label: item.label,
      icon: item.icon,
      children: item.children?.map((subItem) => ({
        key: subItem.key,
        label: subItem.label,
        icon: subItem.icon,
      })),
    }));
  }, [userLogged]);
};

export const SideBarLayout = ({ children, title }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState(() => {
    const storedKeys = localStorage.getItem("openMenuKeys");
    return storedKeys ? JSON.parse(storedKeys) : [];
  });
  const screens = useBreakpoint();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([]);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const { data: userLogged, isLoading: isLoadingUserLogged } = useUserSession();
  const filteredMenuItems = useMenuItems(userLogged);

  useEffect(() => {
    if (screens.xs) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [screens]);

  useEffect(() => {
    const key = location.pathname.slice(1) || "defaultKey";
    setSelectedKeys([key]);
  }, [location]);

  useEffect(() => {
    const handleStorageChange = () => {
      const storedKeys = localStorage.getItem("openMenuKeys");
      if (storedKeys) {
        setOpenKeys(JSON.parse(storedKeys));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const onOpenChange = (keys) => {
    setOpenKeys(keys);
    localStorage.setItem("openMenuKeys", JSON.stringify(keys));
  };

  const logout = () => {
    clearTokens();
    localStorage.removeItem("userData");
    navigate("/");
  };

  const handleClick = (e) => {
    const key = e.key;
    const menuItem = MenuItems.find(
      (item) =>
        item.key === key ||
        item.children?.find((subItem) => subItem.key === key),
    );
    const path =
      menuItem?.path ||
      menuItem?.children?.find((subItem) => subItem.key === key)?.path;
    const func =
      menuItem?.function ||
      menuItem?.children?.find((subItem) => subItem.key === key)?.function;

    if (path) {
      navigate(path);
    }
    if (func && func === "logout") {
      logout();
    }
  };

  return (
    <Layout className="min-h-lvh w-full">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth="0"
        breakpoint={"lg"}
      >
        <div className="pt-0 flex flex-col items-center justify-center">
          <img src={logoImage} alt="Logo" style={{ maxHeight: "120px" }} />
        </div>
        <Divider className="bg-blue-950" />
        {isLoadingUserLogged ? (
          <LoaderIconUtils isLoading={true} />
        ) : (
          <>
            <div
              className="flex items-center justify-center px-4"
              // style={{ padding: 1, display: "flex", alignItems: "center" }}
            >
              <Avatar
                size="small"
                icon={<UserOutlined />}
                src={userLogged?.avatarUrl} // Assuming avatarUrl is a property of userLogged
                style={{ marginRight: 12 }}
              />
              {!collapsed && (
                <Row>
                  <Typography.Text
                    level={5}
                    style={{ margin: 0, color: "white", fontWeight: "bold" }}
                  >
                    {userLogged?.name ||
                      userLogged?.username ||
                      userLogged?.tutors_name_one}
                  </Typography.Text>
                  <Typography.Text
                    ellipsis={{
                      tooltip: userLogged?.email,
                    }}
                    style={{ color: "white" }}
                    type={"secondary"}
                  >
                    {userLogged?.email}
                  </Typography.Text>
                </Row>
              )}
            </div>
            <Divider className="bg-blue-950" />
            <Menu
              style={{ width: "100%" }}
              openKeys={openKeys}
              onOpenChange={onOpenChange}
              theme="dark"
              mode="inline"
              selectedKeys={selectedKeys}
              items={filteredMenuItems}
              onClick={handleClick}
            />
          </>
        )}
      </Sider>
      <Layout>
        <Header
          title={title}
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Row className="flex w-full items-center justify-between">
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
            <Title level={3} className="text-center flex-1">
              {title}
            </Title>
            <div style={{ width: 64, height: 64 }} />
          </Row>
        </Header>
        <Content
          style={{
            margin: "16px 16px",
            padding: 24,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          BE+©{new Date().getFullYear()} Realizado por AIS Consulting Services
        </Footer>
      </Layout>
    </Layout>
  );
};

SideBarLayout.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};
