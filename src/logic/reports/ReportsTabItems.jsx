import { AthletesPaymentsReportLogic } from "./athletePayments/AthletesPaymentsReportLogic.jsx";
import { AthletesPaidOrNotLogic } from "./athletesPaidOrNot/AthletesPaidOrNotLogic.jsx";

export const ReportsTabItems = [
  {
    key: "1",
    label: "Relacion de Pagos de Atletas",
    component: AthletesPaidOrNotLogic,
  },
  {
    key: "2",
    label: "Atletas y Pagos",
    component: AthletesPaymentsReportLogic,
  },
];
