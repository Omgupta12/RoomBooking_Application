import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const CalendarComponent = ({ onDateSelect }) => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setDate(newDate);
    onDateSelect(newDate.toISOString().split("T")[0]);
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Select a Date</h3>
      <div className="border p-4 rounded-lg shadow-sm">
        <Calendar
          value={date}
          onChange={handleDateChange}
          className="react-calendar rounded-lg"
        />
      </div>
    </div>
  );
};

export default CalendarComponent;
