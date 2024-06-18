import { Tag, Tooltip, Typography } from "antd";
import { ClockCircleFilled } from "@ant-design/icons";

const { Text } = Typography;

export const UserLoggedPaymentsColumns = [
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
    render: (athlete) =>
      athlete ? (
        <div className={"overflow-x-hidden"}>
          <Tooltip title={athlete?.name} color={"blue"}>
            <Tag color={"blue"} className={"text-style mb-2"}>
              <Text className="text-style">{athlete?.name}</Text>
            </Tag>
          </Tooltip>
        </div>
      ) : (
        <span>Sin Usuario</span>
      ),
  },
  {
    title: "Paquete",
    dataIndex: "receipt",
    key: "receipt",
    align: "center",
    width: 150,
    render: (_, record) =>
      record?.receipt && record?.receipt?.receipt_package_name ? (
        <div className={"overflow-x-hidden text-center"}>
          <Tooltip title={record?.receipt?.receipt_package_name} color={"cyan"}>
            <Tag color={"cyan"} className={"text-style mb-2"}>
              <Text className="text-style">
                {record?.receipt?.receipt_package_name}
              </Text>
            </Tag>
          </Tooltip>
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
    render: (amount) => (
      <div>
        {(() => {
          const formattedAmount = new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
          }).format(amount); // Asegúrate de que 'record.amount' está definido correctamente
          return (
            <>
              <Text className={"mr-2"}>{formattedAmount}</Text>
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
    title: "Mes Correspondiente",
    dataIndex: "period_month",
    key: "period_month",
    align: "center",
    width: 200,
    render: (period_month, record) => (
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
            if (record.status !== "Pagado" || record.status === "Cancelado") {
              return (
                <>
                  <Tag color={"purple"}>{formattedMonthName}</Tag>
                </>
              );
            } else {
              return <Tag color={"purple"}>{formattedMonthName}</Tag>;
            }
          } else {
            return (
              <>
                <Text>No especificado</Text>;
              </>
            );
          }
        })()}
      </div>
    ),
  },
  {
    title: "Metodo de Pago",
    dataIndex: "payment_method",
    key: "payment_method",
    align: "center",
    editable: true,
    width: 200,
    render: (_, record) => (
      <div>
        <Tag color="blue">{record?.payment_method || "No especificado"}</Tag>
      </div>
    ),
  },
  // {
  //   title: "Cupon de Descuento",
  //   dataIndex: "discount_code",
  //   key: "discount_code",
  //   align: "center",
  //   width: 200,
  //   render: (_, record) => (
  //     <div>
  //       <Tag color={record?.discount_code_is_applied ? "green" : "cyan"}>
  //         {record?.discount_code_is_applied ? "Cupon aplicado" : "Sin cupon"}
  //       </Tag>
  //     </div>
  //   ),
  // },
  // {
  //   title: "Fecha de Recibo",
  //   dataIndex: "created_at",
  //   key: "created_at",
  //   align: "center",
  //   width: 100,
  //   render: (created_at) => {
  //     const date = new Date(created_at);
  //     const formattedDate = [
  //       `0${date.getDate()}`.slice(-2), // Añade un cero al inicio y luego obtiene los últimos dos dígitos
  //       `0${date.getMonth() + 1}`.slice(-2), // Añade un cero al inicio y luego obtiene los últimos dos dígitos, +1 porque getMonth() retorna de 0 a 11
  //       date.getFullYear(), // Año completo
  //     ].join("/"); // Junta los componentes con guiones
  //     return <Text>{formattedDate}</Text>;
  //   },
  // },
  {
    title: "Fecha limite de Pago",
    dataIndex: "limit_date",
    key: "limit_date",
    align: "center",
    width: 150,
    render: (_, record) => (
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
              <Tag color={"geekblue"}>
                {formattedDate ? formattedDate : "Sin datos"}
              </Tag>
              <Tooltip
                title={
                  record?.extension !== "" || null
                    ? `Prorroga: ${record?.extension}`
                    : "Especificar Prorroga"
                }
                color={record?.extension ? "blue" : "gray"}
              >
                <ClockCircleFilled
                  className={record?.extension === "" ? "text-gray-500" : ""}
                />
              </Tooltip>
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
];
