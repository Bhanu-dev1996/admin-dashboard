import React from "react";
import { Card } from "primereact/card";

const KpiCard = ({ icon, color, label, value, trend }) => {
    // Determine trend color and arrow
    const isPositive = typeof trend === "string" ? !trend.startsWith('-') : trend > 0;
    const trendColor = isPositive ? "text-green-600" : "text-red-600";
    const trendArrow = isPositive ? "▲" : "▼";
    const trendValue = typeof trend === "string" ? trend.replace(/[^\d.]/g, '') : Math.abs(trend);

    return (
        <Card
            className="!p-5 rounded-xl shadow border border-gray-100 min-w-[220px] h-full transition-transform duration-200 hover:scale-100 hover:shadow-lg cursor-pointer font-inter"
        >
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                    <div className="text-sm font-medium text-gray-500">{label}</div>
                    <div className="text-2xl font-bold text-gray-900">{value}</div>
                    {trend !== undefined && (
                        <div className="flex items-center gap-2 mt-1">
                            <span className={`text-sm font-semibold ${trendColor}`}>
                                {trendArrow} {trendValue}%
                            </span>
                        </div>
                    )}
                </div>
                <div className="pt-2">
                    <span className={`w-12 h-12 flex items-center justify-center rounded-full bg-gray-100`}>
                        <span className={`text-2xl ${color}`}>{icon}</span>
                    </span>
                </div>
            </div>
        </Card>
    );
};

export default KpiCard;