import { useColumnSearchProps } from "../../utils/useColumnSearchProps.jsx";
import { filterByNameTutors } from "../../utils/FilterUtils.jsx";
import { AthleteColumns } from "./AthleteColumns.jsx";
import { useEffect, useState } from "react";

export const useAthleteColumns = ({
  onEdit,
  handleChangeStatus,
  onCancel,
  handleImageLoaded,
  navigate,
  filters,
  clearFilters,
  setClearFilters,
}) => {
  const [clearFiltersRefs, setClearFiltersRefs] = useState([]);

  const nameSearchProps = useColumnSearchProps(
    "name",
    "athlete",
    "Nombre",
    null,
    clearFilters,
    setClearFiltersRefs,
    0,
  );
  const phoneSearchProps = useColumnSearchProps(
    "phone",
    "athlete",
    "Celular",
    null,
    clearFilters,
    setClearFiltersRefs,
    1,
  );
  const tuitionSearchProps = useColumnSearchProps(
    "tuition",
    "athlete",
    "Matricula",
    null,
    clearFilters,
    setClearFiltersRefs,
    2,
  );
  const tutorSearchProps = useColumnSearchProps(
    "tutors",
    filterByNameTutors,
    "Tutor",
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

  return AthleteColumns({
    onEdit,
    handleChangeStatus,
    onCancel,
    handleImageLoaded,
    navigate,
    filters,
    nameSearchProps,
    phoneSearchProps,
    tuitionSearchProps,
    tutorSearchProps,
  });
};
