import { Button, Popconfirm, Select, Tag, Tooltip, Typography } from "antd";
import "./PaymentsStyle.css";
import { ClockCircleFilled, EditFilled } from "@ant-design/icons";

const { Text, Link } = Typography;

export const PaymentColumns = ({
  showReceipts,
  showExtensionModal,
  handlePayReceipt,
  editingKey,
  editingValue,
  setEditingValue,
  edit,
  cancel,
  handleSave,
}) => [
  {
    title: "Matricula",
    dataIndex: "athlete",
    key: "athlete",
    align: "center",
    render: (athlete) =>
      athlete ? (
        <>
          <Tag color={"blue"} className={"mb-2"}>
            <Text>{athlete.tuition}</Text>
          </Tag>
        </>
      ) : (
        <span>Sin Matricula</span>
      ), // Ajusta "group_name" según tu modelo de datos
  },
  // {
  //   title: "Usuario",
  //   dataIndex: "user",
  //   key: "user",
  //   align: "center",
  //   ellipsis: true,
  //   render: (user) =>
  //     user ? (
  //       <>
  //         <Tag color={"blue"} className={"mb-2"}>
  //           <Text>{user.username}</Text>
  //         </Tag>
  //         {/*<br/>*/}
  //         {/*<Tag color={"cyan"}>*/}
  //         {/*    <Text>{athletes.email}</Text>*/}
  //         {/*</Tag>*/}
  //       </>
  //     ) : (
  //       <span>Sin Usuario</span>
  //     ), // Ajusta "group_name" según tu modelo de datos
  // },
  {
    title: "Atleta",
    dataIndex: "athlete",
    key: "athlete",
    align: "center",
    width: 200,
    render: (athlete) =>
      athlete ? (
        <div className={"overflow-x-hidden"}>
          <Tag color={"blue"} className={"mb-2"}>
            <Text>{athlete.name}</Text>
          </Tag>
          {/*<br/>*/}
          {/*<Tag color={"cyan"}>*/}
          {/*    <Text>{athletes.email}</Text>*/}
          {/*</Tag>*/}
        </div>
      ) : (
        <span>Sin Usuario</span>
      ), // Ajusta "group_name" según tu modelo de datos
  },
  {
    title: "Tipo de Pago",
    dataIndex: "payment_type",
    key: "payment_type",
    align: "center",
    render: (payment_type) => {
      if (payment_type === "inscription") {
        return <Tag color={"blue"}>Inscripción</Tag>;
      } else if (payment_type === "payment") {
        return <Tag color={"purple"}>Mensualidad</Tag>;

        // else if (payment_type === "Pago") {
        //   return <Tag color={"green"}>{payment_type}</Tag>;
        // } else if (payment_type === "Pago de Servicio") {
        //   return <Tag color={"cyan"}>{payment_type}</Tag>;
        // } else if (payment_type === "Pago de Material") {
        //   return <Tag color={"magenta"}>{payment_type}</Tag>;
        // } else if (payment_type === "Pago de Comida") {
        //   return <Tag color={"orange"}>{payment_type}</Tag>;
        // } else if (payment_type === "Pago de Transporte") {
        //   return <Tag color={"red"}>{payment_type}</Tag>;
        // } else if (payment_type === "Pago de Otros") {
        //   return <Text>{payment_type}</Text>; // Ajusta "group_name" según tu modelo de datos
      } else {
        return <Tag color={"blue"}>{payment_type}</Tag>;
      }
    },
  },
  {
    title: "Cantidad",
    dataIndex: "amount",
    key: "amount",
    align: "center",
    render: (amount) => {
      const formattedAmount = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
      }).format(amount);
      return <Text>{formattedAmount}</Text>;
    },
  },
  {
    title: "Estatus",
    dataIndex: "status",
    key: "status",
    align: "center",
    searchable: true, // Esta columna será buscable
    render: (status) => {
      if (status === "Pagado") {
        return <Tag color={"green"}>{status}</Tag>;
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
    render: (_, record) =>
      editingKey === record._id ? ( // Asumimos que usas _id como identificador único
        <span>
          <Select
            value={editingValue}
            style={{ width: 120 }} // Ajusta el ancho según tus necesidades
            onChange={(value) => setEditingValue(value)}
          >
            {/* Opciones del Select. Reemplaza estas con tus métodos de pago reales */}
            <Select.Option value="Transferencia">Transferencia</Select.Option>
            <Select.Option value="Efectivo">Efectivo</Select.Option>
          </Select>

          <Button
            onClick={() => handleSave(record)}
            size="small"
            style={{ marginRight: 8 }}
          >
            Guardar
          </Button>
          <Button onClick={cancel} size="small">
            Cancelar
          </Button>
        </span>
      ) : (
        <div>
          <Tag color="blue">{record.payment_method || "No especificado"}</Tag>
          {record.status !== "Pagado" ? (
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
    render: (limit_date, record) => {
      console.log(limit_date);
      const date = new Date(limit_date);
      const formattedDate = [
        `0${date.getDate()}`.slice(-2), // Añade un cero al inicio y luego obtiene los últimos dos dígitos
        `0${date.getMonth() + 1}`.slice(-2), // Añade un cero al inicio y luego obtiene los últimos dos dígitos, +1 porque getMonth() retorna de 0 a 11
        date.getFullYear(), // Año completo
      ].join("/"); // Junta los componentes con guiones
      return (
        <div>
          <Text className={"mr-1"}>{formattedDate}</Text>
          <Link onClick={() => showExtensionModal(record)}>
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
    render: (updated_at, record) => {
      // Asegúrate de recibir el registro completo como segundo argumento
      // Verifica si el estatus del registro es "Pagado"
      if (record.status === "Pagado") {
        const date = new Date(updated_at);
        const formattedDate = [
          `0${date.getDate()}`.slice(-2),
          `0${date.getMonth() + 1}`.slice(-2),
          date.getFullYear(),
        ].join("/");
        return <Text>{formattedDate}</Text>;
      } else {
        // Retorna null o un mensaje específico si el registro no está "Pagado"
        return <Text>No pagado</Text>; // o simplemente null si no quieres mostrar nada
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
              disabled={record.status === "Pagado"}
              type={"primary"}
              className="ant-btn-custom px-2 mr-2"
              style={
                record.status !== "Pagado" ? { backgroundColor: "#48bb78" } : {}
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
];
