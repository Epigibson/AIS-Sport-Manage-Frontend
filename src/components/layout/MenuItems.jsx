import {
  AccountBookOutlined,
  CarryOutOutlined,
  ControlFilled,
  CopyrightOutlined,
  DollarCircleOutlined,
  GroupOutlined,
  HistoryOutlined,
  HomeFilled,
  InteractionOutlined,
  LogoutOutlined,
  PayCircleOutlined,
  PercentageOutlined,
  ProductFilled,
  ProductOutlined,
  ProfileOutlined,
  ReadOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
  WalletOutlined,
} from "@ant-design/icons";

export const MenuItems = [
  {
    key: "1",
    icon: <HomeFilled />,
    label: "Inicio",
    path: "/home",
    roles: ["Admin", "Manager", "Normal"],
  },
  {
    key: "2",
    icon: <ReadOutlined />,
    label: "Inscripciones",
    path: "/inscripciones",
    roles: ["Admin", "Manager"],
  },
  {
    key: "3",
    icon: <DollarCircleOutlined />,
    label: "Control de Pagos",
    path: "/pagos",
    roles: ["Admin", "Manager"],
  },
  {
    key: "4",
    icon: <CarryOutOutlined />,
    label: "Ventas Indirectas",
    path: "/ventas_indirectas",
    roles: ["Admin", "Manager"],
  },

  {
    key: "6",
    icon: <UserOutlined />,
    label: "Atletas",
    path: "/atletas",
    roles: ["Admin", "Manager"],
  },
  {
    key: "7",
    icon: <UserOutlined />,
    label: "Usuarios",
    path: "/usuarios",
    roles: ["Admin", "Manager"],
  },
  {
    key: "sub1", // Clave única para el submenú
    icon: <SettingOutlined />, // Ícono para el submenú
    label: "Catálogos", // Título del submenú
    roles: ["Admin", "Manager"],
    children: [
      // Elementos dentro del submenú
      {
        key: "8",
        icon: <GroupOutlined />,
        label: "Grupos",
        path: "/grupos",
      },
      {
        key: "9",
        icon: <CopyrightOutlined />,
        label: "Coaches",
        path: "/coaches",
      },
      {
        key: "10",
        icon: <ProductFilled />,
        label: "Membresias",
        path: "/paquetes",
      },
      {
        key: "11",
        icon: <PercentageOutlined />,
        label: "Descuentos",
        path: "/descuentos",
      },
      {
        key: "12",
        icon: <ProductOutlined />,
        label: "Productos",
        path: "/productos",
      },
    ],
  },
  // {
  //   key: "13",
  //   icon: <BookOutlined />,
  //   label: "Pase de Lista",
  //   path: "/pase_de_lista",
  //   roles: ["Admin", "Manager"],
  // },
  {
    key: "22",
    icon: <WalletOutlined />,
    label: "Administrar Wallets",
    path: "/wallet",
    roles: ["Admin", "Manager"],
  },
  {
    key: "5",
    icon: <HistoryOutlined />,
    label: "Historial de Pagos Parciales",
    path: "/historial_de_saldos",
    roles: ["Admin", "Manager"],
  },
  {
    key: "16",
    icon: <InteractionOutlined />,
    label: "Movimientos",
    path: "/movimientos",
    roles: ["Admin"],
  },
  {
    key: "17",
    icon: <AccountBookOutlined />,
    label: "Reportes",
    path: "/reportes",
    roles: ["Admin", "Manager"],
  },

  {
    key: "14",
    icon: <UsergroupAddOutlined />,
    label: "Usuarios con Adeudos",
    path: "/adeudos",
    roles: ["Admin", "Manager"],
  },
  {
    key: "18",
    icon: <ProfileOutlined />,
    label: "Mi informacion",
    path: "/perfil",
    roles: ["Normal", "User"],
  },
  {
    key: "19",
    icon: <UserSwitchOutlined />,
    label: "Atletas",
    path: "/mis_atletas",
    roles: ["Normal", "User"],
  },
  {
    key: "20",
    icon: <PayCircleOutlined />,
    label: "Mis Pagos",
    path: "/mis_pagos",
    roles: ["Normal", "User"],
  },
  {
    key: "15",
    icon: <ControlFilled />,
    label: "Configuracion",
    path: "/configuracion",
    roles: ["Admin"],
  },
  {
    key: "21",
    icon: <LogoutOutlined />,
    label: "Cerrar Sesion",
    function: "logout",
  },
];
