import { useColumnSearchProps } from "../../utils/useColumnSearchProps.jsx";
import { HistoryBalanceColumns } from "./HistoryBalanceColumns.jsx";

export const useHistoryBalanceColumns = () => {
  const folioSearchProps = useColumnSearchProps(
    "receipt_id",
    "historyBalance",
    "Recibo (Folio)",
  );
  const paymentMethodSearchProps = useColumnSearchProps(
    "payment_method",
    "historyBalance",
    "Metodo de Pago",
  );
  const packageSearchProps = useColumnSearchProps(
    "package_name",
    "historyBalance",
    "Paquete",
  );
  const responsibleSearchProps = useColumnSearchProps(
    "responsible_name",
    "historyBalance",
    "Resonsable",
  );

  return HistoryBalanceColumns({
    folioSearchProps,
    paymentMethodSearchProps,
    packageSearchProps,
    responsibleSearchProps,
  });
};
