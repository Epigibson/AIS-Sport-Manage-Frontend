import { Table } from "antd";
import PropTypes from "prop-types";

import "./TablesStyle.css";
import {
  CustomMinusCircleIcon,
  CustomPlusCircleIcon,
} from "../utils/CustomIcons.jsx";

export const TablesComponent = ({
  data,
  columns,
  nestedColumns,
  modifiedTable,
  headerFixed,
  loading,
  expandable,
  pagination,
  onChange,
}) => {
  // console.log("DATA ANTES DE PASAR", data);

  return (
    <Table
      rowKey={(record) => record._id || record.id || record.name}
      columns={columns}
      dataSource={data}
      showSorterTooltip={{
        target: "sorter-icon",
      }}
      expandable={
        expandable
          ? {
              expandedRowRender: (record) => {
                return (
                  <Table
                    rowKey={(item) => item._id}
                    columns={nestedColumns}
                    dataSource={[record]} // Example for last month payments
                    pagination={false}
                  />
                );
              },
              expandRowByClick: true,
              expandIcon: ({ expanded, onExpand, record }) => {
                return expanded ? (
                  <CustomMinusCircleIcon
                    onClick={(e) => {
                      onExpand(record, e);
                    }}
                  />
                ) : (
                  <CustomPlusCircleIcon
                    onClick={(e) => {
                      onExpand(record, e);
                    }}
                  />
                );
              },
            }
          : null
      }
      size={"small"}
      loading={loading}
      className={modifiedTable ? "my-dark-table" : "mt-4"}
      pagination={pagination}
      scroll={{
        x: 1200,
        y: headerFixed ? 800 : "100%",
      }}
      onChange={onChange}
    />
  );
};

TablesComponent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object),
  nestedColumns: PropTypes.arrayOf(PropTypes.object),
  headerFixed: PropTypes.bool,
  modifiedTable: PropTypes.bool,
  loading: PropTypes.bool,
  expandable: PropTypes.bool,
  pagination: PropTypes.object,
  onChange: PropTypes.func,
};
