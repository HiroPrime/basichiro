"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong.");
        return;
      }

      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMessage("Could not reach the server. Check your connection.");
    }
  };

  return (
    <div className={compact ? "w-full max-w-md mx-auto" : "w-full max-w-xl mx-auto"}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
        <input
          type="email"
          placeholder="ENTER YOUR EMAIL..."
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading" || status === "success"}
          className="w-full bg-[#0a0a0c] border-2 border-[#2a2a30] focus:border-[#b64bff] text-white px-6 py-4 rounded-sm font-black tracking-widest uppercase text-xs md:text-sm outline-none transition-colors disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-3 bg-[#b64bff] text-black border-2 border-[#b64bff] px-8 py-4 rounded-sm font-black uppercase tracking-widest text-xs md:text-sm hover:bg-[#c96bff] transition-all skew-cta disabled:opacity-50 disabled:hover:bg-[#b64bff] disabled:cursor-not-allowed"
        >
          <div className="flex items-center gap-2">
            {status === "loading" ? (
              "Sending..."
            ) : status === "success" ? (
              "You're in"
            ) : (
              <>
                <Sparkles size={16} /> Notify Me
              </>
            )}
          </div>
        </button>
      </form>

      {status === "success" && (
        <p className="text-[#22d3ee] font-black tracking-widest uppercase mt-4 text-sm text-center">
          You&apos;re on the list. New work lands in your inbox first.
        </p>
      )}
      {status === "error" && (
        <p className="text-red-500 font-bold mt-4 text-xs uppercase text-center">{errorMessage}</p>
      )}
    </div>
  );
}
