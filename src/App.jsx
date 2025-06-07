import React, { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login"; // Uncomment if you have a login page
import { isAuthenticated, logout } from './auth';
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [page, setPage] = useState(isAuthenticated() ? "dashboard" : "login");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleLogin = () => setPage("dashboard");


  if (page === "login") {
    return <Login onLogin={handleLogin} goToRegister={() => setPage("register")} goToForgot={() => setPage("forgot")} />;
  }
  if (page === "register") {
    return <Register goToLogin={() => setPage("login")} />;
  }
  if (page === "forgot") {
    return <ForgotPassword goToLogin={() => setPage("login")} />;
  }

  // Dashboard layout
  return (
    <ThemeProvider>
      <div className="flex h-screen">
        <Sidebar collapsed={sidebarCollapsed} />
        <div className="flex-1 flex flex-col">
          <Header
            collapsed={sidebarCollapsed}
            onToggleSidebar={() => setSidebarCollapsed((c) => !c)}
          />
          {/* Main Content */}
          <main className="main-content flex-1 p-8 overflow-auto">
            <div className="text-lg font-medium">
              Main Content Area
            </div>
            {/* Add your dashboard widgets/components here */}
            <Dashboard />
          </main>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
