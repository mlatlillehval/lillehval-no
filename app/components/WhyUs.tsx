import Image from "next/image";
import { Fragment } from "react";
import type { DigitalAgentId } from "../data/digitalTeamAgents";
import { getDigitalAgent } from "../data/digitalTeamAgents";
import {
  HEIN_LINKEDIN_URL,
  MARIUS_LINKEDIN_URL,
  TEAM_PHONES,
} from "../data/siteContact";
import LillehvalLogoStory from "./LillehvalLogoStory";
import SectionKicker from "./SectionKicker";

const PHILOSOPHY_PRINCIPLES: {
  title: string;
  desc: string;
  icon: "process" | "tailor" | "owners" | "shield" | "longterm" | "value";
}[] = [
  {
    title: "Prosess først",
    desc: "Vi tar utgangspunkt i hvordan dere jobber i dag, og bygger rundt det som allerede fungerer.",
    icon: "process",
  },
  {
    title: "Skreddersydd til selskapet",
    desc: "Vi tror på løsninger tilpasset virksomheten deres — ikke standardoppsett som alle skal passe inn i.",
    icon: "tailor",
  },
  {
    title: "Eierskap hører hjemme i linja",
    desc: "De som kjenner prosessene best er de i driften. Når de lærer AI, kombineres teknologi med reell fagkunnskap — og det er da det gir effekt.",
    icon: "owners",
  },
  {
    title: "Trygghet og kontroll",
    desc: "Dataeierskap, sikkerhet og kontroll skal være tydelig avklart fra start — og ivaretas gjennom hele samarbeidet.",
    icon: "shield",
  },
  {
    title: "Langsiktig samarbeid",
    desc: "Vi blir med videre og forbedrer løsningene sammen med dere etter hvert som behovene utvikler seg.",
    icon: "longterm",
  },
  {
    title: "Målbar verdi",
    desc: "Vi bruker ikke teknologi for teknologiens skyld — vi prioriterer tiltak som gir tydelig, målbar effekt.",
    icon: "value",
  },
];

const AI_REISE_FASER = [
  "Avdekke behov",
  "Forstå",
  "Prioritere",
  "Pilot",
  "Skalering",
  "Forbedre",
] as const;

/** Steg-farger i tråd med reisen i Lillehval-logoet: amber → lys grønn → dyp grønn */
const AI_REISE_STEP_STYLES = [
  { border: "#f59e0b", bg: "rgba(245,158,11,0.14)" },
  { border: "#eab308", bg: "rgba(234,179,8,0.12)" },
  { border: "#8aad94", bg: "rgba(138,173,148,0.22)" },
  { border: "#4a7a55", bg: "rgba(74,122,85,0.16)" },
  { border: "#14532d", bg: "rgba(20,83,45,0.1)" },
  { border: "#0a2e1a", bg: "rgba(10,46,26,0.1)" },
] as const;

const AI_REISE_DEEP_GREEN = "#0a2e1a" as const;

function FilosofiIcon({ kind }: { kind: (typeof PHILOSOPHY_PRINCIPLES)[number]["icon"] }) {
  const cls = "h-6 w-6 shrink-0" as const;
  const stroke = "#15803d";
  switch (kind) {
    case "process":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={1.75} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h14" />
          <circle cx="18" cy="12" r="2.5" fill="rgba(245,158,11,0.35)" stroke={stroke} />
        </svg>
      );
    case "tailor":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={1.75} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h12M4 17h16" />
          <path strokeLinecap="round" d="M19 6v4M19 14v4" stroke={stroke} strokeWidth={1.75} />
        </svg>
      );
    case "owners":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={1.75} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 20v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8zm8 9v-2a4 4 0 00-3-3.87" />
        </svg>
      );
    case "shield":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={1.75} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l8 4v6c0 5-3.5 9.5-8 11-4.5-1.5-8-6-8-11V7l8-4z" />
        </svg>
      );
    case "longterm":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={1.75} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 3v4M7 3v4M5 11h14M6 19h12a2 2 0 002-2v-4H4v4a2 2 0 002 2z" />
        </svg>
      );
    case "value":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={1.75} aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 19V5M8 19V9m8 10V5m4 14v-6" />
        </svg>
      );
    default:
      return null;
  }
}

