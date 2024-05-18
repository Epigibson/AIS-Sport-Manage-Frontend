import { AthletesPaymentsReportStaticCards } from "./AthletesPaymentsReportStaticCards.jsx";
import { AthletesPaymentsReportCalculateTotals } from "./AthletesPaymentsReportCalculateTotals.jsx";
import { useMemo } from "react";
import { AthletesPaymentMonthSelector } from "./AthletesPaymentMonthSelector.jsx";

export const PrepareStatisticCardsData = (data) => {
  return useMemo(
    () =>
      AthletesPaymentsReportStaticCards(
        AthletesPaymentsReportCalculateTotals(data),
        AthletesPaymentMonthSelector(),
      ),
    [data],
  );
};
