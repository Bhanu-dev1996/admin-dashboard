import React, { useState } from "react";
import logo from "../assets/Adminsphere Logo - Color.svg";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Checkbox } from 'primereact/checkbox';
import { Mail, Facebook, Github } from "lucide-react"; // <-- Lucide icons
import { Link } from "react-router-dom";

// SocialButton for social icons
const SocialButton = ({ icon, color, onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center justify-center w-10 h-10 rounded bg-gray-100 hover:bg-gray-200 transition mx-1"
    aria-label={label}
    style={{ color, background: color + "22" }}
  >
    {icon}
  </button>
);

export default function Login({ onLogin, goToRegister, goToForgot }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false); // <-- Add state
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Helper to validate email format
  const isValidEmail = email =>
    /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);

  const validate = () => {
    const errors = {};
    if (!username.trim()) {
      errors.username = "User Name is required";
    } else if (!isValidEmail(username)) {
      errors.username = "Enter a valid email address";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    setFieldErrors(errors);
    setError("");
    return Object.keys(errors).length === 0;
  };

  const handleUsernameChange = e => {
    const value = e.target.value;
    setUsername(value);
    if (!value.trim()) {
      setFieldErrors(fe => ({ ...fe, username: "User Name is required" }));
    } else if (!isValidEmail(value)) {
      setFieldErrors(fe => ({ ...fe, username: "Enter a valid email address" }));
    } else {
      setFieldErrors(fe => ({ ...fe, username: "" }));
    }
    setError("");
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
    setFieldErrors(fe => ({ ...fe, password: "" }));
    setError("");
  };

  const handlePasswordFocus = () => {
    if (!username.trim()) {
      setFieldErrors(fe => ({ ...fe, username: "User Name is required" }));
    } else if (!isValidEmail(username)) {
      setFieldErrors(fe => ({ ...fe, username: "Enter a valid email address" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setError("");
    setTimeout(() => {
      if (authenticate(username, password)) {
        onLogin();
      } else {
        setError("Invalid email or password");
        setFieldErrors({
          username: "Check your email",
          password: "Check your password"
        });
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        background: "var(--background)",
        backgroundImage: "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1500&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative"
      }}
    >
      <div className="absolute inset-0" style={{ background: "rgba(99,102,241,0.80)" }}></div>
      <div className="relative z-10 flex flex-col items-center w-full">
        <div className="flex flex-col items-center mb-4">
          <img src={logo} alt="Logo" className="h-14 mb-2 drop-shadow-lg" />
        </div>
        <div className="bg-[var(--card-bg)] rounded-xl shadow-lg max-w-md w-full p-8 mx-auto">
          <h2 className="text-2xl font-bold text-center mb-1 text-[var(--text)]">Sign In</h2>
          <p className="text-center text-gray-400 mb-6">Welcome back!</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex justify-between items-center">
                <label htmlFor="username" className="block mb-1 text-[13px] text-[var(--text)] font-normal">
                  User Name
                </label>
              </div>
              <InputText
                id="username"
                placeholder="Enter User Name"
                className={`w-full p-inputtext-sm bg-[var(--card-bg)] text-[var(--text)] border border-[var(--sidebar-border)] ${fieldErrors.username ? "p-invalid" : ""}`}
                value={username}
                onChange={handleUsernameChange}
                disabled={loading}
                autoComplete="username"
                style={{ color: "#222" }}
              />
              {fieldErrors.username && (
                <div className="text-red-400 text-xs mt-1">{fieldErrors.username}</div>
              )}
            </div>
            <div>
              <label htmlFor="password" className="block mb-1 text-[13px] text-[var(--text)] font-normal">
                Password
              </label>
              <Password
                id="password"
                placeholder="password"
                className={`w-full p-inputtext-sm bg-[var(--card-bg)] text-[var(--text)] border border-[var(--sidebar-border)] ${fieldErrors.password ? "p-invalid" : ""}`}
                inputClassName="w-full p-inputtext-sm bg-[var(--card-bg)] text-[var(--text)]"
                value={password}
                onChange={handlePasswordChange}
                onFocus={handlePasswordFocus}
                feedback={false}
                toggleMask
                disabled={loading}
                autoComplete="current-password"
                style={{ display: "block", width: "100%", color: "#222" }}
              />
              {fieldErrors.password && (
                <div className="text-red-400 text-xs mt-1">{fieldErrors.password}</div>
              )}
            </div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Checkbox
                  inputId="remember"
                  checked={remember}
                  onChange={e => setRemember(e.checked)}
                  disabled={loading}
                  className="mr-2"
                  style={{ accentColor: "var(--primary)" }}
                />
                <label htmlFor="remember" className="text-[13px] text-gray-400">
                  Remember password ?
                </label>
              </div>
              <Link
                to="#"
                className="text-[var(--primary)] text-[13px] font-medium hover:underline focus:outline-none"
                onClick={e => {
                  e.preventDefault();
                  if (!loading) goToForgot();
                }}
                tabIndex={0}
                aria-disabled={loading}
                style={loading ? { pointerEvents: "none", opacity: 0.6 } : {}}
              >
                Forget password ?
              </Link>
            </div>
            {error && <div className="text-red-400 text-sm mb-2">{error}</div>}
            <Button
              label={loading ? "Signing in..." : "Sign In"}
              className="w-full"
              size="small"
              style={{
                background: "var(--primary)",
                border: "none",
                fontWeight: 600,
                fontSize: "0.875rem",
                color: "#fff"
              }}
              type="submit"
              loading={loading}
            />
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-[var(--sidebar-border)]"></div>
              <span className="mx-2 text-xs text-gray-400">OR SignIn With</span>
              <div className="flex-grow border-t border-[var(--sidebar-border)]"></div>
            </div>
            <div className="flex justify-center mb-2">
              <SocialButton icon={<Github size={20} />} color="#7b5cff" label="Github" />
              <SocialButton icon={<Mail size={20} />} color="#FF9800" label="Email" />
              <SocialButton icon={<Facebook size={20} />} color="#4CAF50" label="Facebook" />
            </div>
          </form>
          <div className="text-center mt-6 text-sm">
            <span className="text-gray-400">Dont have an account? </span>
            <button
              className="text-[var(--primary)] font-semibold hover:underline ml-1 cursor-pointer"
              type="button"
              onClick={goToRegister}
              disabled={loading}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function authenticate(email, password) {
  // Demo credentials
  const demoUser = { email: "admin@demo.com", password: "admin123" };
  // Registered users from localStorage
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  // Check localStorage users or demo credentials
  return (
    users.some(user => user.email === email && user.password === password) ||
    (email === demoUser.email && password === demoUser.password)
  );
}