import { AthletesPaidOrNotLogic } from "./athletesPaidOrNot/AthletesPaidOrNotLogic.jsx";
import { AthletesEnrichedLogic } from "./athletesEnriched/AthletesEnrichedLogic.jsx";

export const ReportsTabItems = [
  {
    key: "1",
    label: "Reporte de Ingresos",
    component: AthletesEnrichedLogic,
  },
  {
    key: "2",
    label: "Reporte de Estatus de Pago",
    component: AthletesPaidOrNotLogic,
  },
];
