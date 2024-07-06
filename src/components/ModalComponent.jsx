import { Button, Grid, Modal, Row, Typography } from "antd";
import { FormComponent } from "./FormComponent.jsx";
import { TablesComponent } from "./TablesComponent.jsx";
import PropTypes from "prop-types";

const { useBreakpoint } = Grid;
const { Text } = Typography;

const verifyDataTypes = (dataTable) => {
  if (dataTable) {
    if (Array.isArray(dataTable)) {
      return dataTable;
    } else if (typeof dataTable === "object") {
      return [dataTable];
    }
  }
  return [];
};

const renderModalTitle = (title) => (
  <Row className="mb-6" align="middle" justify="center" title={title}>
    <Text className="text-center text-xl">{title}</Text>
  </Row>
);

const renderExternalButton = (
  buttonModal,
  dataTable,
  confirmLoading,
  textButtonModal,
) => (
  <Row justify="end" className="overflow-hidden mb-5">
    <Button
      type="primary"
      className="bg-primary-700"
      onClick={() => buttonModal(dataTable)}
      loading={confirmLoading}
    >
      {textButtonModal}
    </Button>
  </Row>
);

const renderFormComponent = (
  form,
  formFields,
  onOk,
  onClose,
  setProfileImage,
  confirmLoading,
) => (
  <FormComponent
    form={form}
    formFields={formFields}
    handleSubmit={onOk}
    handleClose={onClose}
    setProfileImage={setProfileImage}
    confirmLoading={confirmLoading}
  />
);

const renderTablesComponent = (dataTable, dataTableColumns) => (
  <TablesComponent
    data={verifyDataTypes(dataTable)}
    columns={dataTableColumns}
  />
);

const getModalWidth = (screen, dataTable) => {
  if (dataTable) {
    return screen.xs ? 400 : "80%";
  }
  return screen.xs ? 300 : 600;
};

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
  buttonModal,
  textButtonModal,
  external,
  confirmLoading,
}) => {
  const screen = useBreakpoint();

  return (
    <Modal
      centered={true}
      title={renderModalTitle(title)}
      open={onOpen}
      onCancel={onClose}
      footer={false}
      confirmLoading={confirmLoading}
      width={getModalWidth(screen, dataTable)}
      loading={confirmLoading}
    >
      {external &&
        renderExternalButton(
          buttonModal,
          dataTable,
          confirmLoading,
          textButtonModal,
        )}
      {!dataTable &&
        form &&
        formFields &&
        renderFormComponent(
          form,
          formFields,
          onOk,
          onClose,
          setProfileImage,
          confirmLoading,
        )}
      {dataTable &&
        dataTableColumns &&
        renderTablesComponent(dataTable, dataTableColumns)}
    </Modal>
  );
};

ModalComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onOk: PropTypes.func,
  onOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  form: PropTypes.object,
  formFields: PropTypes.array,
  dataTable: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  dataTableColumns: PropTypes.array,
  setProfileImage: PropTypes.func,
  buttonModal: PropTypes.func,
  textButtonModal: PropTypes.string,
  external: PropTypes.bool,
  confirmLoading: PropTypes.bool,
};