type TeamMember = {
  name: string;
  title: string;
  image: string;
  quote: string;
  tags: string[];
  /** Lange tagger venstre, korte høyre — faste rader (f.eks. tre linjer totalt) */
  pairedTags?: { long: string[]; short: string[] };
  bio: string;
  email: string;
  linkedin: string;
  phone?: (typeof TEAM_PHONES)[keyof typeof TEAM_PHONES];
  partnerAgentId?: DigitalAgentId;
  /** For anonymiserte kort — justerer utsnitt på samme bilde */
  imageObjectPosition?: string;
};

const foundersTeam: TeamMember[] = [
  {
    name: "Marius Langsrud",
    title: "Medgründer & AI-rådgiver",
    image: "/illustration-marius.jpg",
    quote: "«De fleste selskaper sitter på mer potensial enn de aner. AI er verktøyet som låser det opp — men bare hvis du vet hvor du skal se, og har mot til å gjøre noe med det.»",
    tags: [],
    pairedTags: {
      long: ["Forretningsutvikling", "Prosessforbedring", "AI-implementering"],
      short: ["Strategi", "Rådgivning", "Salg"],
    },
    bio: "Marius har over 15 års erfaring som rådgiver i fusjons- og oppkjøpsmiljøet i PwC i Oslo, og som forretningsutvikler og salgsdirektør fra Komplett.no. Han har jobbet mye med prosessforbedringer og kjenner godt til hvordan man optimaliserer arbeidet, bygger team og jobber effektivt og samlet.",
    email: "ml@lillehval.no",
    linkedin: MARIUS_LINKEDIN_URL,
    phone: TEAM_PHONES.marius,
    partnerAgentId: "aria",
  },
  {
    name: "Hein Torgersen",
    title: "Medgründer & AI-rådgiver",
    image: "/illustration-hein-akvarell.png",
    quote: "«Bruker ikke AI kun for å bruke AI — men er overbevist om at det løser de samme problemene man alltid har hatt, bare langt mer effektivt.»",
    tags: [],
    pairedTags: {
      long: ["Prosessoptimalisering", "Behovsforståelse", "Change Management"],
      short: ["Teknologi", "SaaS", "Produkt"],
    },
    bio: "Senior Product Manager med 13 års erfaring fra SaaS. Har de siste 10 årene bygget et prosjektstyringsverktøy for byggebransjen som i dag omsetter for over 185 millioner NOK. Bruker ikke AI kun for å bruke AI — men er overbevist om at det løser de samme problemene man alltid har hatt, bare langt mer effektivt.",
    email: "ht@lillehval.no",
    linkedin: HEIN_LINKEDIN_URL,
    phone: TEAM_PHONES.hein,
    partnerAgentId: "byte",
  },
];

