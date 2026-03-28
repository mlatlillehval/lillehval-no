"use client";

import { useState } from "react";

const TIME_SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday = 0
}

const MONTH_NAMES = [
  "Januar", "Februar", "Mars", "April", "Mai", "Juni",
  "Juli", "August", "September", "Oktober", "November", "Desember",
];

const DAY_NAMES = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"];

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const today = new Date();
  const [step, setStep] = useState<1 | 2>(1);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({
    company: "",
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return d < t;
  };

  const isWeekend = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    return d.getDay() === 0 || d.getDay() === 6;
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getFullYear() === viewYear &&
      selectedDate.getMonth() === viewMonth &&
      selectedDate.getDate() === day
    );
  };

  const isToday = (day: number) => {
    return (
      today.getFullYear() === viewYear &&
      today.getMonth() === viewMonth &&
      today.getDate() === day
    );
  };

  const handleDayClick = (day: number) => {
    if (isPast(day) || isWeekend(day)) return;
    setSelectedDate(new Date(viewYear, viewMonth, day));
    setSelectedTime(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedTime(null);
    setForm({ company: "", firstName: "", lastName: "", email: "", message: "" });
    setSubmitted(false);
    onClose();
  };

  const canProceed = selectedDate !== null && selectedTime !== null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(15, 23, 42, 0.7)", backdropFilter: "blur(6px)" }}
      onClick={(e) => { if (e.target === e.currentTarget) resetAndClose(); }}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        {/* Header */}
        <div
          className="px-7 py-5 flex items-center justify-between"
          style={{ background: "linear-gradient(135deg, #0a2e1a 0%, #15803d 100%)" }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-green-200 mb-0.5">
              {step === 1 ? "Steg 1 av 2" : "Steg 2 av 2"}
            </p>
            <h2 className="text-xl font-extrabold text-white">
              {submitted ? "Møte booket!" : step === 1 ? "Velg dato og tid" : "Dine opplysninger"}
            </h2>
          </div>
          <button
            onClick={resetAndClose}
            className="w-9 h-9 flex items-center justify-center rounded-full transition-colors"
            style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress bar */}
        {!submitted && (
          <div className="h-1 bg-green-900/30">
            <div
              className="h-1 bg-green-500 transition-all duration-300"
              style={{ width: step === 1 ? "50%" : "100%" }}
            />
          </div>
        )}

        <div className="px-7 py-6">
          {/* SUCCESS */}
          {submitted && (
            <div className="flex flex-col items-center text-center py-6 gap-4">
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #22c55e, #15803d)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-xl font-extrabold text-gray-900">Takk, {form.firstName}!</h3>
              <p className="text-gray-500 max-w-xs">
                Vi har mottatt din booking for{" "}
                <strong className="text-gray-700">
                  {selectedDate?.toLocaleDateString("nb-NO", { weekday: "long", day: "numeric", month: "long" })} kl. {selectedTime}
                </strong>.
                Du vil snart motta en bekreftelse på <strong className="text-gray-700">{form.email}</strong>.
              </p>
              <button
                onClick={resetAndClose}
                className="mt-2 px-6 py-3 rounded-full font-bold text-white transition-all hover:scale-105"
                style={{ background: "linear-gradient(135deg, #22c55e, #15803d)" }}
              >
                Lukk
              </button>
            </div>
          )}

          {/* STEP 1 — Calendar + time */}
          {!submitted && step === 1 && (
            <div className="flex flex-col gap-6">
              {/* Calendar */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                  <span className="text-base font-bold text-gray-800">
                    {MONTH_NAMES[viewMonth]} {viewYear}
                  </span>
                  <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                </div>

                {/* Day headers */}
                <div className="grid grid-cols-7 mb-1">
                  {DAY_NAMES.map((d) => (
                    <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Day cells */}
                <div className="grid grid-cols-7 gap-0.5">
                  {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const disabled = isPast(day) || isWeekend(day);
                    const selected = isSelected(day);
                    const todayCell = isToday(day);
                    return (
                      <button
                        key={day}
                        disabled={disabled}
                        onClick={() => handleDayClick(day)}
                        className="aspect-square w-full flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-150"
                        style={{
                          background: selected
                            ? "linear-gradient(135deg, #22c55e, #15803d)"
                            : "transparent",
                          color: selected
                            ? "white"
                            : disabled
                            ? "#d1d5db"
                            : todayCell
                            ? "#22c55e"
                            : "#374151",
                          fontWeight: todayCell ? "800" : undefined,
                          cursor: disabled ? "not-allowed" : "pointer",
                        }}
                        onMouseEnter={(e) => {
                          if (!disabled && !selected)
                            (e.currentTarget as HTMLElement).style.background = "#0d3520";
                        }}
                        onMouseLeave={(e) => {
                          if (!disabled && !selected)
                            (e.currentTarget as HTMLElement).style.background = "transparent";
                        }}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time slots */}
              {selectedDate && (
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-3">
                    Velg tidspunkt —{" "}
                    <span className="text-green-400">
                      {selectedDate.toLocaleDateString("nb-NO", { weekday: "long", day: "numeric", month: "long" })}
                    </span>
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {TIME_SLOTS.map((t) => (
                      <button
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className="py-2 rounded-xl text-sm font-semibold border transition-all duration-150"
                        style={{
                          background: selectedTime === t ? "linear-gradient(135deg, #22c55e, #15803d)" : "white",
                          color: selectedTime === t ? "white" : "#374151",
                          borderColor: selectedTime === t ? "#22c55e" : "#e5e7eb",
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={() => setStep(2)}
                disabled={!canProceed}
                className="w-full py-3.5 rounded-full font-bold text-white transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02]"
                style={{ background: "linear-gradient(135deg, #22c55e, #15803d)" }}
              >
                Fortsett →
              </button>
            </div>
          )}

          {/* STEP 2 — Contact form */}
          {!submitted && step === 2 && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex items-center gap-2 p-3 rounded-xl mb-1"
                style={{ background: "#0d3520" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <span className="text-sm font-semibold text-green-300">
                  {selectedDate?.toLocaleDateString("nb-NO", { weekday: "long", day: "numeric", month: "long" })} kl. {selectedTime}
                </span>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Selskapsnavn *</label>
                <input
                  required
                  type="text"
                  placeholder="Acme AS"
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Fornavn *</label>
                  <input
                    required
                    type="text"
                    placeholder="Ola"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Etternavn *</label>
                  <input
                    required
                    type="text"
                    placeholder="Nordmann"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">E-postadresse *</label>
                <input
                  required
                  type="email"
                  placeholder="ola@acme.no"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">
                  Hvorfor ønsker dere et møte?{" "}
                  <span className="font-normal text-gray-400">(valgfritt)</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Beskriv kort hva dere ønsker å oppnå med AI..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition resize-none"
                />
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3.5 rounded-full font-bold border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all"
                >
                  ← Tilbake
                </button>
                <button
                  type="submit"
                  className="flex-[2] py-3.5 rounded-full font-bold text-white transition-all hover:scale-[1.02]"
                  style={{ background: "linear-gradient(135deg, #22c55e 0%, #15803d 100%)" }}
                >
                  Book møte
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
