import { Table } from "antd";
import PropTypes from "prop-types";

import "./TablesStyle.css";

export const TablesComponent = ({
  data,
  columns,
  modifiedTable,
  headerFixed,
  loading,
}) => {
  return (
    <div className={"w-full"}>
      <Table
        rowKey={(record) => (record._id ? record._id : record.name)}
        columns={columns}
        dataSource={data}
        size={"small"}
        loading={loading}
        className={modifiedTable ? "my-dark-table" : ""}
        pagination={modifiedTable ? false : { pageSize: 10 }}
        scroll={{
          x: 1200,
          y: headerFixed ? 800 : "100%",
        }}
      />
    </div>
  );
};

TablesComponent.propTypes = {
  data: PropTypes.any,
  columns: PropTypes.any,
  headerFixed: PropTypes.bool,
  modifiedTable: PropTypes.any,
  loading: PropTypes.bool,
};
