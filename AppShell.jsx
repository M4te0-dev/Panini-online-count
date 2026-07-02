import React, { useState } from "react";
import { supabase } from "./supabaseClient.js";

const YELLOW = "#FFD700";
const DARK_BG = "#080a06";

export default function AuthScreen() {
  const [mode, setMode] = useState("login"); // login | signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setInfo("");
    if (!email.trim() || !password) {
      setError("Merci de remplir tous les champs.");
      return;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "login") {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (signInError) throw signInError;
      } else {
        const { error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
        });
        if (signUpError) throw signUpError;
        setInfo("Compte créé ! Si la confirmation par email est activée, vérifie ta boîte mail avant de te connecter.");
      }
    } catch (err) {
      setError(translateError(err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.root}>
      <div style={styles.card}>
        <div style={styles.badge}>FIFA WORLD CUP 2026™</div>
        <h1 style={styles.title}>Mon Album Panini</h1>
        <p style={styles.subtitle}>Connecte-toi pour retrouver ta collection</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Adresse email</label>
          <input
            style={styles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="toi@exemple.com"
            autoComplete="email"
          />

          <label style={styles.label}>Mot de passe</label>
          <input
            style={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete={mode === "login" ? "current-password" : "new-password"}
          />

          {error && <div style={styles.errorBox}>{error}</div>}
          {info && <div style={styles.infoBox}>{info}</div>}

          <button type="submit" style={styles.submitBtn} disabled={loading}>
            {loading ? "Chargement…" : mode === "login" ? "Se connecter" : "Créer mon compte"}
          </button>
        </form>

        <button
          style={styles.switchBtn}
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setError("");
            setInfo("");
          }}
        >
          {mode === "login"
            ? "Pas encore de compte ? Inscris-toi"
            : "Déjà un compte ? Connecte-toi"}
        </button>
      </div>
    </div>
  );
}

function translateError(msg) {
  if (!msg) return "Une erreur est survenue.";
  if (msg.includes("Invalid login credentials")) return "Email ou mot de passe incorrect.";
  if (msg.includes("User already registered")) return "Un compte existe déjà avec cet email.";
  if (msg.includes("Email not confirmed")) return "Merci de confirmer ton email avant de te connecter.";
  return msg;
}

const styles = {
  root: {
    minHeight: "100vh",
    background: `linear-gradient(180deg, #0d1108 0%, #131a0c 100%)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    fontFamily: "'Segoe UI', system-ui, -apple-system, Roboto, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: 400,
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,215,0,0.18)",
    borderRadius: 28,
    padding: "34px 30px",
    backdropFilter: "blur(14px)",
    textAlign: "center",
  },
  badge: {
    display: "inline-block",
    background: "rgba(255,215,0,0.12)",
    border: `1px solid ${YELLOW}`,
    color: YELLOW,
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 2,
    padding: "5px 14px",
    borderRadius: 999,
    marginBottom: 16,
  },
  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: 900,
    margin: "0 0 6px",
    letterSpacing: -0.5,
  },
  subtitle: {
    color: "#9c9c8c",
    fontSize: 13.5,
    margin: "0 0 26px",
  },
  form: { textAlign: "left" },
  label: {
    display: "block",
    color: "#9c9c8c",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 0.5,
    marginBottom: 6,
    marginTop: 14,
  },
  input: {
    width: "100%",
    background: "rgba(0,0,0,0.35)",
    border: "1px solid rgba(255,215,0,0.25)",
    borderRadius: 14,
    padding: "13px 16px",
    color: "#fff",
    fontSize: 14.5,
    outline: "none",
  },
  errorBox: {
    marginTop: 14,
    background: "rgba(255,107,107,0.1)",
    border: "1px solid rgba(255,107,107,0.35)",
    color: "#ff8f8f",
    fontSize: 12.5,
    borderRadius: 12,
    padding: "10px 14px",
  },
  infoBox: {
    marginTop: 14,
    background: "rgba(255,215,0,0.1)",
    border: "1px solid rgba(255,215,0,0.35)",
    color: YELLOW,
    fontSize: 12.5,
    borderRadius: 12,
    padding: "10px 14px",
  },
  submitBtn: {
    width: "100%",
    marginTop: 22,
    padding: "14px",
    borderRadius: 999,
    border: "none",
    background: `linear-gradient(90deg, ${YELLOW}, #ffb700)`,
    color: "#0a0a06",
    fontSize: 15,
    fontWeight: 800,
    cursor: "pointer",
  },
  switchBtn: {
    marginTop: 18,
    background: "transparent",
    border: "none",
    color: "#9c9c8c",
    fontSize: 13,
    cursor: "pointer",
    textDecoration: "underline",
  },
};
