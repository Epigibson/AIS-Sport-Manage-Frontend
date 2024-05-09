import { Table } from "antd";
import PropTypes from "prop-types";

import "./TablesStyle.css";
import { MinusCircleTwoTone, PlusCircleTwoTone } from "@ant-design/icons";

export const TablesComponent = ({
  data,
  columns,
  nestedColumns,
  modifiedTable,
  headerFixed,
  loading,
  expandable,
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
                  <PlusCircleTwoTone
                    onClick={(e) => {
                      onExpand(record, e);
                    }}
                  />
                ) : (
                  <MinusCircleTwoTone
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
      pagination={modifiedTable ? false : { pageSize: 15 }}
      scroll={{
        x: 1200,
        y: headerFixed ? 800 : "100%",
      }}
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
};
