"use client";

import { useState } from "react";
import BookingModal from "./BookingModal";

export default function KontaktBookCta() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-200 hover:scale-105 active:scale-95"
        style={{
          background: "#f59e0b",
          color: "#052016",
          boxShadow: "0 2px 16px rgba(245, 158, 11, 0.45)",
        }}
      >
        Book 30 minutter gratis
      </button>
      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
