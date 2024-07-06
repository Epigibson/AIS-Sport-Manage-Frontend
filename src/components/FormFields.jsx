import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  TimePicker,
  Tooltip,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import PropTypes from "prop-types";
import { AvatarComponent } from "./AvatarComponent.jsx";
import {
  formatMoney,
  formatPercentage,
  parseMoney,
  parsePercentage,
} from "../utils/FormatAndParseNumberInputUtil.jsx";

const { Option } = Select;
const { RangePicker } = TimePicker;

export const FormFields = ({
  formFields,
  selectOptions,
  isLoading,
  isError,
  dependentFieldsVisibility,
  handleImageLoaded,
  screen,
}) => {
  return formFields.map((field) => {
    if (!dependentFieldsVisibility[field.name]) {
      return null;
    }

    const commonProps = {
      placeholder: screen.xs ? field.label : undefined,
      className: "rounded-md py-0.5 my-0 border-gray-300 w-full",
    };

    return (
      <Form.Item
        wrapperCol={{ span: 24 }}
        hidden={field.hidden}
        key={field.name || field._id}
        name={field.name}
        label={field.label}
        rules={field.rules}
        valuePropName={field.inputType === "checkbox" ? "checked" : undefined}
        className={
          field.inputType === "avatar" ? "place-items-center mt-5 mb-0" : ""
        }
      >
        {field.inputType === "input" && <Input {...commonProps} />}
        {field.inputType === "number" && (
          <InputNumber
            {...commonProps}
            defaultValue={field.formatter === "percentage" ? 100 : undefined}
            min={field.formatter === "percentage" ? 0 : undefined}
            max={field.formatter === "percentage" ? 100 : undefined}
            formatter={
              field.formatter === "money"
                ? formatMoney
                : field.formatter === "percentage"
                  ? formatPercentage
                  : undefined
            }
            parser={
              field.formatter === "money"
                ? parseMoney
                : field.formatter === "percentage"
                  ? parsePercentage
                  : undefined
            }
            disabled={field.disabled}
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
            allowClear={true}
            className={"text-left"}
            showSearch={true}
            placeholder={
              isLoading
                ? "Cargando datos, porfavor espere..."
                : selectOptions[field.name]?.length <= 0
                  ? " -- Sin datos -- "
                  : ` --Seleccionar ${field.label} --`
            }
            loading={isLoading}
            disabled={isLoading || selectOptions[field.name]?.length <= 0}
            filterOption={(inputValue, option) =>
              option?.children?.toLowerCase().includes(inputValue.toLowerCase())
            }
          >
            {selectOptions
              ? selectOptions[field.name]?.map((option, index) => (
                  <Option key={option.value || index} value={option.value}>
                    {option.label}
                  </Option>
                ))
              : "No se encontraron datos."}
          </Select>
        )}
        {field.inputType === "multipleSelect" && (
          <Select
            allowClear={true}
            className={"text-left"}
            placeholder={
              isLoading
                ? "Cargando datos, porfavor espere..."
                : selectOptions[field.name] === []
                  ? "-- Sin datos --"
                  : ` --Seleccionar ${field.label} --`
            }
            mode="multiple"
            onChange={field.onChange}
            loading={isLoading}
            disabled={isLoading}
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
          />
        )}
        {field.inputType === "datePicker" && (
          <DatePicker
            className={"text-left w-full"}
            placeholder={field.label}
            picker={field.picker ? field.picker : "date"}
          />
        )}
        {field.inputType === "editOrDelete" && (
          <Row justify={"center"} align={"middle"}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                width: "100vw",
              }}
            >
              <Space.Compact size={"large"}>
                <Button type="primary" htmlType="submit" size={"large"}>
                  <EyeOutlined color={"green"} />
                </Button>
                <Button type="primary" htmlType="submit" size={"large"}>
                  <EditOutlined color={"yellow"} />
                </Button>
                <Button type="primary" size={"large"} danger>
                  <DeleteOutlined />
                </Button>
              </Space.Compact>
            </div>
          </Row>
        )}
      </Form.Item>
    );
  });
};

FormFields.propTypes = {
  form: PropTypes.object,
  formFields: PropTypes.array.isRequired,
  selectOptions: PropTypes.object.isRequired,
  dependentFieldsVisibility: PropTypes.object.isRequired,
  handleImageLoaded: PropTypes.func,
  screen: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isError: PropTypes.bool,
};
