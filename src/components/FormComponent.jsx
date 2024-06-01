import { Button, Form, Grid } from "antd";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCouches, getAllUsers } from "../api/UserService.jsx";
import { getAllGroups } from "../api/GroupService.jsx";
import { getAllPackages } from "../api/ProductService.jsx";
import { getAllCategories } from "../api/CategoryService.jsx";
import { getAllAthletes } from "../api/AtheleService.jsx";
import { getAllSalesProducts } from "../api/ProductsService.jsx";
import PropTypes from "prop-types";
import { FormFields } from "./FormFields.jsx";
import { getDataSource, handleFieldDependencies } from "./FormUtils.jsx";

const { useBreakpoint } = Grid;

export const FormComponent = ({
  form,
  formFields,
  handleSubmit,
  handleClose,
  isLogin,
  confirmLoading,
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
  });
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
  const { data: products } = useQuery({
    queryKey: ["productList"],
    queryFn: getAllSalesProducts,
  });

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
      const dataSource = getDataSource(field.optionsSource, {
        categories,
        couches,
        groups,
        users,
        athletes,
        packages,
        products,
      });

      visibility[field.name] = true; // Predeterminado a true a menos que las dependencias digan lo contrario

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
        const dependentFieldValue = selectedValues[field.dependentOn.field];
        if (dependentFieldValue) {
          const originData = getDataSource(field.dependentOn.fromCollection, {
            categories,
            couches,
            groups,
            users,
            athletes,
            packages,
            products,
          });

          const selectedParent = originData.find(
            (item) => item._id === dependentFieldValue,
          );

          if (selectedParent && selectedParent[field.dependentOn.relatedKey]) {
            options = athletes
              .filter((item) =>
                selectedParent[field.dependentOn.relatedKey].includes(item._id),
              )
              .map((item) => ({
                label: item.name || item.username || item.product_name,
                value: item._id,
              }));
          }
        }
      }

      newSelectOptions[field.name] = options;
    });

    setDependentFieldsVisibility(visibility);
    setSelectOptions(newSelectOptions);
  }, [
    selectedValues,
    form,
    formFields,
    categories,
    couches,
    groups,
    users,
    packages,
    products,
    athletes,
  ]);

  const handleValuesChange = (_, allValues) => {
    console.log("Values Changed: ", allValues); // Depuración

    let updatedValues = { ...allValues };

    // Verificar si el checkbox 'is_lost' está marcado
    if (allValues.is_lost !== undefined) {
      if (allValues.is_lost) {
        updatedValues.product_price = 0;
        updatedValues.total_price = 0;
      } else {
        // Restablecer el precio original si 'is_lost' se desmarca
        const selectedProduct = products?.find(
          (product) => product._id === allValues.product_id,
        );
        if (selectedProduct) {
          updatedValues.product_price = selectedProduct.price;
          updatedValues.total_price =
            selectedProduct.price * (allValues.product_quantity || 1);
        }
      }
      form.setFieldsValue({
        product_price: updatedValues.product_price,
        total_price: updatedValues.total_price,
      });

      // Actualizar visibilidad del campo payment_method
      setDependentFieldsVisibility((prevVisibility) => ({
        ...prevVisibility,
        payment_method: !allValues.is_lost,
      }));
    }

    formFields.forEach((field) => {
      if (field.dependentFields) {
        updatedValues = handleFieldDependencies(
          field,
          updatedValues,
          { salesProducts: products },
          form,
        );
      }
    });

    setSelectedValues(updatedValues);
    form.setFieldsValue(updatedValues);
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
      onValuesChange={handleValuesChange}
    >
      <FormFields
        form={form}
        formFields={formFields}
        selectOptions={selectOptions}
        dependentFieldsVisibility={dependentFieldsVisibility}
        handleImageLoaded={null} // Cambia esto si necesitas manejar la carga de imágenes
        screen={screen}
      />
      {formFields.map((field) =>
        field.name === "payment_method" &&
        !dependentFieldsVisibility[field.name] ? (
          <Form.Item name={field.name} hidden key={field.name}>
            <input type="hidden" />
          </Form.Item>
        ) : null,
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
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  isLogin: PropTypes.bool,
  confirmLoading: PropTypes.bool,
};
