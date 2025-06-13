import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Users from "./pages/Users";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";

function App() {
  const [page, setPage] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true" ? "dashboard" : "login";
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    setPage("dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setPage("login");
  };

  if (page === "login") {
    return <Login onLogin={handleLogin} goToRegister={() => setPage("register")} goToForgot={() => setPage("forgot")} />;
  }
  if (page === "register") {
    return <Register goToLogin={() => setPage("login")} />;
  }
  if (page === "forgot") {
    return <ForgotPassword goToLogin={() => setPage("login")} />;
  }

  // Dashboard layout with routing
  return (
      <div className="flex h-screen">
        <Sidebar collapsed={sidebarCollapsed} />
        <div className="flex-1 flex flex-col">
          <Header
            collapsed={sidebarCollapsed}
            onToggleSidebar={() => setSidebarCollapsed((c) => !c)}
          />
          {/* Main Content */}
          <main className="main-content flex-1 p-4 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </div>
  );
}

export default App;
