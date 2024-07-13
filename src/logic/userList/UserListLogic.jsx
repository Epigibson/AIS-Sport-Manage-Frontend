import { TablesComponent } from "../../components/TablesComponent.jsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUsersAsAdmin } from "../../api/UserService.jsx";
import { UserListColumns } from "./UserListColumns.jsx";
import { PrepareFiltersColumn } from "../../utils/PrepareFiltersColumn.jsx";
import { ModalComponent } from "../../components/ModalComponent.jsx";
import { Form } from "antd";
import { useCallback, useMemo, useState } from "react";
import {
  useAddBalance,
  useCreateAdmin,
  useCreateManager,
  useSubtractBalance,
} from "./UserListMutations.jsx";
import { UserListFormFields } from "./UserListFormFields.jsx";
import { UserListFormFieldsCreate } from "./UserListFormFieldsCreate.jsx";
import {
  ManageLoadingAndErrorData,
  UserListCreationButtons,
} from "./UserListUtils.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";

export const UserListLogic = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recordSelected, setRecordSelected] = useState(null);
  const [typeOfBalance, setTypeOfBalance] = useState(null);
  const [actionType, setActionType] = useState(null);
  const [operationForm, setOperationForm] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const {
    data: usersData,
    isLoading: usersIsLoading,
    isError: usersIsError,
    error: usersError,
    refetch,
  } = useQuery({
    queryKey: ["usersDataAsAdmin"],
    queryFn: getAllUsersAsAdmin,
  });

  const handleSearch = useCallback(async () => {
    await queryClient.invalidateQueries({
      queryKey: ["productList"],
    });
    await refetch();
  }, [queryClient, refetch]);

  const userLogged = queryClient.getQueryData(["userLogged"]);

  const { mutateAddBalance } = useAddBalance(handleSearch);
  const { mutateSubtractBalance } = useSubtractBalance(handleSearch);
  const { mutateCreateManager } = useCreateManager(handleSearch);
  const { mutateCreateAdmin } = useCreateAdmin(handleSearch);

  const handleOpenModal = useCallback((record, typeOfBalance, actionType) => {
    setRecordSelected(record ? record : null);
    setTypeOfBalance(typeOfBalance ? typeOfBalance : null);
    setActionType(actionType);
    switch (actionType) {
      case "change_balance":
        setModalTitle("Agregar Saldo");
        setOperationForm(UserListFormFields);
        break;
      case "create_manager":
        setModalTitle("Crear Administrador");
        setOperationForm(UserListFormFieldsCreate);
        break;
      case "create_admin":
        setModalTitle("Crear Super Admin");
        setOperationForm(UserListFormFieldsCreate);
        break;
      default:
        setOperationForm(null);
        break;
    }
    setIsModalVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    form.resetFields();
    setRecordSelected(null);
    setTypeOfBalance(null);
    setIsModalVisible(false);
    setActionType(null);
    setModalTitle("");
  }, [form]);

  const handleSubmit = useCallback(() => {
    const formValues = form.getFieldsValue();
    if (actionType === "change_balance") {
      if (typeOfBalance === "add_balance") {
        mutateAddBalance({
          user_id: recordSelected.user_id,
          balance_amount: form.getFieldValue("balance_amount"),
          payment_method: form.getFieldValue("payment_method"),
        });
      } else if (typeOfBalance === "subtract_balance") {
        mutateSubtractBalance({
          user_id: recordSelected.user_id,
          balance_amount: form.getFieldValue("balance_amount"),
        });
      }
    } else if (actionType === "create_manager") {
      mutateCreateManager(formValues);
    } else if (actionType === "create_admin") {
      mutateCreateAdmin(formValues);
    }
    handleCancel();
  }, [
    form,
    actionType,
    handleCancel,
    typeOfBalance,
    mutateAddBalance,
    recordSelected,
    mutateSubtractBalance,
    mutateCreateManager,
    mutateCreateAdmin,
  ]);

  const columns = useMemo(() => {
    if (!usersData) return [];
    return UserListColumns({
      filters: {
        tutors_name_one: PrepareFiltersColumn(usersData, "tutors_name_one"),
        email: PrepareFiltersColumn(usersData, "email"),
        username: PrepareFiltersColumn(usersData, "username"),
      },
      handleOpenModal,
    });
  }, [usersData, handleOpenModal]);

  if (usersIsError) {
    return <h1>Error</h1>;
  }
  if (usersIsLoading) {
    return <LoaderIconUtils isLoading={true} />;
  }

  return (
    <>
      <ManageLoadingAndErrorData
        dataIsError={usersIsError}
        dataLoading={usersIsLoading}
        dataError={usersError}
      />
      <ModalComponent
        form={form}
        formFields={operationForm}
        onOk={handleSubmit}
        title={modalTitle}
        onOpen={isModalVisible}
        onClose={handleCancel}
      />
      <UserListCreationButtons
        handleOpenModal={handleOpenModal}
        userLogged={userLogged}
      />
      <TablesComponent
        data={usersData}
        columns={columns}
        loading={usersIsLoading}
      />
    </>
  );
};
