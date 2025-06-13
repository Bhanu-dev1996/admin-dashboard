import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const data = [
  { month: "Jan", revenue: 2100, profit: 800 },
  { month: "Feb", revenue: 2500, profit: 900 },
  { month: "Mar", revenue: 2700, profit: 1100 },
  { month: "Apr", revenue: 3000, profit: 1200 },
  { month: "May", revenue: 3200, profit: 1300 },
  { month: "Jun", revenue: 3400, profit: 1400 },
  { month: "Jul", revenue: 3600, profit: 1500 },
  { month: "Aug", revenue: 3900, profit: 1700 },
  { month: "Sep", revenue: 4100, profit: 1800 },
  { month: "Oct", revenue: 4300, profit: 1900 },
  { month: "Nov", revenue: 4500, profit: 2000 },
  { month: "Dec", revenue: 4800, profit: 2200 },
];

// Example YoY growth calculation (replace with real data as needed)
const yoyGrowth = "+8.5%";

const MonthlyRevenueAreaChart = () => (
  <div className="bg-white rounded-xl shadow p-6 h-full flex flex-col">
    <div className="flex items-center justify-between mb-4">
      <div className="text-lg font-semibold text-gray-800">Monthly Revenue Trend</div>
      <div className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded">
        YoY Growth: {yoyGrowth}
      </div>
    </div>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2563eb" stopOpacity={0.7}/>
            <stop offset="95%" stopColor="#2563eb" stopOpacity={0.1}/>
          </linearGradient>
          <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f97316" stopOpacity={0.7}/>
            <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: "#64748b", fontSize: 13 }} />
        <YAxis tick={{ fill: "#64748b", fontSize: 13 }} />
        <Tooltip />
        <Legend verticalAlign="top" align="center" iconType="circle" />
        <Area type="monotone" dataKey="revenue" stroke="#2563eb" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
        <Area type="monotone" dataKey="profit" stroke="#f97316" fillOpacity={1} fill="url(#colorProfit)" name="Profit" />
      </AreaChart>
    </ResponsiveContainer>
  </div>
);

export default MonthlyRevenueAreaChart;