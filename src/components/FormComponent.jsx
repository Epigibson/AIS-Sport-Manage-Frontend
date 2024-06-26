import { Button, Form, Grid } from "antd";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FormFields } from "./FormFields.jsx";
import {
  getDataSource,
  handleFieldDependencies,
  handleRelationDependency,
} from "./FormUtils.jsx";
import { useFetchData } from "../utils/useFetchData"; // Asegúrate de ajustar la ruta según la ubicación del archivo useFetchData

const { useBreakpoint } = Grid;

export const FormComponent = ({
  form,
  formFields,
  handleSubmit,
  handleClose,
  isLogin,
  confirmLoading,
}) => {
  /**
   * @property {string} initialValueVisible - Valor inicial de visibilidad del campo dependiente
   */
  const screen = useBreakpoint();
  const dataQueries = useFetchData(); // Usar el hook personalizado para obtener datos

  const [selectOptions, setSelectOptions] = useState({});
  const [selectedValues, setSelectedValues] = useState({});
  const [dependentFieldsVisibility, setDependentFieldsVisibility] = useState(
    {},
  );

  useEffect(() => {
    const newSelectOptions = {};
    const visibility = {};

    formFields.forEach((field) => {
      let options = [];
      const dataSource = getDataSource(field.optionsSource, dataQueries);

      // Determina la visibilidad inicial del campo
      if (field.dependentOn && field.dependentOn.type === "visible") {
        visibility[field.name] =
          field.dependentOn.initialValueVisible !== undefined
            ? field.dependentOn.initialValueVisible
            : true;
      } else {
        visibility[field.name] = true; // Predeterminado a true a menos que las dependencias digan lo contrario
      }

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

      // Manejo de dependencias de tipo relación
      if (field.dependentOn && field.dependentOn.type === "relation") {
        options = handleRelationDependency(field, selectedValues, dataQueries);
      }

      newSelectOptions[field.name] = options;
    });

    formFields.forEach((field) => {
      // Manejo de visibilidad de campos dependientes
      if (field.dependentOn && field.dependentOn.type === "visible") {
        const dependentFieldValue = selectedValues[field.dependentOn.field];
        visibility[field.name] =
          field.dependentOn.initialValueVisible !== undefined
            ? field.dependentOn.initialValueVisible
            : dependentFieldValue === field.dependentOn.value;
      }
    });

    // Evitar ciclos infinitos comprobando si los valores realmente cambiaron
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
  }, [
    selectedValues,
    formFields,
    dataQueries, // Utilizar datos obtenidos dinámicamente
  ]);

  const handleValuesChange = (_, allValues) => {
    console.log("Values Changed: ", allValues); // Depuración

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

      // Actualizar valores dependientes
      if (field.dependentFields) {
        updatedValues = handleFieldDependencies(
          field,
          updatedValues,
          dataQueries,
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

    // Actualizar visibilidad de campos dependientes
    formFields.forEach((field) => {
      if (field.dependentOn && field.dependentOn.type === "visible") {
        const dependentFieldValue = allValues[field.dependentOn.field];
        setDependentFieldsVisibility((prevVisibility) => {
          const newVisibility = {
            ...prevVisibility,
            [field.name]: dependentFieldValue !== field.dependentOn.value,
          };
          const hasVisibilityChanged =
            JSON.stringify(prevVisibility) !== JSON.stringify(newVisibility);
          return hasVisibilityChanged ? newVisibility : prevVisibility;
        });
      }
    });
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
      style={{
        maxWidth: 600,
      }}
      onValuesChange={handleValuesChange} // Manejo de cambios en los valores del formulario
    >
      <FormFields
        form={form}
        formFields={formFields}
        selectOptions={selectOptions} // Pasar opciones de selección a los campos del formulario
        dependentFieldsVisibility={dependentFieldsVisibility} // Pasar visibilidad de campos dependientes
        handleImageLoaded={null} // Cambia esto si necesitas manejar la carga de imágenes
        screen={screen}
      />
      {formFields?.map(
        (field) =>
          !dependentFieldsVisibility[field.name] && (
            <Form.Item hidden key={field.name}>
              <input type="hidden" />
            </Form.Item>
          ),
      )}
      <Form.Item wrapperCol={{ span: 24 }} className={"text-center"}>
        <Button
          type={"primary"}
          className="bg-primary-700 mx-3"
          htmlType="submit"
          loading={confirmLoading}
        >
          {isLogin ? "Ingresar" : "Guardar"}
        </Button>
        <Button type={"primary"} onClick={handleClose} hidden={isLogin} danger>
          Cancelar
        </Button>
      </Form.Item>
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
};
