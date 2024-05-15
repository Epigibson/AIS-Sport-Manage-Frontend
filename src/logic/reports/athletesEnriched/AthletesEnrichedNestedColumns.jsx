import { FormatCurrencyUtil } from "../../../utils/FormatCurrencyUtil.jsx";
import { Row, Tag } from "antd";
import { ConvertDatetimeToMonth } from "../../../utils/DatesUtils.jsx";
import { GetColorByStatus } from "../../../utils/ManageTagColorUtil.jsx";

export const AthletesEnrichedNestedColumns = [
  {
    title: "Paquete",
    key: "package",
    align: "center",
    width: 200,
    render: (_, record) => {
      return (
        <div className={"mt-2 pb-0"}>
          {record.payments.map((payment, index) => (
            <Row
              key={index}
              align={"middle"}
              justify={"center"}
              className={"pb-4"}
            >
              <div>{payment?.receipt_id?.receipt_package_name}</div>
            </Row>
          ))}
        </div>
      );
    },
  },
  {
    title: "Monto",
    key: "amount",
    align: "center",
    width: 200,
    render: (_, record) => {
      return (
        <div className={"mt-2 pb-0"}>
          {record.payments.map((payment, index) => (
            <Row
              key={index}
              align={"middle"}
              justify={"center"}
              className={"pb-4"}
            >
              <div>{FormatCurrencyUtil(payment.amount)}</div>
            </Row>
          ))}
        </div>
      );
    },
  },
  {
    title: "Mes",
    key: "period_month",
    align: "center",
    width: 200,
    render: (_, record) => {
      return (
        <div className={"mt-2 pb-0"}>
          {record.payments.map((payment, index) => (
            <Row
              key={index}
              align={"middle"}
              justify={"center"}
              className={"pb-4"}
            >
              <Tag color={"magenta"}>
                {ConvertDatetimeToMonth(payment.period_month).toUpperCase()}
              </Tag>
            </Row>
          ))}
        </div>
      );
    },
  },
  {
    title: "Estatus",
    key: "status",
    align: "center",
    width: 200,
    render: (_, record) => {
      return (
        <div className={"mt-2 pb-0"}>
          {record.payments.map((payment, index) => (
            <Row
              key={index}
              align={"middle"}
              justify={"center"}
              className={"pb-4"}
            >
              <Tag color={GetColorByStatus(payment.status)}>
                {payment.status}
              </Tag>
            </Row>
          ))}
        </div>
      );
    },
  },
];