const extendedTeam: TeamMember[] = [
  {
    name: "Seniorutvikler",
    title: "Seniorutvikler/arkitekt",
    image: "/team-arkitekt-senior.jpg",
    quote:
      "«Når AI skal ut i drift, er solid arkitektur og ryddig kode minst like viktig som modellen dere velger. Det koster alltid mer å skalere noe som ikke var bygget for det fra start.»",
    tags: ["Utvikling", "Integrasjoner", "Full stack arkitekt", "DevOps", "Skalerbarhet", "Produksjon"],
    bio: "Sjefsarkitekt i et int. konsern med over 25 års erfaring fra softwareutvikling. Har tilbrakt hele karrieren med å bygge skalerbare løsninger som holder i produksjon og vedlikeholdes over tid. I dag integrerer han AI aktivt i både produkter og utviklingsprosesser — og bringer den samme grundigheten inn i hvert prosjekt.",
    email: "dev@lillehval.no",
    linkedin: "#",
  },
  {
    name: "Integrasjonsarkitekt",
    title: "Integrasjonsarkitekt",
    image: "/team-arkitekt-integrasjon.jpg",
    quote:
      "«AI gir først verdi når den er koblet til systemene dere allerede bruker. Ryddige integrasjoner er grunnmuren — ikke et tillegg på slutten.»",
    tags: ["API-design", "Systemintegrasjon", "Datapipelines", "Sikkerhet", "Skytjenester", "Drift"],
    bio: "Erfaren integrasjonsarkitekt med bakgrunn fra komplekse enterprise-miljøer. Spesialiserer seg på å koble AI-løsninger til eksisterende systemlandskap — med fokus på pålitelighet, sporbarhet og enkel vedlikehold.",
    email: "dev@lillehval.no",
    linkedin: "#",
  },
  {
    name: "AI-ingeniør",
    title: "AI-ingeniør",
    image: "/team-arkitekt-ai.jpg",
    quote:
      "«Modellen er bare halvparten av jobben. Det som skiller et pilotprosjekt fra noe som faktisk brukes, er evaluering, overvåking og kontinuerlig forbedring.»",
    tags: ["LLM", "RAG", "Evaluering", "MLOps", "Prompting", "Produksjon"],
    bio: "AI-ingeniør med erfaring fra å ta språkmodeller og agentløsninger fra prototype til produksjon. Jobber tett med utviklere og fagmiljøer for å sikre at løsningene holder mål i praksis — ikke bare i demo.",
    email: "dev@lillehval.no",
    linkedin: "#",
  },
];

const ANONYMOUS_TAG_STYLE = {
  background: "rgba(34,139,70,0.1)",
  color: "#15803d",
  border: "1px solid rgba(34,139,70,0.2)",
} as const;

