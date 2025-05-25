import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaRupeeSign } from 'react-icons/fa';
import { BsGraphUp, BsGraphDown } from 'react-icons/bs';

const data = [
  { month: 'Jan', income: 4000, expense: 2400 },
  { month: 'Feb', income: 3500, expense: 2300 },
  { month: 'Mar', income: 3000, expense: 2500 },
  { month: 'Apr', income: 4500, expense: 3000 },
  { month: 'May', income: 3800, expense: 2800 },
  { month: 'Jun', income: 5000, expense: 3500 },
  { month: 'Jul', income: 5500, expense: 4000 },
  { month: 'Aug', income: 6000, expense: 4200 },
  { month: 'Sep', income: 6200, expense: 4600 },
  { month: 'Oct', income: 6800, expense: 5000 },
  { month: 'Nov', income: 7200, expense: 5500 },
  { month: 'Dec', income: 7500, expense: 6000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200">
        <h3 className="font-bold text-gray-800 mb-2">{label}</h3>
        <div className="flex items-center gap-2 text-green-600 mb-1">
          <BsGraphUp />
          <span>Income: <FaRupeeSign className="inline" />{payload[0].value}</span>
        </div>
        <div className="flex items-center gap-2 text-red-500">
          <BsGraphDown />
          <span>Expense: <FaRupeeSign className="inline" />{payload[1].value}</span>
        </div>
      </div>
    );
  }
  return null;
};

const ExpenseIncomeChart = () => {
  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Annual Financial Overview</h2>
        <div className="flex gap-4 mt-2 md:mt-0">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#27AE60] rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Income</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-[#F39C12] rounded-full mr-2"></div>
            <span className="text-sm text-gray-600">Expenses</span>
          </div>
        </div>
      </div>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ECF0F1" />
            <XAxis 
              dataKey="month" 
              tick={{ fill: '#7F8C8D' }}
              axisLine={{ stroke: '#ECF0F1' }}
            />
            <YAxis 
              tick={{ fill: '#7F8C8D' }}
              axisLine={{ stroke: '#ECF0F1' }}
              tickFormatter={(value) => `₹${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="income" 
              stroke="#27AE60" 
              strokeWidth={3}
              dot={{ r: 4, fill: '#27AE60', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#fff', stroke: '#27AE60', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="expense" 
              stroke="#F39C12" 
              strokeWidth={3}
              dot={{ r: 4, fill: '#F39C12', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#fff', stroke: '#F39C12', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <span>School Financial Year: 2023-2024</span>
        <span>Data updated: Today</span>
      </div>
    </div>
  );
}

export default ExpenseIncomeChart;