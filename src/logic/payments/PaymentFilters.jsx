import { Button, Col, DatePicker, Divider, Row, Select, Space } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import dayjs from "dayjs";

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
  handleChangePaymentType,
  handleChangePaymentMethod,
  handleSearch,
  handleResetFilters,
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
              ranges={{
                "Ultimos 7 Dias": [
                  dayjs().startOf("day").subtract(7, "days"),
                  dayjs().endOf("day"),
                ],
                "Ultimos 30 Dias": [
                  dayjs().startOf("day").subtract(30, "days"),
                  dayjs().endOf("day"),
                ],
                Ayer: [
                  dayjs().startOf("day").subtract(1, "days"),
                  dayjs().endOf("day").subtract(1, "days"),
                ],
                Hoy: [dayjs().startOf("day"), dayjs().endOf("day")],
                "Este Mes": [dayjs().startOf("month"), dayjs().endOf("month")],
                "Esta Semana": [dayjs().startOf("week"), dayjs().endOf("week")],
              }}
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
              options={athletesData?.map((athlete) =>
                // console.log("ATLETAAAAA", athlete),
                ({
                  value: athlete?._id,
                  key: athlete?._id,
                  label: <span>{athlete?.name}</span>,
                  search: athlete?.name.toLowerCase(), // Este campo se usará para el filtrado
                }),
              )}
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
            />
          </Col>
          <Col xs={24} sm={12} md={10} lg={6} xl={4}>
            <Select
              size={"small"}
              style={{ width: "100%" }}
              showSearch
              allowClear={true}
              placeholder="Tipo de Pago"
              onChange={handleChangePaymentType}
              options={[
                { value: "inscription", label: "Inscripcion" },
                { value: "payment", label: "Paquete" },
              ]}
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
          <Col xs={24} sm={12} md={10} lg={6} xl={4}></Col>
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
  handleChangePaymentType: PropTypes.func,
  handleChangePaymentMethod: PropTypes.func,
  handleSearch: PropTypes.func,
  handleResetFilters: PropTypes.func,
  handleDateChange: PropTypes.func,
  dateRange: PropTypes.array,
  showCreateModal: PropTypes.func,
};
