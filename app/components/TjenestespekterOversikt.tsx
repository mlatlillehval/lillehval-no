import Image from "next/image";
import Link from "next/link";

/** Brukes til Next/Image `sizes` for ytterkolonner (ca. 1/6 av layoutbredden). */
const OUTER_COL_IMAGE_SIZES = "(max-width: 900px) 45vw, 17vw";

/* ─────────────── Data ─────────────── */

const leftCol = {
  image: "/service-kartlegging-akvarell.png",
  imageAlt: "Akvarell: kompass og kart for AI-strategi",
  title: "AI-kartlegging og strategi",
  href: "/ai-tjenester/kartlegging",
  desc: "Forstå hvor AI er nå, målrettet kartlegging inkluderer prioritering og ROI-estimering av brukscase per team.",
  includes: [
    "AI-modenhetsvurdering",
    "Prioritert shortlist (2–5 case)",
    "ROI-estimat per bruksområde",
    "AI-veikart (6–18 mnd)",
  ],
  outcomes: [
    "Vite nøyaktig hva AI gir verdi",
    "Klar prioriteringsliste til neste steg",
    "Internt eierskap og forankring",
    "Klar til ekstern implementering",
  ],
};

const midGroup = {
  title: "AI-prosessautomatisering",
  desc: "Automatiser eksisterende prosesser med målbare effekter",
  subCols: [
    {
      id: "assistent",
      showPlusOne: true,
      href: "/ai-tjenester/assistent",
      concept: { label: "Din egen", badge: "+1" },
      bar: { bg: "#4ade80", fg: "#052e16", label: "Skreddersydd løsning" },
      title: "AI-assistent",
      desc: "Sett opp en assistent tilpasset én rolle — systeminstrukser, integrasjoner og opplæring skreddersydd til hverdagen.",
      includes: [
        "AI modell - oppsett og systeminstrukser",
        "Tilkoblinger til datakilder (MCP)",
        "Skills, plugins og arbeidsflyt",
        "Opplæring og bruksveiledning",
      ],
      outcomes: [
        "+1 til hvert teammedlem",
        "Konsistent kvalitet på tvers",
        "Klar på 1–3 uker",
        "Ingen teknisk bakgrunn nødvendig",
      ],
    },
    {
      id: "agenter",
      showPlusOne: true,
      href: "/ai-tjenester/agenter",
      concept: { label: "Din egen", badge: "Agent1" },
      bar: { bg: "#4ade80", fg: "#052e16", label: "Skreddersydd løsning" },
      title: "AI-agenter",
      desc: "AI som planlegger og utfører oppgaver over tid — bruker verktøy, koordinerer mellom agenter og fullfører prosesser uten tilsyn.",
      includes: [
        "Agent-design og oppgaveflyt",
        "Integrasjon mot systemer og data",
        "Agentkoordinering og orkestrering",
        "Driftsoppsett og vedlikehold",
      ],
      outcomes: [
        "Autonome prosesser uten tilsyn",
        "Kortere behandlingstid",
        "Skaler uten mer bemanning",
        "Driftsikker, orkestrert flyt",
      ],
    },
    {
      id: "applikasjon",
      showPlusOne: true,
      href: "/ai-tjenester/applikasjon",
      concept: { label: "Sydd for din bedrift", badge: "Skredder" },
      bar: { bg: "#4ade80", fg: "#052e16", label: "Skreddersydd løsning" },
      title: "AI-applikasjon",
      desc: "Direkte AI-integrasjon i eksisterende produkt eller system — full kontroll over data, grensesnitt og brukeropplevelse.",
      includes: [
        "Systemdesign og arkitektur",
        "Utvikling og API-integrasjon",
        "Sikkerhet og tilgangsstyring",
        "Testing og lansering",
      ],
      outcomes: [
        "AI i kjernen av produktet",
        "Skreddersydd UX",
        "Lavere leverandøravhengighet",
      ],
    },
    {
      id: "egenutviklet",
      showPlusOne: true,
      href: "/ai-tjenester/egenutviklet",
      concept: { label: "Din egen", badge: "+1" },
      bar: { bg: "#f59e0b", fg: "#fff", label: "Standard løsning" },
      title: "AI-applikasjon (egenutviklet)",
      desc: "Nyutvikling av en komplett AI-løsning — fra arkitektur og modellvalg til ferdig produkt i drift.",
      includes: [
        "Fullstack utvikling og AI-kjerne",
        "Datasett, finjustering og konfigurasjon",
        "Sikkerhet, policy og compliance",
        "Lansering og videreutvikling",
      ],
      outcomes: [
        "Komplett, skalerbart AI-produkt",
        "Full kontroll over data og kode",
        "Skreddersydd til eksakte behov",
      ],
    },
  ],
};

