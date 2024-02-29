import { Table } from "antd";

export const TablesComponent = ({ data, columns }) => {
  return <Table columns={columns} dataSource={data} rowKey="_id" />;
};
