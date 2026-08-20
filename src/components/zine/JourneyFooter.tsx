"use client";

import { useState } from "react";
import Image from "next/image";
import ScrollParallax from "./ScrollParallax";

export default function JourneyFooter() {
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
    <section className="relative px-4 pt-10 pb-20 text-center">
      <p className="zine-pixel-block text-lg sm:text-xl mb-6">Follow My Journey</p>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 flex items-stretch gap-2 max-w-[300px] mx-auto"
      >
        <input
          type="email"
          placeholder="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading" || status === "success"}
          className="zine-pixel-thin flex-1 min-w-0 rounded-full bg-black text-white placeholder-white/70 px-5 py-2 text-lg sm:text-xl outline-none disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className="zine-pixel-thin shrink-0 rounded-full bg-black text-white px-5 py-2 text-lg sm:text-xl hover:bg-black/80 transition-colors disabled:opacity-60"
        >
          {status === "loading" ? "..." : status === "success" ? "In!" : "submit"}
        </button>
      </form>

      {status === "success" && (
        <p className="text-[var(--zine-green)] zine-pixel-thin text-lg mt-3">
          You&apos;re on the list.
        </p>
      )}
      {status === "error" && (
        <p className="text-[var(--zine-pink)] zine-pixel-thin text-lg mt-3">{errorMessage}</p>
      )}

      <div className="zine-pixel-thin text-base sm:text-lg mt-6 flex items-center justify-center gap-3">
        <a
          href="https://x.com/basic_hiro"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--zine-pink)] transition-colors"
        >
          X
        </a>
        <span aria-hidden="true">|</span>
        <a
          href="https://www.patreon.com/c/basichiro"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--zine-pink)] transition-colors"
        >
          Patreon
        </a>
      </div>

      <p className="zine-pixel-thin text-sm text-black/60 mt-4">© BasicHiro</p>

          <ScrollParallax
            xRange={[45, -45]}
            yRange={[45, -45]}
            rotateRange={[-3, 3]}
            className="pointer-events-none absolute -right-10 sm:-right-16 -bottom-6 z-0 w-24 sm:w-28"
          >
        <Image
          src="/design/corner-planet.webp"
          alt=""
          width={700}
          height={1034}
          className="w-full h-auto"
        />
      </ScrollParallax>
    </section>
  );
}
