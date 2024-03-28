import { getAllUsers } from "../../api/UserService.jsx";
import { TablesComponent } from "../../components/TablesComponent.jsx";
import { useQuery } from "@tanstack/react-query";
import { debtorsColumns } from "./DebtorsColumns.jsx";
import { useEffect, useRef, useState } from "react";
import "./DebtorsLogicStyle.css";
import { getAllHistoryPayments } from "../../api/PaymentService.jsx";
import { getAllReceipts } from "../../api/ReceiptsService.jsx";

export const DebtorsLogic = () => {
  const modifiedTable = useState(true);
  const {
    data: historyPaymentData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allHistoryPayments"],
    queryFn: getAllHistoryPayments,
  });

  const { data: usersData } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  const { data: receiptsData } = useQuery({
    queryKey: ["allReceipts"],
    queryFn: getAllReceipts,
  });

  const enrichedHistoryPaymentsData = historyPaymentData?.map(
    (historyPayment) => {
      const user = usersData?.find((user) => user._id === historyPayment.user); // Ajusta según la estructura de tus datos
      const receipt = receiptsData?.find(
        (receipt) => receipt._id === historyPayment.receipt_id,
      ); // Ajusta según la estructura de tus datos
      return { ...historyPayment, user, receipt }; // Añade la información del grupo al objeto de usuario
    },
  );

  const [scrollIndex, setScrollIndex] = useState(0);
  const scrollRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        setScrollIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          // Si llegaste al final de la tabla, vuelve al principio
          if (newIndex * rowHeight >= scrollRef.current.scrollHeight) {
            return 0;
          }
          return newIndex;
        });
      }
    }, 3000); // Desplaza cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollIndex * rowHeight,
        behavior: "smooth",
      });
    }
  }, [scrollIndex]);

  // rowHeight debería ser la altura de una fila en tu tabla
  const rowHeight = 50; // Cambia esto según la altura de tus filas

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div ref={scrollRef} className="debtors-table-container">
      <TablesComponent
        data={enrichedHistoryPaymentsData}
        columns={debtorsColumns}
        modifiedTable={modifiedTable}
      ></TablesComponent>
    </div>
  );
};
