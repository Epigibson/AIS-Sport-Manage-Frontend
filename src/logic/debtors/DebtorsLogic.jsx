import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { TablesComponent } from "../../components/TablesComponent.jsx";
import { debtorsColumns } from "./DebtorsColumns.jsx";
import { getAllDebtors } from "../../api/DebtorService.jsx";
import "./DebtorsLogicStyle.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";

export const DebtorsLogic = () => {
  const [modifiedTable] = useState(true);
  const [displayedData, setDisplayedData] = useState([]);
  const [segmentKey, setSegmentKey] = useState(0); // Clave para identificar el segmento actual
  const pageSize = 10;

  const {
    data: debtors,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allDebtors"],
    queryFn: getAllDebtors,
  });

  useEffect(() => {
    let currentSegment = 0;
    const interval = setInterval(() => {
      if (debtors && debtors.length > 0) {
        const numberOfSegments = Math.ceil(debtors.length / pageSize);
        const start = currentSegment * pageSize;
        const end = start + pageSize;
        const currentDataToShow = debtors.slice(start, end);
        setDisplayedData(currentDataToShow);
        setSegmentKey(currentSegment); // Actualiza la clave del segmento para la animación
        currentSegment = (currentSegment + 1) % numberOfSegments;
      }
    }, 5000); // Cambia los datos cada 5 segundos

    return () => clearInterval(interval);
  }, [debtors]);

  if (isLoading) return <LoaderIconUtils isLoading={true} />;
  if (isError) return <div>Error al cargar los datos...</div>;

  return (
    <TransitionGroup className="table-transition-group">
      <CSSTransition
        key={segmentKey}
        timeout={500}
        classNames="table-container"
      >
        <div className="debtors-table-container">
          <TablesComponent
            data={displayedData}
            columns={debtorsColumns}
            modifiedTable={modifiedTable}
            headerFixed={true}
          />
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};
