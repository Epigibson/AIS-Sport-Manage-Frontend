import { useRef, useState } from "react";
import { Button, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

export const useColumnSearchProps = (
  dataIndex,
  filterFunctionOrProperty,
  fieldName,
  filterType,
) => {
  const [searchText, setSearchText] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const isFilterFunction = typeof filterFunctionOrProperty === "function";

  const onFilter = (value, record) => {
    const lowerValue = value.toLowerCase();

    switch (filterType) {
      case "array": {
        const filteredItems = filterFunctionOrProperty(
          lowerValue,
          record[dataIndex],
        );
        if (filteredItems.length > 0) {
          record[dataIndex] = filteredItems; // Actualiza temporalmente el array para mostrar solo los elementos filtrados
          return true;
        }
        return false;
      }
      case "text":
      default: {
        if (isFilterFunction) {
          return filterFunctionOrProperty(value, record[dataIndex]);
        }
        const recordValue = record[dataIndex] || "";
        return recordValue.toString().toLowerCase().includes(lowerValue);
      }
    }
  };

  return {
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Buscar por ${fieldName}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type={"primary"}
            onClick={() => handleSearch(selectedKeys, confirm)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
            className={"bg-primary-700"}
          >
            Buscar
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Limpiar
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter,
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ""}
      />
    ),
  };
};
