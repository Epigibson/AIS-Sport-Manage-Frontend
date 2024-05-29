import { TablesComponent } from "../../components/TablesComponent.jsx";
import { ProductsColumns } from "./ProductsColumns.jsx";
import { Button, Form, message, Row } from "antd";
import { useState } from "react";
import { ModalComponent } from "../../components/ModalComponent.jsx";
import { ProductsFormFields } from "./ProductsFormFields.jsx";
import { getAllSalesProducts } from "../../api/ProductsService.jsx";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  useCreateSalesProduct,
  useDeleteSalesProduct,
  useUpdateSalesProduct,
} from "./ProductsLogicMutations.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";

export const ProductsLogic = () => {
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalAddStockVisible, setIsModalAddStockVisible] = useState(false);
  const [modalContext, setModalContext] = useState("");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [previousStock, setPreviousStock] = useState(null);
  const [form] = Form.useForm();
  const {
    data: productData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["productList"],
    queryFn: getAllSalesProducts,
  });

  const handleSearch = async () => {
    await queryClient.invalidateQueries({
      queryKey: ["productList"],
    });
    await refetch();
  };

  const { mutateCreateSalesProduct } = useCreateSalesProduct(handleSearch);
  const { mutateUpdateSalesProduct } = useUpdateSalesProduct(handleSearch);
  const { mutateDeleteSalesProduct } = useDeleteSalesProduct(handleSearch);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (modalContext === "edit") {
      console.log("SE EDITA");
      console.log("VER SI CAMBIA", values);
      await mutateUpdateSalesProduct({
        ...values,
        sales_product_id: selectedRecord.product_id,
      });
    }
    if (modalContext === "create") {
      console.log("SE CREA");
      console.log("VER SI CAMBIA", values);
      await mutateCreateSalesProduct(values);
    }
    if (modalContext === "addStock") {
      console.log("SE CREA");
      console.log("VER SI CAMBIA", values);
      values.quantity_stock = previousStock + values.quantity_stock;
      await mutateUpdateSalesProduct({
        ...values,
        sales_product_id: selectedRecord.product_id,
      });
    }
    form.resetFields();
    setModalContext("");
    setSelectedRecord(null);
    setIsModalVisible(false);
    setIsModalAddStockVisible(false);
  };

  const handleEdit = (record) => {
    setModalContext("edit");
    form.setFieldsValue(record);
    setSelectedRecord(record);
    setIsModalVisible(true);
  };

  const handleAddStock = (record) => {
    setModalContext("addStock");
    setPreviousStock(record.quantity_stock);
    setSelectedRecord(record);
    setIsModalAddStockVisible(true);
  };

  const handleDelete = async (record) => {
    setModalContext("delete");
    setSelectedRecord(record);
    await mutateDeleteSalesProduct(selectedRecord?.product_id);
  };

  const handleCancel = () => {
    setModalContext("");
    form.resetFields();
    setIsModalVisible(false);
    setIsModalAddStockVisible(false);
  };

  const cancel = (e) => {
    console.log(e);
    message.error("Click on No").then((r) => r);
  };

  const showModal = () => {
    setModalContext("create");
    setIsModalVisible(true);
  };

  const columns = ProductsColumns({
    onEdit: handleEdit,
    onDelete: handleDelete,
    onCancel: cancel,
    onAddStock: handleAddStock,
  });

  if (isError) {
    return <div>Error</div>;
  }
  if (isLoading) {
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
          Registrar Producto
        </Button>
      </Row>
      <ModalComponent
        form={form}
        formFields={ProductsFormFields}
        title={modalContext === "edit" ? "Editar Registro" : "Crear Registro"}
        onOk={handleSubmit}
        onOpen={isModalVisible}
        onClose={handleCancel}
      />
      <ModalComponent
        form={form}
        formFields={[
          {
            name: "quantity_stock",
            label: "Cantidad",
            rules: [{ required: true, message: "La cantidad es obligatoria" }],
            inputType: "number",
          },
        ]}
        title={"Agregar Stock"}
        onOk={handleSubmit}
        onOpen={isModalAddStockVisible}
        onClose={handleCancel}
      />
      <TablesComponent
        data={productData}
        columns={columns}
        loading={isLoading}
      />
    </>
  );
};
