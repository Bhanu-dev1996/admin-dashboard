import React from "react";
import logoBlack from "../assets/Adminsphere Logo - Black.svg";
import logoSmall from "../assets/Adminsphere Logo Small Color.svg";
import { Avatar } from "primereact/avatar";
import {
  Home,
  Users,
  Boxes,
  ShoppingCart,
  LineChart,
  Settings
} from "lucide-react";
import { useLocation } from "react-router-dom";
import { getUserRole } from "../auth";

const menuItems = [
  { label: 'Dashboard', icon: <Home size={18} />, path: '/' },
  { label: 'Users', icon: <Users size={18} />, path: '/users', roles: ['Admin'] },
  { label: 'Products', icon: <Boxes size={18} />, path: '/products', roles: ['Admin', 'Manager'] },
  { label: 'Orders', icon: <ShoppingCart size={18} />, path: '/orders', roles: ['Admin', 'Manager'] },
  { label: 'Reports', icon: <LineChart size={18} />, path: '/reports', roles: ['Admin', 'Manager'] },
  { label: 'Settings', icon: <Settings size={18} />, path: '/settings', roles: ['Admin'] },
];

export default function Sidebar({ collapsed }) {
  const location = useLocation();
  const role = getUserRole();

  // Always use black logo for light theme, small logo for collapsed
  const logoSrc = collapsed ? logoSmall : logoBlack;

  // Always use light sidebar background
  const sidebarBg = "bg-[#ffffff]";

  return (
    <aside
      className={`sidebar flex flex-col ${sidebarBg} text-[var(--text)] min-h-screen border-r border-gray-200 transition-all duration-200 ${
        collapsed ? "w-[70px]" : "w-[230px]"
      }`}
      style={{ minWidth: collapsed ? "4rem" : "16rem" }}
    >
      {/* Logo */}
      <div
        className="h-16 flex items-center justify-center border-b border-gray-200"
      >
        <img
          src={logoSrc}
          alt="Adminsphere"
          className="transition-all duration-200"
          style={{ height: "2.5rem", maxHeight: "2.5rem", width: "auto" }}
        />
      </div>
      {/* Menu */}
      <nav className={`flex-1 px-2 py-6 overflow-y-auto`}>
        <ul>
          {menuItems
            .filter(item => !item.roles || item.roles.includes(role))
            .map(item => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.label} className="mb-1">
                  <a
                    href={item.path}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition ${collapsed ? "justify-center" : ""}
                      ${isActive
                        ? "bg-[var(--primary)] text-white font-semibold"
                        : "hover:bg-gray-100 hover:text-[var(--primary)] text-gray-700"
                      }
                    `}
                    style={{ textDecoration: "none" }}
                    title={collapsed ? item.label : undefined}
                  >
                    <span className={isActive ? "text-white" : ""}>
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <span className={`font-medium ${isActive ? "text-white" : ""}`}>
                        {item.label}
                      </span>
                    )}
                  </a>
                </li>
              );
            })}
        </ul>
      </nav>
      {/* User Info */}
      <div
        className={`p-4 border-t border-gray-200 flex items-center gap-3 transition-all duration-200`}
        style={{
          justifyContent: collapsed ? "center" : "flex-start",
        }}
      >
        <Avatar
          image="https://randomuser.me/api/portraits/men/32.jpg"
          shape="circle"
          className="border border-[#4e568a] profile-avatar"
          title={collapsed ? "Anna Adame" : undefined}
        />
        {!collapsed && (
          <div>
            <div className="font-semibold text-sm text-gray-700">Anna Adame</div>
            <div className="text-xs text-gray-700">Founder</div>
          </div>
        )}
      </div>
    </aside>
  );
}