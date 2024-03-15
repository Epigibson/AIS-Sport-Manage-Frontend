import { useQuery } from "@tanstack/react-query";
import { getAllHistoryPayments } from "../../api/PaymentService.jsx";
import { PaymentColumns } from "./PaymentColumns.jsx";
import { LoaderIconUtils } from "../../utils/LoaderIconUtils.jsx";
import { TablesComponent } from "../../components/TablesComponent.jsx";
import { getAllUsers } from "../../api/UserService.jsx";
import { getAllReceipts } from "../../api/ReceiptsService.jsx";
import { ModalComponent } from "../../components/ModalComponent.jsx";
import { useState } from "react";
import { PaymentReceiptColumns } from "./PaymentReceiptColumns.jsx";
import { Button, Col, Divider, Grid, Row, Select, Space } from "antd";
import "./PaymentsStyle.css";
import { ArrowDownOutlined } from "@ant-design/icons";

const { useBreakpoint } = Grid;

export const PaymentLogic = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState({});
  const [userFilter, setUserFilter] = useState("");
  const [statusPayFilter, setStatusPayFilter] = useState("");
  const [paymentTypeFilter, setPaymentTypeFilter] = useState("");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const {
    data: historyPaymentData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: [
      "allHistoryPayments",
      userFilter,
      statusPayFilter,
      paymentTypeFilter,
      paymentMethodFilter,
    ],
    queryFn: () =>
      getAllHistoryPayments({
        user: userFilter,
        status_pay: statusPayFilter,
        payment_type: paymentTypeFilter,
        payment_method: paymentMethodFilter,
      }),
    enabled: false, // no ejecutar la consulta automáticamente
  });

  const { data: usersData } = useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });

  const { data: receiptsData } = useQuery({
    queryKey: ["allReceipts"],
    queryFn: getAllReceipts,
  });

  const enrichedHistoryPaymentsData = historyPaymentData?.map(
    (historyPayment) => {
      const user = usersData?.find((user) => user._id === historyPayment.user); // Ajusta según la estructura de tus datos
      const receipt = receiptsData?.find(
        (receipt) => receipt._id === historyPayment.receipt_id,
      ); // Ajusta según la estructura de tus datos
      return { ...historyPayment, user, receipt }; // Añade la información del grupo al objeto de usuario
    },
  );

  const showReceipts = (record) => {
    // console.log("DATA DE EL RECIBO SELECCIONADO", record.receipt);
    setSelectedReceipt([record.receipt]);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  if (isLoading) return <LoaderIconUtils />;
  if (isError) return <h1>Error...</h1>;

  const columns = PaymentColumns({
    showReceipts: showReceipts,
  });

  const handleSearch = () => {
    refetch();
  };

  // Filter `option.label` match the user type `input`
  // Actualiza la función `filterOption` para usar el nuevo campo `search`:
  const filterOption = (input, option) =>
    option.search.includes(input.toLowerCase());

  // Asegúrate de incluir esta parte dentro de tu componente
  const handleUserChange = (value, option) => {
    setUserFilter(option.key); // Opcional, si quieres guardar también el nombre del usuario seleccionado
  };

  const handleChangeStatus = (value) => {
    setStatusPayFilter(value);
    console.log(`selected ${value}`);
  };

  const handleChangePaymentType = (value) => {
    setPaymentTypeFilter(value);
    console.log(`selected ${value}`);
  };

  const handleChangePaymentMethod = (value) => {
    setPaymentMethodFilter(value);
    console.log(`selected ${value}`);
  };

  return (
    <>
      <Divider orientation="center">
        <Button
          type="text"
          icon={<ArrowDownOutlined />}
          style={{ width: "100%", backgroundColor: "transparent" }}
          onClick={() => setShowFilters(!showFilters)}
        >
          Filtros
        </Button>
      </Divider>

      {showFilters ? (
        <Row
          gutter={[16, 16]}
          wrap={true}
          align={"middle"}
          justify={"center"}
          className={"mb-6"}
        >
          <Col className="gutter-row" xs={24} sm={12} md={10} lg={6} xl={4}>
            <Select
              size={"small"}
              style={{ width: "100%" }}
              showSearch
              allowClear={true}
              placeholder="Usuario"
              optionFilterProp="children"
              onChange={handleUserChange}
              loading={isLoading}
              filterOption={filterOption}
              options={usersData?.map((user) => ({
                value: user._id,
                key: user._id,
                label: <span>{user.name}</span>,
                search: user.name.toLowerCase(), // Este campo se usará para el filtrado
              }))}
            />
          </Col>
          <Col className="gutter-row" xs={24} sm={12} md={10} lg={6} xl={4}>
            <Select
              size={"small"}
              style={{ width: "100%" }}
              showSearch
              placeholder="Estatus"
              onChange={handleChangeStatus}
              options={[
                { value: "Creado", label: "Creado" },
                { value: "Pendiente", label: "Pendiente" },
                { value: "Pagado", label: "Pagado" },
                { value: "Vencido", label: "Vencido" },
              ]}
            />
          </Col>
          <Col className="gutter-row" xs={24} sm={12} md={10} lg={6} xl={4}>
            <Select
              size={"small"}
              style={{ width: "100%" }}
              showSearch
              placeholder="Tipo de Pago"
              onChange={handleChangePaymentType}
              options={[
                { value: "inscription", label: "Inscripcion" },
                { value: "paquete", label: "Paquete" },
              ]}
            />
          </Col>
          <Col className="gutter-row" xs={24} sm={12} md={10} lg={6} xl={4}>
            <Space.Compact block style={{ width: "100%" }}>
              <Select
                size={"small"}
                style={{ width: "100%" }}
                showSearch
                placeholder="Metodo de Pago"
                onChange={handleChangePaymentMethod}
                options={[
                  { value: "Efectivo", label: "Efectivo" },
                  { value: "Tarjeta", label: "Tarjeta" },
                  { value: "Transferencia", label: "Transferencia" },
                  {
                    value: "Tienda de Conveniencia",
                    label: "Tienda de Conveniencia",
                  },
                ]}
              />
              <Button
                size={"small"}
                style={{ width: "100%" }}
                onClick={handleSearch}
                type="primary"
                className={"bg-primary-700"}
              >
                Buscar
              </Button>
            </Space.Compact>
          </Col>
        </Row>
      ) : (
        <></>
      )}

      {/*<Row gutter={[16, 24]} className={"mb-2"}>*/}
      {/*  */}
      {/*</Row>*/}
      {/*<Row gutter={{ xs: 32, sm: 24, md: 16, lg: 8 }} className={"mb-4"}>*/}
      {/*  */}
      {/*</Row>*/}
      <ModalComponent
        dataTable={selectedReceipt}
        dataTableColumns={PaymentReceiptColumns}
        title={"Recibo"}
        onOpen={isModalVisible}
        onClose={handleCloseModal}
      />
      <>
        <TablesComponent data={enrichedHistoryPaymentsData} columns={columns} />
      </>
    </>
  );
};
