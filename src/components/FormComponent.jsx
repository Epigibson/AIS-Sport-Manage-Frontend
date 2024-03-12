import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Tooltip,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCouches, getAllUsers } from "../api/UserService.jsx";
import { getAllGroups } from "../api/GroupService.jsx";
import { AvatarComponent } from "./AvatarComponent.jsx";
import { getAllPackages } from "../api/ProductService.jsx";
import PropTypes from "prop-types";
import { useCategories } from "../hooks/CategoryContext/useCategories.jsx";

const { Option } = Select;

export const FormComponent = ({
  form,
  formFields,
  handleSubmit,
  handleClose,
  setProfileImage,
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

  const { data: packages } = useQuery({
    queryKey: ["allPackages"],
    queryFn: getAllPackages,
  });

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const [selectOptions, setSelectOptions] = useState({});
  const handleImageLoaded = (file) => {
    setProfileImage(file);
  };

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
        } else if (field.optionsSource === "products") {
          newSelectOptions[field.name] = packages?.map((c) => ({
            label: c.product_name,
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
  }, [formFields, categories, couches, groups, users, packages]); // Dependencias del efecto

  return (
    <Form
      {...formItemLayout}
      form={form}
      onFinish={() => handleSubmit("create")}
      layout="vertical"
      className="flex flex-col justify-center "
      autoComplete="off"
    >
      {formFields.map((field) => (
        <Form.Item
          key={field.name}
          name={field.name}
          label={field.label}
          rules={field.rules}
          valuePropName={field.inputType === "checkbox" ? "checked" : undefined}
          className={`flex flex-col justify-center ${field.inputType === "avatar" ? "place-items-center mt-5 mb-0" : ""}`}
        >
          {field.inputType === "input" && (
            <Input className="rounded-md py-0.5 my-0 border-gray-300" />
          )}
          {field.inputType === "number" && (
            <InputNumber className="rounded-md py-0.5 my-0 border-gray-300 w-full" />
          )}
          {field.inputType === "password" && (
            <Input.Password className="rounded-md py-0.5 my-0 border-gray-300" />
          )}
          {field.inputType === "avatar" && (
            <AvatarComponent
              onImageLoaded={handleImageLoaded}
              existingImageUrl={field.existingImageUrl}
            />
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
        {...tailFormItemLayout}
        className="flex flex-col justify-between "
      >
        <Button type={"primary"} className="bg-primary-700" htmlType="submit">
          Guardar
        </Button>
        <Button type={"primary"} danger onClick={handleClose}>
          Cancelar
        </Button>
      </Form.Item>
    </Form>
  );
};

FormComponent.propTypes = {
  form: PropTypes.object,
  formFields: PropTypes.any,
  handleSubmit: PropTypes.func,
  handleClose: PropTypes.func,
  setProfileImage: PropTypes.func,
};
