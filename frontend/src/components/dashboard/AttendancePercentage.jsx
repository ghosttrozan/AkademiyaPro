import React from "react";

const AttendancePercentage = () => {
  const data = [
    { label: "Today Present Students", percentage: 0, color: "text-blue-500" },
    { label: "Today Present Employees", percentage: 0, color: "text-red-500" },
    {
      label: "This Month Fee Collection",
      percentage: 0,
      color: "text-blue-500",
    },
  ];

  return (
    <div className="bg-white p-6 py-16 border-2 rounded-2xl hover:shadow-2xl rounded-lg h-full w-full max-w-md">
      {data.map((item, index) => (
        <div key={index} className="mb-6 last:mb-0">
          <div className="flex justify-between items-center">
            <span className="text-gray-600 font-medium">{item.label}</span>
            <span className={`font-bold ${item.color}`}>
              {item.percentage}%
            </span>
          </div>
          <div className="relative h-2 mt-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="absolute h-full bg-blue-500"
              style={{ width: `${item.percentage}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendancePercentage;