function AnonymousTeamCard({ person }: { person: TeamMember }) {
  return (
    <article
      className="flex h-full flex-col overflow-hidden rounded-2xl"
      style={{
        background: "rgba(255,255,255,0.75)",
        border: "1px solid rgba(34,139,70,0.18)",
      }}
    >
      <div className="relative h-[280px] w-full shrink-0 overflow-hidden bg-[#0a1628]">
        <Image
          src={person.image}
          alt={person.title}
          fill
          className="object-cover object-center blur-md scale-105"
          style={person.imageObjectPosition ? { objectPosition: person.imageObjectPosition } : undefined}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(5,26,13,0.95) 100%)" }}
        />
        <div className="absolute bottom-0 left-0 p-5">
          <h3 className="text-lg font-extrabold text-white sm:text-xl">{person.title}</h3>
        </div>
      </div>

      <div
        className="grid flex-1"
        style={{ gridTemplateRows: "6.25rem 9.75rem 9.75rem 2.75rem" }}
      >
        <p
          className="overflow-hidden px-5 pt-5 text-sm italic leading-relaxed sm:px-6"
          style={{ color: "rgba(26,51,32,0.75)" }}
        >
          {person.quote}
        </p>

        <p
          className="overflow-hidden px-5 text-sm leading-relaxed sm:px-6"
          style={{ color: "rgba(26,51,32,0.5)" }}
        >
          {person.bio}
        </p>

        <div className="border-y border-slate-200 px-5 py-3 sm:px-6">
          <div className="grid h-full grid-cols-2 grid-rows-3 gap-2">
            {person.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center justify-center rounded-full px-2 py-1 text-center text-[11px] font-semibold leading-tight sm:text-xs"
                style={ANONYMOUS_TAG_STYLE}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center px-5 sm:px-6">
          <a
            href={`mailto:${person.email}`}
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
            style={{ color: "#15803d" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {person.email}
          </a>
        </div>
      </div>
    </article>
  );
}

function TeamMemberCard({ person }: { person: TeamMember }) {
  const agent = person.partnerAgentId ? getDigitalAgent(person.partnerAgentId) : null;
  const partnerSubject = person.name.split(" ")[0] ?? person.name;

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col h-full min-h-0"
      style={{ background: "rgba(255,255,255,0.75)", border: "1px solid rgba(34,139,70,0.18)" }}
    >
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: "280px",
          background:
            person.name === "Marius Langsrud"
              ? "radial-gradient(ellipse at 50% 40%, #1a5c35 0%, #0a2e1a 60%, #051a0d 100%)"
              : "#0d1f14",
        }}
      >
        <Image
          src={person.image}
          alt={person.name}
          fill
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, transparent 50%, rgba(5,26,13,0.95) 100%)" }}
        />
        <div className="absolute bottom-0 left-0 p-5">
          <h3 className="text-lg font-extrabold text-white sm:text-xl">{person.name}</h3>
          <p className="text-xs font-medium sm:text-sm" style={{ color: "#15803d" }}>{person.title}</p>
        </div>
      </div>

      <div className="p-5 flex flex-1 flex-col min-h-0 gap-3 sm:p-6 sm:gap-4">
        <div className="flex flex-col gap-3 shrink-0">
          <p className="text-sm italic leading-relaxed" style={{ color: "rgba(26,51,32,0.75)" }}>
            {person.quote}
          </p>

          <p className="text-sm leading-relaxed" style={{ color: "rgba(26,51,32,0.5)" }}>
            {person.bio}
          </p>
        </div>

        <div className="flex-1 min-h-0 basis-0" aria-hidden />

        <div className="flex flex-col gap-3 shrink-0">
          <div className="flex flex-wrap content-start gap-2 border-y border-slate-200 py-3 min-h-[7.75rem] lg:min-h-[8rem]">
            {person.pairedTags ? (
              <div className="grid w-full grid-cols-[minmax(0,1fr)_auto] gap-x-2 gap-y-2 content-start items-center">
                {person.pairedTags.long.map((tag, i) => (
                  <Fragment key={tag}>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold min-w-0 w-fit max-w-full"
                      style={{ background: "rgba(34,139,70,0.1)", color: "#15803d", border: "1px solid rgba(34,139,70,0.2)" }}
                    >
                      {tag}
                    </span>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold shrink-0 justify-self-end"
                      style={{ background: "rgba(34,139,70,0.1)", color: "#15803d", border: "1px solid rgba(34,139,70,0.2)" }}
                    >
                      {person.pairedTags!.short[i]}
                    </span>
                  </Fragment>
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-2 min-h-[5.75rem]">
            <a
              href={person.linkedin}
              {...(person.linkedin.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: "rgba(26,51,32,0.4)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn-profil
            </a>
            {person.phone ? (
              <a
                href={`tel:${person.phone.tel}`}
                className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
                style={{ color: "#15803d" }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                {person.phone.display}
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 text-sm font-semibold invisible pointer-events-none select-none" aria-hidden>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                +00 00 00 00 00
              </span>
            )}
            <a
              href={`mailto:${person.email}`}
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:opacity-80"
              style={{ color: "#15803d" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {person.email}
            </a>
          </div>

          {agent ? (
            <div
              className="rounded-xl border px-3 py-3 sm:px-4 sm:py-3.5 -mx-0.5 sm:mx-0 min-h-[12rem] flex flex-col"
              style={{ borderColor: "rgba(21,128,61,0.14)", background: "rgba(255,255,255,0.55)" }}
            >
              <p className="text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: agent.color }}>
                {partnerSubject} sin digitale +1
              </p>
              <div className="flex gap-3 items-start">
                <div
                  className="relative h-14 w-14 shrink-0 rounded-lg overflow-hidden border"
                  style={{ borderColor: "rgba(21,128,61,0.12)", background: "#f7f4ee" }}
                >
                  <Image src={agent.image} alt={agent.name} fill className="object-contain p-1.5" sizes="56px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-extrabold text-[#1a3320] leading-tight">
                    {agent.name}
                    <span className="font-semibold text-[rgba(26,51,32,0.45)]"> · </span>
                    <span className="text-xs font-semibold" style={{ color: agent.color }}>
                      {agent.role}
                    </span>
                  </p>
                  <p className="text-xs leading-relaxed mt-1.5" style={{ color: "rgba(26,51,32,0.68)" }}>
                    {agent.partnerFocus}
                  </p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default function WhyUs() {
  return (
    <section id="hvorfor-oss" className="relative z-10 py-24 px-6" style={{ background: "rgb(237, 244, 234)" }}>
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <div className="mb-6 text-center">
            <SectionKicker>Hvem er vi?</SectionKicker>
            <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a3320]">
              Hvorfor Lillehval?
            </h1>
          </div>
          <div
            className="mx-auto mt-6 max-w-5xl overflow-hidden rounded-2xl border border-l-[5px] text-left relative"
            style={{
              color: "rgba(26,51,32,0.82)",
              borderColor: "rgba(21,128,61,0.18)",
              borderLeftColor: "#15803d",
              background: "linear-gradient(155deg, rgba(255,255,255,0.94) 0%, rgba(237,247,237,0.5) 42%, rgba(255,255,255,0.9) 100%)",
              boxShadow: "0 8px 28px rgba(6,46,31,0.07), 0 1px 2px rgba(6,46,31,0.04)",
            }}
          >
            <div
              className="pointer-events-none absolute -top-20 -right-16 h-64 w-64 rounded-full opacity-[0.12] blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(21,128,61,0.55) 0%, transparent 70%)" }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute bottom-0 left-0 h-40 w-48 rounded-full opacity-[0.1] blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(245,158,11,0.4) 0%, transparent 70%)" }}
              aria-hidden
            />

            <div className="relative flex flex-col lg:flex-row lg:items-stretch">
              {/* Venstre: visuelt spor + tall — på mobil under brødtekst */}
              <div
                className="order-2 lg:order-1 flex flex-col justify-center gap-4 border-t px-6 py-6 sm:px-8 lg:w-[240px] lg:shrink-0 lg:border-t-0 lg:border-r lg:py-8"
                style={{ borderColor: "rgba(21,128,61,0.12)", background: "rgba(255,255,255,0.35)" }}
              >
                <div className="hidden lg:block mx-auto w-full max-w-[180px]" aria-hidden>
                  <svg viewBox="0 0 180 120" className="w-full h-auto" fill="none">
                    <defs>
                      <linearGradient id="whyus-path" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="48%" stopColor="#8aad94" />
                        <stop offset="100%" stopColor="#0a2e1a" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M14 88 C 44 28, 88 24, 118 52 S 162 38, 168 14"
                      stroke="url(#whyus-path)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="none"
                    />
                    <circle cx="14" cy="88" r="7" fill="#f59e0b" opacity="0.95" />
                    <circle cx="92" cy="40" r="7" fill="#8aad94" opacity="0.95" />
                    <circle cx="166" cy="14" r="7" fill="#0a2e1a" opacity="0.92" stroke="#14532d" strokeWidth="1.5" />
                    <text x="8" y="108" fill="#b45309" fontSize="9" fontWeight="700" letterSpacing="0.12em">IDÉ</text>
                    <text x="56" y="108" fill="#4a7a55" fontSize="9" fontWeight="700" letterSpacing="0.12em">UTFØRELSE</text>
                    <text x="138" y="108" fill="#0a2e1a" fontSize="9" fontWeight="700" letterSpacing="0.12em" opacity="0.85">DRIFT</text>
                  </svg>
                </div>
                <dl className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-3 m-0">
                  <div className="rounded-xl border px-2 py-2.5 text-center lg:text-left lg:px-3" style={{ borderColor: "rgba(21,128,61,0.14)", background: "rgba(255,255,255,0.65)" }}>
                    <dt className="sr-only">Antall gründere</dt>
                    <dd className="m-0 text-xl font-extrabold tabular-nums leading-none" style={{ color: "#14532d" }}>2</dd>
                    <dd className="m-0 mt-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider leading-tight" style={{ color: "rgba(26,51,32,0.45)" }}>Gründere</dd>
                  </div>
                  <div className="rounded-xl border px-2 py-2.5 text-center lg:text-left lg:px-3" style={{ borderColor: "rgba(21,128,61,0.14)", background: "rgba(255,255,255,0.65)" }}>
                    <dt className="sr-only">Antall samarbeidspartnere</dt>
                    <dd className="m-0 text-xl font-extrabold tabular-nums leading-none" style={{ color: "#14532d" }}>3</dd>
                    <dd className="m-0 mt-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider leading-tight" style={{ color: "rgba(26,51,32,0.45)" }}>Samarbeidspartnere</dd>
                  </div>
                  <div className="rounded-xl border px-2 py-2.5 text-center lg:text-left lg:px-3" style={{ borderColor: "rgba(21,128,61,0.14)", background: "rgba(255,255,255,0.65)" }}>
                    <dt className="sr-only">Samlet erfaring</dt>
                    <dd className="m-0 text-xl font-extrabold tabular-nums leading-none" style={{ color: "#14532d" }}>50+</dd>
                    <dd className="m-0 mt-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider leading-tight" style={{ color: "rgba(26,51,32,0.45)" }}>år tilsammen</dd>
                  </div>
                  <div className="rounded-xl border px-2 py-2.5 text-center lg:text-left lg:px-3" style={{ borderColor: "rgba(21,128,61,0.14)", background: "rgba(255,255,255,0.65)" }}>
                    <dt className="sr-only">Leveranse</dt>
                    <dd className="m-0 text-sm sm:text-base font-extrabold leading-tight tracking-tight" style={{ color: "#14532d" }}>A–Å</dd>
                    <dd className="m-0 mt-1 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider leading-tight" style={{ color: "rgba(26,51,32,0.45)" }}>strategi → drift</dd>
                  </div>
                </dl>
              </div>

              <div
                className="order-1 lg:order-2 flex-1 min-w-0 pl-5 pr-6 py-6 sm:pl-7 sm:pr-8 sm:py-8 lg:pl-8"
              >
                <ul className="m-0 list-none space-y-3 p-0 text-sm leading-relaxed sm:text-base sm:space-y-3.5">
                  {[
                    "Vi i Lillehval har jobbet lenge med strategi, produkt og kode i virkelige miljøer — og startet selskapet for å gjøre AI tryggere og enklere å ta i bruk i norske bedrifter, med tydelig språk og uten unødvendig styr.",
                    "To gründere og tre samarbeidspartnere med komplementær bakgrunn fra rådgivning, forretningsutvikling, produktutvikling og softwareutvikling — som sammen dekker hele reisen fra strategi til implementering.",
                    "Over 50 års samlet erfaring — ikke et stort konsulentbyrå med hundre ansatte og en standardpakke.",
                    "Vi er store nok til å levere — men små nok til å bry oss. Vi er et lite selskap — og det er akkurat poenget.",
                    "Vi vet hva som kreves for å ta AI fra idé til virkelighet i en organisasjon.",
                  ].map((line) => (
                    <li key={line} className="flex gap-2.5">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: "#15803d" }}
                        aria-hidden
                      />
                      <span style={{ color: "rgba(26,51,32,0.82)" }}>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              className="relative border-t px-4 pb-8 pt-8 sm:px-6 sm:pb-10 sm:pt-10"
              style={{ borderColor: "rgba(21,128,61,0.12)", background: "rgba(255,255,255,0.38)" }}
            >
              <p
                className="mb-6 text-center text-sm font-semibold tracking-tight sm:mb-7 sm:text-base"
                style={{ color: "rgba(26,51,32,0.55)" }}
              >
                Team med komplementære ferdigheter
              </p>
              <div className="flex flex-col gap-8">
                <div className="mx-auto grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:items-stretch">
                  {foundersTeam.map((person) => (
                    <TeamMemberCard key={person.email} person={person} />
                  ))}
                </div>
                <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-8">
                  {extendedTeam.map((person) => (
                    <AnonymousTeamCard key={person.title} person={person} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mt-8 mb-4">
            <SectionKicker>Vår filosofi og metodikk</SectionKicker>
          </div>
          <div
            className="mx-auto max-w-5xl rounded-2xl border text-left overflow-hidden relative"
            style={{
              borderColor: "rgba(21,128,61,0.18)",
              background: "linear-gradient(165deg, rgba(255,255,255,0.92) 0%, rgba(237,247,237,0.55) 48%, rgba(255,255,255,0.88) 100%)",
              boxShadow: "0 8px 32px rgba(6,46,31,0.06), 0 1px 2px rgba(6,46,31,0.04)",
            }}
          >
            {/* Svak dekor — «bølge» i hjørnet */}
            <div
              className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full opacity-[0.14] blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(21,128,61,0.5) 0%, transparent 70%)" }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -bottom-16 -left-20 h-56 w-56 rounded-full opacity-[0.1] blur-3xl"
              style={{ background: "radial-gradient(circle, rgba(245,158,11,0.45) 0%, transparent 68%)" }}
              aria-hidden
            />

            <div className="relative">
              {/* Filosofi — ingress */}
              <div className="px-6 pt-6 pb-5 sm:px-8 sm:pt-7 border-b" style={{ borderColor: "rgba(21,128,61,0.1)" }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#15803d" }}>Filosofi</p>
                <p className="text-sm sm:text-base font-semibold leading-relaxed max-w-3xl" style={{ color: "rgba(26,51,32,0.78)" }}>
                  Skreddersydd, prosessnært og langsiktig — for oss handler AI om å levere reell forbedring i arbeidshverdagen deres. Trygt, praktisk og over tid.
                </p>
              </div>

              {/* Prinsipper — kort med ikon */}
              <div className="px-5 py-6 sm:px-7 sm:py-7 border-b" style={{ borderColor: "rgba(21,128,61,0.1)" }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  {PHILOSOPHY_PRINCIPLES.map((p) => (
                    <div
                      key={p.title}
                      className="flex gap-3.5 rounded-xl border p-4 sm:p-5 transition-shadow duration-200 hover:shadow-md"
                      style={{
                        borderColor: "rgba(21,128,61,0.12)",
                        background: "rgba(255,255,255,0.65)",
                      }}
                    >
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border"
                        style={{
                          borderColor: "rgba(21,128,61,0.18)",
                          background: "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(220,252,231,0.35))",
                        }}
                      >
                        <FilosofiIcon kind={p.icon} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-wider leading-snug" style={{ color: "#15803d" }}>
                          {p.title}
                        </p>
                        <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "rgba(26,51,32,0.68)" }}>
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metodikk — AI-reisen */}
              <div className="px-6 py-6 sm:px-8 sm:py-7">
                <p className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: "#15803d" }}>Metodikk</p>
                <h3 className="text-base sm:text-lg font-extrabold mb-6" style={{ color: "#1a3320" }}>AI-reisen</h3>

                {/* Vertikal tidslinje — mobil */}
                <nav className="md:hidden mb-7" aria-label="Faser i AI-reisen">
                  <ol className="m-0 p-0 list-none">
                    {AI_REISE_FASER.map((label, idx) => {
                      const step = AI_REISE_STEP_STYLES[idx] ?? AI_REISE_STEP_STYLES[0];
                      const next = AI_REISE_STEP_STYLES[idx + 1];
                      const isLastStep = idx === AI_REISE_FASER.length - 1;
                      return (
                      <li key={label} className="flex gap-3">
                        <div className="relative z-[1] flex w-8 shrink-0 flex-col items-center">
                          <div
                            className="relative z-[2] flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-extrabold border-2"
                            style={{
                              borderColor: step.border,
                              background: isLastStep ? AI_REISE_DEEP_GREEN : "#ffffff",
                              color: isLastStep ? "#ecfdf5" : "#14532d",
                            }}
                          >
                            {idx + 1}
                          </div>
                          {idx < AI_REISE_FASER.length - 1 && next ? (
                            <div
                              className="relative z-0 my-0.5 w-px flex-1 min-h-[14px]"
                              style={{
                                background: `linear-gradient(to bottom, ${step.border}, ${next.border})`,
                              }}
                            />
                          ) : null}
                        </div>
                        <p className="pb-4 pt-1 text-xs font-bold uppercase tracking-wide leading-snug" style={{ color: "#14532d" }}>
                          {label}
                        </p>
                      </li>
                      );
                    })}
                  </ol>
                </nav>

                {/* Horisontal steg — tablet og opp */}
                <nav className="hidden md:block mb-8" aria-label="Faser i AI-reisen">
                  <div className="relative isolate px-1 pt-0 pb-1">
                    <div
                      className="pointer-events-none absolute left-[8%] right-[8%] top-[14px] z-0 h-[3px] rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, #f59e0b 0%, #eab308 10%, #8aad94 38%, #4a7a55 62%, #14532d 84%, #0a2e1a 100%)",
                      }}
                      aria-hidden
                    />
                    <ol className="relative z-10 m-0 flex list-none justify-between gap-1 p-0">
                      {AI_REISE_FASER.map((label, idx) => {
                        const step = AI_REISE_STEP_STYLES[idx] ?? AI_REISE_STEP_STYLES[0];
                        const isLastStep = idx === AI_REISE_FASER.length - 1;
                        return (
                        <li key={label} className="relative z-10 flex min-w-0 flex-1 flex-col items-center text-center">
                          <div
                            className="relative z-20 flex h-8 w-8 items-center justify-center rounded-full border-2 text-[11px] font-extrabold shadow-sm"
                            style={{
                              borderColor: step.border,
                              background: isLastStep ? AI_REISE_DEEP_GREEN : "#ffffff",
                              color: isLastStep ? "#ecfdf5" : "#14532d",
                              boxShadow: isLastStep
                                ? "0 0 0 3px rgba(255,255,255,1), 0 2px 12px rgba(10,46,26,0.35)"
                                : "0 0 0 3px rgba(255,255,255,1), 0 2px 10px rgba(6,46,31,0.08)",
                            }}
                          >
                            {idx + 1}
                          </div>
                          <p className="relative z-20 mt-2.5 max-w-[5.5rem] text-[10px] font-bold uppercase leading-tight tracking-wide sm:max-w-none sm:text-[11px]" style={{ color: "#14532d" }}>
                            {label}
                          </p>
                        </li>
                        );
                      })}
                    </ol>
                  </div>
                </nav>

                <p className="text-sm leading-relaxed" style={{ color: "rgba(26,51,32,0.72)" }}>
                  AI-reisen er hvordan vi jobber sammen med dere — fra å{" "}
                  <strong style={{ color: "#1a3320" }}>avdekke behov</strong>, <strong style={{ color: "#1a3320" }}>forstå</strong> og{" "}
                  <strong style={{ color: "#1a3320" }}>prioritere</strong>, gjennom{" "}
                  <strong style={{ color: "#1a3320" }}>pilot</strong> og <strong style={{ color: "#1a3320" }}>skalering</strong>, til å{" "}
                  <strong style={{ color: "#1a3320" }}>forberede en ny hverdag</strong> med løpende forbedring og strategisk tilpasning.
                  {" "}Metodikken er «hvordan vi jobber» — tjenestene er «hva vi leverer». Innsteget for hvor bedriften går inn avhenger av behov og ønsket bistand.
                </p>
                <p className="mt-4 text-xs leading-relaxed rounded-lg border px-3 py-2" style={{ color: "rgba(26,51,32,0.52)", borderColor: "rgba(21,128,61,0.12)", background: "rgba(255,255,255,0.45)" }}>
                  Stegene over er samme progresjon som i teksten — visuelt spor fra kartlegging til kontinuerlig forbedring.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-16 mb-2">
            <SectionKicker>Tre symboler. Én historie.</SectionKicker>
          </div>
          <LillehvalLogoStory logoRowClassName="mt-6" />
        </div>
      </div>

    </section>
  );
}
