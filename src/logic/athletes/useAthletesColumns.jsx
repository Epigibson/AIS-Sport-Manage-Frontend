import { useColumnSearchProps } from "../../utils/useColumnSearchProps.jsx";
import { filterByNameTutors } from "../../utils/FilterUtils.jsx";
import { AthleteColumns } from "./AthleteColumns.jsx";

export const useAthleteColumns = ({
  onEdit,
  handleChangeStatus,
  onCancel,
  handleImageLoaded,
  navigate,
  filters,
}) => {
  const nameSearchProps = useColumnSearchProps("name", "athlete", "Nombre");
  const phoneSearchProps = useColumnSearchProps("phone", "athlete", "Celular");
  const tuitionSearchProps = useColumnSearchProps(
    "tuition",
    "athlete",
    "Matricula",
  );
  const tutorSearchProps = useColumnSearchProps(
    "tutors",
    filterByNameTutors,
    "Tutor",
  );

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
