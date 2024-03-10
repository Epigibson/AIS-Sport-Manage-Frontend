import { Form } from "antd";
import { FormComponent } from "../../FormComponent.jsx";
import { GroupAssignFields } from "./GroupAssignFields.jsx";
import { useAssignUserToGroup } from "./GroupAssignMutations.jsx";
import PropTypes from "prop-types";

export const GroupAssignLayout = ({ children }) => {
  const [form] = Form.useForm();
  const { mutateCreate } = useAssignUserToGroup();

  const handleSubmit = async () => {
    const values = await form.validateFields();
    await mutateCreate(values);
    form.resetFields();
  };

  return (
    <div className={"flex  flex-col gap-2 p-4 w-full max-w-lg mt-4 mb-4"}>
      <FormComponent
        form={form}
        formFields={GroupAssignFields}
        handleSubmit={handleSubmit}
      >
        {children}
      </FormComponent>
    </div>
  );
};

GroupAssignLayout.propTypes = {
  children: PropTypes.node,
};
