import {
  Button,
  Card,
  Row,
  Select,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import { CheckCircleOutlined, EditFilled, StopFilled } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "../api/UserService.jsx";
import { useEffect } from "react";

const { Option } = Select;
const { Text } = Typography;

export const CustomSelectForConfigComponent = ({
  editingValue,
  handleSubmit,
  cancel,
  edit,
  data,
  configurationFields,
  editableFields,
  setEditableFields,
  editingField,
}) => {
  const { data: users } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  useEffect(() => {
    const initialEditableFields = {};
    configurationFields.forEach((field) => {
      initialEditableFields[field.fieldName] = data[field.fieldName] || "";
    });
    setEditableFields(initialEditableFields);
  }, [configurationFields, data, setEditableFields]);

  useEffect(() => {
    configurationFields.forEach((field) => {
      if (field.optionSource === "users") {
        field.selectOptions = users?.map((user) => ({
          label: user.email,
          value: user._id,
        }));
      } else if (Array.isArray(field.optionSource)) {
        field.selectOptions = field.optionSource.map((option) => ({
          label: option.label,
          value: option.value,
        }));
      }
    });
  }, [configurationFields, users]);

  return (
    <>
      <Card className={"mt-2"}>
        {configurationFields?.map((field, index) => (
          <Row key={index} className={"mb-4"}>
            <Text className={"mr-2"}>{field.label} :</Text>
            {editingValue && editingField === field.fieldName ? (
              <Space>
                {(field.inputType === "select" ||
                  field.inputType === "multipleSelect") && (
                  <Select
                    value={editableFields[field.fieldName]}
                    size={"small"}
                    className={"w-60"}
                    placeholder={"-- Seleccionar --"}
                    mode={
                      field.inputType === "multipleSelect" ? "multiple" : null
                    }
                    onChange={(value) =>
                      setEditableFields((prevEditableFields) => ({
                        ...prevEditableFields,
                        [field.fieldName]: value,
                      }))
                    }
                  >
                    {field.optionSource === "users"
                      ? users?.map((user) => (
                          <Option key={user._id} value={user._id}>
                            {user.email}
                          </Option>
                        ))
                      : field.selectOptions?.map((option, index) => (
                          <Option
                            key={option.value || index}
                            value={option.value}
                          >
                            {option.label}
                          </Option>
                        ))}
                  </Select>
                )}

                <Tooltip title="Guardar" color={"green"}>
                  <Button
                    size={"small"}
                    onClick={handleSubmit}
                    icon={<CheckCircleOutlined />}
                    id="success-button"
                  ></Button>
                </Tooltip>
                <Tooltip title="Cancelar" color={"volcano"}>
                  <Button
                    size={"small"}
                    onClick={cancel}
                    icon={<StopFilled />}
                    id="cancel-button"
                  ></Button>
                </Tooltip>
              </Space>
            ) : (
              <div>
                <Text color="blue" className={"mr-2 underline"}>
                  {field.fieldName === "email_notifications"
                    ? data[field.fieldName]?.map((userId) => (
                        <Tag color="cyan" key={userId}>
                          {users?.find((user) => user._id === userId)?.email}
                        </Tag>
                      ))
                    : <Tag color={"geekblue"}>{data[field.fieldName]}</Tag> ||
                      "No especificado"}
                </Text>

                <EditFilled onClick={() => edit(field.fieldName)} />
              </div>
            )}
          </Row>
        ))}
      </Card>
    </>
  );
};

CustomSelectForConfigComponent.propTypes = {
  editingValue: PropTypes.bool,
  handleSubmit: PropTypes.func,
  cancel: PropTypes.func,
  edit: PropTypes.func,
  data: PropTypes.object,
  configurationFields: PropTypes.arrayOf(PropTypes.object),
  editableFields: PropTypes.object,
  setEditableFields: PropTypes.func,
  editingField: PropTypes.string,
};
