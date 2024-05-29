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

      if (field.dependencies) {
        const dependentValue = form.getFieldValue(field.dependencies.fieldName);
        const selectedItem = dataSource?.find(
          (item) => item._id === dependentValue,
        );
        if (selectedItem) {
          const updatedValues = {
            ...selectedValues,
            [field.name]: selectedItem[field.dependencies.relatedKey],
          };
          setSelectedValues(updatedValues);
          form.setFieldsValue(updatedValues);
        }
        visibility[field.name] =
          dependentValue === field.dependencies.value ||
          field.dependencies.relatedKey;
      } else {
        visibility[field.name] = true; // Si no tiene dependencias, es siempre visible
      }

      if (Array.isArray(field.optionsSource)) {
        options = field.optionsSource.map((option) => ({
          label: option,
          value: option,
        }));
      } else if (typeof field.optionsSource === "string") {
        if (field.dependentOn) {
          const selectedObject = selectedValues[field.dependentOn.field];
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
        options = field.options.map((option) => ({
          label: option.label,
          value: option.value,
        }));
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
      onValuesChange={(_, allValues) => {
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
      }}
    >
      <FormFields
        form={form}
        formFields={formFields}
        selectOptions={selectOptions}
        dependentFieldsVisibility={dependentFieldsVisibility}
        handleImageLoaded={null} // Cambia esto si necesitas manejar la carga de imágenes
        screen={screen}
      />
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
  formFields: PropTypes.any,
  handleSubmit: PropTypes.func,
  handleClose: PropTypes.func,
  isLogin: PropTypes.any,
  confirmLoading: PropTypes.bool,
};
