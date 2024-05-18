import { AthletesEnrichedLogic } from "./athletesEnriched/AthletesEnrichedLogic.jsx";
import { AthletesPaymentsReportLogic } from "./athletePayments/AthletesPaymentsReportLogic.jsx";

export const ReportsTabItems = [
  {
    key: "1",
    label: "Reporte de Ingresos",
    component: AthletesEnrichedLogic,
  },
  {
    key: "2",
    label: "Reporte de Estatus de Pago",
    component: AthletesPaymentsReportLogic,
  },
];
