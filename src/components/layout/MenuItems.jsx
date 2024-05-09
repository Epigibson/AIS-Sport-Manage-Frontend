import {
  AccountBookOutlined,
  ControlFilled,
  CopyrightOutlined,
  DollarCircleOutlined,
  GroupOutlined,
  HomeFilled,
  InteractionOutlined,
  LogoutOutlined,
  PercentageOutlined,
  ProductFilled,
  ReadOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const MenuItems = [
  {
    key: "1",
    icon: <HomeFilled />,
    label: "Inicio",
    path: "/home",
  },
  {
    key: "2",
    icon: <ReadOutlined />,
    label: "Inscripciones",
    path: "/inscripciones",
  },
  {
    key: "3",
    icon: <DollarCircleOutlined />,
    label: "Control de Pagos",
    path: "/pagos",
  },
  {
    key: "4",
    icon: <UserOutlined />,
    label: "Atletas",
    path: "/atletas",
  },
  {
    key: "sub1", // Clave única para el submenú
    icon: <SettingOutlined />, // Ícono para el submenú
    label: "Catálogos", // Título del submenú
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
        label: "Tipo de Membresias",
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
  },
  {
    key: "10",
    icon: <ControlFilled />,
    label: "Configuracion",
    path: "/configuracion",
  },
  {
    key: "11",
    icon: <InteractionOutlined />,
    label: "Movimientos",
    path: "/movimientos",
  },
  {
    key: "12",
    icon: <AccountBookOutlined />,
    label: "Reportes",
    path: "/reportes",
  },
  {
    key: "13",
    icon: <LogoutOutlined />,
    label: "Cerrar Sesion",
    function: "logout",
  },
];
