import { Modal } from "antd";
import { FormComponent } from "./FormComponent.jsx";

export const ModalComponent = ({
  form,
  formFields,
  title,
  onOk,
  onOpen,
  onClose,
}) => {
  return (
    <Modal title={title} open={onOpen} onCancel={onClose} footer={false}>
      <FormComponent
        form={form}
        formFields={formFields}
        handleSubmit={onOk}
        handleClose={onClose}
      />
    </Modal>
  );
};
