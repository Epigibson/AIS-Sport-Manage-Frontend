import { TablesComponent } from "../../components/TablesComponent.jsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUsersAsAdmin } from "../../api/UserService.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";
import { UserListColumns } from "./UserListColumns.jsx";
import { PrepareFiltersColumn } from "../../utils/PrepareFiltersColumn.jsx";
import { ModalComponent } from "../../components/ModalComponent.jsx";
import { Form } from "antd";
import { useCallback, useMemo, useState } from "react";
import { useAddBalance, useSubtractBalance } from "./UserListMutations.jsx";
import { UserListFormFields } from "./UserListFormFields.jsx";

export const UserListLogic = () => {
  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recordSelected, setRecordSelected] = useState(null);
  const [typeOfBalance, setTypeOfBalance] = useState(null);
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

  const { mutateAddBalance } = useAddBalance(handleSearch);
  const { mutateSubtractBalance } = useSubtractBalance(handleSearch);

  const handleOpenModal = useCallback((record, typeOfBalance) => {
    setRecordSelected(record);
    setTypeOfBalance(typeOfBalance);
    setIsModalVisible(true);
  }, []);

  const handleCancel = useCallback(() => {
    form.resetFields();
    setRecordSelected(null);
    setTypeOfBalance(null);
    setIsModalVisible(false);
  }, [form]);

  const submitEditBalance = useCallback(() => {
    if (typeOfBalance === "add_balance") {
      mutateAddBalance({
        user_id: recordSelected.user_id,
        balance_amount: form.getFieldValue("balance_amount"),
      });
    } else if (typeOfBalance === "subtract_balance") {
      mutateSubtractBalance({
        user_id: recordSelected.user_id,
        balance_amount: form.getFieldValue("balance_amount"),
      });
    }
    handleCancel();
  }, [
    form,
    mutateAddBalance,
    mutateSubtractBalance,
    recordSelected,
    typeOfBalance,
    handleCancel,
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

  if (usersIsLoading) {
    return <LoaderIconUtils isLoading={true} />;
  }
  if (usersIsError) {
    return <div>Error: {usersError.message}</div>;
  }

  return (
    <>
      <ModalComponent
        form={form}
        formFields={UserListFormFields}
        onOk={submitEditBalance}
        title={"Agregar Saldo"}
        onOpen={isModalVisible}
        onClose={handleCancel}
      />
      <TablesComponent data={usersData} columns={columns} />
    </>
  );
};
