import { useCallback, useEffect, useRef, useState } from "react";
import { Button, Input, Space, Tooltip } from "antd";
import { ExclamationCircleFilled, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

export const useColumnSearchProps = (
  dataIndex,
  filterFunctionOrProperty,
  fieldName,
  filterType,
  clearFilters,
  setClearFiltersRefs,
  index,
) => {
  const [searchText, setSearchText] = useState("");
  const searchInput = useRef(null);
  const clearFiltersRef = useRef(null);
  const confirmRef = useRef(null);

  const handleSearch = useCallback((selectedKeys, confirm) => {
    confirm();
    setSearchText(selectedKeys[0]);
  }, []);

  const handleReset = useCallback((clearFilters) => {
    clearFilters();
    setSearchText("");
  }, []);

  useEffect(() => {
    setClearFiltersRefs((prevRefs) => {
      const newRefs = [...prevRefs];
      newRefs[index] = {
        clearFilters: clearFiltersRef.current,
        confirm: confirmRef.current,
      };
      return newRefs;
    });
  }, [setClearFiltersRefs, index]);

  useEffect(() => {
    if (clearFilters) {
      if (clearFiltersRef.current && confirmRef.current) {
        clearFiltersRef.current();
        confirmRef.current();
        setSearchText("");
      }
    }
  }, [clearFilters]);

  const isFilterFunction = typeof filterFunctionOrProperty === "function";

  const onFilter = useCallback(
    (value, record) => {
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
    },
    [dataIndex, filterFunctionOrProperty, filterType, isFilterFunction],
  );

  return {
    filterDropdown: useCallback(
      ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
        // Guardar referencias a clearFilters y confirm
        clearFiltersRef.current = clearFilters;
        confirmRef.current = confirm;

        return (
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
        );
      },
      [fieldName, handleSearch, handleReset],
    ),

    filterIcon: useCallback(
      (filtered) =>
        filtered ? (
          <Tooltip color={"blue"} motion={"blob"} title={"Filtro activado"}>
            <ExclamationCircleFilled style={{ color: "#ea4747" }} />
          </Tooltip>
        ) : (
          <SearchOutlined
            style={{ color: "#000154" }}
            type={"okType"}
            size={"small"}
          />
        ),
      [],
    ),

    onFilter,
    render: useCallback(
      (text) => (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ),
      [searchText],
    ),
  };
};
