import { TablesComponent } from "../../components/TablesComponent.jsx";
import { useQuery } from "@tanstack/react-query";
import { debtorsColumns } from "./DebtorsColumns.jsx";
import { useEffect, useRef, useState } from "react";
import "./DebtorsLogicStyle.css";
import { getAllDebtors } from "../../api/DebtorService.jsx";

export const DebtorsLogic = () => {
  const modifiedTable = useState(true);
  const {
    data: debtors,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allDebtors"],
    queryFn: getAllDebtors,
  });

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
  const rowHeight = 100;

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        setScrollIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          // Ajusta la condición según el total de filas y la altura del contenedor
          if (
            newIndex * rowHeight >=
            scrollRef.current.scrollHeight - scrollRef.current.clientHeight
          ) {
            return 0;
          }
          return newIndex;
        });
      }
    }, 3000); // Desplaza cada 3 segundos

    return () => clearInterval(interval);
  }, [rowHeight]); // Añade `rowHeight` como dependencia si su valor puede cambiar

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollIndex * rowHeight,
        behavior: "smooth",
      });
    }
  }, [scrollIndex, rowHeight]); // Añade `rowHeight` como dependencia si su valor puede cambiar

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div ref={scrollRef} className="debtors-table-container">
      <TablesComponent
        data={debtors}
        columns={debtorsColumns}
        modifiedTable={modifiedTable}
      ></TablesComponent>
    </div>
  );
};
