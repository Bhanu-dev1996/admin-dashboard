import React, { useState } from "react";
import logo from "../assets/Adminsphere Logo - Color.svg";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function ForgotPassword({ goToLogin }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [fieldError, setFieldError] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = email =>
    /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFieldError("");
    if (!email.trim()) {
      setFieldError("Email is required");
      return;
    }
    if (!isValidEmail(email)) {
      setFieldError("Enter a valid email address");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 800);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center py-8"
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
          <h2 className="text-2xl font-bold text-center mb-1 text-[var(--text)]">Forgot Password</h2>
          <p className="text-center text-gray-400 mb-6">Enter your email to receive a reset link</p>
          {sent ? (
            <div>
              <div className="mb-4 text-green-400 text-center">Reset link sent!</div>
              <Button
                label="Back to Login"
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
                <label htmlFor="email" className="block mb-1 text-[13px] text-[var(--text)] font-normal">
                  Email
                </label>
                <InputText
                  id="email"
                  placeholder="Enter your email"
                  className={`w-full p-inputtext-sm bg-[var(--card-bg)] text-[var(--text)] border border-[var(--sidebar-border)] ${fieldError ? "p-invalid" : ""}`}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={loading}
                  autoComplete="email"
                  style={{ color: "#222" }}
                />
                {fieldError && (
                  <div className="text-red-400 text-xs mt-1">{fieldError}</div>
                )}
              </div>
              <Button
                label={loading ? "Sending..." : "Send Reset Link"}
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
            </form>
          )}
          <div className="text-center mt-6 text-sm">
            <button
              className="text-[var(--primary)] font-semibold hover:underline cursor-pointer"
              type="button"
              onClick={goToLogin}
              disabled={loading}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}