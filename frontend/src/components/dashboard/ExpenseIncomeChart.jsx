import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

const ExpenseIncomeChart = () => {
  return (
    <div className='mt-8 w-[70%]'>
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="income" stroke="#4CAF50" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="expense" stroke="#FF6347" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
    </div>
  );
}

export default ExpenseIncomeChart;
