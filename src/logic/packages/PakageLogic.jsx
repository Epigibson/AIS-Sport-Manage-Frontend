import { TablesComponent } from "../../components/TablesComponent.jsx";
import { useQuery } from "@tanstack/react-query";
import { getAllPackages } from "../../api/ProductService.jsx";
import { PackagesColumns } from "../product/ProductColumns.jsx";
import { useCreatePackage } from "./PackageLogicMutations.jsx";
import { Button, Form } from "antd";
import { useState } from "react";
import { ModalComponent } from "../../components/ModalComponent.jsx";
import { packageFormFields } from "./PackageFormFields.jsx";

export const PackageLogic = () => {
  const { mutate } = useCreatePackage();
  const [form] = Form.useForm();
  const title = "Crear nuevo paquete";
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {
    data: packagesData,
    isLoading,
    isError,
  } = useQuery({ queryKey: ["allPackages"], queryFn: getAllPackages });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const values = form.getFieldsValue();
    console.log({ "VALORES DEL FORMULARIO": values });

    // await mutate(newPackage);
    form.resetFields();
    setIsModalVisible(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <>
      <div className="flex justify-end mb-3">
        <Button
          className={"bg-primary-700 text-white hover:bg-primary-800"}
          title={"Crear nuevo paquete"}
          type={"primary"}
          onClick={showModal}
        >
          Crear nuevo paquete
        </Button>
      </div>
      <ModalComponent
        form={form}
        formFields={packageFormFields}
        title={title}
        onOk={handleSubmit}
        onOpen={isModalVisible}
        onClose={handleCancel}
      />
      <TablesComponent data={packagesData} columns={PackagesColumns} />
    </>
  );
};
