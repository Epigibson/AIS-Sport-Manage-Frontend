import { PaymentLogic } from "./PaymentLogic.jsx";

export const paymentTabItems = () => [
  {
    key: "1",
    label: "Todos",
    component: PaymentLogic,
  },
  {
    key: "2",
    label: "Pagados",
    component: PaymentLogic,
  },
  {
    key: "3",
    label: "Pendientes",
    component: PaymentLogic,
  },
  {
    key: "4",
    label: "Excedidos",
    component: PaymentLogic,
  },
];
