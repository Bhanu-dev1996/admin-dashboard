import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Electronics", value: 5400 },
  { name: "Fashion", value: 3200 },
  { name: "Home & Garden", value: 2100 },
  { name: "Sports", value: 1200 },
  { name: "Other", value: 800 },
];

const COLORS = ["#2563eb", "#f97316", "#10b981", "#a21caf", "#64748b"];

const RevenueBreakdownPieChart = () => (
  <div className="bg-white rounded-xl shadow p-6 h-full flex flex-col">
    <div className="text-lg font-semibold text-gray-800 mb-4">Revenue Breakdown</div>
    <div>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, idx) => (
              <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" iconType="circle" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default RevenueBreakdownPieChart;