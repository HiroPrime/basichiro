"use client";

import { useState } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { Menu, X } from "lucide-react";
import NexusAuthModal, { NexusAuthTrigger } from "./NexusAuthModal";

const LINKS = [
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/sites", label: "Sites" },
];

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [authOpen, setAuthOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/90 via-black/60 to-transparent pt-6 pb-10 px-6 md:px-8 flex justify-between items-center">
      <NexusAuthModal open={authOpen} onClose={() => setAuthOpen(false)} user={user} onUserChange={setUser} />

      <Link href="/" className="flex items-center gap-3 pointer-events-auto">
        <span className="font-black tracking-[0.35em] uppercase text-xs md:text-sm text-white border-l-2 border-[#b64bff] pl-3">
          Basic<span className="text-[#b64bff]">Hiro</span>
        </span>
      </Link>

      <nav className="hidden md:flex gap-8 font-black tracking-widest text-[10px] md:text-xs uppercase pointer-events-auto items-center">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="hover:text-[#22d3ee] transition-colors">
            {l.label}
          </Link>
        ))}
        <a
          href="https://grimmfracture.nexus"
          target="_blank"
          rel="noreferrer"
          className="hover:text-[#22d3ee] transition-colors"
        >
          Grimm Fracture ↗
        </a>
        <NexusAuthTrigger user={user} onOpen={() => setAuthOpen(true)} />
      </nav>

      <button
        type="button"
        className="md:hidden text-white pointer-events-auto"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        {menuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black border-t border-[#1a1a1e] flex flex-col p-6 gap-5 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="font-black tracking-widest text-xs uppercase text-white"
            >
              {l.label}
            </Link>
          ))}
          <a href="https://grimmfracture.nexus" target="_blank" rel="noreferrer" className="font-black tracking-widest text-xs uppercase text-white">
            Grimm Fracture ↗
          </a>
          <NexusAuthTrigger user={user} onOpen={() => setAuthOpen(true)} />
        </div>
      )}
    </header>
  );
}
