import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa";

const AcademicCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  // List of holidays
  const holidays = [
    { date: "2025-01-01", name: "New Year's Day" },
    { date: "2025-01-26", name: "Republic Day" },
    { date: "2025-02-14", name: "Valentine's Day" },
  ];

  // Function to navigate months
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Generate days for the current month
  const generateDays = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    const daysInMonth = [];
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      daysInMonth.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), i));
    }

    // Add leading empty days for alignment
    const leadingEmptyDays = Array(firstDayOfMonth.getDay()).fill(null);
    return [...leadingEmptyDays, ...daysInMonth];
  };

  // Check if a date is a holiday
  const isHoliday = (date) => {
    const localDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;
    return holidays.find((holiday) => holiday.date === localDate);
  };

  // Check if a date is the current date
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Format the month and year
  const formatDate = (date) => {
    return `${date.toLocaleString("default", { month: "long" }).toUpperCase()}, ${date.getFullYear()}`;
  };

  return (
    <div className="bg-white border-2 rounded-2xl shadow-lg p-6 rounded-2xl shadow-lg mr-2 w-[29%]">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200"
          onClick={() => changeMonth(-1)}
        >
          <span className="text-gray-500 text-lg"><FaChevronLeft /></span>
        </button>
        <div>
          <h2 className="text-lg font-semibold text-pink-600 text-center">{formatDate(currentDate)}</h2>
          <p className="text-sm text-gray-500 text-center">{currentDate.toDateString().toUpperCase()}</p>
        </div>
        <button
          className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 hover:bg-gray-200"
          onClick={() => changeMonth(1)}
        >
          <span className="text-gray-500 text-lg"><FaChevronRight /></span>
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 text-center">
        {/* Weekdays */}
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day, index) => (
          <div key={index} className="text-sm font-medium text-gray-400">
            {day}
          </div>
        ))}

        {/* Days */}
        {generateDays().map((day, index) => {
          const holiday = day ? isHoliday(day) : null;
          const today = day && isToday(day);

          return (
            <div
              key={index}
              className={`h-10 w-10 flex flex-col items-center justify-center rounded-full ${
                holiday
                  ? "bg-red-100 text-red-600 border border-red-400"
                  : today
                  ? "bg-blue-100 text-blue-600 border border-blue-400"
                  : day
                  ? "text-gray-700 hover:bg-gray-100"
                  : ""
              }`}
            >
              {day ? (
                <div className="relative">
                  <span className={`font-semibold ${today ? "text-blue-600" : ""}`}>{day.getDate()}</span>
                  {holiday && (
                    <span className="absolute top-2 text-xs text-red-600">
                      {holiday.name}
                    </span>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AcademicCalendar;
