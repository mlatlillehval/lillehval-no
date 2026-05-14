"use client";

import { useState } from "react";
import BookingModal from "./BookingModal";

export default function CtaBand() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div
        className="relative z-10 isolate pl-[max(1.5rem,env(safe-area-inset-left,0px))] pr-[max(1.5rem,env(safe-area-inset-right,0px))] pt-16 pb-[calc(4rem+env(safe-area-inset-bottom,0px))] text-center"
        style={{
          background: "#e8e2d4",
          borderTop: "2px solid rgba(34,139,70,0.2)",
        }}
      >
        <div className="max-w-xl mx-auto flex flex-col items-center gap-6">
          <p
            className="text-2xl sm:text-3xl font-extrabold leading-snug tracking-tight"
            style={{ color: "#1a3320" }}
          >
            <span style={{ color: "#14532d" }}>Klar til å finne ut hva AI kan gjøre</span>
            <br />
            <span style={{ color: "#8AAD94" }}>for akkurat din bedrift?</span>
          </p>
          <p className="text-sm" style={{ color: "rgba(26,51,32,0.55)" }}>
            Ingen forpliktelser - Et åpent møte for å forstå mer
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-bold transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              background: "#f59e0b",
              color: "#052016",
              boxShadow: "0 4px 24px rgba(245,158,11,0.45)",
            }}
          >
            Book 30 minutter gratis
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
