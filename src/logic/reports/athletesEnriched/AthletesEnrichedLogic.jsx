import { useQuery } from "@tanstack/react-query";
import { getAllAthletesEnriched } from "../../../api/AtheleService.jsx";
import { AthletesEnrichedColumns } from "./AthletesEnrichedColumns.jsx";
import { LoaderIconUtils } from "../../../utils/LoaderIconUtils.jsx";
import { AthletesEnrichedNestedColumns } from "./AthletesEnrichedNestedColumns.jsx";
import { useCallback, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { AthletesEnrichedStatisticCards } from "./AthletesEnrichedStatisticCards.jsx";
import { getAmountsByStatus } from "./AthletesEnrichedCalculateTotals.jsx";
import { Button, Col, DatePicker, Row, Select, Space } from "antd";
import { StatisticCard } from "../../../components/StatisticCardComponent.jsx";
import { TablesComponent } from "../../../components/TablesComponent.jsx";
import { useLoading } from "../../../hooks/LoadingContext/useLoading.jsx";
import { PrepareFilters } from "./AthletesEnrichedPrepareFilters.jsx";
import { getAllPackages } from "../../../api/ProductService.jsx";
import { exportAthletesToExcel } from "./AthletesEnrichedToExcel.jsx";
import { DatePresets } from "../../../utils/DatePresets.jsx";

export const AthletesEnrichedLogic = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [receiptStatus, setReceiptStatus] = useState(null);
  const [receiptPackage, setReceiptPackage] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
    receiptStatus: null,
    receiptPackage: null,
    paymentMethod: null,
  });

  const {
    startLoading,
    stopLoading,
    isLoading: globalIsLoading,
  } = useLoading();

  const {
    data: athletesEnriched,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["athletesEnriched", filters],
    queryFn: () =>
      getAllAthletesEnriched({
        start_date: filters.startDate,
        end_date: filters.endDate,
        receipt_status: filters.receiptStatus,
        receipt_package: filters.receiptPackage,
        payment_method: filters.paymentMethod,
      }),
    onSuccess: stopLoading,
    onError: stopLoading,
  });

  const { data: packagesData } = useQuery({
    queryKey: ["allPackages"],
    queryFn: getAllPackages,
  });

  useEffect(() => {
    if (isLoading) {
      startLoading();
    } else {
      stopLoading();
    }
  }, [isLoading, startLoading, stopLoading]);

  const columns = useMemo(
    () =>
      athletesEnriched
        ? AthletesEnrichedColumns({
            name: PrepareFilters(athletesEnriched, "name"),
            status: PrepareFilters(athletesEnriched, "status"),
          })
        : [],
    [athletesEnriched],
  );

  const nestedColumns = AthletesEnrichedNestedColumns;

  const onDateChange = useCallback((dates, dateStrings) => {
    setStartDate(dateStrings[0] ? dayjs(dateStrings[0]).toISOString() : null);
    setEndDate(dateStrings[1] ? dayjs(dateStrings[1]).toISOString() : null);
  }, []);

  const onStatusChange = useCallback((value) => {
    setReceiptStatus(value);
  }, []);

  const onPackageChange = useCallback((value) => {
    setReceiptPackage(value);
  }, []);

  const onPaymentMethodChange = useCallback((value) => {
    setPaymentMethod(value);
  }, []);

  const applyFilters = useCallback(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      startDate,
      endDate,
      receiptStatus,
      receiptPackage,
      paymentMethod,
    }));
  }, [startDate, endDate, receiptStatus, receiptPackage, paymentMethod]);

  const clearFilters = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setReceiptStatus(null);
    setReceiptPackage(null);
    setPaymentMethod(null);
    setFilters({
      startDate: null,
      endDate: null,
      receiptStatus: null,
      receiptPackage: null,
      paymentMethod: null,
    });
  }, []);

  const statisticCardsDataUsed = useMemo(() => {
    if (athletesEnriched) {
      return AthletesEnrichedStatisticCards(
        getAmountsByStatus(athletesEnriched),
      );
    }
    return [];
  }, [athletesEnriched]);

  return (
    <>
      {globalIsLoading && <LoaderIconUtils isLoading={true} />}
      {isError && <h1>Error</h1>}
      {!globalIsLoading && !isError && (
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
                  statistics={card.statistics}
                  backgroundClass={card.backgroundClass}
                />
              </Col>
            ))}
          </Row>
          <Space direction="horizontal" size={12}>
            <DatePicker.RangePicker
              placeholder={["Inicio", "Fin"]}
              presets={DatePresets}
              onChange={onDateChange}
              value={
                startDate && endDate ? [dayjs(startDate), dayjs(endDate)] : []
              }
            />
            <Select
              className={"w-36"}
              onChange={onStatusChange}
              placeholder="Estatus"
              value={receiptStatus}
              allowClear
            >
              <Select.Option value="Pendiente">Pendiente</Select.Option>
              <Select.Option value="Pagado">Pagado</Select.Option>
              <Select.Option value="Cancelado">Cancelado</Select.Option>
            </Select>
            <Select
              className={"w-56"}
              onChange={onPackageChange}
              placeholder="Membresia"
              value={receiptPackage}
              allowClear
            >
              {packagesData?.map((packageItem) => (
                <Select.Option key={packageItem._id} value={packageItem._id}>
                  {packageItem.product_name}
                </Select.Option>
              ))}
            </Select>
            <Select
              className={"w-36"}
              onChange={onPaymentMethodChange}
              placeholder="Metodo de pago"
              value={paymentMethod}
              allowClear
            >
              <Select.Option value="Efectivo">Efectivo</Select.Option>
              <Select.Option value="Transferencia">Transferencia</Select.Option>
              <Select.Option value="Tarjeta">Tarjeta</Select.Option>
            </Select>
            <Button
              type="primary"
              className={"bg-primary-700"}
              onClick={applyFilters}
            >
              Aplicar
            </Button>
            <Button onClick={clearFilters}>Limpiar</Button>
            <Button
              type="primary"
              className={"bg-primary-700"}
              onClick={() => exportAthletesToExcel(athletesEnriched)}
            >
              Exportar a Excel
            </Button>
          </Space>
          <TablesComponent
            data={athletesEnriched}
            loading={isLoading}
            expandable={true}
            columns={columns}
            nestedColumns={nestedColumns}
            headerFixed={true}
          />
        </>
      )}
    </>
  );
};
