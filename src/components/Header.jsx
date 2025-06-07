import React, { useRef, useState, useEffect } from "react";
import { AlignLeft, X, Bell, Sun, Moon, Globe, LogOut } from "lucide-react";
import { Button } from "primereact/button";
import { Avatar } from "primereact/avatar";
import { OverlayPanel } from "primereact/overlaypanel";
import { useTheme } from "../context/ThemeContext";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
];

export default function Header({ collapsed: collapsedProp, onToggleSidebar }) {
  const { theme, toggleTheme } = useTheme();
  const op = useRef(null);
  const langOp = useRef(null);
  const notifOp = useRef(null);
  const [language, setLanguage] = useState(languages[0].code);

  useEffect(() => {
    // Update HTML root class for dark/light mode
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleToggleSidebar = () => {
    if (onToggleSidebar) {
      onToggleSidebar();
    }
  };

  // Use prop if controlled, otherwise local state
  const collapsed = collapsedProp ?? false;

  const handleLogout = () => {
    window.location.reload();
  };

  const handleLanguageChange = (code) => {
    setLanguage(code);
    if (langOp.current && langOp.current.hide) langOp.current.hide();
    // Add your i18n logic here if needed
  };

  const handleShowNotifications = (e) => {
    if (notifOp.current && notifOp.current.toggle) notifOp.current.toggle(e);
  };

  const unreadCount = 4;

  return (
    <header className="header h-16 flex items-center justify-between px-4 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="group rounded">
          <Button
            icon={collapsed ? <X size={22} /> : <AlignLeft size={22} />}
            className="p-button-text p-0 rounded transition flex items-center justify-center focus:!shadow-none focus:!ring-0 group-hover:bg-[var(--sidebar-border)]"
            onClick={handleToggleSidebar}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          />
        </div>
      </div>
      <div className="flex items-center gap-1">
        {/* Theme Toggle */}
        <div className="group rounded">
          <Button
            icon={theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            className="p-button-text p-0 rounded transition flex items-center justify-center focus:!shadow-none focus:!ring-0 group-hover:bg-[var(--sidebar-border)]"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          />
        </div>
        {/* Notifications */}
        <span className="relative group rounded">
          <Button
            icon={<Bell size={20} />}
            className="p-button-text p-0 rounded transition flex items-center justify-center focus:!shadow-none focus:!ring-0 group-hover:bg-[var(--sidebar-border)]"
            aria-label="Notifications"
            onClick={handleShowNotifications}
          />
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 leading-none">
            {unreadCount}
          </span>
          <OverlayPanel
            ref={notifOp}
            className="rounded-lg shadow-lg min-w-[340px] max-w-[360px] flex flex-col gap-0 p-0"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--sidebar-border)",
              padding: 0,
            }}
          >
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <div className="font-semibold text-base">Notifications</div>
              <span className="bg-red-100 text-red-500 text-xs font-semibold rounded-full px-3 py-1">
                {unreadCount} Unread
              </span>
            </div>
            {/* Notification List */}
            <div className="max-h-[340px] overflow-y-auto">
              <div className="flex gap-3 px-4 py-4 border-b border-[var(--sidebar-border)] hover:bg-[var(--sidebar-border)] transition cursor-pointer">
                <Avatar
                  image="https://randomuser.me/api/portraits/women/44.jpg"
                  shape="circle"
                  size="large"
                  className="flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm">
                    Welcome to Adminsphere! <span className="ml-1">👋</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Your account has been successfully created.
                  </div>
                  <div className="text-xs text-[#b0b7d1] mt-1">Just Now</div>
                </div>
              </div>
              <div className="flex gap-3 px-4 py-4 border-b border-[var(--sidebar-border)] hover:bg-[var(--sidebar-border)] transition cursor-pointer">
                <div className="flex items-center justify-center bg-green-100 text-green-500 font-bold rounded-full w-10 h-10 text-sm">
                  JD
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">Monthly Report Ready</div>
                  <div className="text-xs text-gray-500">
                    Your monthly analytics report is now available.
                  </div>
                  <div className="text-xs text-[#b0b7d1] mt-1">10 Min Ago</div>
                </div>
              </div>
              <div className="flex gap-3 px-4 py-4 border-b border-[var(--sidebar-border)] hover:bg-[var(--sidebar-border)] transition cursor-pointer">
                <Avatar
                  image="https://randomuser.me/api/portraits/men/45.jpg"
                  shape="circle"
                  size="large"
                  className="flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="font-semibold text-sm">
                    New Order Placed <span className="ml-1">🛒</span>
                  </div>
                  <div className="text-xs text-gray-500">
                    Order #5678 has been placed by Michael.
                  </div>
                  <div className="text-xs text-[#b0b7d1] mt-1">1 Hour Ago</div>
                </div>
              </div>
              <div className="flex gap-3 px-4 py-4 border-b border-[var(--sidebar-border)] hover:bg-[var(--sidebar-border)] transition cursor-pointer">
                <div className="flex items-center justify-center bg-blue-100 text-blue-500 font-bold rounded-full w-10 h-10 text-sm">
                  AR
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">Password Changed</div>
                  <div className="text-xs text-gray-500">
                    Your password was changed successfully.
                  </div>
                  <div className="text-xs text-[#b0b7d1] mt-1">Yesterday</div>
                </div>
              </div>
            </div>
            <div className="py-3 text-center">
              <a
                href="#"
                className="text-[var(--primary)] text-sm font-medium hover:underline"
              >
                View All &rarr;
              </a>
            </div>
          </OverlayPanel>
        </span>
        {/* Language */}
        <div className="group rounded relative">
          <Button
            icon={<Globe size={20} />}
            className="p-button-text p-0 rounded transition flex items-center justify-center focus:!shadow-none focus:!ring-0 group-hover:bg-[var(--sidebar-border)]"
            aria-label="Change language"
            onClick={(e) => langOp.current && langOp.current.toggle && langOp.current.toggle(e)}
          />
          <OverlayPanel
            ref={langOp}
            className="rounded-lg shadow-lg min-w-[140px] flex flex-col gap-1"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--sidebar-border)",
              padding: 0,
            }}
          >
            {languages.map((lang) => (
              <div
                key={lang.code}
                className={`px-4 py-2 cursor-pointer hover:bg-[var(--sidebar-border)] transition text-sm ${
                  language === lang.code ? "text-[var(--primary)] font-semibold" : "text-[var(--text)]"
                }`}
                onClick={() => handleLanguageChange(lang.code)}
              >
                {lang.label}
              </div>
            ))}
          </OverlayPanel>
        </div>
        <span className="text-sm text-gray-400">Welcome, Admin</span>
        <div>
          <Avatar
            image="https://randomuser.me/api/portraits/men/32.jpg"
            shape="circle"
            size="large"
            className="border border-[var(--sidebar-border)] cursor-pointer"
            onClick={(e) => op.current && op.current.toggle && op.current.toggle(e)}
          />
          <OverlayPanel
            ref={op}
            className="rounded-lg shadow-lg min-w-[200px] flex flex-col gap-3"
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--sidebar-border)",
              padding: "0.5rem",
            }}
          >
            <div className="">
              <div
                className="w-full flex items-center gap-2 justify-start py-2 px-2 rounded cursor-pointer hover:bg-[var(--sidebar-border)] text-[var(--primary)] transition"
                onClick={handleLogout}
                tabIndex={0}
                role="menuitem"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleLogout();
                }}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </div>
            </div>
          </OverlayPanel>
        </div>
      </div>
    </header>
  );
}