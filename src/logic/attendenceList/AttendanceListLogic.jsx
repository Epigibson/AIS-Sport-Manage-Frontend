import { useState } from "react";
import { Badge, Calendar, Checkbox, List, Select } from "antd";
import "antd/dist/reset.css"; // Asegúrate de que esta ruta es correcta
import PropTypes from "prop-types";

const { Option } = Select;

const groups = [
  {
    id: 1,
    name: "Group 1",
    days: [1, 3, 5],
    athletes: [
      { id: 1, name: "Athlete 1" },
      { id: 2, name: "Athlete 2" },
    ],
  },
  {
    id: 2,
    name: "Group 2",
    days: [2, 4],
    athletes: [
      { id: 3, name: "Athlete 3" },
      { id: 4, name: "Athlete 4" },
    ],
  },
  {
    id: 3,
    name: "Group 3",
    days: [1, 2, 3, 4, 5],
    athletes: [
      { id: 5, name: "Athlete 5" },
      { id: 6, name: "Athlete 6" },
    ],
  },
];

export const AttendanceListLogic = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [attendance, setAttendance] = useState({});

  const handleGroupChange = (value) => {
    setSelectedGroup(groups.find((group) => group.id === value));
  };

  const handleDateChange = (value) => {
    setSelectedDate(value);
  };

  const handleAttendanceChange = (athleteId, attended) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [selectedDate.date()]: {
        ...prevAttendance[selectedDate.date()],
        [athleteId]: attended,
      },
    }));
  };

  const dateCellRender = (value) => {
    if (!selectedGroup || !Array.isArray(selectedGroup.days)) {
      return null;
    }

    const listData = selectedGroup.days.includes(value.day())
      ? [{ type: "success", content: `Class for ${selectedGroup.name}` }]
      : [];

    return (
      <ul className="events">
        {listData.length > 0 &&
          listData.map((item) => (
            <li key={item.content}>
              <Badge status={item.type} text={item.content} />
            </li>
          ))}
      </ul>
    );
  };

  return (
    <div>
      <Select
        placeholder="Select Group"
        onChange={handleGroupChange}
        style={{ width: 200, marginBottom: 20 }}
      >
        {groups.map((group) => (
          <Option key={group.id} value={group.id}>
            {group.name}
          </Option>
        ))}
      </Select>
      <Calendar cellRender={dateCellRender} onSelect={handleDateChange} />
      {selectedGroup &&
        selectedDate &&
        selectedGroup.days.includes(selectedDate.day()) && (
          <div>
            <h3>
              Attendance for {selectedGroup.name} on{" "}
              {selectedDate.format("YYYY-MM-DD")}
            </h3>
            <List
              dataSource={selectedGroup.athletes}
              renderItem={(athlete) => (
                <List.Item>
                  <Checkbox
                    checked={
                      attendance[selectedDate.date()]?.[athlete.id] || false
                    }
                    onChange={(e) =>
                      handleAttendanceChange(athlete.id, e.target.checked)
                    }
                  >
                    {athlete.name}
                  </Checkbox>
                </List.Item>
              )}
            />
          </div>
        )}
    </div>
  );
};

AttendanceListLogic.propTypes = {
  attendance: PropTypes.object,
  setAttendance: PropTypes.func,
};
