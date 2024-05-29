import { Button, Grid, Modal, Row, Typography } from "antd";
import { FormComponent } from "./FormComponent.jsx";
import { TablesComponent } from "./TablesComponent.jsx";
import PropTypes from "prop-types";

const { useBreakpoint } = Grid;
const { Text } = Typography;

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

  const renderModalTitle = () => (
    <Row className="mb-6" align="middle" justify="center" title={title}>
      <Text className="text-center text-xl">{title}</Text>
    </Row>
  );

  const renderExternalButton = () => (
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

  const renderFormComponent = () => (
    <FormComponent
      form={form}
      formFields={formFields}
      handleSubmit={onOk}
      handleClose={onClose}
      setProfileImage={setProfileImage}
      confirmLoading={confirmLoading}
    />
  );

  const renderTablesComponent = () => (
    <TablesComponent data={dataTable} columns={dataTableColumns} />
  );

  return (
    <Modal
      centered={true}
      title={renderModalTitle()}
      open={onOpen}
      onCancel={onClose}
      footer={false}
      confirmLoading={confirmLoading}
      width={screen.xs ? 300 : 600}
    >
      {external && renderExternalButton()}
      {!dataTable && form && formFields && renderFormComponent()}
      {dataTable && dataTableColumns && renderTablesComponent()}
    </Modal>
  );
};

ModalComponent.propTypes = {
  title: PropTypes.string.isRequired,
  onOk: PropTypes.func.isRequired,
  onOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  form: PropTypes.object,
  formFields: PropTypes.array,
  dataTable: PropTypes.array,
  dataTableColumns: PropTypes.array,
  setProfileImage: PropTypes.func,
  buttonModal: PropTypes.func,
  textButtonModal: PropTypes.string,
  external: PropTypes.bool,
  confirmLoading: PropTypes.bool,
};
