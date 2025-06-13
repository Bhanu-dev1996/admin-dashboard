import React, { useState } from "react";
import {
    ComposedChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Line
} from "recharts";

const data = [
    { name: 'Jan', orders: 60, sales: 20 },
    { name: 'Feb', orders: 20, sales: 40 },
    { name: 'Mar', orders: 40, sales: 60 },
    { name: 'Apr', orders: 80, sales: 50 },
    { name: 'May', orders: 60, sales: 70 },
    { name: 'Jun', orders: 40, sales: 30 },
    { name: 'Jul', orders: 20, sales: 20 },
    { name: 'Aug', orders: 40, sales: 180 },
    { name: 'Sep', orders: 100, sales: 120 },
    { name: 'Oct', orders: 160, sales: 80 },
    { name: 'Nov', orders: 120, sales: 100 },
    { name: 'Dec', orders: 80, sales: 120 },
];


const tabs = [
    { label: "Today" },
    { label: "Weekly" },
    { label: "Yearly" }
];

const BarRevenueOverviewChart = () => {
    const [activeTab, setActiveTab] = useState(2);

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div className="text-lg font-semibold text-gray-800">Revenue Overview</div>
                <div className="flex gap-2">
                    {tabs.map((tab, idx) => (
                        <button
                            key={tab.label}
                            className={`px-4 py-1 rounded border font-medium text-sm transition
                                ${activeTab === idx
                                ? "bg-indigo-500 text-white border-indigo-500"
                                : "bg-white text-indigo-500 border-indigo-500 hover:bg-indigo-50"
                            }`}
                            onClick={() => setActiveTab(idx)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>
            <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 13 }} />
                    <YAxis tick={{ fill: "#64748b", fontSize: 13 }} />
                    <Tooltip />
                    <Legend
                        verticalAlign="top"
                        align="center"
                        iconType="circle"
                        wrapperStyle={{ paddingBottom: 16 }}
                    />
                    <Bar
                        dataKey="orders"
                        fill="#6366f1"
                        name="Orders"
                        radius={[6, 6, 0, 0]}
                        barSize={18}
                    />
                    <Line
                        type="monotone"
                        dataKey="sales"
                        stroke="#f43f5e"
                        strokeWidth={3}
                        dot={false}
                        name="Sales"
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default BarRevenueOverviewChart;