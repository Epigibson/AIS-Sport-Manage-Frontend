import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Grid,
  Input,
  InputNumber,
  Select,
  TimePicker,
  Tooltip,
} from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCouches, getAllUsers } from "../api/UserService.jsx";
import { getAllGroups } from "../api/GroupService.jsx";
import { AvatarComponent } from "./AvatarComponent.jsx";
import { getAllPackages } from "../api/ProductService.jsx";
import { getAllCategories } from "../api/CategoryService.jsx";
import PropTypes from "prop-types";
import { getAllAthletes } from "../api/AtheleService.jsx";
// import { prepareInitialValues } from "./PrepareInitialValues.jsx";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "./FormStyle.css";

const { Option } = Select;
const { useBreakpoint } = Grid;
const { RangePicker } = TimePicker;

export const FormComponent = ({
  form,
  formFields,
  handleSubmit,
  handleClose,
  setProfileImage,
  isLogin,
}) => {
  const screen = useBreakpoint();
  const { data: categories } = useQuery({
    queryKey: ["callCategories"],
    queryFn: getAllCategories,
  });
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

  const { data: athletes } = useQuery({
    queryKey: ["allAthletes"],
    queryFn: getAllAthletes,
  });

  const { data: packages } = useQuery({
    queryKey: ["allPackages"],
    queryFn: getAllPackages,
  });

  const [selectOptions, setSelectOptions] = useState({});
  const [selectedValues, setSelectedValues] = useState({});
  const [selectedObjects, setSelectedObjects] = useState({});
  const handleImageLoaded = (file) => {
    setProfileImage(file);
  };

  const [dependentFieldsVisibility, setDependentFieldsVisibility] = useState(
    {},
  );

  useEffect(() => {
    console.log("Selected Values Updated:", selectedObjects);
    const newSelectOptions = {};
    const visibility = {};
    formFields.forEach((field) => {
      let options = [];
      if (field.dependencies) {
        const dependentValue = form.getFieldValue(field.dependencies.fieldName);
        visibility[field.name] = dependentValue === field.dependencies.value;
      } else {
        visibility[field.name] = true; // Si no tiene dependencias, es siempre visible
      }
      if (Array.isArray(field.optionsSource)) {
        options = field.optionsSource.map((option) => ({
          label: option,
          value: option,
        }));
      } else if (typeof field.optionsSource === "string") {
        // Opciones dinámicas basadas en la fuente de datos especificada
        const dataSource = {
          categories: categories || [],
          couches: couches || [],
          groups: groups || [],
          users: users || [],
          athletes: athletes || [],
          products: (packages || []).filter(
            (p) => p.product_name !== "Inscripcion",
          ),
        }[field.optionsSource];

        if (field.dependentOn) {
          // Manejo de dependencias basado en los objetos seleccionados
          const selectedObject = selectedObjects[field.dependentOn.field];
          if (selectedObject && selectedObject[field.dependentOn.relatedKey]) {
            const filterIds = selectedObject[field.dependentOn.relatedKey];
            options = dataSource
              .filter((item) => filterIds.includes(item._id))
              .map((item) => ({
                label:
                  item.tutors_name_one ||
                  item.tutors_name_two ||
                  item.name ||
                  item.username ||
                  item.product_name,
                value: item._id,
              }));
          }
        } else {
          // No hay dependencias, usa todos los datos disponibles
          options = dataSource.map((option) => ({
            label:
              option.tutors_name_one ||
              option.tutors_name_two ||
              option.name ||
              option.username ||
              option.product_name,
            value: option._id,
          }));
        }
      } else if (field.options) {
        // Opciones estáticas definidas en el campo
        options = field.options;
      }

      newSelectOptions[field.name] = options;
    });
    setDependentFieldsVisibility(visibility);
    setSelectOptions(newSelectOptions);
  }, [
    selectedObjects,
    form,
    formFields,
    categories,
    couches,
    groups,
    users,
    packages,
    athletes,
    selectedValues,
  ]); // Dependencias del efecto

  // const initialValues = prepareInitialValues(formFields);

  return (
    <Form
      form={form}
      layout={isLogin ? "vertical" : "horizontal"}
      onFinish={() => handleSubmit("create")}
      size={"small"}
      autoComplete={"on"}
      // initialValues={initialValues}
      onValuesChange={(_, allValues) => {
        const updatedSelectedObjects = { ...selectedObjects };
        const visibility = {};

        formFields.forEach((field) => {
          if (field.dependencies) {
            visibility[field.name] =
              allValues[field.dependencies.fieldName] ===
              field.dependencies.value;
          } else {
            visibility[field.name] = true;
          }

          // Actualizar el objeto completo para campos select
          if (field.inputType === "select" && field.optionsSource) {
            const dataSource = {
              users: users,
              athletes: athletes,
              // Otros dataSources según sea necesario
            }[field.optionsSource];

            const selectedItem = dataSource?.find(
              (item) => item._id === allValues[field.name],
            );
            if (selectedItem) {
              updatedSelectedObjects[field.name] = selectedItem;
            }
          }
        });

        setDependentFieldsVisibility(visibility);
        setSelectedValues(allValues); // Actualiza todos los valores seleccionados
        setSelectedObjects(updatedSelectedObjects); // Actualiza los objetos seleccionados
      }}
    >
      {formFields.map((field) => {
        if (!dependentFieldsVisibility[field.name]) {
          return null;
        }
        return (
          <Form.Item
            hidden={field.hidden}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            key={field.name}
            name={field.name}
            label={!screen.xs ? field.label : ""}
            rules={field.rules}
            valuePropName={
              field.inputType === "checkbox" ? "checked" : undefined
            }
            className={`${field.inputType === "avatar" ? "place-items-center mt-5 mb-0" : ""}`}
          >
            {field.inputType === "input" && (
              <Input
                placeholder={screen.xs ? field.label : undefined}
                className="rounded-md py-0.5 my-0 border-gray-300"
              />
            )}
            {field.inputType === "number" && (
              <InputNumber
                placeholder={screen.xs ? field.label : undefined}
                className="rounded-md py-0.5 my-0 border-gray-300 w-full"
              />
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
              <Checkbox className={"mr-2"}>
                <Tooltip title={field.tooltip}>
                  <QuestionCircleOutlined />
                </Tooltip>
              </Checkbox>
            )}

            {field.inputType === "select" && (
              <Select
                className={"text-left"}
                size={"middle"}
                placeholder={`-- Seleccionar ${field.label} --`}
              >
                {selectOptions[field.name]?.map((option, index) => (
                  <Option key={option.value || index} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            )}
            {field.inputType === "multipleSelect" && (
              <Select
                className={"text-left"}
                placeholder={` --Seleccionar ${field.label} --`}
                mode="multiple"
              >
                {selectOptions[field.name]?.map((option, index) => (
                  <Option key={option.value || index} value={option.value}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            )}
            {field.inputType === "schedule" && (
              <RangePicker
                format="HH:mm a"
                placeholder={["Inicio", "Fin"]}
                className="rounded-md py-0.5 my-0 border-gray-300"
                variant={"filled"}
                use24Hours
                onChange={(dates, dateStrings) => {
                  // Aquí puedes manejar el cambio, por ahora solo lo imprimiré
                  console.log(dates, dateStrings);
                }}
              />
            )}
            {field.inputType === "datePicker" && (
              <DatePicker
                className={"text-left w-full"}
                placeholder={field.label}
                value={field.name}
              />
            )}
          </Form.Item>
        );
      })}
      <Form.Item wrapperCol={{ span: 24 }} className={"text-center"}>
        <Button
          type={"primary"}
          size={"middle"}
          className="bg-primary-700 mx-3"
          htmlType="submit"
        >
          {isLogin ? "Ingresar" : "Guardar"}
        </Button>
        <Button
          size={"middle"}
          type={"primary"}
          onClick={handleClose}
          hidden={isLogin}
          danger
        >
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
  isLogin: PropTypes.any,
};
