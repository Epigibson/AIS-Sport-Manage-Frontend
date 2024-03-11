import { Grid, Modal } from "antd";
import { FormComponent } from "./FormComponent.jsx";
import { TablesComponent } from "./TablesComponent.jsx";
import PropTypes from "prop-types";

const { useBreakpoint } = Grid;

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
  const screen = useBreakpoint();
  return (
    <Modal
      title={title}
      open={onOpen}
      onCancel={onClose}
      footer={false}
      width={screen.xs ? "300px" : "80%"}
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

ModalComponent.propTypes = {
  title: PropTypes.string,
  onOk: PropTypes.any,
  onOpen: PropTypes.any,
  onClose: PropTypes.any,
  form: PropTypes.any,
  formFields: PropTypes.any,
  dataTable: PropTypes.any,
  dataTableColumns: PropTypes.any,
  setProfileImage: PropTypes.any,
};
