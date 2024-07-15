import {
  Button,
  Col,
  DatePicker,
  Input,
  InputNumber,
  Popconfirm,
  Row,
  Select,
  Space,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import "./PaymentsStyle.css";
import {
  BulbFilled,
  CheckCircleFilled,
  ClockCircleFilled,
  DeleteOutlined,
  DollarCircleFilled,
  EditFilled,
  ExclamationCircleFilled,
  RollbackOutlined,
  ScheduleFilled,
  StopOutlined,
  SyncOutlined,
  UserOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { FormatCurrencyUtil } from "../../utils/FormatCurrencyUtil.jsx";
import { TagCopyLink } from "../../utils/TagCopyLink.jsx";
import { NavigateToUtil } from "../../utils/NavigateToUtil.jsx";

const { Text, Link } = Typography;

export const PaymentColumns = ({
  showReceipts,
  showExtensionModal,
  handlePayReceipt,
  handleCancelReceipt,
  handleRevertReceipt,

  editingKeyPaymentMethod,
  editingKeyBalanceAmount,
  editingKeyBalancePayment,
  editingKeyAmount,
  editingKeyLimitDate,
  editingKeyPeriodMonth,
  editingKeyDiscountCode,

  editingBalancePayment, // Nuevo estado para manejar la edición del saldo a favor
  editingPaymentMethod,
  editingBalanceAmount,
  editingAmount,
  editingLimitDate,
  editingPeriodMonth,
  editingDiscountCode,

  setEditingBalancePayment, // Nueva función para manejar el cambio del saldo a favor
  setEditingPaymentMethod,
  setEditingBalanceAmount,
  setEditingAmount,
  setEditingLimitDate,
  setEditingPeriodMonth,
  setEditingDiscountCode,
  edit,
  cancel,
  handleSave,
  handleDeleteReceipt,
  checkUser,
  navigate,
  mutateSubtractAmountReceiptWithBalancePending,
  updatePaymentMethodPending,
  mutateUpdatePending,
}) => {
  console.log("ESTA PROCESANDO LA MUTACION 1", updatePaymentMethodPending);
  console.log("ESTA PROCESANDO LA MUTACION 2", mutateUpdatePending);
  console.log(
    "ESTA PROCESANDO LA MUTACION 3",
    mutateSubtractAmountReceiptWithBalancePending,
  );
  // console.log("RECORD QUE SE ESTA EDITANDO", editingKeyPaymentMethod);
  const columns = [
    {
      title: "Matricula",
      dataIndex: "athlete",
      key: "athlete",
      align: "center",
      width: 100,
      render: (athlete) =>
        athlete ? (
          <>
            <Tag color={"blue"}>
              <Text>{athlete?.tuition}</Text>
            </Tag>
          </>
        ) : (
          <span>Sin Matricula</span>
        ),
    },
    {
      title: "Atleta",
      dataIndex: "athlete",
      key: "athlete",
      align: "center",
      width: 200,
      ellipsis: false,
      render: (athlete, record) => {
        return athlete ? (
          <Row align={"middle"} justify={"space-evenly"}>
            <Tooltip title={athlete?.name} color={"blue"}>
              <Tag color={"blue"} className={"text-style"}>
                <Text className="text-style">{athlete?.name}</Text>
              </Tag>
            </Tooltip>
            <Tooltip
              title={() => {
                // console.log(record);
                const tutorsName =
                  record?.user?.tutors_name_one ||
                  record?.user?.tutors_name_two;
                return (
                  <>
                    <div>
                      {" "}
                      Tutor: {tutorsName ? tutorsName : "Sin datos del tutor"}
                    </div>
                    <div style={{ fontSize: "8px" }}>
                      {" "}
                      (Puedes dar click para copiar el nombre del tutor del
                      atleta.)
                    </div>
                  </>
                );
              }}
              color={"blue"}
            >
              <Button
                size={"small"}
                shape={"circle"}
                onClick={() =>
                  TagCopyLink(record, record?.user?.tutors_name_one, "Dato")
                }
              >
                <UserOutlined />
              </Button>
            </Tooltip>
          </Row>
        ) : (
          <span>Sin Usuario</span>
        );
      },
    },

    // {
    //   title: "Tipo de Pago",
    //   dataIndex: "payment_type",
    //   key: "payment_type",
    //   align: "center",
    //   render: (payment_type) => {
    //     if (payment_type === "inscription") {
    //       return <Tag color={"blue"}>Inscripción</Tag>;
    //     } else if (payment_type === "payment") {
    //       return <Tag color={"purple"}>Mensualidad</Tag>;
    //     } else {
    //       return <Tag color={"blue"}>{payment_type}</Tag>;
    //     }
    //   },
    // },
    {
      title: "Paquete",
      dataIndex: "receipt",
      key: "receipt",
      align: "center",
      width: 150,
      ellipsis: true,
      render: (_, record) =>
        record?.receipt && record?.receipt?.receipt_package_name ? (
          <Tooltip title={record?.receipt?.receipt_package_name} color={"cyan"}>
            <Tag color={"cyan"} className={"text-style"}>
              <Text className="text-style">
                {record?.receipt?.receipt_package_name}
              </Text>
            </Tag>
          </Tooltip>
        ) : (
          <Tag>Sin datos</Tag>
        ),
    },
    {
      title: "Cantidad",
      dataIndex: "amount",
      key: "amount",
      align: "center",
      width: 250,
      render: (_, record) =>
        editingKeyAmount === record?._id ? (
          <span>
            <InputNumber
              value={editingAmount}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
              onChange={(value) => setEditingAmount(value)}
            />
            <Space className="mt-2">
              <Button
                onClick={() => handleSave(record, "amount")}
                size="small"
                style={{ marginRight: 8 }}
              >
                Guardar
              </Button>
              <Button onClick={cancel} danger size="small">
                Cancelar
              </Button>
            </Space>
          </span>
        ) : (
          <div>
            {(() => {
              const formattedAmount = FormatCurrencyUtil(record?.amount); // Asegúrate de que 'record.amount' está definido correctamente
              const formattedAmountUpdated = FormatCurrencyUtil(
                record?.amount_balance_updated
                  ? record.amount_balance_updated
                  : null,
              );

              return (
                <>
                  {mutateSubtractAmountReceiptWithBalancePending &&
                  editingKeyBalanceAmount === record?._id ? (
                    <SyncOutlined twoToneColor={"#1d4ed8"} spin />
                  ) : (
                    <Row justify={"center"} align={"middle"}>
                      <Col>
                        <Tooltip
                          color={"orange"}
                          title={"Recibo con pagos parciales."}
                        >
                          <ScheduleFilled
                            color={"orange"}
                            className={"mr-2 text-orange-500"}
                            hidden={
                              record?.receipt?.times_applied_balance === 0
                            }
                          />
                        </Tooltip>
                        <Tooltip title={"Monto actualizado"}>
                          <CheckCircleFilled
                            color={"green"}
                            className={"mr-2 text-green-500"}
                            hidden={
                              !record?.amount_updated ||
                              record?.status === "Pagado"
                            }
                          />
                        </Tooltip>
                      </Col>
                      <Col span={14}>
                        <Tag className={"mb-1"}>Total: {formattedAmount}</Tag>
                        {formattedAmount !== formattedAmountUpdated &&
                          formattedAmountUpdated !== "$0.00" && (
                            <Tag>Restante: {formattedAmountUpdated}</Tag>
                          )}
                      </Col>
                      {record.status !== "Pagado" &&
                      record.status !== "Cancelado" &&
                      record.status !== "Parcial" ? (
                        <Col>
                          <Tooltip
                            title={
                              "Al editar el monto solo se ajustara el recibo actual. La recurrencia del monto " +
                              "original del paquete se respetara en los recibos consecuentes."
                            }
                            color={record.extension ? "blue" : "gray"}
                          >
                            <EditFilled
                              onClick={() => edit(record, "amount")}
                              size="small"
                              disabled={editingAmount !== ""}
                            >
                              Editar
                            </EditFilled>
                          </Tooltip>
                        </Col>
                      ) : null}
                    </Row>
                  )}
                </>
              );
            })()}
          </div>
        ),
    },
    {
      title: "Estatus",
      dataIndex: "status",
      key: "status",
      align: "center",
      searchable: true,
      width: 100,
      render: (status, record) => {
        let color;
        if (status === "Pagado") {
          color = "green";
        } else if (status === "Cancelado") {
          color = "red";
        } else {
          color = "warning";
        }

        return (
          <Tooltip title="Haz clic para copiar el ID">
            <Tag
              color={color}
              onClick={() => TagCopyLink(record, record?.receipt_id, "ID")}
              style={{ cursor: "pointer" }}
            >
              {status}
            </Tag>
          </Tooltip>
        );
      },
    },
    {
      title: "Metodo de Pago",
      dataIndex: "payment_method",
      key: "payment_method",
      align: "center",
      editable: true,
      width: 200,
      render: (_, record) =>
        editingKeyPaymentMethod === record?._id ? (
          <span
            hidden={
              updatePaymentMethodPending &&
              editingKeyPaymentMethod === record?._id
            }
          >
            <Select
              value={editingPaymentMethod}
              size={"small"}
              style={{ width: "100%" }}
              onChange={(value) => setEditingPaymentMethod(value)}
            >
              <Select.Option value="Transferencia">Transferencia</Select.Option>
              <Select.Option value="Efectivo">Efectivo</Select.Option>
              {record?.user?.positive_balance &&
              record?.user?.positive_balance > 0 ? (
                <Select.Option value="Saldo a favor">
                  Saldo a favor
                </Select.Option>
              ) : null}
            </Select>

            <Space.Compact className={"mt-2"}>
              <Button
                onClick={() => handleSave(record, "payment_method")}
                size="small"
                style={{ marginRight: 8 }}
              >
                Guardar
              </Button>
              <Button onClick={cancel} danger size="small">
                Cancelar
              </Button>
            </Space.Compact>
          </span>
        ) : (
          <div>
            <>
              {!mutateSubtractAmountReceiptWithBalancePending &&
              editingKeyBalancePayment === record?._id ? (
                <SyncOutlined
                  hidden={
                    !updatePaymentMethodPending ||
                    !mutateSubtractAmountReceiptWithBalancePending
                  }
                  twoToneColor={"#1d4ed8"}
                  spin
                />
              ) : (
                <>
                  <Row
                    justify={"center"}
                    align={"middle"}
                    hidden={
                      mutateSubtractAmountReceiptWithBalancePending &&
                      editingKeyBalancePayment === record?._id
                    }
                  >
                    <Col>
                      {record?.payment_method !== "Saldo a favor" ? (
                        <Popconfirm
                          title="Estas a punto de realizar un pago parcial, estas seguro??"
                          okText="Si"
                          cancelText="No"
                          wrapClassName="mi-popconfirm-especifico"
                          onConfirm={() =>
                            edit(
                              record,
                              "balance_payment",
                              record.payment_method,
                            )
                          }
                        >
                          <Button
                            hidden={
                              record.payment_method === "Saldo a favor" ||
                              record.status === "Pagado" ||
                              record.status === "Cancelado"
                            }
                            type="primary"
                            className="flex flex-row items-center justify-center mr-2"
                            size="small"
                          >
                            <DollarCircleFilled twoToneColor={"green"} />
                          </Button>
                        </Popconfirm>
                      ) : (
                        <SyncOutlined
                          hidden={
                            !updatePaymentMethodPending ||
                            !mutateSubtractAmountReceiptWithBalancePending
                          }
                          twoToneColor={"#1d4ed8"}
                          spin
                        />
                      )}
                    </Col>
                    <Col>
                      <Tag color="blue">
                        <Tooltip
                          title={
                            record.payment_method === "Saldo a favor" &&
                            record?.user?.positive_balance
                              ? `Saldo a favor: ${FormatCurrencyUtil(record?.user?.positive_balance)}`
                              : null
                          }
                          color={
                            record.payment_method === "Saldo a favor"
                              ? "blue"
                              : null
                          }
                        >
                          {record?.payment_method || "No especificado"}
                        </Tooltip>
                      </Tag>
                    </Col>
                    <Col>
                      {record?.status !== "Pagado" &&
                      record?.status !== "Cancelado" ? (
                        <EditFilled
                          onClick={() => edit(record, "payment_method")}
                          size="small"
                          disabled={editingPaymentMethod !== ""}
                          hidden={
                            record.status === "Cancelado" ||
                            record.status === "Pagado"
                          }
                        >
                          Editar
                        </EditFilled>
                      ) : null}
                    </Col>
                  </Row>
                </>
              )}
              {!mutateSubtractAmountReceiptWithBalancePending &&
                editingKeyBalancePayment === record._id && (
                  <div>
                    <InputNumber
                      value={editingBalancePayment}
                      onChange={(value) => setEditingBalancePayment(value)}
                      formatter={(value) =>
                        `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
                      min={0}
                      max={record.amount}
                    />
                    <Space className="mt-2">
                      <Button
                        onClick={() =>
                          handleSave(
                            record,
                            "balance_amount",
                            record.payment_method,
                          )
                        }
                        size="small"
                        style={{ marginRight: 8 }}
                      >
                        Guardar
                      </Button>
                      <Button onClick={cancel} danger size="small">
                        Cancelar
                      </Button>
                    </Space>
                  </div>
                )}
              {mutateSubtractAmountReceiptWithBalancePending &&
                editingKeyBalancePayment === record?._id && (
                  <SyncOutlined twoToneColor={"#1d4ed8"} spin />
                )}
              {updatePaymentMethodPending &&
                editingKeyPaymentMethod === record?._id && (
                  <SyncOutlined twoToneColor={"#1d4ed8"} spin />
                )}
            </>
          </div>
        ),
    },
    {
      title: "Saldo a Favor",
      key: "saldo",
      align: "center",
      width: 200,
      render: (_, record) => {
        return editingKeyBalanceAmount === record._id &&
          !mutateSubtractAmountReceiptWithBalancePending ? ( // Asumimos que usas _id como identificador único
          <span>
            <InputNumber
              value={editingBalanceAmount}
              onChange={(value) => setEditingBalanceAmount(value)}
              status={
                editingBalanceAmount > record?.amount_balance_updated
                  ? "error"
                  : null
              }
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
              // max={
              //   record?.user.positive_balance < record.amount
              //     ? record.user.positive_balance
              //     : record.amount_balance_updated
              // }
              min={0}
              title={"Prueba"}
            />

            <Space.Compact className={"mt-2"}>
              <Button
                onClick={() =>
                  handleSave(record, "balance_amount", record.payment_method)
                }
                size="small"
                style={{ marginRight: 8 }}
              >
                Guardar
              </Button>
              <Button onClick={cancel} danger size="small">
                Cancelar
              </Button>
            </Space.Compact>
          </span>
        ) : (
          <>
            {mutateSubtractAmountReceiptWithBalancePending &&
            editingKeyBalanceAmount === record?._id ? (
              <SyncOutlined spin twoToneColor={"#1d4ed8"} />
            ) : !record?.user?.positive_balance > 0 ? (
              <Tooltip
                title={`Haz clic para agregar saldo a favor al tutor: ${
                  record?.user?.tutors_name_one || record?.user?.tutors_name_two
                }`}
              >
                <Tag
                  color={"warning"}
                  style={{ cursor: "pointer" }}
                  onClick={async () => {
                    await TagCopyLink(
                      record,
                      record?.user?.tutors_name_one,
                      "Dato",
                    );
                    NavigateToUtil(navigate, "/wallet");
                  }}
                >
                  Sin saldo a favor
                </Tag>
              </Tooltip>
            ) : (
              <Space>
                <Row
                  gutter={[16, 16]}
                  wrap={true}
                  align={"middle"}
                  justify={"center"}
                >
                  <Col
                    className="gutter-row"
                    xs={8}
                    sm={8}
                    md={8}
                    lg={8}
                    xl={8}
                  >
                    <div className="flex flex-row items-center justify-center">
                      <Tag>
                        {FormatCurrencyUtil(record?.user?.positive_balance)}
                      </Tag>
                      {record.payment_method === "Saldo a favor" &&
                      (record.status === "Parcial" ||
                        record.status === "Pendiente" ||
                        record.status === "Creado") ? (
                        <Popconfirm
                          title="Estas seguro de aplicar un pago con saldo a favor?"
                          okText="Si"
                          cancelText="No"
                          wrapClassName="mi-popconfirm-especifico"
                          onConfirm={() => edit(record, "balance_amount")}
                        >
                          <Button
                            hidden={
                              record.payment_method !== "Saldo a favor" ||
                              record.status === "Pagado" ||
                              record.status === "Cancelado"
                            }
                            type="primary"
                            className="flex flex-row items-center justify-center"
                            size="small"
                          >
                            <DollarCircleFilled twoToneColor={"green"} />
                          </Button>
                        </Popconfirm>
                      ) : null}
                    </div>
                  </Col>
                </Row>
              </Space>
            )}
          </>
        );
      },
    },
    {
      title: "Cupon de Descuento",
      dataIndex: "discount_code",
      key: "discount_code",
      align: "center",
      width: 200,
      render: (_, record) =>
        editingKeyDiscountCode === record?._id ? ( // Asumimos que usas _id como identificador único
          <span>
            <Input
              value={editingDiscountCode}
              style={{
                height: 25,
                borderRadius: "5px",
                borderColor: "#1d4ed8",
              }}
              onChange={(value) => setEditingDiscountCode(value?.target?.value)}
            />
            <Space.Compact className={"mt-2"}>
              <Button
                onClick={() => handleSave(record, "discount_code")}
                size="small"
                style={{ marginRight: 8 }}
              >
                Guardar
              </Button>
              <Button onClick={cancel} danger size="small">
                Cancelar
              </Button>
            </Space.Compact>
          </span>
        ) : (
          <div>
            <Tag color={record?.discount_code_is_applied ? "green" : "cyan"}>
              {record?.discount_code_is_applied
                ? "Cupon aplicado"
                : "Sin cupon"}
            </Tag>
            {record.status !== "Pagado" &&
            record.status !== "Cancelado" &&
            record.status !== "Parcial" ? (
              <EditFilled
                onClick={() => edit(record, "discount_code")}
                size="small"
                hidden={record.discount_code_is_applied}
              >
                Editar
              </EditFilled>
            ) : null}
          </div>
        ),
    },
    {
      title: "Fecha de Recibo",
      dataIndex: "created_at",
      key: "created_at",
      align: "center",
      width: 100,
      render: (created_at) => {
        const date = new Date(created_at);
        const formattedDate = [
          `0${date.getDate()}`.slice(-2), // Añade un cero al inicio y luego obtiene los últimos dos dígitos
          `0${date.getMonth() + 1}`.slice(-2), // Añade un cero al inicio y luego obtiene los últimos dos dígitos, +1 porque getMonth() retorna de 0 a 11
          date.getFullYear(), // Año completo
        ].join("/"); // Junta los componentes con guiones
        return <Text>{formattedDate}</Text>;
      },
    },
    {
      title: "Fecha limite de Pago",
      dataIndex: "limit_date",
      key: "limit_date",
      align: "center",
      width: 150,
      render: (_, record) =>
        editingKeyLimitDate === record?._id ? (
          <span>
            <DatePicker
              value={dayjs(editingLimitDate, "DD/MM/YYYY")}
              format={"DD/MM/YYYY"}
              onChange={(value) => setEditingLimitDate(value)}
            />
            <Space.Compact className={"mt-2"}>
              <Button
                onClick={() => handleSave(record, "limit_date")}
                size="small"
                style={{ marginRight: 8 }}
              >
                Guardar
              </Button>
              <Button onClick={cancel} danger size="small">
                Cancelar
              </Button>
            </Space.Compact>
          </span>
        ) : (
          <div>
            {(() => {
              const date = new Date(record.limit_date);
              const formattedDate = [
                `0${date.getDate()}`.slice(-2), // Añade un cero al inicio y luego obtiene los últimos dos dígitos
                `0${date.getMonth() + 1}`.slice(-2), // Añade un cero al inicio y luego obtiene los últimos dos dígitos, +1 porque getMonth() retorna de 0 a 11
                date.getFullYear(), // Año completo
              ].join("/"); // Junta los componentes con guiones

              return (
                <div>
                  <Link
                    onClick={() => edit(record, "limit_date")}
                    size="small"
                    disabled={editingLimitDate !== ""}
                    className={"mr-1"}
                  >
                    <Tag color={"geekblue"}>
                      {formattedDate ? formattedDate : "Sin datos"}
                    </Tag>
                  </Link>
                  <Link
                    onClick={() => showExtensionModal(record)}
                    size="small"
                    disabled={editingKeyLimitDate !== ""}
                    hidden={
                      record?.status === "Pagado" ||
                      record?.status === "Cancelado"
                    }
                  >
                    <Tooltip
                      title={
                        record?.extension !== "" || null
                          ? `Prorroga: ${record?.extension}`
                          : "Especificar Prorroga"
                      }
                      color={record?.extension ? "blue" : "gray"}
                    >
                      <ClockCircleFilled
                        className={
                          record?.extension === "" ? "text-gray-500" : ""
                        }
                      />
                    </Tooltip>
                  </Link>
                </div>
              );
            })()}
          </div>
        ),
    },
    {
      title: "Fecha de Pago",
      dataIndex: "updated_at",
      key: "updated_at",
      align: "center",
      width: 100,
      render: (updated_at, record) => {
        if (record.status === "Pagado") {
          const date = new Date(updated_at);
          const formattedDate = [
            `0${date.getDate()}`.slice(-2),
            `0${date.getMonth() + 1}`.slice(-2),
            date.getFullYear(),
          ].join("/");
          return <Text>{formattedDate}</Text>;
        } else {
          return <Text>No pagado</Text>;
        }
      },
    },
    {
      title: "Mes Correspondiente",
      dataIndex: "period_month",
      key: "period_month",
      align: "center",
      width: 200,
      render: (period_month, record) =>
        editingKeyPeriodMonth === record?._id ? ( // Asumimos que usas _id como identificador único
          <span>
            <DatePicker
              value={editingPeriodMonth}
              picker={"month"}
              size={"small"}
              style={{ width: "100%" }}
              onChange={(value) => setEditingPeriodMonth(value)}
            />

            <Space.Compact className={"mt-2"}>
              <Button
                onClick={() => handleSave(record, "period_month")}
                size="small"
                style={{ marginRight: 8 }}
              >
                Guardar
              </Button>
              <Button onClick={cancel} danger size="small">
                Cancelar
              </Button>
            </Space.Compact>
          </span>
        ) : (
          <div>
            {(() => {
              if (period_month) {
                const date = new Date(period_month);
                const monthNames = [
                  "Enero",
                  "Febrero",
                  "Marzo",
                  "Abril",
                  "Mayo",
                  "Junio",
                  "Julio",
                  "Agosto",
                  "Septiembre",
                  "Octubre",
                  "Noviembre",
                  "Diciembre",
                ];
                const formattedMonthName = monthNames[date.getMonth()];
                return (
                  <>
                    <Tag color={"purple"}>{formattedMonthName}</Tag>
                    <EditFilled
                      className={"ml-2"}
                      onClick={() => edit(record, "period_month")}
                      size="small"
                      disabled={editingPeriodMonth !== ""}
                      hidden={
                        record?.status === "Cancelado" ||
                        record?.status === "Pagado"
                      }
                    >
                      Editar
                    </EditFilled>
                  </>
                );
              } else {
                return (
                  <>
                    <Text>No especificado</Text>;
                    <EditFilled
                      className={"ml-2"}
                      onClick={() => edit(record, "period_month")}
                      size="small"
                      disabled={editingPeriodMonth !== ""}
                    >
                      Editar
                    </EditFilled>
                  </>
                );
              }
            })()}
          </div>
        ),
    },
    {
      title: "Pago",
      dataIndex: "receipt_id",
      key: "receipt_id",
      align: "center",
      width: 250,
      render: (_, record) => {
        return (
          <div className={"flex flex-row items-center justify-center"}>
            <Popconfirm
              title="Confirmar Pago"
              description={`Estas seguro de confirmar el pago de $${record?.amount}?`}
              onConfirm={() =>
                handlePayReceipt(
                  record,
                  record?.payment_method === "Saldo a favor"
                    ? "balance"
                    : "payment",
                )
              }
              okText="Si"
              cancelText="No"
              wrapClassName="mi-popconfirm-especifico"
            >
              <Tooltip
                title={
                  record?.status === "Parcial" &&
                  record?.amount_balance_updated > 0
                    ? `No se puede confirmar el pago debido a que aun restan $${record.amount_balance_updated} por pagar.`
                    : null
                }
              >
                <Button
                  disabled={
                    record?.status === "Pagado" ||
                    record?.status === "Cancelado" ||
                    (record?.status === "Parcial" &&
                      record?.amount_balance_updated > 0)
                  }
                  type={"primary"}
                  danger={
                    record?.payment_method === "Saldo a favor" &&
                    record?.user.positive_balance < record?.amount
                  }
                  className="ant-btn-custom px-2 mr-2"
                  style={
                    record?.status !== "Pagado" &&
                    record?.status !== "Cancelado" &&
                    record?.status !== "Parcial" &&
                    record?.payment_method !== "Saldo a favor"
                      ? { backgroundColor: "#48bb78" }
                      : null
                  }
                  size={"small"}
                  // onClick={() => handlePayReceipt(record)}
                >
                  Confirmar Pago
                </Button>
              </Tooltip>
            </Popconfirm>
            <Button
              disabled={record?.status !== "Pagado"}
              type={"primary"}
              size={"small"}
              className={"bg-primary-700 px-2"}
              onClick={() => showReceipts(record)}
            >
              Ver Recibo
            </Button>
          </div>
        );
      },
    },
    {
      title: "Revertir / Cancelar",
      dataIndex: "receipt_id",
      key: "receipt_id",
      align: "center",
      width: 150,
      render: (_, record) => {
        return (
          <Space>
            <Row
              gutter={[16, 16]}
              wrap={true}
              align={"middle"}
              justify={"center"}
            >
              <Col className="gutter-row" xs={8} sm={8} md={8} lg={8} xl={8}>
                <Tooltip title={"Pago Reveretido"}>
                  <ExclamationCircleFilled
                    color={"yellow"}
                    className={"mr-1 text-yellow-500"}
                    hidden={!record?.reverted || record?.status === "Cancelado"}
                  />
                </Tooltip>
              </Col>

              <Col className="gutter-row" xs={8} sm={8} md={8} lg={8} xl={8}>
                <div className={"flex flex-row items-center justify-center"}>
                  <Popconfirm
                    title={
                      record?.status !== "Pagado" ||
                      record?.status === "Cancelado"
                        ? "Cancelar Pago"
                        : "Revertir Pago"
                    }
                    description={
                      record?.status !== "Pagado" ||
                      record?.status === "Cancelado"
                        ? `Estas seguro de cancelar el recibo?`
                        : `Estas seguro de revertir el pago?`
                    }
                    onConfirm={
                      record?.status === "Pagado"
                        ? () => handleRevertReceipt(record)
                        : record?.status !== "Pagado"
                          ? () => handleCancelReceipt(record)
                          : handleRevertReceipt(record)
                    }
                    okText="Si"
                    cancelText="No"
                    wrapClassName="mi-popconfirm-especifico"
                  >
                    <Tooltip
                      title={
                        record?.cancel_reason
                          ? `Motivo de cancelacion: ${record?.cancel_reason}`
                          : null
                      }
                      color={"red"}
                      placement={"left"}
                    >
                      <div
                        className={`${record?.cancel_reason ? "border-red-300 border-[2px] rounded" : ""}`}
                      >
                        <Button
                          disabled={record?.status === "Cancelado"}
                          danger={
                            record?.status !== "Pagado" ||
                            record?.status === "Cancelado"
                          }
                          type={"primary"}
                          className={`flex flex-row items-center justify-center`}
                          style={
                            record?.status === "Pagado"
                              ? { backgroundColor: "#ffc979" }
                              : null
                          }
                          size={"middle"}
                        >
                          {record?.status !== "Pagado" ||
                          record?.status === "Cancelado" ? (
                            <StopOutlined />
                          ) : (
                            <RollbackOutlined
                              className={"text-yellow-600"}
                              twoToneColor={"#525b6b"}
                            />
                          )}
                        </Button>
                      </div>
                    </Tooltip>
                  </Popconfirm>
                </div>
              </Col>
              <Col className="gutter-row" xs={8} sm={8} md={8} lg={8} xl={8}>
                <Tooltip title={"Pago Manual"}>
                  <BulbFilled
                    className={"bg-gray-300 mr-1 text-yellow-300 rounded-full"}
                    hidden={!record?.is_manual}
                  />
                </Tooltip>
              </Col>
            </Row>
          </Space>
        );
      },
    },
  ];

  if (checkUser === "hackminor@live.com.mx") {
    columns.push({
      title: "Borrar",
      dataIndex: "receipt_id",
      key: "receipt_id",
      align: "center",
      width: 150,
      render: (text, record) =>
        checkUser === "hackminor@live.com.mx" ? (
          <Space>
            <Row
              gutter={[16, 16]}
              wrap={true}
              align={"middle"}
              justify={"center"}
            >
              <Col className="gutter-row" xs={8} sm={8} md={8} lg={8} xl={8}>
                <div className="flex flex-row items-center justify-center">
                  <Popconfirm
                    title="Estas seguro de Borrar el Recibo?"
                    okText="Si"
                    cancelText="No"
                    wrapClassName="mi-popconfirm-especifico"
                    onConfirm={() => handleDeleteReceipt(record)}
                  >
                    <Button
                      type="primary"
                      danger
                      className="flex flex-row items-center justify-center"
                      size="middle"
                    >
                      <DeleteOutlined className="text-red-200" />
                    </Button>
                  </Popconfirm>
                </div>
              </Col>
            </Row>
          </Space>
        ) : null,
    });
  }

  return columns;
};
