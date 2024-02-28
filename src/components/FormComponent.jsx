import { Checkbox, Form, Input, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

export const FormComponent = ({ form, formFields }) => {
  return (
    <Form
      className="overflow-y-auto max-h-[600px]"
      form={form}
      layout="vertical"
      name="basic"
      initialValues={{ remember: true }}
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
            <Input className="rounded-md py-2 my-0" />
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
        </Form.Item>
      ))}
    </Form>
  );
};
