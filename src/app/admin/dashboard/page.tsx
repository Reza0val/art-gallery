"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const TOKENS = {
  bg: "#ffffff",
  text: "#111111",
  textSoft: "#666666",
  border: "#e7e7e7",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") !== "true") {
      router.replace("/admin");
    } else {
      setAuthed(true);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    router.push("/admin");
  };

  const studioUrl = "/studio";

  if (!authed) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: TOKENS.bg,
        fontFamily: 'Inter, ui-sans-serif, system-ui, -apple-system, sans-serif',
        padding: 20,
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto", paddingTop: 60 }}>
        <div
          style={{
            fontSize: 12,
            textTransform: "uppercase",
            letterSpacing: "0.28em",
            color: TOKENS.text,
            marginBottom: 8,
          }}
        >
          Private Collection
        </div>

        <h1 style={{ margin: "0 0 8px", fontSize: 32, fontWeight: 500, color: TOKENS.text }}>
          Welcome, Admin
        </h1>
        <p style={{ margin: "0 0 40px", fontSize: 14, color: TOKENS.textSoft }}>
          Manage your gallery collection through Sanity Studio.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <a
            href={studioUrl}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 24px",
              border: `1px solid ${TOKENS.border}`,
              borderRadius: 16,
              textDecoration: "none",
              color: TOKENS.text,
            }}
          >
            <div>
              <div style={{ fontSize: 16, fontWeight: 500 }}>Open Sanity Studio</div>
              <div style={{ fontSize: 13, color: TOKENS.textSoft, marginTop: 4 }}>
                Add, edit, or remove artworks from the collection
              </div>
            </div>
            <span style={{ fontSize: 20 }}>&rarr;</span>
          </a>

          <a
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "20px 24px",
              border: `1px solid ${TOKENS.border}`,
              borderRadius: 16,
              textDecoration: "none",
              color: TOKENS.text,
            }}
          >
            <div>
              <div style={{ fontSize: 16, fontWeight: 500 }}>View live gallery</div>
              <div style={{ fontSize: 13, color: TOKENS.textSoft, marginTop: 4 }}>
                See how the public gallery looks right now
              </div>
            </div>
            <span style={{ fontSize: 20 }}>&rarr;</span>
          </a>
        </div>

        <div style={{ marginTop: 40 }}>
          <button
            onClick={handleLogout}
            style={{
              border: `1px solid ${TOKENS.border}`,
              background: "transparent",
              borderRadius: 999,
              padding: "10px 20px",
              fontSize: 13,
              color: TOKENS.textSoft,
              cursor: "pointer",
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
