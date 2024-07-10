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
      clearFiltersRefs.forEach(({ clearFilters, confirm }) => {
        if (clearFilters && confirm) {
          clearFilters();
          confirm();
        }
      });
    }
    setTimeout(() => {
      setClearFilters(false);
    }, 1000);
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
