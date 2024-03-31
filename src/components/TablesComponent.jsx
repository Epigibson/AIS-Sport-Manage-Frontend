import { Button, Input, Space, Table } from "antd";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import "./TablesStyle.css";

export const TablesComponent = ({
  data,
  columns,
  modifiedTable,
  headerFixed,
}) => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const combineColumnRenders = (searchRender, originalRender, text, record) => {
    // Si hay un renderizador original, úsalo y pasa el render de búsqueda como text
    if (originalRender) {
      return originalRender(searchRender, record);
    }
    // Si no, simplemente retorna el render de búsqueda
    return searchRender;
  };

  const getColumnSearchProps = (dataIndex, originalRender) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            className={"bg-primary-700"}
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Buscar
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Limpiar
          </Button>
          <Button
            className={"text-primary-700"}
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filtrar
          </Button>
          <Button
            className={"text-primary-700"}
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Cerrar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text, record) => {
      const searchRender =
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        );

      return combineColumnRenders(searchRender, originalRender, text, record);
    },
  });

  // Aquí modificas las columnas para incluir las propiedades de búsqueda
  const modifiedColumns = columns.map((col) => {
    if (col.searchable) {
      // Suponiendo que hay una propiedad 'searchable' para identificar columnas buscables
      return { ...col, ...getColumnSearchProps(col.dataIndex, col.render) };
    }
    return col;
  });

  return (
    <div className={"w-full"}>
      <Table
        rowKey={(record) => record._id}
        columns={modifiedColumns}
        dataSource={data}
        size={"small"}
        className={modifiedTable ? "my-dark-table" : ""}
        pagination={{
          pageSize: 25,
        }}
        scroll={{
          x: 1200,
          y: headerFixed ? 240 : 500,
        }}
      />
    </div>
  );
};

TablesComponent.propTypes = {
  data: PropTypes.any,
  columns: PropTypes.any,
  headerFixed: PropTypes.bool,
  modifiedTable: PropTypes.bool,
};
