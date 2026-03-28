"use client";

import { useState, useEffect } from "react";
import BookingModal from "./BookingModal";

const navLinks = [
  { label: "AI utviklingen", href: "#ai-utviklingen" },
  { label: "AI tjenester", href: "#ai-tjenester" },
  { label: "AI metodikk", href: "#ai-metodikk" },
  { label: "Siste AI nyheter", href: "#siste-nyheter" },
  { label: "Hvorfor oss?", href: "#hvorfor-oss" },
];

function WhaleLogo() {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 100 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Water spout */}
      <path
        d="M38 18 Q40 6 42 14 Q44 4 46 14"
        stroke="#4ade80"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Body */}
      <path
        d="M15 38 Q22 20 45 22 Q68 22 80 36 Q70 50 45 50 Q22 50 15 38Z"
        fill="#22c55e"
      />
      {/* Belly highlight */}
      <path
        d="M20 40 Q35 48 58 46 Q70 44 78 38 Q72 48 50 50 Q28 52 20 40Z"
        fill="#16a34a"
        opacity="0.5"
      />
      {/* Tail fluke */}
      <path
        d="M78 36 Q90 24 94 30 Q90 36 94 42 Q88 46 78 36Z"
        fill="#22c55e"
      />
      {/* Pectoral fin */}
      <path
        d="M35 46 Q30 58 42 56 Q44 50 40 46Z"
        fill="#16a34a"
      />
      {/* Eye */}
      <circle cx="33" cy="34" r="3.5" fill="#0a2e1a" />
      <circle cx="32" cy="33" r="1.2" fill="white" />
    </svg>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(10, 46, 26, 0.97)"
            : "#0a2e1a",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(74, 222, 128, 0.12)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-6">

          {/* Logo */}
          <a
            href="#"
            className="flex items-center gap-2.5 flex-shrink-0 group"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          >
            <WhaleLogo />
            <span className="whitespace-nowrap flex items-baseline gap-1.5">
              <span className="text-lg font-extrabold tracking-tight" style={{ color: "#4ade80" }}>Lillehval</span>
              <span className="text-xs font-normal" style={{ color: "rgba(255,255,255,0.5)" }}>–</span>
              <span className="text-xs font-normal" style={{ color: "#ffffff" }}>Vi gjør dere ai-klare</span>
            </span>
          </a>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap"
                style={{ color: "rgba(255,255,255,0.8)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#4ade80";
                  (e.currentTarget as HTMLElement).style.background = "rgba(74,222,128,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)";
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
              style={{
                background: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)",
                color: "#ffffff",
                boxShadow: "0 2px 16px rgba(34,197,94,0.35)",
              }}
            >
              Book et møte
            </button>

            {/* Hamburger (mobile) */}
            <button
              onClick={() => setMenuOpen((o) => !o)}
              className="lg:hidden flex flex-col gap-1.5 p-2"
              aria-label="Meny"
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="block h-0.5 w-6 rounded transition-all"
                  style={{ background: "#4ade80" }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div
            className="lg:hidden px-6 pb-5 pt-2 flex flex-col gap-1"
            style={{ background: "#0a2e1a", borderTop: "1px solid rgba(74,222,128,0.12)" }}
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left px-3 py-2.5 rounded-lg text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { setMenuOpen(false); setModalOpen(true); }}
              className="mt-2 px-5 py-3 rounded-full text-sm font-bold text-white"
              style={{ background: "linear-gradient(135deg, #22c55e, #15803d)" }}
            >
              Book et møte
            </button>
          </div>
        )}
      </header>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
