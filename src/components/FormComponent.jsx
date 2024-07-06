import { Button, Form, Grid } from "antd";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormFields } from "./FormFields.jsx";
import {
  getDataSource,
  handleFieldDependencies,
  handleRelationDependency,
} from "./FormUtils.jsx";
import { useFetchData } from "../utils/useFetchData"; // Ajusta la ruta según la ubicación del archivo useFetchData

const { useBreakpoint } = Grid;

export const FormComponent = ({
  form,
  formFields,
  handleSubmit,
  handleClose,
  isLogin,
  confirmLoading,
  withOutButtons,
}) => {
  const screen = useBreakpoint();
  const { data, isLoading, isError } = useFetchData(); // Usar el hook personalizado para obtener datos

  const [selectOptions, setSelectOptions] = useState({});
  const [selectedValues, setSelectedValues] = useState({});
  const [dependentFieldsVisibility, setDependentFieldsVisibility] = useState(
    {},
  );

  useEffect(() => {
    // if (isLoading || isError) return;

    const newSelectOptions = {};
    const visibility = {};

    formFields.forEach((field) => {
      let options = [];
      const dataSource = getDataSource(field.optionsSource, data);

      // Establecer la visibilidad inicial del campo basado en las dependencias
      visibility[field.name] = field.dependentOn
        ? field.dependentOn.initialValueVisible
        : true;

      if (Array.isArray(field.optionsSource)) {
        options = field.optionsSource.map((option) => ({
          label: option,
          value: option,
        }));
      } else if (typeof field.optionsSource === "string") {
        options = dataSource.map((option) => ({
          label:
            option.tutors_name_one ||
            option.tutors_name_two ||
            option.name ||
            option.username ||
            option.product_name,
          value: option._id,
        }));
      } else if (field.options) {
        options = field.options;
      }

      if (field.dependentOn && field.dependentOn.type === "relation") {
        options = handleRelationDependency(field, selectedValues, data);
      }

      newSelectOptions[field.name] = options;
    });

    // Actualizar visibilidad de campos dependientes basados en los valores seleccionados
    formFields.forEach((field) => {
      if (
        field.dependentOn &&
        (field.dependentOn.type === "visible" ||
          field.dependentOn.type === "relation")
      ) {
        const dependentFieldValue = selectedValues[field.dependentOn.field];
        visibility[field.name] =
          dependentFieldValue !== undefined
            ? dependentFieldValue !== field.dependentOn.value
            : field.dependentOn.initialValueVisible;
      }
    });

    setDependentFieldsVisibility((prevVisibility) => {
      const hasVisibilityChanged =
        JSON.stringify(prevVisibility) !== JSON.stringify(visibility);
      return hasVisibilityChanged ? visibility : prevVisibility;
    });

    setSelectOptions((prevSelectOptions) => {
      const hasOptionsChanged =
        JSON.stringify(prevSelectOptions) !== JSON.stringify(newSelectOptions);
      return hasOptionsChanged ? newSelectOptions : prevSelectOptions;
    });
  }, [selectedValues, formFields, data, isLoading, isError]);

  const handleValuesChange = (_, allValues) => {
    let updatedValues = { ...allValues };

    formFields.forEach((field) => {
      if (field.inputType === "checkbox" && field.dependentFields) {
        field.dependentFields.forEach((dependentField) => {
          const { name, defaultValue } = dependentField;
          updatedValues[name] = allValues[field.name]
            ? defaultValue
            : allValues[name];
        });
      }

      if (field.dependentFields) {
        updatedValues = handleFieldDependencies(
          field,
          updatedValues,
          data,
          form,
        );
      }
    });

    setSelectedValues((prevValues) => {
      const hasValuesChanged =
        JSON.stringify(prevValues) !== JSON.stringify(updatedValues);
      return hasValuesChanged ? updatedValues : prevValues;
    });

    form.setFieldsValue(updatedValues);

    // Actualizar visibilidad de campos dependientes basados en los nuevos valores
    const visibility = { ...dependentFieldsVisibility };
    formFields.forEach((field) => {
      if (field.dependentOn && field.dependentOn.type === "visible") {
        const dependentFieldValue = updatedValues[field.dependentOn.field];
        visibility[field.name] =
          dependentFieldValue !== undefined
            ? dependentFieldValue !== field.dependentOn.value
            : field.dependentOn.initialValueVisible;
      }
    });
    setDependentFieldsVisibility(visibility);
  };

  return (
    <Form
      form={form}
      labelCol={{ span: 6 }}
      labelAlign={"left"}
      wrapperCol={{ span: 18 }}
      layout={isLogin ? "vertical" : "horizontal"}
      onFinish={() => handleSubmit("create")}
      size={!screen.xs ? "middle" : "small"}
      autoComplete={"on"}
      labelWrap={true}
      style={{ maxWidth: 600 }}
      onValuesChange={handleValuesChange}
    >
      <FormFields
        form={form}
        formFields={formFields}
        selectOptions={selectOptions}
        dependentFieldsVisibility={dependentFieldsVisibility}
        handleImageLoaded={null}
        screen={screen}
        isLoading={isLoading}
        isError={isError}
      />
      {formFields?.map(
        (field) =>
          !dependentFieldsVisibility[field.name] && (
            <Form.Item hidden key={field.name}>
              <input type="hidden" />
            </Form.Item>
          ),
      )}
      {!withOutButtons && (
        <Form.Item wrapperCol={{ span: 24 }} className={"text-center"}>
          <Button
            type={"primary"}
            className="bg-primary-700 mx-3"
            htmlType="submit"
            loading={confirmLoading}
          >
            {isLogin ? "Ingresar" : "Guardar"}
          </Button>
          <Button
            type={"primary"}
            onClick={handleClose}
            hidden={isLogin}
            danger
          >
            Cancelar
          </Button>
        </Form.Item>
      )}
    </Form>
  );
};

FormComponent.propTypes = {
  form: PropTypes.object,
  formFields: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func,
  handleClose: PropTypes.func,
  isLogin: PropTypes.bool,
  confirmLoading: PropTypes.bool,
  withOutButtons: PropTypes.bool,
};
