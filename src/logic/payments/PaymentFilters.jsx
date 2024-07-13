import { Button, Col, DatePicker, Divider, Row, Select, Space } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { DatePresets } from "../../utils/DatePresets.jsx";

const { RangePicker } = DatePicker;

export const PaymentFilters = ({
  setShowFilters,
  showFilters,
  handleAthleteChange,
  handleDateChange,
  dateRange,
  isLoading,
  filterOption,
  athletesData,
  handleChangeStatus,
  handleChangePaymentMethod,
  handleSearch,
  handleResetFilters,
  handleChangeReceiptPackageName,
  receiptPackageNames,
  handleUserChange,
  userFilter,
  athleteFilter,
  statusPayFilter,
  paymentMethodFilter,
  membershipFilter,
}) => {
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
          <Col xs={24} sm={12} md={10} lg={6} xl={4}>
            <RangePicker
              size="small"
              placeholder={["Inicio", "Fin"]}
              style={{ width: "100%" }}
              // showTime={{ format: "HH:mm" }}
              format="DD-MM-YYYY"
              presets={DatePresets}
              onChange={handleDateChange}
              value={
                dateRange?.length === 2
                  ? [
                      dayjs(dateRange[0], "YYYY-MM-DD HH:mm"),
                      dayjs(dateRange[1], "YYYY-MM-DD HH:mm"),
                    ]
                  : []
              }
            />
          </Col>
          <Col xs={24} sm={12} md={10} lg={6} xl={4}>
            <Select
              size={"small"}
              style={{ width: "100%" }}
              showSearch
              allowClear={true}
              placeholder="Atleta"
              optionFilterProp="children"
              onChange={handleAthleteChange}
              loading={isLoading}
              filterOption={filterOption}
              options={athletesData?.map((athlete) => ({
                value: athlete?._id,
                key: athlete?._id,
                label: <span>{athlete?.name}</span>,
                search: athlete?.name.toLowerCase(),
              }))}
              value={athleteFilter}
            />
          </Col>
          <Col xs={24} sm={12} md={10} lg={6} xl={4}>
            <Select
              size={"small"}
              style={{ width: "100%" }}
              showSearch
              allowClear={true}
              placeholder="Estatus"
              onChange={handleChangeStatus}
              options={[
                { value: "Creado", label: "Creado" },
                { value: "Pendiente", label: "Pendiente" },
                { value: "Pagado", label: "Pagado" },
                { value: "Vencido", label: "Vencido" },
                { value: "Cancelado", label: "Cancelado" },
              ]}
              value={statusPayFilter}
            />
          </Col>
          <Col xs={24} sm={12} md={10} lg={6} xl={4}>
            <Select
              size={"small"}
              style={{ width: "100%" }}
              showSearch
              allowClear={true}
              placeholder="Membresia"
              onChange={handleChangeReceiptPackageName}
              options={receiptPackageNames?.map((product) => ({
                value: product._id,
                key: product._id,
                label: <span>{product.product_name}</span>,
              }))}
              value={membershipFilter}
            />
          </Col>
          <Col xs={24} sm={12} md={10} lg={6} xl={4}>
            <Space.Compact
              block
              style={{ width: "100%" }}
              className={"items-center"}
            >
              <Select
                size={"small"}
                className="w-2/5 lg:w-full"
                showSearch
                allowClear={true}
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
                value={paymentMethodFilter}
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
              <Button
                size={"small"}
                style={{ width: "100%" }}
                onClick={handleResetFilters}
                type="primary"
                className={"ml-2 bg-primary-700"}
              >
                Limpiar Filtros
              </Button>
            </Space.Compact>
          </Col>
        </Row>
      ) : (
        <></>
      )}
    </>
  );
};

PaymentFilters.propTypes = {
  setShowFilters: PropTypes.func,
  showFilters: PropTypes.bool,
  handleAthleteChange: PropTypes.func,
  isLoading: PropTypes.bool,
  filterOption: PropTypes.func,
  athletesData: PropTypes.array,
  handleChangeStatus: PropTypes.func,
  handleChangePaymentMethod: PropTypes.func,
  handleSearch: PropTypes.func,
  handleResetFilters: PropTypes.func,
  handleDateChange: PropTypes.func,
  dateRange: PropTypes.array,
  showCreateModal: PropTypes.func,
  handleChangeReceiptPackageName: PropTypes.func,
  receiptPackageNames: PropTypes.array,
  userFilter: PropTypes.string,
  athleteFilter: PropTypes.string,
  statusPayFilter: PropTypes.string,
  paymentMethodFilter: PropTypes.string,
  membershipFilter: PropTypes.string,
};
