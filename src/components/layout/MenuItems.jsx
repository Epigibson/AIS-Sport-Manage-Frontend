import {
  CopyrightOutlined,
  ExpandAltOutlined,
  GroupOutlined,
  HomeFilled,
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
    path: "/",
  },
  {
    key: "2",
    icon: <ReadOutlined />,
    label: "Inscripciones",
    path: "/inscriptions",
  },
  {
    key: "3",
    icon: <UserOutlined />,
    label: "Usuarios",
    path: "/users",
  },
  {
    key: "4",
    icon: <CopyrightOutlined />,
    label: "Couches",
    path: "/couches",
  },
  {
    key: "5",
    icon: <GroupOutlined />,
    label: "Grupos",
    path: "/grupos",
  },
  {
    key: "6",
    icon: <ProductFilled />,
    label: "Paquetes",
    path: "/paquetes",
  },
  {
    key: "7",
    icon: <UsergroupAddOutlined />,
    label: "Usuarios con Adeudos",
    path: "/adeudos",
  },
  {
    key: "8",
    icon: <ExpandAltOutlined />,
    label: "Panel de Analiticas",
    path: "/analiticas",
  },
];
