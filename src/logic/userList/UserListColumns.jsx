import { Tag } from "antd";
import { FormatCurrencyUtil } from "../../utils/FormatCurrencyUtil.jsx";
import PropTypes from "prop-types";

export const UserListColumns = ({ filters }) => [
  {
    title: "Nombre",
    dataIndex: "tutors_name_one",
    key: "tutors_name_one",
    align: "center",
    filters: filters.tutors_name_one,
    filterSearch: true,
    onFilter: (value, record) => record?.tutors_name_one?.includes(value),
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Usuario",
    dataIndex: "username",
    key: "username",
    align: "center",
    filters: filters.username,
    filterSearch: true,
    onFilter: (value, record) => record.username.includes(value),
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    align: "center",
    filters: filters.email,
    filterSearch: true,
    onFilter: (value, record) => record.email.includes(value),
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Saldo",
    dataIndex: "positive_balance",
    key: "positive_balance",
    align: "center",
    render: (_, record) => (
      <div>
        <Tag>{FormatCurrencyUtil(record.positive_balance)}</Tag>
        {/*<Tooltip title={"Agregar saldo"}>*/}
        {/*  <PlusCircleTwoTone*/}
        {/*    className={"ml-1"}*/}
        {/*    twoToneColor={"green"}*/}
        {/*    onClick={() =>*/}
        {/*      handleOpenModal(record, "add_balance", "change_balance")*/}
        {/*    }*/}
        {/*  ></PlusCircleTwoTone>*/}
        {/*</Tooltip>*/}
      </div>
    ),
  },
  {
    title: "Estatus",
    dataIndex: "status",
    key: "status",
    align: "center",
    filters: [
      { text: "Activo", value: true },
      { text: "Inactivo", value: false },
    ],
    onFilter: (value, record) => record.status === value,
    render: (_, record) => (
      <Tag color={"blue"}>{record.status ? "Activo" : "Inactivo"}</Tag>
    ),
  },
  {
    title: "Rol",
    dataIndex: "user_type",
    key: "user_type",
    align: "center",
    filters: [
      { text: "Admin", value: "Admin" },
      { text: "Manager", value: "Manager" },
      { text: "User", value: "User" },
      { text: "Coach", value: "Couch" },
    ],
    onFilter: (value, record) => record.user_type === value,
    render: (_, record) => <Tag color={"cyan"}>{record.user_type}</Tag>,
  },
];

UserListColumns.propTypes = {
  filters: PropTypes.object,
};
