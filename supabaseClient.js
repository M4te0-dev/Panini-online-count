import React, { useState, useEffect, useRef, useCallback } from "react";
import { supabase } from "./supabaseClient.js";
import AuthScreen from "./AuthScreen.jsx";
import AppShell from "./AppShell.jsx";

const DEBOUNCE_MS = 700;

export default function App() {
  const [session, setSession] = useState(undefined); // undefined = loading, null = logged out
  const [stickers, setStickers] = useState({});
  const [dataLoading, setDataLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle"); // idle | saving | saved

  const saveTimerRef = useRef(null);
  const savedIdleTimerRef = useRef(null);
  const latestStickersRef = useRef({});

  /* ---- session lifecycle ---- */
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  /* ---- load collection when user logs in ---- */
  useEffect(() => {
    if (!session?.user?.id) {
      setStickers({});
      return;
    }
    let cancelled = false;
    setDataLoading(true);

    supabase
      .from("collections")
      .select("data")
      .eq("user_id", session.user.id)
      .maybeSingle()
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          console.error("Erreur de chargement de la collection :", error);
        }
        const loaded = data?.data ?? {};
        latestStickersRef.current = loaded;
        setStickers(loaded);
        setDataLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [session?.user?.id]);

  /* ---- debounced save to Supabase ---- */
  const persistToSupabase = useCallback(
    (next) => {
      if (!session?.user?.id) return;
      setSaveStatus("saving");
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);

      saveTimerRef.current = setTimeout(async () => {
        const { error } = await supabase
          .from("collections")
          .upsert(
            {
              user_id: session.user.id,
              data: next,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "user_id" }
          );

        if (error) {
          console.error("Erreur de sauvegarde :", error);
          setSaveStatus("idle");
          return;
        }

        setSaveStatus("saved");
        if (savedIdleTimerRef.current) clearTimeout(savedIdleTimerRef.current);
        savedIdleTimerRef.current = setTimeout(() => setSaveStatus("idle"), 2500);
      }, DEBOUNCE_MS);
    },
    [session?.user?.id]
  );

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
      if (savedIdleTimerRef.current) clearTimeout(savedIdleTimerRef.current);
    };
  }, []);

  const handleChangeStickers = useCallback(
    (next) => {
      latestStickersRef.current = next;
      setStickers(next);
      persistToSupabase(next);
    },
    [persistToSupabase]
  );

  const handleLogout = useCallback(async () => {
    // flush pending save immediately before logging out
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
      if (session?.user?.id) {
        await supabase.from("collections").upsert(
          {
            user_id: session.user.id,
            data: latestStickersRef.current,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        );
      }
    }
    await supabase.auth.signOut();
  }, [session?.user?.id]);

  /* ---- render states ---- */

  if (session === undefined) {
    return <LoadingScreen label="Chargement…" />;
  }

  if (session === null) {
    return <AuthScreen />;
  }

  if (dataLoading) {
    return <LoadingScreen label="Récupération de ta collection…" />;
  }

  return (
    <AppShell
      stickers={stickers}
      onChangeStickers={handleChangeStickers}
      saveStatus={saveStatus}
      userEmail={session.user.email}
      onLogout={handleLogout}
    />
  );
}

function LoadingScreen({ label }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0d1108 0%, #131a0c 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#FFD700",
        fontFamily: "'Segoe UI', system-ui, -apple-system, Roboto, sans-serif",
        fontSize: 15,
        fontWeight: 700,
        letterSpacing: 0.5,
      }}
    >
      {label}
    </div>
  );
}
