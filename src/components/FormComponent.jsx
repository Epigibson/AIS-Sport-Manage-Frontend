import {
  Button,
  Checkbox,
  Form,
  Grid,
  Input,
  InputNumber,
  Select,
  TimePicker,
  Tooltip,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllCouches, getAllUsers } from "../api/UserService.jsx";
import { getAllGroups } from "../api/GroupService.jsx";
import { AvatarComponent } from "./AvatarComponent.jsx";
import { getAllPackages } from "../api/ProductService.jsx";
import { getAllCategories } from "../api/CategoryService.jsx";
import PropTypes from "prop-types";
import { getAllAthletes } from "../api/AtheleService.jsx";

const { Option } = Select;
const {useBreakpoint} = Grid;
const {RangePicker} = TimePicker;

export const FormComponent = ({
                                  form,
                                  formFields,
                                  handleSubmit,
                                  handleClose,
                                  setProfileImage,
                                  isLogin,
                              }) => {
    const screen = useBreakpoint();
    const {data: categories} = useQuery({
        queryKey: ["callCategories"],
        queryFn: getAllCategories,
    });
    const {data: couches} = useQuery({
        queryKey: ["couchList"],
        queryFn: getAllCouches,
    });
    const {data: groups} = useQuery({
        queryKey: ["allGroups"],
        queryFn: getAllGroups,
    }); // Obtiene groups del contexto

    const {data: users} = useQuery({
        queryKey: ["allUsers"],
        queryFn: getAllUsers,
    });

    const {data: athletes} = useQuery({
        queryKey: ["allAthletes"],
        queryFn: getAllAthletes,
    });

    const {data: packages} = useQuery({
        queryKey: ["allPackages"],
        queryFn: getAllPackages,
    });

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
                        label: `${c.username} : (${c.email})`,
                        value: c._id,
                    }));
                } else if (field.optionsSource === "athletes") {
                    newSelectOptions[field.name] = athletes?.map((c) => ({
                        label: `${c.tuition} : (${c.name})`,
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
            form={form}
            layout={isLogin ? "vertical" : "horizontal"}
            onFinish={() => handleSubmit("create")}
            size={"small"}
            autoComplete={"on"}
        >
            {formFields.map((field) => (
                <Form.Item
                    labelCol={{span: 6}}
                    wrapperCol={{span: 18}}
                    key={field.name}
                    name={field.name}
                    label={!screen.xs ? field.label : ""}
                    rules={field.rules}
                    valuePropName={field.inputType === "checkbox" ? "checked" : undefined}
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
                        <Input.Password className="rounded-md py-0.5 my-0 border-gray-300"/>
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
                                    <QuestionCircleOutlined/>
                                </Tooltip>
                            )}
                        </>
                    )}
                    {field.inputType === "select" && (
                        <Select placeholder={`-- Seleccionar ${field.label} --`}>
                            {selectOptions[field.name]?.map((option, index) => (
                                <Option key={option.value || index} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                    )}
                    {field.inputType === "multipleSelect" && (
                        <Select
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
                            use24Hours
                            onChange={(dates, dateStrings) => {
                                // Aquí puedes manejar el cambio, por ahora solo lo imprimiré
                                console.log(dates, dateStrings);
                            }}
                        />
                    )}
                </Form.Item>
            ))}
            <Form.Item wrapperCol={{span: 24}} className={"text-center"}>
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
