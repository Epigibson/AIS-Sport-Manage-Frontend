import {
  AccountBookOutlined,
  ControlFilled,
  CopyrightOutlined,
  DollarCircleOutlined,
  GroupOutlined,
  HomeFilled,
  InteractionOutlined,
  LogoutOutlined,
  PayCircleOutlined,
  PercentageOutlined,
  ProductFilled,
  ProfileOutlined,
  ReadOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";

export const MenuItems = [
  {
    key: "1",
    icon: <HomeFilled />,
    label: "Inicio",
    path: "/home",
    roles: ["Admin", "Normal"],
  },
  {
    key: "2",
    icon: <ReadOutlined />,
    label: "Inscripciones",
    path: "/inscripciones",
    roles: ["Admin"],
  },
  {
    key: "3",
    icon: <DollarCircleOutlined />,
    label: "Control de Pagos",
    path: "/pagos",
    roles: ["Admin"],
  },
  {
    key: "4",
    icon: <UserOutlined />,
    label: "Atletas",
    path: "/atletas",
    roles: ["Admin"],
  },
  {
    key: "sub1", // Clave única para el submenú
    icon: <SettingOutlined />, // Ícono para el submenú
    label: "Catálogos", // Título del submenú
    roles: ["Admin"],
    children: [
      // Elementos dentro del submenú
      {
        key: "6",
        icon: <GroupOutlined />,
        label: "Grupos",
        path: "/grupos",
      },
      {
        key: "5",
        icon: <CopyrightOutlined />,
        label: "Coaches",
        path: "/coaches",
      },
      {
        key: "7",
        icon: <ProductFilled />,
        label: "Membresias",
        path: "/paquetes",
      },
      {
        key: "8",
        icon: <PercentageOutlined />,
        label: "Descuentos",
        path: "/descuentos",
      },
    ],
  },
  {
    key: "9",
    icon: <UsergroupAddOutlined />,
    label: "Usuarios con Adeudos",
    path: "/adeudos",
    roles: ["Admin"],
  },
  {
    key: "10",
    icon: <ControlFilled />,
    label: "Configuracion",
    path: "/configuracion",
    roles: ["Admin"],
  },
  {
    key: "11",
    icon: <InteractionOutlined />,
    label: "Movimientos",
    path: "/movimientos",
    roles: ["Admin"],
  },
  {
    key: "12",
    icon: <AccountBookOutlined />,
    label: "Reportes",
    path: "/reportes",
    roles: ["Admin"],
  },
  {
    key: "13",
    icon: <ProfileOutlined />,
    label: "Mi informacion",
    path: "/perfil",
    roles: ["Normal", "User"],
  },
  {
    key: "14",
    icon: <UserSwitchOutlined />,
    label: "Atletas",
    path: "/mis_atletas",
    roles: ["Normal", "User"],
  },
  {
    key: "15",
    icon: <PayCircleOutlined />,
    label: "Mis Pagos",
    path: "/mis_pagos",
    roles: ["Normal", "User"],
  },
  {
    key: "16",
    icon: <LogoutOutlined />,
    label: "Cerrar Sesion",
    function: "logout",
  },
];
