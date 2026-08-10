"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

type AuthView = "landing" | "login" | "signup" | "forgot" | "update_password" | "onboarding";
type Message = { type: "" | "error" | "info" | "success" | "success_action"; text: string };

type Props = {
  open: boolean;
  onClose: () => void;
  user: User | null;
  onUserChange: (user: User | null) => void;
};

export default function NexusAuthModal({ open, onClose, user, onUserChange }: Props) {
  const [view, setView] = useState<AuthView>("landing");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Message>({ type: "", text: "" });

  const resetForm = useCallback(() => {
    setEmail("");
    setPassword("");
    setConfirm("");
    setUsername("");
    setAvatarUrl("");
    setNewsletter(false);
    setMessage({ type: "", text: "" });
  }, []);

  const evaluateSession = useCallback(
    async (sessionUser: User | null) => {
      if (!sessionUser) {
        onUserChange(null);
        return;
      }
      onUserChange(sessionUser);
      const metaUsername = sessionUser.user_metadata?.username as string | undefined;
      const supabase = createClient();
      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", sessionUser.id)
        .maybeSingle();
      if (!profile?.username && !metaUsername) {
        setView("onboarding");
        setUsername("");
      }
    },
    [onUserChange]
  );

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      void evaluateSession(session?.user ?? null);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) => {
      void evaluateSession(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, [evaluateSession]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.location.href.includes("type=recovery") || window.location.href.includes("reset=true")) {
      setView("update_password");
    }
    const params = new URLSearchParams(window.location.search);
    if (params.get("auth_error")) {
      setMessage({ type: "error", text: "Sign-in failed. Please try again." });
      setView("login");
      params.delete("auth_error");
      const qs = params.toString();
      window.history.replaceState(
        {},
        "",
        `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`
      );
    }
  }, []);

  const handleAuth = async (
    action: "login" | "signup" | "reset" | "update_password",
    provider?: "google" | "discord"
  ) => {
    setLoading(true);
    setMessage({ type: "", text: "" });
    const supabase = createClient();
    try {
      if (provider) {
        const oauthOptions: {
          redirectTo: string;
          queryParams?: { prompt: string };
        } = {
          redirectTo: `${window.location.origin}/auth/callback`,
        };
        const { error } = await supabase.auth.signInWithOAuth({ provider, options: oauthOptions });
        if (error) throw error;
        return;
      }
      if (action === "signup") {
        if (password !== confirm) throw new Error("Passwords do not match.");
        if (!username.trim()) throw new Error("A display name is required.");
        setMessage({ type: "info", text: "Setting up your studio pass..." });
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              username: username.trim(),
              avatar_url: avatarUrl || undefined,
              newsletter_opt_in: newsletter,
            },
          },
        });
        if (error) throw error;
        if (data.user?.identities?.length === 0) throw new Error("Email already registered.");
        if (data.session && data.user) {
          const { error: profileError } = await supabase.from("profiles").upsert({
            id: data.user.id,
            email,
            username: username.trim(),
            avatar_url: avatarUrl || null,
            newsletter_opt_in: newsletter,
          });
          if (profileError) throw new Error(profileError.message);
          onUserChange(data.user);
          onClose();
          setView("landing");
          resetForm();
        } else {
          setMessage({ type: "success", text: "Check your inbox to confirm your account." });
        }
      } else if (action === "login") {
        if (!email || !password) throw new Error("Email and password required.");
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        if (data.session) {
          onUserChange(data.user);
          onClose();
          setView("landing");
          resetForm();
        }
      } else if (action === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/?reset=true`,
        });
        if (error) throw error;
        setMessage({ type: "success", text: "Password reset link sent." });
      } else if (action === "update_password") {
        if (password !== confirm) throw new Error("Passwords do not match.");
        if (password.length < 6) throw new Error("Password must be at least 6 characters.");
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        setMessage({ type: "success_action", text: "Password updated." });
        setPassword("");
        setConfirm("");
      }
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Auth failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleOnboarding = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !username.trim()) return;
    setLoading(true);
    const supabase = createClient();
    try {
      await supabase.auth.updateUser({
        data: { username: username.trim(), newsletter_opt_in: newsletter },
      });
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        email: user.email,
        username: username.trim(),
        avatar_url: avatarUrl || user.user_metadata?.avatar_url || null,
        newsletter_opt_in: newsletter,
      });
      if (error) throw error;
      setView("landing");
      onClose();
      resetForm();
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Save failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await createClient().auth.signOut();
    onUserChange(null);
    onClose();
    setView("landing");
    resetForm();
  };

  const show = open || (view === "onboarding" && !!user);
  if (!show) return null;

  const input =
    "w-full bg-[#0a0a0c] border-2 border-[#2a2a30] focus:border-[#b64bff] text-white px-4 py-3 font-black tracking-widest uppercase text-xs outline-none";
  const btn =
    "w-full bg-[#b64bff] text-black border-2 border-[#b64bff] px-6 py-3 font-black uppercase tracking-widest text-xs hover:bg-[#c96bff] disabled:opacity-50 skew-cta";
  const btnGhost =
    "w-full bg-transparent text-white border-2 border-[#2a2a30] px-6 py-3 font-black uppercase tracking-widest text-xs hover:border-[#b64bff] skew-cta";

  return (
    <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md border-2 border-[#b64bff] bg-[#0a0a0c] p-8 shadow-[0_0_40px_rgba(182,75,255,0.35)]">
        {view !== "onboarding" && (
          <button
            type="button"
            onClick={() => {
              onClose();
              setView("landing");
              setMessage({ type: "", text: "" });
            }}
            className="absolute top-4 right-4 text-[#22d3ee] font-black text-xs tracking-widest uppercase"
          >
            Close
          </button>
        )}

        {message.text && message.type !== "success_action" && (
          <p
            className={`mb-4 text-center text-xs font-bold uppercase tracking-widest ${
              message.type === "error" ? "text-red-400" : "text-[#22d3ee]"
            }`}
          >
            {message.text}
          </p>
        )}

        {message.type === "success_action" && (
          <div className="text-center py-4">
            <h2 className="text-2xl font-black uppercase ink-text text-[#b64bff] mb-3">Done.</h2>
            <p className="text-sm text-gray-400 mb-6">{message.text}</p>
            <button
              type="button"
              className={btn}
              onClick={() => {
                onClose();
                setView("landing");
                setMessage({ type: "", text: "" });
              }}
            >
              <span>Acknowledge</span>
            </button>
          </div>
        )}

        {view === "landing" && message.type !== "success_action" && (
          <div className="text-center">
            <p className="text-[#22d3ee] font-black tracking-[0.4em] text-[10px] mb-3 uppercase">BasicHiro // Studio</p>
            <h2 className="text-3xl font-black uppercase ink-text text-white mb-3">
              {user ? "Welcome back" : "Join the Studio"}
            </h2>
            <p className="text-gray-400 text-sm mb-8">
              {user
                ? `Signed in as ${user.user_metadata?.username || user.email}`
                : "Create an account to save favorites and get first look at new work."}
            </p>
            {user ? (
              <button type="button" className={btnGhost} onClick={handleLogout}>
                <span>Sign Out</span>
              </button>
            ) : (
              <>
                <button type="button" className={`${btn} mb-3`} onClick={() => setView("login")}>
                  <span>Log In</span>
                </button>
                <button type="button" className={btnGhost} onClick={() => setView("signup")}>
                  <span>Create Account</span>
                </button>
              </>
            )}
          </div>
        )}

        {view === "login" && message.type !== "success_action" && (
          <div>
            <h2 className="text-2xl font-black uppercase ink-text text-center text-white mb-6">Log In</h2>
            <div className="space-y-3 mb-3">
              <input type="email" placeholder="EMAIL..." value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
              <input type="password" placeholder="PASSWORD..." value={password} onChange={(e) => setPassword(e.target.value)} className={input} />
            </div>
            <button type="button" className="text-[10px] font-black uppercase tracking-widest text-[#22d3ee] mb-4" onClick={() => setView("forgot")}>
              Forgot password?
            </button>
            <button type="button" disabled={loading} className={`${btn} mb-4`} onClick={() => handleAuth("login")}>
              <span>{loading ? "..." : "Login"}</span>
            </button>
            <OAuthRow onGoogle={() => handleAuth("login", "google")} onDiscord={() => handleAuth("login", "discord")} />
          </div>
        )}

        {view === "signup" && message.type !== "success_action" && (
          <div className="max-h-[75vh] overflow-y-auto">
            <h2 className="text-2xl font-black uppercase ink-text text-center text-white mb-6">Create Account</h2>
            <div className="space-y-3 mb-3">
              <input type="text" placeholder="DISPLAY NAME *" maxLength={32} value={username} onChange={(e) => setUsername(e.target.value)} className={input} />
              <input type="url" placeholder="AVATAR URL (OPTIONAL)" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} className={input} />
              <input type="email" placeholder="EMAIL..." value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
              <input type="password" placeholder="PASSWORD..." value={password} onChange={(e) => setPassword(e.target.value)} className={input} />
              <input type="password" placeholder="CONFIRM..." value={confirm} onChange={(e) => setConfirm(e.target.value)} className={input} />
            </div>
            <label className="flex gap-2 items-start mb-4 text-[10px] font-bold uppercase tracking-widest text-gray-500">
              <input type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)} className="mt-0.5 accent-[#b64bff]" />
              Also join the newsletter (optional)
            </label>
            <button type="button" disabled={loading} className={`${btn} mb-4`} onClick={() => handleAuth("signup")}>
              <span>{loading ? "..." : "Create Account"}</span>
            </button>
            <OAuthRow onGoogle={() => handleAuth("signup", "google")} onDiscord={() => handleAuth("signup", "discord")} />
          </div>
        )}

        {view === "forgot" && message.type !== "success_action" && (
          <div>
            <h2 className="text-2xl font-black uppercase ink-text text-center text-white mb-6">Recover Access</h2>
            <input type="email" placeholder="EMAIL..." value={email} onChange={(e) => setEmail(e.target.value)} className={`${input} mb-4`} />
            <button type="button" disabled={loading || !email} className={`${btn} mb-3`} onClick={() => handleAuth("reset")}>
              <span>Send</span>
            </button>
            <button type="button" className="w-full text-[10px] font-black uppercase tracking-widest text-gray-500" onClick={() => setView("login")}>
              Back
            </button>
          </div>
        )}

        {view === "update_password" && message.type !== "success_action" && (
          <div>
            <h2 className="text-2xl font-black uppercase ink-text text-center text-white mb-6">New Password</h2>
            <input type="password" placeholder="NEW PASSWORD..." value={password} onChange={(e) => setPassword(e.target.value)} className={`${input} mb-3`} />
            <input type="password" placeholder="CONFIRM..." value={confirm} onChange={(e) => setConfirm(e.target.value)} className={`${input} mb-4`} />
            <button type="button" disabled={loading} className={btn} onClick={() => handleAuth("update_password")}>
              <span>Save</span>
            </button>
          </div>
        )}

        {view === "onboarding" && user && (
          <form onSubmit={handleOnboarding}>
            <h2 className="text-2xl font-black uppercase ink-text text-center text-white mb-6">Name Yourself</h2>
            <input type="text" required maxLength={32} value={username} onChange={(e) => setUsername(e.target.value)} className={`${input} mb-4`} placeholder="DISPLAY NAME" />
            <button type="submit" disabled={loading || !username.trim()} className={btn}>
              <span>{loading ? "..." : "Enter the Studio"}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function OAuthRow({ onGoogle, onDiscord }: { onGoogle: () => void; onDiscord: () => void }) {
  return (
    <div className="flex gap-3">
      <button type="button" onClick={onGoogle} className="flex-1 border-2 border-[#2a2a30] py-3 font-black text-[10px] uppercase tracking-widest text-white hover:border-[#b64bff]">
        Google
      </button>
      <button type="button" onClick={onDiscord} className="flex-1 border-2 border-[#2a2a30] py-3 font-black text-[10px] uppercase tracking-widest text-white hover:border-[#5865F2]">
        Discord
      </button>
    </div>
  );
}

export function NexusAuthTrigger({ user, onOpen }: { user: User | null; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="font-black tracking-widest text-[10px] md:text-xs uppercase text-[#22d3ee] border border-[#b64bff] px-3 py-1.5 hover:bg-[#b64bff]/20 transition-colors"
    >
      {user ? user.user_metadata?.username || "Account" : "Account"}
    </button>
  );
}
