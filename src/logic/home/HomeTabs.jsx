// Definir los ítems de las pestañas aquí
import { InscriptionLayout } from "../inscription/InscriptionLayout.jsx";
import { UsersInscribedLayout } from "../../components/layout/UsersInscribedLayout/UsersInscribedLayout.jsx";
import { GroupAssignLayout } from "../../components/layout/GroupAssingLayout/GroupAssignLayout.jsx";

export const homeTabItems = [
  {
    key: "1",
    label: "Registro",
    component: InscriptionLayout,
  },
  {
    key: "2",
    label: "Resumen",
    component: UsersInscribedLayout,
  },
  {
    key: "3",
    label: "Asignación de Grupos",
    component: GroupAssignLayout,
  },
];
