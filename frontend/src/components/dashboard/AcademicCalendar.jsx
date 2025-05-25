import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdEventNote, MdSchool } from "react-icons/md";
import { Tooltip } from "react-tooltip";

const AcademicCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Academic events data
  const academicEvents = [
    { date: "2025-01-01", name: "New Year's Day", type: "holiday" },
    { date: "2025-01-26", name: "Republic Day", type: "holiday" },
    { date: "2025-02-14", name: "Parent-Teacher Meeting", type: "meeting" },
    { date: "2025-03-15", name: "Mid-Term Exams", type: "exam" },
    { date: "2025-04-14", name: "School Anniversary", type: "event" },
  ];

  // Month navigation
  const changeMonth = (direction) => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + direction)));
  };

  // Calendar generation
  const generateCalendar = () => {
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const leadingDays = Array(firstDay.getDay()).fill(null);
    const days = Array.from({ length: lastDay.getDate() }, (_, i) => 
      new Date(currentDate.getFullYear(), currentDate.getMonth(), i + 1)
    );
    return [...leadingDays, ...days];
  };

  // Date helpers
  const isToday = (date) => date.toDateString() === new Date().toDateString();
  const getEvent = (date) => academicEvents.find(e => 
    e.date === date.toISOString().split('T')[0]
  );
  const formatMonth = (date) => date.toLocaleString('default', { month: 'long' }).toUpperCase();

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <MdSchool className="text-indigo-500 text-xl" />
          <h2 className="text-xl font-semibold text-gray-800">Academic Calendar</h2>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>2024-2025 Academic Year</span>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4 px-4">
        <button
          onClick={() => changeMonth(-1)}
          className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <FaChevronLeft className="text-gray-600" />
        </button>
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {formatMonth(currentDate)} {currentDate.getFullYear()}
          </h3>
          <p className="text-sm text-gray-500">Current Session: Spring 2025</p>
        </div>
        <button
          onClick={() => changeMonth(1)}
          className="p-2 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <FaChevronRight className="text-gray-600" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
          <div key={day} className="text-center text-sm text-gray-500 font-medium p-2">
            {day}
          </div>
        ))}
        {generateCalendar().map((date, index) => {
          const event = date && getEvent(date);
          return (
            <div
              key={index}
              className={`h-14 flex flex-col items-center justify-center rounded-lg border transition-all
                ${!date ? 'bg-transparent' : 
                  event ? `border-${event.type}-100 bg-${event.type}-50` : 
                  isToday(date) ? 'border-blue-200 bg-blue-50' : 
                  'border-gray-100 hover:border-blue-200'}`}
              data-tooltip-id={event?.name}
            >
              {date && (
                <>
                  <div className={`text-sm font-medium ${
                    event ? `text-${event.type}-600` : 
                    isToday(date) ? 'text-blue-600' : 'text-gray-700'
                  }`}>
                    {date.getDate()}
                  </div>
                  {event && (
                    <div className={`w-2 h-2 rounded-full bg-${event.type}-500`} />
                  )}
                  <Tooltip id={event?.name} className="z-50">
                    <div className="p-2 bg-white shadow-lg rounded border">
                      <MdEventNote className="inline mr-2" />
                      <span className="font-medium">{event?.name}</span>
                    </div>
                  </Tooltip>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full" /> Exams
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" /> Holidays
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-purple-500 rounded-full" /> Meetings
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full" /> Events
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendar;