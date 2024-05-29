import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllSalesHistory } from "../../api/SalesHistoryService.jsx";
import { TablesComponent } from "../../components/TablesComponent.jsx";
import { SalesHistoryColumns } from "./SalesHistoryColumns.jsx";
import {
  useCreateSalesHistory,
  useDeleteSalesHistory,
  useUpdateSalesHistory,
} from "./SalesHistoryLogicMutations.jsx";
import { Button, Form, message, Row } from "antd";
import { ModalComponent } from "../../components/ModalComponent.jsx";
import { useState } from "react";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";
import { SalesHistoryFormFields } from "./SalesHistoryFormFields.jsx";
import { getAllSalesProducts } from "../../api/ProductsService.jsx";

export const SalesHistoryLogic = () => {
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContext, setModalContext] = useState("");
  const [form] = Form.useForm();
  const [selectedRecord, setSelectedRecord] = useState(null);
  const {
    data: salesHistoryData,
    error: salesHistoryError,
    isLoading: salesHistoryLoading,
    refetch,
  } = useQuery({
    queryKey: ["salesHistory"],
    queryFn: getAllSalesHistory,
  });

  const { data: productData, refetch: refetchProduct } = useQuery({
    queryKey: ["productList"],
    queryFn: getAllSalesProducts,
  });

  const handleSearch = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["salesHistory", "productList"],
    });
    await refetch();
    await refetchProduct();
  };

  const { mutateCreateSalesHistory } = useCreateSalesHistory(handleSearch);
  const { mutateUpdateSalesHistory } = useUpdateSalesHistory(handleSearch);
  const { mutateDeleteSalesHistory } = useDeleteSalesHistory(handleSearch);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (modalContext === "edit") {
      console.log("SE EDITA");
      console.log("VER SI CAMBIA", values);
      await mutateUpdateSalesHistory({
        ...values,
        sales_history_id: selectedRecord.sales_history_id,
      });
    }
    if (modalContext === "create") {
      console.log("SE CREA");
      const productSelected = await productData.find(
        (product) => product._id === values.product_id,
      );
      values.product_name = productSelected.name;
      console.log("VER SI CAMBIA", values);
      await mutateCreateSalesHistory(values);
    }
    form.resetFields();
    setModalContext("");
    setSelectedRecord(null);
    setIsModalVisible(false);
  };

  const showModal = () => {
    setModalContext("create");
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setModalContext("edit");
    form.setFieldsValue(record);
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (record) => {
    setModalContext("delete");
    setSelectedRecord(record);
    await mutateDeleteSalesHistory(selectedRecord?.sales_history_id);
  };

  const handleCancel = () => {
    setModalContext("");
    form.resetFields();
    setIsModalVisible(false);
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No").then((r) => r);
  };

  const columns = SalesHistoryColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onCancel: cancel,
  });

  if (salesHistoryError) {
    return <div>Error</div>;
  }
  if (salesHistoryLoading) {
    return <LoaderIconUtils isLoading={true} />;
  }

  return (
    <>
      <Row justify={"end"} className={"overflow-hidden"}>
        <Button
          className={"bg-primary-700 mb-3"}
          type={"primary"}
          onClick={showModal}
        >
          Registrar Venta
        </Button>
      </Row>
      <ModalComponent
        form={form}
        formFields={SalesHistoryFormFields}
        title={modalContext === "edit" ? "Editar Registro" : "Crear Registro"}
        onOk={handleSubmit}
        onOpen={isModalVisible}
        onClose={handleCancel}
      />
      <TablesComponent
        data={salesHistoryData}
        columns={columns}
        loading={salesHistoryLoading}
      />
    </>
  );
};
