import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllSalesHistory } from "../../api/SalesHistoryService.jsx";
import { TablesComponent } from "../../components/TablesComponent.jsx";
import { SalesHistoryColumns } from "./SalesHistoryColumns.jsx";
import {
  useCreateSalesHistory,
  useDeleteSalesHistory,
  useUpdateSalesHistory,
} from "./SalesHistoryLogicMutations.jsx";
import { Button, Col, DatePicker, Form, message, Row, Space } from "antd";
import { ModalComponent } from "../../components/ModalComponent.jsx";
import { useEffect, useMemo, useState } from "react";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";
import { SalesHistoryFormFields } from "./SalesHistoryFormFields.jsx";
import { getAllSalesProducts } from "../../api/ProductsService.jsx";
import { PrepareFilters } from "../reports/athletesEnriched/AthletesEnrichedPrepareFilters.jsx";
import { DatePresets } from "../../utils/DatesUtils.jsx";
import dayjs from "dayjs";
import * as XLSX from "xlsx";
import { useLoading } from "../../hooks/LoadingContext/useLoading.jsx";
import { SalesHistoryStatisticCards } from "./SalesHistoryStatisticCards.jsx";
import { SalesHistoryCalculateTotals } from "./SalesHistoryCalculateTotals.jsx";
import { StatisticCard } from "../../components/StatisticCardComponent.jsx";

export const SalesHistoryLogic = () => {
  const queryClient = useQueryClient();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContext, setModalContext] = useState("");
  const [form] = Form.useForm();
  const [selectedRecord, setSelectedRecord] = useState(null);
  const {
    startLoading,
    stopLoading,
    isLoading: globalIsLoading,
  } = useLoading();

  const {
    data: salesHistoryData,
    error: salesHistoryError,
    isLoading: salesHistoryLoading,
    refetch,
  } = useQuery({
    queryKey: ["salesHistory", { startDate, endDate }],
    queryFn: () =>
      getAllSalesHistory({ start_date: startDate, end_date: endDate }),
    onSuccess: () => {
      stopLoading();
    },
    onError: () => {
      stopLoading();
    },
  });

  // Solo actualizar el estado de carga cuando cambie `isLoading`
  useEffect(() => {
    if (salesHistoryLoading) {
      startLoading();
    } else {
      stopLoading();
    }
  }, [salesHistoryLoading, startLoading, stopLoading]);

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
      // console.log("SE EDITA");
      // console.log("VER SI CAMBIA", values);
      await mutateUpdateSalesHistory({
        ...values,
        sales_history_id: selectedRecord.sales_history_id,
      });
    }
    if (modalContext === "create") {
      // console.log("SE CREA");
      const productSelected = await productData.find(
        (product) => product._id === values.product_id,
      );
      values.product_name = productSelected.name;
      values.payment_method =
        values.payment_method === undefined
          ? "Cortesia"
          : values.payment_method;
      // console.log("VER SI CAMBIA", values);
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
    filters: { product_name: PrepareFilters(salesHistoryData, "product_name") },
    onEdit: handleEdit,
    onDelete: handleDelete,
    onCancel: cancel,
  });

  const onDateChange = (dates, dateStrings) => {
    setStartDate(dateStrings[0] ? dayjs(dateStrings[0]).toISOString() : null);
    setEndDate(dateStrings[1] ? dayjs(dateStrings[1]).toISOString() : null);
    refetch();
  };

  const clearFilters = () => {
    setStartDate(null);
    setEndDate(null);
    refetch();
  };

  const statisticCardsDataUsed = useMemo(
    () =>
      SalesHistoryStatisticCards(SalesHistoryCalculateTotals(salesHistoryData)),
    [salesHistoryData],
  );

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(salesHistoryData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte de Ventas");
    XLSX.writeFile(
      workbook,
      `reporte_de_ventas${dayjs().format("YYYYMMDD_HHmmss")}.xlsx`,
    );
  };

  if (salesHistoryError) {
    return <div>Error</div>;
  }
  if (salesHistoryLoading || globalIsLoading) {
    return <LoaderIconUtils isLoading={true} />;
  }

  return (
    <>
      <Row
        gutter={[16, 16]}
        wrap={true}
        align={"middle"}
        justify={"center"}
        className={"mb-6"}
      >
        {statisticCardsDataUsed?.map((card, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={4}>
            <StatisticCard
              statistics={card.statistics} // Pasando el array de estadísticas directamente
              backgroundClass={card.backgroundClass} // El fondo de la tarjeta
            />
          </Col>
        ))}
      </Row>
      <Row justify={"end"} className={"overflow-hidden"}>
        <Button
          className={"bg-primary-700 mb-3"}
          type={"primary"}
          onClick={showModal}
        >
          Registrar Venta
        </Button>
        <Button
          type="primary"
          className={"bg-primary-700 ml-2"}
          onClick={exportToExcel}
        >
          Exportar a Excel
        </Button>
      </Row>
      <Space direction="horizontal" size={12}>
        <DatePicker.RangePicker
          placeholder={["Inicio", "Fin"]}
          presets={DatePresets}
          onChange={onDateChange}
          value={startDate && endDate ? [dayjs(startDate), dayjs(endDate)] : []}
        />
        <Button onClick={clearFilters}>Limpiar</Button>
      </Space>
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