const rightCol = {
  image: "/service-opplaering-akvarell.png",
  imageAlt: "Akvarell: team i opplæring rundt laptop",
  title: "AI-opplæring og erfaring",
  href: "/ai-tjenester/opplaering",
  desc: "Bygg intern kompetanse som holder — gjennom skreddersydde workshops, hands-on trening, metodikk og prompt engineering.",
  includes: [
    "Skreddersydde workshops og kurs",
    "Gjennomgang av verktøy og metodikk",
    "Prompt engineering og beste praksis",
    "Løpende veiledning og erfaringsdeling",
  ],
  outcomes: [
    "Tryggere og mer selvstendig team",
    "Høyere nyttegrense i AI-verktøy",
    "Spre kompetanse internt og jevnt",
    "Lavere terskel for å teste og forbedre",
  ],
};

/* ─────────────── Sub-components ─────────────── */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: "0.085em",
        textTransform: "uppercase",
        color: "#9ca3af",
        margin: 0,
        marginBottom: 6,
      }}
    >
      {children}
    </p>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
      {items.map((item) => (
        <li key={item} style={{ display: "flex", gap: 5, alignItems: "flex-start" }}>
          <span style={{ color: "#16a34a", fontWeight: 700, fontSize: 10, marginTop: 1, flexShrink: 0 }}>✓</span>
          <span
            style={{
              fontSize: 11,
              lineHeight: 1.45,
              color: "#374151",
              flex: 1,
              minWidth: 0,
              overflowWrap: "break-word",
            }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Footer for klikkbare kolonner — ikke egen lenke (unngår nøstede koblinger) */
function ReadMoreFooter() {
  return (
    <div style={{ borderTop: "1px solid #e5e7eb", marginTop: "auto", paddingTop: 8 }}>
      <span
        className="transition-colors group-hover:text-[#166534]"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          fontSize: 11,
          fontWeight: 700,
          color: "#15803d",
        }}
      >
        Trykk her for å lese mer
        <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </div>
  );
}

function ArrowList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
      {items.map((item) => (
        <li key={item} style={{ display: "flex", gap: 5, alignItems: "flex-start" }}>
          <span style={{ color: "#16a34a", fontSize: 11, marginTop: 1, flexShrink: 0 }}>→</span>
          <span
            style={{
              fontSize: 11,
              lineHeight: 1.45,
              color: "#374151",
              flex: 1,
              minWidth: 0,
              overflowWrap: "break-word",
            }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

/* ─────────────── Outer column (left / right) ─────────────── */

const columnLinkClass =
  "group relative flex min-h-0 min-w-0 flex-col bg-white text-left outline-none cursor-pointer transition-all duration-200 ease-out " +
  "hover:z-[2] hover:-translate-y-0.5 hover:bg-[#fafdfb] hover:shadow-[0_12px_36px_rgba(21,128,61,0.12)] hover:ring-2 hover:ring-[#15803d]/20 " +
  "focus-visible:z-[2] focus-visible:ring-2 focus-visible:ring-[#15803d] focus-visible:ring-offset-2";

function OuterCol({
  image,
  imageAlt,
  title,
  desc,
  includes,
  outcomes,
  href,
  borderRight,
}: typeof leftCol & { borderRight?: boolean }) {
  return (
    <Link
      href={href}
      className={columnLinkClass}
      aria-label={`Les mer om ${title}`}
      style={{
        width: "100%",
        minWidth: 0,
        borderRight: borderRight ? "1px solid #e5e7eb" : undefined,
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", width: "100%", height: 140, flexShrink: 0, overflow: "hidden" }}>
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover object-center"
          sizes={OUTER_COL_IMAGE_SIZES}
        />
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          padding: "10px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 0,
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <div style={{ minHeight: 110, flexShrink: 0 }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: "#111827", margin: 0, marginBottom: 5, lineHeight: 1.35 }}>
            {title}
          </p>
          <p style={{ fontSize: 11, color: "rgba(55,65,81,0.85)", margin: 0, lineHeight: 1.5 }}>
            {desc}
          </p>
        </div>

        <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 8, marginBottom: 10 }}>
          <SectionLabel>Utvalgte leveranser inkluderer</SectionLabel>
          <CheckList items={includes} />
        </div>

        <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 8 }}>
          <SectionLabel>Forventet effekt</SectionLabel>
          <ArrowList items={outcomes} />
        </div>

        <ReadMoreFooter />

      </div>
    </Link>
  );
}

/* ─────────────── Main component ─────────────── */

export default function TjenestespekterOversikt() {
  return (
    <section
      style={{ background: "#f9f7f2", padding: "48px 0" }}
      aria-label="Tjenestespekteret vårt"
    >
      <div style={{ maxWidth: 1600, margin: "0 auto", padding: "0 24px" }}>

        {/* ── Header ── */}
        <div style={{ marginBottom: 28 }}>
          <p
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#15803d",
              marginBottom: 8,
            }}
          >
            Tjenestespekteret
          </p>
          <h2
            style={{
              fontSize: "clamp(1.35rem, 2.2vw, 1.85rem)",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
              color: "#1a3320",
              margin: 0,
              marginBottom: 6,
            }}
          >
            Tjenestespekteret vårt dekker hele løpet —
            <br />
            <span style={{ color: "#15803d" }}>fra AI-behovskartlegging og prioritering til AI-prosessautomatisering i drift, inkludert opplæring og kursing</span>
          </h2>
          <p style={{ fontSize: 13, color: "rgba(26,51,32,0.55)", margin: 0 }}>
            Fokus på skreddersydde løsninger, men også mulighet for standardprodukt avhengig av behov og modenhet.
          </p>
        </div>

        {/* ── Table: 1fr + 4fr + 1fr → hver ytterkolonne = én midt-underkolonne (1/6 hver); skalerer uten fast min-bredde ── */}
        <div style={{ overflowX: "auto", marginLeft: -24, marginRight: -24, paddingLeft: 24, paddingRight: 24 }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr) minmax(0, 4fr) minmax(0, 1fr)",
              width: "100%",
              minWidth: 0,
              border: "1px solid #d1d5db",
              borderRadius: 4,
              background: "#fff",
            }}
          >

            {/* LEFT — AI-kartlegging og strategi */}
            <OuterCol {...leftCol} borderRight />

            {/* MIDDLE — AI-prosessautomatisering group */}
            <div
              style={{
                minWidth: 0,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                borderRight: "1px solid #e5e7eb",
              }}
            >
              {/* Group header */}
              <div
                style={{
                  borderBottom: "1px solid #e5e7eb",
                  background: "#f9fafb",
                  flexShrink: 0,
                  overflow: "hidden",
                }}
              >
                {/* Watercolor illustration spanning full group width */}
                <div style={{ position: "relative", width: "100%", height: 110, overflow: "hidden" }}>
                  <Image
                    src="/service-prosessautomasjon-akvarell.png"
                    alt="Akvarell: AI-prosessautomatisering"
                    fill
                    className="object-cover object-center"
                    sizes="800px"
                  />
                </div>

                {/* Title + desc below image */}
                <div style={{ padding: "8px 14px 9px", borderTop: "1px solid #e5e7eb" }}>
                  <p
                    style={{
                      fontSize: 11,
                      fontWeight: 800,
                      color: "#111827",
                      margin: 0,
                      marginBottom: 2,
                      lineHeight: 1.3,
                    }}
                  >
                    {midGroup.title}
                  </p>
                  <p
                    style={{
                      fontSize: 11,
                      color: "rgba(55,65,81,0.7)",
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    {midGroup.desc}
                  </p>
                </div>
              </div>

              {/* Fire like brede kolonner — samme brøk som venstre/høyre (1/6 av total tabellbredde hver) */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                  flex: 1,
                  minWidth: 0,
                }}
              >
                {midGroup.subCols.map((col, idx) => (
                  <Link
                    key={col.id}
                    href={col.href}
                    className={columnLinkClass}
                    aria-label={`Les mer om ${col.title}`}
                    style={{
                      minWidth: 0,
                      width: "100%",
                      borderRight:
                        idx < midGroup.subCols.length - 1 ? "1px solid #e5e7eb" : undefined,
                    }}
                  >
                    {/* Colored top bar */}
                    <div
                      style={{
                        background: col.bar.bg,
                        color: col.bar.fg,
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        padding: "4px 10px",
                        flexShrink: 0,
                      }}
                    >
                      {col.bar.label}
                    </div>

                    {/* Col content */}
                    <div
                      style={{
                        flex: 1,
                        padding: "8px 10px 10px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 0,
                      }}
                    >
                      {/* Fixed-height title+desc block so Utvalgte leveranser inkluderer aligns across all columns */}
                      <div style={{ minHeight: 110, flexShrink: 0 }}>
                        <p
                          style={{
                            fontSize: 11,
                            fontWeight: 800,
                            color: "#111827",
                            margin: 0,
                            marginBottom: 5,
                            lineHeight: 1.35,
                          }}
                        >
                          {col.title}
                        </p>
                        <p
                          style={{
                            fontSize: 11,
                            color: "rgba(55,65,81,0.82)",
                            margin: 0,
                            lineHeight: 1.5,
                          }}
                        >
                          {col.desc}
                        </p>
                      </div>

                      <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 7, marginBottom: 8 }}>
                        <SectionLabel>Utvalgte leveranser inkluderer</SectionLabel>
                        <CheckList items={col.includes} />
                      </div>

                      <div style={{ borderTop: "1px solid #f3f4f6", paddingTop: 7 }}>
                        <SectionLabel>Forventet effekt</SectionLabel>
                        <ArrowList items={col.outcomes} />
                      </div>


                      <ReadMoreFooter />
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* RIGHT — AI-opplæring og erfaring */}
            <OuterCol {...rightCol} />
          </div>
        </div>

        {/* Footer note */}
        <p
          style={{
            marginTop: 14,
            fontSize: 11,
            color: "rgba(26,51,32,0.4)",
            lineHeight: 1.5,
          }}
        >
          Mange kunder starter med{" "}
          <strong style={{ color: "#1a3320", fontWeight: 600 }}>AI-kartlegging</strong>{" "}
          for å avdekke hvor innsatsen gir mest tilbake — og bygger videre derfra.
        </p>

        {/* Amber CTA */}
        <div
          style={{
            marginTop: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            background: "#fffbeb",
            border: "1px solid rgba(245,158,11,0.35)",
            borderRadius: 12,
            padding: "16px 24px",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 14,
              fontWeight: 600,
              color: "#92400e",
              lineHeight: 1.45,
              flex: "1 1 200px",
              minWidth: 0,
            }}
          >
            Ønsker du å vite mer? Vi er klare for en uforpliktende prat.
          </p>
          <a
            href="#kontakt"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 14,
              padding: "10px 22px",
              borderRadius: 999,
              textDecoration: "none",
              boxShadow: "0 2px 12px rgba(245,158,11,0.35)",
              whiteSpace: "nowrap",
            }}
          >
            Ta kontakt
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
