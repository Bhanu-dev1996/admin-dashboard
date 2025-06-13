import React, { useState } from 'react'
import { Calendar } from 'primereact/calendar';
import KpiCard from '../components/KpiCard';
import BarRevenueOverviewChart from '../components/BarRevenueOverviewChart';
import RevenueBreakdownPieChart from '../components/RevenueBreakdownPieChart';
import MonthlyRevenueAreaChart from '../components/MonthlyRevenueAreaChart';
import { DollarSign, ShoppingCart, UserPlus, Undo2 } from "lucide-react";

const stats = [
    {
        label: 'Total Sales',
        value: '$24,000',
        icon: <DollarSign size={22} />,
        trend: '+12%',
        color: 'text-green-600',
    },
    {
        label: 'Total Orders',
        value: '1,240',
        icon: <ShoppingCart size={22} />,
        trend: '+5%',
        color: 'text-blue-600',
    },
    {
        label: 'New Customers',
        value: '320',
        icon: <UserPlus size={22} />,
        trend: '+18%',
        color: 'text-purple-600',
    },
    {
        label: 'Refunds',
        value: '25',
        icon: <Undo2 size={22} />,
        trend: '-3%',
        color: 'text-red-600',
    },
];

const Dashboard = () => {
    const [dates, setDates] = useState(null);

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
                <h1 className="text-xl font-bold">Dashboard</h1>
                <div>
                    <Calendar
                        value={dates}
                        onChange={(e) => setDates(e.value)}
                        selectionMode="range"
                        placeholder="Select Date Range"
                        showIcon
                        className="w-[270px] h-10 text-sm [&_.p-inputtext]:h-10 [&_.p-inputtext]:text-sm"
                        inputClassName="h-10 text-sm"
                        readOnlyInput
                        panelClassName="z-50"
                        pt={{
                            dropdownButton: {
                                className: "bg-[var(--primary)] text-white hover:bg-[var(--primary)] border-0 rounded-r"
                            }
                        }}
                    />
                </div>
            </div>
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat) => (
                    <KpiCard
                        key={stat.label}
                        icon={stat.icon}
                        color={stat.color}
                        label={stat.label}
                        value={stat.value}
                        trend={stat.trend}
                    />
                ))}
            </div>
            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <BarRevenueOverviewChart />
                <RevenueBreakdownPieChart />
            </div>
            {/* Monthly Revenue Trend Area Chart */}
            <div className="mt-6">
                <MonthlyRevenueAreaChart />
            </div>
        </div>
    )
}

export default Dashboard;
