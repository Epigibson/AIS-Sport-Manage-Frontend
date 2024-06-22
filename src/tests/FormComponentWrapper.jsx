// tests/FormComponentWrapper.jsx
import { Form } from "antd";
import { FormComponent } from "../components/FormComponent.jsx";

export const FormComponentWrapper = (props) => {
  const [form] = Form.useForm();
  return <FormComponent form={form} {...props} />;
};
