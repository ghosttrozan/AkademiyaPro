import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { FaChalkboardTeacher } from "react-icons/fa";
import { BsGraphUp } from "react-icons/bs";

const data = [
  { class: "1st", students: 30, fill: "#5453AB" },
  { class: "2nd", students: 25, fill: "#A1A3D9" },
  { class: "3rd", students: 35, fill: "#6B8CF6" },
  { class: "4th", students: 28, fill: "#FB8993" },
  { class: "5th", students: 40, fill: "#27AE60" },
  { class: "6th", students: 22, fill: "#F39C12" },
  { class: "7th", students: 18, fill: "#2C3E50" },
  { class: "8th", students: 27, fill: "#4CAF50" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200">
        <h3 className="font-bold text-gray-800">{label} Grade</h3>
        <div className="flex items-center gap-2 text-blue-600 mt-1">
          <FaChalkboardTeacher />
          <span>Students: <strong>{payload[0].value}</strong></span>
        </div>
      </div>
    );
  }
  return null;
};

const ClassWiseStudentsChart = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <BsGraphUp className="text-blue-500" />
          Class Distribution
        </h2>
        <div className="text-sm text-gray-500">
          Academic Year: 2023-24
        </div>
      </div>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ECF0F1" />
            <XAxis 
              dataKey="class" 
              tick={{ fill: '#7F8C8D', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              tick={{ fill: '#7F8C8D', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="students" 
              name="Students"
              barSize={30}
              radius={[6, 6, 0, 0]}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 flex justify-between">
        <span>Total Students: {data.reduce((sum, item) => sum + item.students, 0)}</span>
        <span>Average per class: {Math.round(data.reduce((sum, item) => sum + item.students, 0)/data.length)}</span>
      </div>
    </div>
  );
};

export default ClassWiseStudentsChart;