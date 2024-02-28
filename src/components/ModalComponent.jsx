import { Button, Modal } from "antd";
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
    <Modal
      title={title}
      open={onOpen}
      onCancel={onClose}
      onOk={onOk}
      footer={[
        <Button key="back" onClick={onClose}>
          Cancelar
        </Button>,
        <Button
          key="submit"
          type="primary"
          className="bg-primary-700"
          onClick={onOk}
        >
          Crear
        </Button>,
      ]}
    >
      <FormComponent form={form} formFields={formFields} />
    </Modal>
  );
};
