import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  isToday,
  isSameDay,
  addDays,
  isAfter,
} from "date-fns";
import "./calendar.css";

const Calendar = ({ setEndDate }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => addMonths(prevMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth((prevMonth) => subMonths(prevMonth, 1));
  };

  const getDaysInMonth = () => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const days = [];
    let currentDate = start;

    while (currentDate <= end) {
      days.push(currentDate);
      currentDate = addDays(currentDate, 1);
    }

    return days;
  };

  const handleDateClick = (day) => {
    const isSelectableDate =
      isAfter(day, new Date()) || isSameDay(day, new Date());
    if (isSelectableDate) {
      setSelectedDate(day);
      const formattedDate = format(day, "yyyy-MM-dd");
      setEndDate(formattedDate);
    }
  };

  const renderHeader = () => {
    return (
      <div className="calendar-header">
        <button onClick={prevMonth}>&lt;</button>
        <h2>{format(currentMonth, "MMMM yyyy")}</h2>
        <button onClick={nextMonth}>&gt;</button>
      </div>
    );
  };

  const renderDaysOfWeek = () => {
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
      <div className="calendar-days-of-week d-flex align-items-center justify-content-around">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const daysInMonth = getDaysInMonth();

    return (
      <div className="calendar-grid">
        {daysInMonth.map((day) => (
          <div
            key={day}
            onClick={() => handleDateClick(day)}
            className={`calendar-cell ${isToday(day) ? "today" : ""} ${
              isSameMonth(day, currentMonth) ? "" : "disabled"
            } ${isSameDay(day, selectedDate) ? "selected" : ""}`}
          >
            <span className="day-number">{format(day, "d")}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="calendar-container">
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderCells()}
      <div className="selected-date">
        {selectedDate && (
          <p>Selected Date: {format(selectedDate, "yyyy-MM-dd")}</p>
        )}
      </div>
    </div>
  );
};

export default Calendar;
