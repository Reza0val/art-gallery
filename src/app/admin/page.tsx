"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TOKENS = {
  bg: "#ffffff",
  text: "#111111",
  textSoft: "#666666",
  border: "#e7e7e7",
};

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "gallery2024") {
      sessionStorage.setItem("admin_auth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: TOKENS.bg,
        fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif',
        padding: 20,
      }}
    >
      <div style={{ width: "100%", maxWidth: 380 }}>
        <div
          style={{
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.28em",
            color: TOKENS.text,
            marginBottom: 32,
            textAlign: "center",
          }}
        >
          Private Collection
        </div>

        <h1
          style={{
            margin: "0 0 8px",
            fontSize: 28,
            fontWeight: 500,
            textAlign: "center",
            color: TOKENS.text,
          }}
        >
          Admin Login
        </h1>
        <p
          style={{
            margin: "0 0 32px",
            fontSize: 14,
            color: TOKENS.textSoft,
            textAlign: "center",
          }}
        >
          Sign in to manage the gallery collection.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 12 }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(""); }}
              required
              style={{
                width: "100%",
                height: 46,
                borderRadius: 999,
                border: `1px solid ${error ? "#e53e3e" : TOKENS.border}`,
                padding: "0 20px",
                fontSize: 14,
                boxSizing: "border-box",
                outline: "none",
                background: TOKENS.bg,
              }}
            />
          </div>

          <div style={{ marginBottom: 12 }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              required
              style={{
                width: "100%",
                height: 46,
                borderRadius: 999,
                border: `1px solid ${error ? "#e53e3e" : TOKENS.border}`,
                padding: "0 20px",
                fontSize: 14,
                boxSizing: "border-box",
                outline: "none",
                background: TOKENS.bg,
              }}
            />
          </div>

          {error && (
            <p style={{ margin: "0 0 12px", fontSize: 13, color: "#e53e3e", textAlign: "center" }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              height: 46,
              borderRadius: 999,
              border: `1px solid ${TOKENS.text}`,
              background: TOKENS.text,
              color: TOKENS.bg,
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
