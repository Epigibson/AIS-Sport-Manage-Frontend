import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";
import PropTypes from "prop-types";
import { Button, Row, Space } from "antd";

export const ManageLoadingAndErrorData = ({
  dataLoading,
  dataIsError,
  dataError,
}) => {
  if (dataLoading) {
    return <LoaderIconUtils isLoading={true} />;
  }
  if (dataIsError) {
    return <div>Error: {dataError.message}</div>;
  }
};

export const UserListCreationButtons = ({ handleOpenModal, userLogged }) => {
  /**
   * @property {string} user_type - User logged in the system.
   */
  if (userLogged?.user_type !== "Admin") {
    return null;
  }
  return (
    <Row justify={"end"}>
      <Space>
        <Button
          type="primary"
          className={"bg-primary-700"}
          onClick={() => {
            handleOpenModal(null, null, "create_manager");
          }}
        >
          Crear Administrador
        </Button>
        <Button
          type="primary"
          className={"bg-primary-700"}
          onClick={() => {
            handleOpenModal(null, null, "create_admin");
          }}
        >
          Crear Super Admin
        </Button>
      </Space>
    </Row>
  );
};

ManageLoadingAndErrorData.propTypes = {
  dataLoading: PropTypes.bool.isRequired,
  dataIsError: PropTypes.bool.isRequired,
  dataError: PropTypes.object,
};

UserListCreationButtons.propTypes = {
  userLogged: PropTypes.object,
  handleOpenModal: PropTypes.func.isRequired,
};
