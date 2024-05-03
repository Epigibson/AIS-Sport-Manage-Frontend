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
  // console.log(buttonModal, textButtonModal); // Verifica que se reciban las props
  const screen = useBreakpoint();
  return (
    <Modal
      centered={true}
      title={
        <Row
          className={"mb-6"}
          align={"middle"}
          justify={"center"}
          title={title}
        >
          <Text className={"text-center text-xl"}>{title}</Text>
        </Row>
      }
      open={onOpen}
      onCancel={onClose}
      footer={false}
      confirmLoading={confirmLoading}
      width={screen.xs ? 300 : 600}
    >
      {external === true ? (
        <Row justify={"end"} className={"overflow-hidden mb-5"}>
          <Button
            type={"primary"}
            className={"bg-primary-700"}
            onClick={() => buttonModal(dataTable)}
            loading={confirmLoading}
          >
            {textButtonModal}
          </Button>
        </Row>
      ) : (
        <> </>
      )}
      {dataTable == null && form != null && formFields != null ? (
        <FormComponent
          form={form}
          formFields={formFields}
          handleSubmit={onOk}
          handleClose={onClose}
          setProfileImage={setProfileImage}
          confirmLoading={confirmLoading}
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
  buttonModal: PropTypes.func,
  textButtonModal: PropTypes.string,
  external: PropTypes.bool,
  confirmLoading: PropTypes.bool,
  // ...
};
