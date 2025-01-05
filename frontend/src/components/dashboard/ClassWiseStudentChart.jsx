import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { class: "1st", students: 30 },
  { class: "2nd", students: 25 },
  { class: "3rd", students: 35 },
  { class: "4th", students: 28 },
  { class: "5th", students: 40 },
  { class: "6th", students: 22 },
  { class: "7th", students: 18 },
  { class: "8th", students: 27 },
];

// Custom colors for the bars
const COLORS = [
  "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#845EC2", "#D65DB1", "#FF6F91", "#FFC75F",
];

const ClassWiseStudentsChart = () => {
  return (
    <div className="chart-container mt-6" style={{ width: "70%", height: "400px" }}>
      <h2 className="text-center text-xl font-medium text-gray-600">
        Class-Wise Student Distribution
      </h2>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis
            dataKey="class"
            tick={{ fontSize: 14 }}
            label={{
              value: "Class",
              position: "insideBottom",
              offset: -5,
              style: { fontWeight: "bold" },
            }}
          />
          <YAxis
            tick={{ fontSize: 14 }}
            label={{
              value: "Number of Students",
              angle: -90,
              position: "insideLeft",
              style: { fontWeight: "bold" },
            }}
          />
          <Tooltip
            contentStyle={{ backgroundColor: "#f5f5f5", borderRadius: "5px" }}
            itemStyle={{ color: "#333" }}
          />
          <Legend
            verticalAlign="top"
            wrapperStyle={{ fontSize: 14, fontWeight: "bold" }}
          />
          <Bar dataKey="students" barSize={30} radius={[10, 10, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ClassWiseStudentsChart;
