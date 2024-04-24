import {
  Button,
  Col,
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
  EditFilled,
  ExclamationCircleFilled,
  RollbackOutlined,
  StopOutlined,
} from "@ant-design/icons";

const { Text, Link } = Typography;

export const PaymentColumns = ({
  showReceipts,
  showExtensionModal,
  handlePayReceipt,
  handleCancelReceipt,
  handleRevertReceipt,
  editingKey,
  editingValue,
  editingAmount,
  setEditingValue,
  setEditingAmount,
  edit,
  cancel,
  handleSave,
}) => [
  {
    title: "Matricula",
    dataIndex: "athlete",
    key: "athlete",
    align: "center",
    width: 100,
    render: (athlete) =>
      athlete ? (
        <>
          <Tag color={"blue"} className={"mb-2"}>
            <Text>{athlete.tuition}</Text>
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
    render: (athlete) =>
      athlete ? (
        <div className={"overflow-x-hidden"}>
          <Tag color={"blue"} className={"text-style mb-2"}>
            <Text className="text-style">{athlete.name}</Text>
          </Tag>
        </div>
      ) : (
        <span>Sin Usuario</span>
      ),
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
    render: (receipt) =>
      receipt && receipt.receipt_package_name ? (
        <div className={"overflow-x-hidden text-center"}>
          <Tag color={"cyan"} className={"text-style mb-2"}>
            <Text className="text-style">{receipt?.receipt_package_name}</Text>
          </Tag>
        </div>
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
      editingKey === record._id ? (
        <span>
          <InputNumber
            value={editingAmount}
            onChange={(value) => setEditingAmount(value)}
          />
          <Space compact className="mt-2">
            <Button
              onClick={() => handleSave(record, "amount")}
              size="small"
              style={{ marginRight: 8 }}
              success
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
            const formattedAmount = new Intl.NumberFormat("es-MX", {
              style: "currency",
              currency: "MXN",
            }).format(record.amount); // Asegúrate de que 'record.amount' está definido correctamente

            return (
              <>
                <Tooltip title={"Monto actualizado"}>
                  <CheckCircleFilled
                    color={"green"}
                    className={"mr-2 text-green-500"}
                    hidden={
                      !record.amount_updated || record.status === "Pagado"
                    }
                  />
                </Tooltip>
                <Text className={"mr-2"}>{formattedAmount}</Text>
                {record.status !== "Pagado" && record.status !== "Cancelado" ? (
                  <Tooltip
                    title={
                      "Al editar el monto solo se ajustara el recibo actual. La recurrencia del monto " +
                      "original del paquete se respetara en los recibos consecuentes."
                    }
                    color={record.extension ? "blue" : "gray"}
                  >
                    <EditFilled
                      onClick={() => edit(record)}
                      size="small"
                      disabled={editingKey !== ""}
                    >
                      Editar
                    </EditFilled>
                  </Tooltip>
                ) : null}
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
    render: (status) => {
      if (status === "Pagado") {
        return <Tag color={"green"}>{status}</Tag>;
      } else if (status === "Cancelado") {
        return <Tag color={"red"}>{status}</Tag>;
      } else {
        return <Tag color={"warning"}>{status}</Tag>;
      }
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
      editingKey === record._id ? ( // Asumimos que usas _id como identificador único
        <span>
          <Select
            value={editingValue}
            size={"small"}
            style={{ width: "100%" }}
            onChange={(value) => setEditingValue(value)}
          >
            <Select.Option value="Transferencia">Transferencia</Select.Option>
            <Select.Option value="Efectivo">Efectivo</Select.Option>
          </Select>

          <Space.Compact className={"mt-2"}>
            <Button
              onClick={() => handleSave(record, "payment_method")}
              size="small"
              style={{ marginRight: 8 }}
              success
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
          <Tag color="blue">{record.payment_method || "No especificado"}</Tag>
          {record.status !== "Pagado" && record.status !== "Cancelado" ? (
            <EditFilled
              onClick={() => edit(record)}
              size="small"
              disabled={editingKey !== ""}
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
    render: (limit_date, record) => {
      // console.log(limit_date);
      const date = new Date(limit_date);
      const formattedDate = [
        `0${date.getDate()}`.slice(-2), // Añade un cero al inicio y luego obtiene los últimos dos dígitos
        `0${date.getMonth() + 1}`.slice(-2), // Añade un cero al inicio y luego obtiene los últimos dos dígitos, +1 porque getMonth() retorna de 0 a 11
        date.getFullYear(), // Año completo
      ].join("/"); // Junta los componentes con guiones
      return (
        <div>
          <Text className={"mr-1"}>{formattedDate}</Text>
          <Link
            onClick={() => showExtensionModal(record)}
            hidden={record.status === "Pagado" || record.status === "Cancelado"}
          >
            <Tooltip
              title={
                record.extension !== "" || null
                  ? `Prorroga: ${record.extension}`
                  : "Especificar Prorroga"
              }
              color={record.extension ? "blue" : "gray"}
            >
              <ClockCircleFilled
                className={record.extension === "" ? "text-gray-500" : ""}
              />
            </Tooltip>
          </Link>
        </div>
      );
    },
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
            description={`Estas seguro de pagar $${record?.amount}?`}
            onConfirm={() => handlePayReceipt(record)}
            okText="Si"
            cancelText="No"
            wrapClassName="mi-popconfirm-especifico"
          >
            <Button
              disabled={
                record.status === "Pagado" || record.status === "Cancelado"
              }
              type={"primary"}
              className="ant-btn-custom px-2 mr-2"
              style={
                record.status !== "Pagado" && record.status !== "Cancelado"
                  ? { backgroundColor: "#48bb78" }
                  : {}
              }
              size={"small"}
              // onClick={() => handlePayReceipt(record)}
            >
              Confirmar Pago
            </Button>
          </Popconfirm>
          <Button
            disabled={record.status !== "Pagado"}
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
            className={"mb-6"}
          >
            <Col className="gutter-row" xs={8} sm={8} md={8} lg={8} xl={8}>
              <Tooltip title={"Pago Reveretido"}>
                <ExclamationCircleFilled
                  color={"yellow"}
                  className={"mr-1 text-yellow-500"}
                  hidden={!record.reverted || record.status === "Cancelado"}
                />
              </Tooltip>
            </Col>

            <Col className="gutter-row" xs={8} sm={8} md={8} lg={8} xl={8}>
              <div className={"flex flex-row items-center justify-center"}>
                <Popconfirm
                  title={
                    record.status !== "Pagado" || record.status === "Cancelado"
                      ? "Cancelar Pago"
                      : "Revertir Pago"
                  }
                  description={
                    record.status !== "Pagado" || record.status === "Cancelado"
                      ? `Estas seguro de cancelar el recibo?`
                      : `Estas seguro de revertir el pago?`
                  }
                  onConfirm={
                    record.status === "Pagado"
                      ? () => handleRevertReceipt(record)
                      : record.status !== "Pagado"
                        ? () => handleCancelReceipt(record)
                        : handleRevertReceipt(record)
                  }
                  okText="Si"
                  cancelText="No"
                  wrapClassName="mi-popconfirm-especifico"
                >
                  <Button
                    disabled={record.status === "Cancelado"}
                    danger={
                      record.status !== "Pagado" ||
                      record.status === "Cancelado"
                    }
                    type={"primary"}
                    className="flex flex-row items-center justify-center"
                    style={
                      record.status === "Pagado"
                        ? { backgroundColor: "#ffc979" }
                        : null
                    }
                    size={"middle"}
                  >
                    {record.status !== "Pagado" ||
                    record.status === "Cancelado" ? (
                      <StopOutlined />
                    ) : (
                      <RollbackOutlined
                        className={"text-yellow-600"}
                        twoToneColor={"#525b6b"}
                      />
                    )}
                  </Button>
                </Popconfirm>
              </div>
            </Col>
            <Col className="gutter-row" xs={8} sm={8} md={8} lg={8} xl={8}>
              <Tooltip title={"Pago Manual"}>
                <BulbFilled
                  className={"bg-gray-300 mr-1 text-yellow-300 rounded-full"}
                  hidden={!record.is_manual}
                />
              </Tooltip>
            </Col>
          </Row>
        </Space>
      );
    },
  },
];
