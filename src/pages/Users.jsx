import React, { useState } from "react";
import { Users as UsersIcon, CheckCircle, XCircle, ShoppingCart, Eye, Edit, Trash2 } from "lucide-react";

const users = [
    {
        id: "USR001",
        name: "Alice Johnson",
        email: "alice@demo.com",
        phone: "+1 555-1234",
        registered: "2023-01-15",
        orders: 12,
        totalSpent: 1240,
        status: "Active",
        role: "Admin",
    },
    {
        id: "USR002",
        name: "Bob Smith",
        email: "bob@demo.com",
        phone: "+1 555-5678",
        registered: "2023-03-22",
        orders: 7,
        totalSpent: 820,
        status: "Active",
        role: "User",
    },
    {
        id: "USR003",
        name: "Carol Lee",
        email: "carol@demo.com",
        phone: "+1 555-9876",
        registered: "2023-05-10",
        orders: 2,
        totalSpent: 150,
        status: "Inactive",
        role: "Seller",
    },
];

const totalUsers = users.length;
const activeUsers = users.filter((u) => u.status === "Active").length;
const inactiveUsers = users.filter((u) => u.status === "Inactive").length;
const avgOrders =
    users.length > 0
        ? (users.reduce((sum, u) => sum + (u.orders || 0), 0) / users.length).toFixed(1)
        : 0;

const statusColors = {
    Active: "bg-green-100 text-green-700",
    Inactive: "bg-red-100 text-red-600",
    Suspended: "bg-yellow-100 text-yellow-700",
};

const roles = ["All", "User", "Admin", "Seller"];
const statuses = ["All", "Active", "Inactive", "Suspended"];

const Users = () => {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [roleFilter, setRoleFilter] = useState("All");
    const [dateFilter, setDateFilter] = useState("");

    const filteredUsers = users.filter((u) => {
        const matchesSearch =
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase());
        const matchesStatus =
            statusFilter === "All" ? true : u.status === statusFilter;
        const matchesRole =
            roleFilter === "All" ? true : u.role === roleFilter;
        const matchesDate =
            !dateFilter ? true : u.registered === dateFilter;
        return matchesSearch && matchesStatus && matchesRole && matchesDate;
    });

    return (
        <div className="">
            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-xl shadow border border-gray-100 p-4 flex items-center gap-3">
                    <span className="bg-blue-100 text-blue-600 rounded-full p-2">
                        <UsersIcon size={22} />
                    </span>
                    <div>
                        <div className="text-xs text-gray-500">Total Users</div>
                        <div className="text-lg font-bold text-gray-800">{totalUsers}</div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow border border-gray-100 p-4 flex items-center gap-3">
                    <span className="bg-green-100 text-green-600 rounded-full p-2">
                        <CheckCircle size={22} />
                    </span>
                    <div>
                        <div className="text-xs text-gray-500">Active Users</div>
                        <div className="text-lg font-bold text-gray-800">{activeUsers}</div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow border border-gray-100 p-4 flex items-center gap-3">
                    <span className="bg-red-100 text-red-600 rounded-full p-2">
                        <XCircle size={22} />
                    </span>
                    <div>
                        <div className="text-xs text-gray-500">Inactive Users</div>
                        <div className="text-lg font-bold text-gray-800">{inactiveUsers}</div>
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow border border-gray-100 p-4 flex items-center gap-3">
                    <span className="bg-purple-100 text-purple-600 rounded-full p-2">
                        <ShoppingCart size={22} />
                    </span>
                    <div>
                        <div className="text-xs text-gray-500">Avg Orders/User</div>
                        <div className="text-lg font-bold text-gray-800">{avgOrders}</div>
                    </div>
                </div>
            </div>
            {/* Filters */}
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
                <input
                    type="text"
                    placeholder="🔍 Search by name or email"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border border-gray-200 rounded px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
                <input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="border border-gray-200 rounded px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="📅 Registered Date"
                />
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-200 rounded px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                    {statuses.map((status) => (
                        <option key={status} value={status}>
                            {status === "All" ? "🎚️ All Statuses" : status}
                        </option>
                    ))}
                </select>
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="border border-gray-200 rounded px-3 py-2 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                    {roles.map((role) => (
                        <option key={role} value={role}>
                            {role === "All" ? "🎖️ All Roles" : role}
                        </option>
                    ))}
                </select>
            </div>
            {/* Users Table */}
            <div className="bg-white rounded-xl shadow border border-gray-100 overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead>
                        <tr className="bg-gray-50 text-gray-600">
                            <th className="py-3 px-4 text-left font-semibold">User ID</th>
                            <th className="py-3 px-4 text-left font-semibold">Name</th>
                            <th className="py-3 px-4 text-left font-semibold">Email</th>
                            <th className="py-3 px-4 text-left font-semibold">Phone</th>
                            <th className="py-3 px-4 text-left font-semibold">Registered Date</th>
                            <th className="py-3 px-4 text-left font-semibold">Orders</th>
                            <th className="py-3 px-4 text-left font-semibold">Total Spent</th>
                            <th className="py-3 px-4 text-left font-semibold">Status</th>
                            <th className="py-3 px-4 text-left font-semibold">Role</th>
                            <th className="py-3 px-4 text-left font-semibold">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.length === 0 && (
                            <tr>
                                <td colSpan={10} className="py-6 text-center text-gray-400">
                                    No users found.
                                </td>
                            </tr>
                        )}
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                                <td className="py-3 px-4">{user.id}</td>
                                <td className="py-3 px-4">{user.name}</td>
                                <td className="py-3 px-4">{user.email}</td>
                                <td className="py-3 px-4">{user.phone}</td>
                                <td className="py-3 px-4">{user.registered}</td>
                                <td className="py-3 px-4">{user.orders}</td>
                                <td className="py-3 px-4">${user.totalSpent.toLocaleString()}</td>
                                <td className="py-3 px-4">
                                    <span
                                        className={`px-2 py-1 rounded text-xs font-medium ${
                                            statusColors[user.status] || "bg-gray-100 text-gray-700"
                                        }`}
                                    >
                                        {user.status}
                                    </span>
                                </td>
                                <td className="py-3 px-4">{user.role}</td>
                                <td className="py-3 px-4 flex gap-2">
                                    <button
                                        className="text-blue-600 hover:underline flex items-center gap-1 text-xs"
                                        title="View"
                                    >
                                        <Eye size={15} />
                                    </button>
                                    <button
                                        className="text-green-600 hover:underline flex items-center gap-1 text-xs"
                                        title="Edit"
                                    >
                                        <Edit size={15} />
                                    </button>
                                    <button
                                        className="text-red-500 hover:underline flex items-center gap-1 text-xs"
                                        title="Delete"
                                    >
                                        <Trash2 size={15} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;
