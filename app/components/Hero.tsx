export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient background: deep blue → sky blue → warm white */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, #1a3a6b 0%, #2563eb 30%, #60a5fa 65%, #fef9f0 100%)",
        }}
      />

      {/* Subtle warm overlay at the bottom to blend into warm white */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 110%, rgba(251, 191, 36, 0.18) 0%, transparent 65%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl mx-auto">
        {/* Eyebrow badge */}
        <span
          className="inline-block mb-6 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide uppercase"
          style={{
            background: "rgba(255, 255, 255, 0.18)",
            color: "#fef3c7",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            backdropFilter: "blur(8px)",
          }}
        >
          AI-rådgivning for norske bedrifter
        </span>

        {/* Headline */}
        <h1
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6"
          style={{ color: "#ffffff", textShadow: "0 2px 20px rgba(0,0,0,0.18)" }}
        >
          AI er stort.{" "}
          <span style={{ color: "#fde68a" }}>AI er krevende.</span>
          <br />
          AI endrer seg hele tiden.
        </h1>

        {/* Subheadline */}
        <p
          className="text-xl sm:text-2xl font-medium mb-10 max-w-xl"
          style={{ color: "rgba(255,255,255,0.88)" }}
        >
          La oss hjelpe deg navigere det.
        </p>

        {/* CTA */}
        <a
          href="#kontakt"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-bold shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl active:scale-95"
          style={{
            background: "linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)",
            color: "#ffffff",
            boxShadow: "0 4px 24px rgba(234, 88, 12, 0.35)",
          }}
        >
          Book gratis møte
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>

        {/* Trust line */}
        <p
          className="mt-6 text-sm"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          Ingen forpliktelser. 30 minutter. Helt gratis.
        </p>
      </div>

      {/* Bottom fade into page background */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: "linear-gradient(to bottom, transparent, #fef9f0)",
        }}
      />
    </section>
  );
}
