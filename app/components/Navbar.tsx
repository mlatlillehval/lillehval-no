"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BookingModal from "./BookingModal";

const navLinks = [
  { label: "AI utviklingen", href: "/ai-utviklingen" },
  { label: "AI tjenester", href: "/ai-tjenester" },
  { label: "AI metodikk", href: "/ai-metodikk" },
  { label: "Siste AI nyheter", href: "/siste-nyheter" },
  { label: "Pågående prosjekter", href: "#pagaende-prosjekter" },
  { label: "Hvorfor oss?", href: "/hvorfor-oss" },
];

function WhaleLogo() {
  return (
    <div style={{ width: 88, height: 88, position: "relative" }}>
      <Image
        src="/logo-whale-transparent.png"
        alt="Lillehval logo"
        fill
        className="object-contain"
        sizes="88px"
        priority
      />
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/")) {
      router.push(href);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(235, 229, 214, 0.97)"
            : "#e8e2d4",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: "2px solid rgba(34, 139, 70, 0.35)",
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
              <span className="text-lg font-extrabold tracking-tight" style={{ color: "#15803d" }}>Lillehval</span>
              <span className="text-xs font-normal" style={{ color: "rgba(26,51,32,0.4)" }}>–</span>
              <span className="text-xs font-normal" style={{ color: "#1a3320" }}>AI-reisen starter her</span>
            </span>
          </a>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150 whitespace-nowrap"
                style={{ color: "#1a3320" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#15803d";
                  (e.currentTarget as HTMLElement).style.background = "rgba(34,139,70,0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#1a3320";
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
                  style={{ background: "rgba(34,139,70,0.5)" }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div
            className="lg:hidden px-6 pb-5 pt-2 flex flex-col gap-1"
            style={{ background: "#e8e2d4", borderTop: "1px solid rgba(34,139,70,0.2)" }}
          >
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left px-3 py-2.5 rounded-lg text-sm font-medium"
                style={{ color: "#1a3320" }}
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
