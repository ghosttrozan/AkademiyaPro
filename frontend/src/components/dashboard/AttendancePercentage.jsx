import React from "react";
import { PiStudentFill, PiChalkboardTeacherFill } from "react-icons/pi";
import { FaRupeeSign } from "react-icons/fa6";
import { FaPercentage } from "react-icons/fa";

const AttendancePercentage = () => {
  const data = [
    { 
      label: "Today's Student Attendance", 
      percentage: 85, 
      value: "425/500",
      icon: <PiStudentFill className="text-blue-500" />,
      color: "bg-blue-500",
      trend: "up"
    },
    { 
      label: "Today's Staff Attendance", 
      percentage: 92, 
      value: "46/50",
      icon: <PiChalkboardTeacherFill className="text-green-500" />,
      color: "bg-green-500",
      trend: "up"
    },
    {
      label: "Monthly Fee Collection",
      percentage: 68,
      value: "₹68,500/₹1,00,000",
      icon: <FaRupeeSign className="text-purple-500" />,
      color: "bg-purple-500",
      trend: "down"
    },
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <FaPercentage className="text-indigo-500" />
          Attendance & Collection
        </h2>
        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
          Live Data
        </span>
      </div>

      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={index} className="group">
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center gap-2 text-gray-600">
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className={`text-sm font-semibold ${item.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {item.trend === 'up' ? '↑' : '↓'} {item.percentage}%
                </span>
              </div>
            </div>

            <div className="text-xs text-gray-500 mb-2 pl-6">
              {item.value}
            </div>

            <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`absolute h-full ${item.color} transition-all duration-1000 ease-out`}
                style={{ width: `${item.percentage}%` }}
              ></div>
              <div 
                className="absolute inset-0 bg-gradient-to-r from-transparent to-white opacity-30"
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="text-xs text-gray-500 flex justify-between">
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
          <span>Overall: 82%</span>
        </div>
      </div>
    </div>
  );
};

export default AttendancePercentage;