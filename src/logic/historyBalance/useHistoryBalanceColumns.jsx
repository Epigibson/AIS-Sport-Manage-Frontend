import { useColumnSearchProps } from "../../utils/useColumnSearchProps.jsx";
import { HistoryBalanceColumns } from "./HistoryBalanceColumns.jsx";
import { useEffect, useState } from "react";

export const useHistoryBalanceColumns = ({ clearFilters, setClearFilters }) => {
  const [clearFiltersRefs, setClearFiltersRefs] = useState([]);

  const folioSearchProps = useColumnSearchProps(
    "receipt_id",
    "historyBalance",
    "Recibo (Folio)",
    null,
    clearFilters,
    setClearFiltersRefs,
    0,
  );
  const paymentMethodSearchProps = useColumnSearchProps(
    "payment_method",
    "historyBalance",
    "Metodo de Pago",
    null,
    clearFilters,
    setClearFiltersRefs,
    1,
  );
  const packageSearchProps = useColumnSearchProps(
    "package_name",
    "historyBalance",
    "Paquete",
    null,
    clearFilters,
    setClearFiltersRefs,
    2,
  );
  const responsibleSearchProps = useColumnSearchProps(
    "responsible_name",
    "historyBalance",
    "Resonsable",
    null,
    clearFilters,
    setClearFiltersRefs,
    3,
  );

  useEffect(() => {
    if (clearFilters) {
      console.log("clearFilters is true, clearing all filters");
      let i = 4;
      for (i = 3; i > 0; i--) {
        clearFiltersRefs.forEach(({ clearFilters, confirm }, index) => {
          if (clearFilters && confirm) {
            console.log(`Clearing filter ${index}`);
            clearFilters();
            confirm();
          }
        });
        setClearFilters(true);
      }
    }
  }, [clearFilters, clearFiltersRefs, setClearFilters]);

  return HistoryBalanceColumns({
    folioSearchProps,
    paymentMethodSearchProps,
    packageSearchProps,
    responsibleSearchProps,
  });
};
