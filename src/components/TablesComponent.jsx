import { Table } from "antd";
import PropTypes from "prop-types";

export const TablesComponent = ({ data, columns }) => {
  return <Table columns={columns} dataSource={data} rowKey="_id" />;
};

TablesComponent.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array,
};
