import React from "react";
import logo from "../assets/Adminsphere Logo.svg";
import logoBlack from "../assets/Adminsphere Logo - Black.svg";
import logoSmall from "../assets/Adminsphere Logo Small.svg";
import { Avatar } from "primereact/avatar";
import { useTheme } from "../context/ThemeContext";
import {
  Home,
  Users,
  Boxes,
  ShoppingCart,
  LineChart,
  Settings
} from "lucide-react";

const menuItems = [
  { label: 'Dashboard', icon: <Home size={18} />, path: '/' },
  { label: 'Users', icon: <Users size={18} />, path: '/users' },
  { label: 'Products', icon: <Boxes size={18} />, path: '/products' },
  { label: 'Orders', icon: <ShoppingCart size={18} />, path: '/orders' },
  { label: 'Reports', icon: <LineChart size={18} />, path: '/reports' },
  { label: 'Settings', icon: <Settings size={18} />, path: '/settings' },
];

export default function Sidebar({ collapsed }) {
  const { theme } = useTheme();

  // Use black logo for light theme, normal logo for dark, small logo for collapsed
  const logoSrc = collapsed
    ? logoSmall
    : theme === "dark"
      ? logo
      : logoBlack;

  // Set sidebar background based on theme
  const sidebarBg =
    theme === "dark"
      ? "bg-[#1E293B]" // Slate-800 for dark
      : "bg-[#fff]";   // White for light

  return (
    <aside
      className={`sidebar flex flex-col ${sidebarBg} text-[var(--text)] min-h-screen transition-all duration-200 ${
        collapsed ? "w-16" : "w-64"
      }`}
      style={{ minWidth: collapsed ? "4rem" : "16rem" }}
    >
      {/* Logo */}
      <div
        className="h-16 flex items-center justify-center border-b"
        style={{ borderColor: "var(--sidebar-border)" }}
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
          {menuItems.map(item => (
            <li key={item.label} className="mb-2">
              <a
                href={item.path}
                className={`flex items-center gap-3 px-4 py-4 rounded-lg hover:bg-[var(--sidebar-border)] transition ${collapsed ? "justify-center" : ""}`}
                style={{ textDecoration: "none" }}
                title={collapsed ? item.label : undefined}
              >
                {item.icon}
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {/* User Info */}
      <div
        className={`p-4 border-t flex items-center gap-3 transition-all duration-200`}
        style={{
          justifyContent: collapsed ? "center" : "flex-start",
          borderColor: "var(--sidebar-border)"
        }}
      >
        <Avatar
          image="https://randomuser.me/api/portraits/men/32.jpg"
          shape="circle"
          size={collapsed ? "normal" : "large"}
          className="border border-[#4e568a]"
          title={collapsed ? "Anna Adame" : undefined}
        />
        {!collapsed && (
          <div>
            <div className="font-semibold text-sm">Anna Adame</div>
            <div className="text-xs text-[#b0b7d1]">Founder</div>
          </div>
        )}
      </div>
    </aside>
  );
}