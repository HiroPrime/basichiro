"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Menu, X } from "lucide-react";

const LINKS = [
  { href: "/gallery", label: "Gallery" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/sites", label: "Sites" },
];

const PATREON_URL = "https://www.patreon.com/c/basichiro";

function PatreonButton() {
  return (
    <a
      href={PATREON_URL}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-1.5 font-black tracking-widest text-[10px] md:text-xs uppercase text-[#22d3ee] border border-[#b64bff] px-3 py-1.5 hover:bg-[#b64bff]/20 transition-colors"
    >
      <Heart size={12} className="fill-current" />
      Patreon
    </a>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black/90 via-black/60 to-transparent pt-6 pb-10 px-6 md:px-8 flex justify-between items-center">
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
        <PatreonButton />
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
          <PatreonButton />
        </div>
      )}
    </header>
  );
}
