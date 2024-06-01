import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  TimePicker,
  Tooltip,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
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
  form,
  formFields,
  selectOptions,
  dependentFieldsVisibility,
  handleImageLoaded,
  screen,
}) => {
  const handleCheckboxChange = (field, checked) => {
    if (checked) {
      form.setFieldsValue({
        product_price: 0,
        total_price: 0,
        payment_method: "Cortesia",
      });
    } else {
      const productPrice = form.getFieldValue("product_price");
      const quantity = form.getFieldValue("product_quantity");
      form.setFieldsValue({
        total_price: productPrice * quantity,
        payment_method: "",
      });
    }
  };

  return formFields.map((field) => {
    if (!dependentFieldsVisibility[field.name]) {
      return null;
    }
    return (
      <Form.Item
        hidden={field.hidden}
        key={field.name}
        name={field.name}
        label={field.label}
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
          <Checkbox
            className={"mr-2"}
            onChange={(e) => handleCheckboxChange(field, e.target.checked)}
          >
            <Tooltip title={field.tooltip}>
              <QuestionCircleOutlined />
            </Tooltip>
          </Checkbox>
        )}
        {field.inputType === "select" && (
          <>
            <Select
              allowClear={true}
              className={"text-left"}
              placeholder={`-- Seleccionar ${field.label} --`}
            >
              {selectOptions[field.name]?.map((option, index) => (
                <Option key={option.value || index} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </>
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
};
