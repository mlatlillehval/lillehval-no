"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BookingModal from "./BookingModal";
import BrandLogo from "./BrandLogo";
import NorwayFlagMay17, { useShowNorwayFlagMay17 } from "./NorwayFlagMay17";

const navLinks = [
  { label: "Produkter og tjenester", href: "/ai-tjenester" },
  { label: "AI Forklart", href: "/ai-forklart" },
  { label: "AI aktualitet", href: "/siste-nyheter" },
  { label: "Prosjekter", href: "/pagaende-prosjekter" },
  { label: "Om oss", href: "/hvorfor-oss" },
  { label: "Sommerjobb & AI-partner", href: "/sommervikar" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const showMay17Flag = useShowNorwayFlagMay17();
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
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pt-[env(safe-area-inset-top,0px)]"
        style={{
          background: scrolled
            ? "rgba(235, 229, 214, 0.97)"
            : "#e8e2d4",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: "2px solid rgba(34, 139, 70, 0.35)",
        }}
      >
        <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-0 px-6">

          {/* Logo — alltid til forsiden */}
          <Link
            href="/"
            className="flex min-w-0 shrink-0 items-center gap-2 group"
            onClick={(e) => {
              setMenuOpen(false);
              if (typeof window !== "undefined" && window.location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <BrandLogo
              kind="wordmarkJourneyInline"
              surface="transparent"
              alt="Lillehval – AI-reisen starter her"
              width={480}
              height={80}
              fetchPriority="high"
              decoding="async"
              className="h-7 w-auto max-w-[180px] object-contain object-left sm:h-6 sm:max-w-[185px] md:max-w-[min(100%,240px)]"
            />
            {showMay17Flag ? <NorwayFlagMay17 /> : null}
          </Link>

          {/* CTA + Nav + Mobile menu */}
          <div className="ml-auto flex items-center gap-3">
            {/* Desktop nav links */}
            <nav className="hidden items-center gap-1 lg:flex">
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
            <Link
              href="/ai-beredskap"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap border-2"
              style={{
                background: "#0a2e1a",
                color: "#E1F5EE",
                borderColor: "rgba(225, 245, 238, 0.35)",
                boxShadow: "0 2px 12px rgba(10, 46, 26, 0.35)",
              }}
            >
              Test hvor AI klar du er
            </Link>
            <button
              onClick={() => setModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95 whitespace-nowrap"
              style={{
                background: "#f59e0b",
                color: "#052016",
                boxShadow: "0 2px 16px rgba(245, 158, 11, 0.45)",
              }}
            >
              Book et møte
            </button>

            {/* Hamburger (mobil / tablet under lg) — min. 44×44 px trykkflate */}
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="lg:hidden inline-flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-[#15803d] focus-visible:ring-offset-2"
              aria-label={menuOpen ? "Lukk meny" : "Åpne meny"}
              aria-expanded={menuOpen}
              aria-controls="site-nav-mobile"
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
            id="site-nav-mobile"
            className="lg:hidden px-6 pt-2 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] flex flex-col gap-1"
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
            <Link
              href="/ai-beredskap"
              onClick={() => setMenuOpen(false)}
              className="mt-2 px-5 py-3 rounded-full text-sm font-bold text-center"
              style={{ background: "#0a2e1a", color: "#E1F5EE" }}
            >
              Test hvor AI klar du er
            </Link>
            <button
              onClick={() => { setMenuOpen(false); setModalOpen(true); }}
              className="mt-1 px-5 py-3 rounded-full text-sm font-bold"
              style={{ background: "#f59e0b", color: "#052016" }}
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
