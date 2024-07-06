import { Card, Col, Form, Row, Typography } from "antd";
import { FormComponent } from "./FormComponent.jsx";
import PropTypes from "prop-types";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
  addBalanceToUser,
  getUserById,
  updateUserBalance,
} from "../api/UserService.jsx";
import { useEffect, useState } from "react";
import { WalletFormFields } from "../logic/wallet/WalletFormFields.jsx";
import { FormatCurrencyUtil } from "../utils/FormatCurrencyUtil.jsx";
import "./CardUserStyle.css";

const { Paragraph } = Typography;

export const CardUserComponent = ({
  title,
  colorHeader,
  colorBody,
  colorFooter,
  borderColor,
  viewButton,
  editButton,
  deleteButton,
  isEditMode,
  isAddMode,
  customEdit,
}) => {
  const [form] = Form.useForm();
  const [userId, setUserId] = useState(null);
  const [editableStr, setEditableStr] = useState("");
  const [editingField, setEditingField] = useState(false);

  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        user: user.id,
        balance_amount: user.positive_balance,
      });
      setEditableStr(!editingField ? user.positive_balance.toString() : 0);
    }
  }, [user, form, editingField]);

  const handleSave = async (value) => {
    if (!user) return; // Asegurarse de que user está definido antes de continuar

    setEditingField(false);
    const newBalance = parseFloat(value);
    const values = {
      user_id: user.user_id,
      balance_amount: newBalance,
      payment_method: "Efectivo",
    };
    if (!customEdit) {
      await addBalanceToUser(values);
    } else if (customEdit) {
      await updateUserBalance(values);
    }
    await refetch();
  };

  const handleDelete = () => {
    console.log("Deleted");
  };

  const handleCancel = () => {
    setEditingField(false);
  };

  const handleEditStart = () => {
    setEditingField(true);
  };

  const handleSubmit = async (type) => {
    form.validateFields().then((values) => {
      console.log(values);
      setUserId(values.user);
      if (type === "edit" || type === "add") {
        editableStr ? handleSave(editableStr) : null;
      } else if (type === "customEdit") {
        // Manejando la lógica de ver si es necesario
      }
    });
    console.log(editableStr);
  };

  return (
    <Col span={8}>
      <Card
        hoverable
        title={title}
        bordered={true}
        styles={{
          header: {
            background: colorHeader ? colorHeader : "white",
          },
          body: { background: colorBody ? colorBody : "white" },
          footer: { background: colorFooter ? colorFooter : "white" },
          actions: { padding: "0px" },
        }}
        style={{
          borderColor: borderColor ? borderColor : "#cecece",
        }}
        actions={[
          <Row align={"middle"} justify={"center"} key={"index"}>
            {viewButton && (
              <Col className={"h-full"}>
                <div
                  className="flex justify-center items-center h-full w-full"
                  onClick={() => handleSubmit("submit")}
                >
                  <EyeOutlined title="Ver Usuario" className="text-xl" />
                </div>
              </Col>
            )}
            {editButton && <EyeOutlined onClick={() => handleSubmit("edit")} />}
            {deleteButton && (
              <DeleteOutlined onClick={handleDelete} key="delete" />
            )}
          </Row>,
        ]}
      >
        <FormComponent
          form={form}
          formFields={WalletFormFields}
          handleClose={handleCancel}
          handleSubmit={handleSubmit}
          withOutButtons={true}
        />
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error: {error.message}</div>}
        {user && (
          <>
            {!editingField ? (
              <div>Usuario: {user.tutors_name_one || user.tutors_name_two}</div>
            ) : (
              ""
            )}

            {isEditMode || isAddMode ? (
              <Paragraph
                className={"mt-1"}
                editable={{
                  onStart: handleEditStart,
                  onChange: handleSave,
                  onCancel: handleCancel,
                  tooltip: "Click to edit",
                  autoSize: true,
                }}
              >
                Saldo a Favor:{" "}
                {editingField
                  ? user.positive_balance
                  : FormatCurrencyUtil(editableStr)}{" "}
                MXN
              </Paragraph>
            ) : (
              <Paragraph>
                Saldo a Favor:{" "}
                {`${FormatCurrencyUtil(user.positive_balance)} MXN`}
              </Paragraph>
            )}
          </>
        )}
      </Card>
    </Col>
  );
};

CardUserComponent.propTypes = {
  title: PropTypes.string.isRequired,
  colorHeader: PropTypes.string,
  colorBody: PropTypes.string,
  colorFooter: PropTypes.string,
  borderColor: PropTypes.string,
  viewButton: PropTypes.bool,
  editButton: PropTypes.bool,
  deleteButton: PropTypes.bool,
  isEditMode: PropTypes.bool,
  isAddMode: PropTypes.bool,
  customEdit: PropTypes.bool,
};
