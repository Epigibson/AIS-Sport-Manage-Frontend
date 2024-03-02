import { Button, Checkbox, Form, Input, Select, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useCategories } from "../hooks/CategoriesContext.jsx";
import { useQuery } from "@tanstack/react-query";
import { getAllCouches, getAllUsers } from "../api/UserService.jsx";
import { getAllGroups } from "../api/GroupService.jsx";

const { Option } = Select;

export const FormComponent = ({
  form,
  formFields,
  handleSubmit,
  handleClose,
}) => {
  const { categories } = useCategories(); // Obtiene categorías del contexto
  const { data: couches } = useQuery({
    queryKey: ["couchList"],
    queryFn: getAllCouches,
  });
  const { data: groups } = useQuery({
    queryKey: ["allGroups"],
    queryFn: getAllGroups,
  }); // Obtiene groups del contexto

  const { data: users } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  const [selectOptions, setSelectOptions] = useState({});

  useEffect(() => {
    // Prepara opciones para campos select basados en optionsSource
    const newSelectOptions = {};
    formFields.forEach((field) => {
      if (
        field.inputType === "select" ||
        field.inputType === "multipleSelect"
      ) {
        if (field.optionsSource === "categories") {
          newSelectOptions[field.name] = categories?.map((c) => ({
            label: c.name,
            value: c._id,
          }));
        } else if (field.optionsSource === "couches") {
          newSelectOptions[field.name] = couches?.map((c) => ({
            label: c.name,
            value: c._id,
          }));
        } else if (field.optionsSource === "groups") {
          newSelectOptions[field.name] = groups?.map((c) => ({
            label: c.name,
            value: c._id,
          }));
        } else if (field.optionsSource === "users") {
          newSelectOptions[field.name] = users?.map((c) => ({
            label: `${c.name} : (${c.email})`,
            value: c._id,
          }));
        } else if (Array.isArray(field.optionsSource)) {
          // Nuevo caso para opciones estáticas
          newSelectOptions[field.name] = field.optionsSource.map((option) => ({
            label: option, // Usar el valor como etiqueta
            value: option, // Y como valor
          }));
        } else if (field.options) {
          // Directamente usar opciones estáticas definidas en formFields
          newSelectOptions[field.name] = field.options;
        }
      }
    });
    setSelectOptions(newSelectOptions);
  }, [formFields, categories, couches, groups, users]); // Dependencias del efecto

  return (
    <Form
      className="overflow-y-auto max-h-[600px]"
      form={form}
      onFinish={() => handleSubmit("create")}
      layout="horizontal"
      autoComplete="off"
      labelCol={{ span: 8 }} // Ajusta este valor según necesites
      wrapperCol={{ span: 16 }} // Ajusta este valor según necesites
    >
      {formFields.map((field) => (
        <Form.Item
          key={field.name}
          name={field.name}
          label={field.label}
          rules={field.rules}
          valuePropName={field.inputType === "checkbox" ? "checked" : undefined}
        >
          {field.inputType === "input" && (
            <Input className="rounded-md py-0.5 my-0 border-gray-300" />
          )}
          {field.inputType === "password" && (
            <Input.Password className="rounded-md py-0.5 my-0 border-gray-300" />
          )}
          {field.inputType === "checkbox" && (
            <>
              <Checkbox>{field.label}</Checkbox>
              {field.tooltip && (
                <Tooltip title={field.tooltip}>
                  <QuestionCircleOutlined />
                </Tooltip>
              )}
            </>
          )}
          {field.inputType === "select" && (
            <Select>
              {selectOptions[field.name]?.map((option, index) => (
                <Option key={option.value || index} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          )}
          {field.inputType === "multipleSelect" && (
            <Select mode="multiple">
              {selectOptions[field.name]?.map((option, index) => (
                <Option key={option.value || index} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
      ))}
      <Form.Item
        wrapperCol={{ span: 24 }} // Esto hace que el Form.Item ignore la configuración de columnas y utilice el ancho completo
        className="flex justify-end mt-2 mb-0.5"
      >
        <Button
          type={"primary"}
          className="bg-primary-700"
          // onClick={handleSubmit}
          htmlType="submit"
        >
          Guardar
        </Button>
        <Button type={"primary"} className="ml-2" danger onClick={handleClose}>
          Cancelar
        </Button>
      </Form.Item>
    </Form>
  );
};
