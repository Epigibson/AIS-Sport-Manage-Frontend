import { Modal } from "antd";
import { FormComponent } from "./FormComponent.jsx";
import { TablesComponent } from "./TablesComponent.jsx";

export const ModalComponent = ({
  form,
  formFields,
  title,
  onOk,
  onOpen,
  onClose,
  dataTable,
  dataTableColumns,
  setProfileImage,
}) => {
  return (
    <Modal
      title={title}
      open={onOpen}
      onCancel={onClose}
      footer={false}
      width={dataTable ? "50%" : "25%"}
    >
      {dataTable == null && form != null && formFields != null ? (
        <FormComponent
          form={form}
          formFields={formFields}
          handleSubmit={onOk}
          handleClose={onClose}
          setProfileImage={setProfileImage}
        />
      ) : null}
      {dataTable != null && dataTableColumns != null ? (
        <TablesComponent data={dataTable} columns={dataTableColumns} />
      ) : null}
    </Modal>
  );
};
