import { useCallback, useMemo } from "react";
import { Button, DatePicker, Input, InputNumber, Select, Space } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";

export const EditableCell = ({
  children,
  dataIndex,
  record,
  editingKey,
  editingValue,
  setEditingValue,
  handleSave,
  cancel,
  ...restProps
}) => {
  const isEditing = useMemo(
    () => editingKey === (record && record._id),
    [editingKey, record],
  );

  const renderInput = useCallback(() => {
    switch (dataIndex) {
      case "amount":
        return (
          <InputNumber
            value={editingValue}
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value?.replace(/\$\s?|(,*)/g, "")}
            onChange={setEditingValue}
          />
        );
      case "payment_method":
        return (
          <Select value={editingValue} onChange={setEditingValue}>
            <Select.Option value="Transferencia">Transferencia</Select.Option>
            <Select.Option value="Efectivo">Efectivo</Select.Option>
            {record?.user?.positive_balance > 0 && (
              <Select.Option value="Saldo a favor">Saldo a favor</Select.Option>
            )}
          </Select>
        );
      case "limit_date":
        return (
          <DatePicker
            value={dayjs(editingValue)}
            format="DD/MM/YYYY"
            onChange={setEditingValue}
          />
        );
      case "period_month":
        return (
          <DatePicker
            value={dayjs(editingValue)}
            picker="month"
            onChange={setEditingValue}
          />
        );
      default:
        return (
          <Input
            value={editingValue}
            onChange={(e) => setEditingValue(e.target.value)}
          />
        );
    }
  }, [
    dataIndex,
    editingValue,
    setEditingValue,
    record?.user?.positive_balance,
  ]);

  return (
    <td {...restProps}>
      {isEditing ? (
        <>
          {renderInput()}
          <Space>
            <Button onClick={() => handleSave(record, dataIndex)}>
              Guardar
            </Button>
            <Button onClick={cancel}>Cancelar</Button>
          </Space>
        </>
      ) : (
        children
      )}
    </td>
  );
};

EditableCell.propTypes = {
  title: PropTypes.string,
  editable: PropTypes.bool,
  children: PropTypes.node,
  dataIndex: PropTypes.string,
  record: PropTypes.object,
  editingKey: PropTypes.string,
  editingValue: PropTypes.any,
  setEditingValue: PropTypes.func,
  handleSave: PropTypes.func,
  cancel: PropTypes.func,
};
