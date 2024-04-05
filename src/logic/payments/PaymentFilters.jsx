import { Button, Col, Divider, Row, Select, Space } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

export const PaymentFilters = ({
  setShowFilters,
  showFilters,
  handleUserChange,
  handleAthleteChange,
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
          <Col className="gutter-row" xs={24} sm={12} md={10} lg={6} xl={4}>
            <Select
              size={"small"}
              style={{ width: "100%" }}
              showSearch
              allowClear={true}
              placeholder="Usuario"
              optionFilterProp="children"
              onChange={handleAthleteChange}
              loading={isLoading}
              filterOption={filterOption}
              options={athletesData?.map((athlete) =>
                // console.log("ATLETAAAAA", athlete),
                ({
                  value: athlete._id,
                  key: athlete._id,
                  label: <span>{athlete.name}</span>,
                  search: athlete.name.toLowerCase(), // Este campo se usará para el filtrado
                }),
              )}
            />
          </Col>
          <Col className="gutter-row" xs={24} sm={12} md={10} lg={6} xl={4}>
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
              ]}
            />
          </Col>
          <Col className="gutter-row" xs={24} sm={12} md={10} lg={6} xl={4}>
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
          <Col className="gutter-row" xs={24} sm={12} md={10} lg={6} xl={4}>
            <Space.Compact block style={{ width: "100%" }}>
              <Select
                size={"small"}
                style={{ width: "100%" }}
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
  handleUserChange: PropTypes.func,
  handleAthleteChange: PropTypes.func,
  isLoading: PropTypes.bool,
  filterOption: PropTypes.func,
  athletesData: PropTypes.array,
  handleChangeStatus: PropTypes.func,
  handleChangePaymentType: PropTypes.func,
  handleChangePaymentMethod: PropTypes.func,
  handleSearch: PropTypes.func,
  handleResetFilters: PropTypes.func,
};
