import React, { useState } from "react";
import logo from "../assets/Adminsphere Logo - Color.svg";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { Mail, Facebook, Github } from "lucide-react";

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

export default function Register({ goToLogin }) {
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [registered, setRegistered] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const isValidEmail = email =>
    /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);

  const validate = () => {
    const errors = {};
    if (!fullname.trim()) {
      errors.fullname = "Email is required";
    } else if (!isValidEmail(fullname)) {
      errors.fullname = "Enter a valid email address";
    }
    if (!password) {
      errors.password = "Password is required";
    }
    if (!confirm) {
      errors.confirm = "Confirm your password";
    } else if (password !== confirm) {
      errors.confirm = "Passwords do not match";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      users.push({ email: fullname, password });
      localStorage.setItem("users", JSON.stringify(users));
      setRegistered(true);
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
          <h2 className="text-2xl font-bold text-center mb-1 text-[var(--text)]">Sign Up</h2>
          <p className="text-center text-gray-400 mb-6">Join us by creating a free account !</p>
          {registered ? (
            <div>
              <div className="mb-4 text-green-400 text-center">Registration successful!</div>
              <Button
                label="Go to Login"
                className="w-full"
                style={{
                  background: "var(--primary)",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "0.875rem",
                  color: "#fff"
                }}
                onClick={goToLogin}
              />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="fullname" className="block mb-1 text-[13px] text-[var(--text)] font-normal">
                  Full Name
                </label>
                <InputText
                  id="fullname"
                  placeholder="Enter Email ID"
                  className={`w-full p-inputtext-sm bg-[var(--card-bg)] text-[var(--text)] border border-[var(--sidebar-border)] ${fieldErrors.fullname ? "p-invalid" : ""}`}
                  value={fullname}
                  onChange={e => {
                    setFullname(e.target.value);
                    setFieldErrors(fe => ({ ...fe, fullname: "" }));
                  }}
                  disabled={loading}
                  autoComplete="username"
                  style={{ color: "#222" }}
                />
                {fieldErrors.fullname && (
                  <div className="text-red-400 text-xs mt-1">{fieldErrors.fullname}</div>
                )}
              </div>
              <div>
                <label htmlFor="password" className="block mb-1 text-[13px] text-[var(--text)] font-normal">
                  Password
                </label>
                <Password
                  id="password"
                  placeholder="Password"
                  className={`w-full p-inputtext-sm bg-[var(--card-bg)] text-[var(--text)] border border-[var(--sidebar-border)] ${fieldErrors.password ? "p-invalid" : ""}`}
                  inputClassName="w-full p-inputtext-sm bg-[var(--card-bg)] text-[var(--text)]"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    setFieldErrors(fe => ({ ...fe, password: "" }));
                  }}
                  feedback={false}
                  toggleMask
                  disabled={loading}
                  autoComplete="new-password"
                  style={{ display: "block", width: "100%", color: "#222" }}
                />
                {fieldErrors.password && (
                  <div className="text-red-400 text-xs mt-1">{fieldErrors.password}</div>
                )}
              </div>
              <div>
                <label htmlFor="confirm" className="block mb-1 text-[13px] text-[var(--text)] font-normal">
                  Confirm Password
                </label>
                <Password
                  id="confirm"
                  placeholder="Confirm Password"
                  className={`w-full p-inputtext-sm bg-[var(--card-bg)] text-[var(--text)] border border-[var(--sidebar-border)] ${fieldErrors.confirm ? "p-invalid" : ""}`}
                  inputClassName="w-full p-inputtext-sm bg-[var(--card-bg)] text-[var(--text)]"
                  value={confirm}
                  onChange={e => {
                    setConfirm(e.target.value);
                    setFieldErrors(fe => ({ ...fe, confirm: "" }));
                  }}
                  feedback={false}
                  toggleMask
                  disabled={loading}
                  autoComplete="new-password"
                  style={{ display: "block", width: "100%", color: "#222" }}
                />
                {fieldErrors.confirm && (
                  <div className="text-red-400 text-xs mt-1">{fieldErrors.confirm}</div>
                )}
              </div>
              <Button
                label={loading ? "Creating Account..." : "Create Account"}
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
          )}
          <div className="text-center mt-6 text-sm">
            <span className="text-gray-400">Already have an account? </span>
            <button
              className="text-[var(--primary)] font-semibold hover:underline ml-1 cursor-pointer"
              type="button"
              onClick={goToLogin}
              disabled={loading}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}