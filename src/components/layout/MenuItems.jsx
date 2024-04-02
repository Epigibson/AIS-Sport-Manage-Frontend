import {
  CopyrightOutlined,
  DollarCircleOutlined,
  GroupOutlined,
  HomeFilled,
  LogoutOutlined,
  ProductFilled,
  ReadOutlined,
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
    label: "Pagos",
    path: "/pagos",
  },
  {
    key: "4",
    icon: <UserOutlined />,
    label: "Atletas",
    path: "/atletas",
  },
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
    icon: <UsergroupAddOutlined />,
    label: "Usuarios con Adeudos",
    path: "/adeudos",
  },
  // {
  //   key: "9",
  //   icon: <ExpandAltOutlined />,
  //   label: "Panel de Analiticas",
  //   path: "/analiticas",
  // },
  {
    key: "10",
    icon: <LogoutOutlined />,
    label: "Cerrar Sesion",
    function: "logout",
  },
];
