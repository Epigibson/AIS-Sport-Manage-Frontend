import { useQuery } from "@tanstack/react-query";
import { getConfiguration } from "../../api/ConfigurationsService.jsx";
import { useEditConfiguration } from "./ConfigurationMutations.jsx";
import { useState } from "react";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";
import "./ConfigurationStyles.css";
import { CustomSelectForConfigComponent } from "../../components/CustomSelectForConfigComponent.jsx";
import { ConfigurationFields } from "./ConfigurationFields.jsx";

export const ConfigurationLogic = () => {
  const [editingValue, setEditingValue] = useState(false);
  const [editableFields, setEditableFields] = useState({});
  const [editingField, setEditingField] = useState(null);
  const {
    data: configurations,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["configurations"],
    queryFn: getConfiguration,
  });

  const handleRefreshData = async () => {
    await refetch();
  };

  const { mutateEditConfiguration } = useEditConfiguration(handleRefreshData);

  const handleSubmit = () => {
    const editedFields = {};
    Object.keys(editableFields).forEach((fieldName) => {
      editedFields[fieldName] = editableFields[fieldName];
    });
    mutateEditConfiguration(editedFields);
    setEditableFields({});
    setEditingValue(false);
  };

  const edit = (field) => {
    setEditingField(field);
    setEditingValue(true);
    setEditableFields({ [field]: configurations[field] || "" });
  };

  const cancel = async () => {
    setEditableFields({});
    setEditingValue(false);
    await handleRefreshData();
  };

  return (
    <div>
      {isLoading && <LoaderIconUtils />}
      {error && <div>Error: {error.message}</div>}
      {!isLoading && !error && (
        <>
          <CustomSelectForConfigComponent
            data={configurations}
            editingValue={editingValue}
            editableFields={editableFields}
            setEditableFields={setEditableFields}
            edit={edit}
            handleSubmit={handleSubmit}
            cancel={cancel}
            configurationFields={ConfigurationFields}
            editingField={editingField}
          />
        </>
      )}
    </div>
  );
};
