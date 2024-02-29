import { Button, Checkbox, Form, Input, Select, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useCategories } from "../hooks/CategoriesContext.jsx";

const { Option } = Select;

export const FormComponent = ({
  form,
  formFields,
  handleSubmit,
  handleClose,
}) => {
  const { categories } = useCategories(); // Obtiene categorías del contexto
  const [selectOptions, setSelectOptions] = useState({});

  useEffect(() => {
    // Prepara opciones para campos select basados en optionsSource
    const newSelectOptions = {};
    formFields.forEach((field) => {
      if (field.inputType === "select" && field.optionsSource) {
        // Aquí es donde asignas las opciones basadas en el identificador
        if (field.optionsSource === "categories") {
          newSelectOptions[field.name] = categories.map((c) => ({
            label: c.name,
            value: c._id,
          }));
        }
        // Añadir más condicionales si hay más fuentes de opciones
      }
    });
    setSelectOptions(newSelectOptions);
  }, [formFields, categories]); // Dependencias del efecto

  return (
    <Form
      className="overflow-y-auto max-h-[600px]"
      form={form}
      onFinish={() => handleSubmit("create")}
      layout="vertical"
      autoComplete="off"
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
        </Form.Item>
      ))}
      <Form.Item className="flex  justify-end mt-2 mb-0.5">
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
