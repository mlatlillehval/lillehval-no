export type DigitalAgentId = "aria" | "byte" | "nexus";

export type DigitalAgent = {
  id: DigitalAgentId;
  name: string;
  role: string;
  image: string;
  color: string;
  /** Brukes i «Våre +1»-seksjonen */
  description: string;
  /** Brukes på teamkort — oppgaver tilpasset den ansatte */
  partnerFocus: string;
};

export const DIGITAL_AGENTS: DigitalAgent[] = [
  {
    id: "aria",
    name: "Aria",
    role: "AI-strateg",
    image: "/agent-aria.png",
    color: "#22c55e",
    description:
      "Analyserer bedriftens situasjon og utarbeider en skreddersydd AI-strategi med konkrete prioriteringer og veikart.",
    partnerFocus:
      "Tilpasset Marius: forbereder strategiutkast, prioriteringsnotater og veikart som speiler hans rådgivererfaring — med tyngde på verdi og forretningsutvikling før og etter kundemøter.",
  },
  {
    id: "byte",
    name: "Byte",
    role: "Dataanalytiker",
    image: "/agent-byte.png",
    color: "#0ea5e9",
    description:
      "Dykker ned i dataene dine, identifiserer mønstre og gir deg innsikten du trenger for å ta bedre beslutninger.",
    partnerFocus:
      "Tilpasset Hein: strukturerer data- og prosessinnsikt, KPI-utkast og oppsummeringer som støtter produktledelse og endringsarbeid — med SaaS- og byggebransje-kontekst i bakhodet.",
  },
  {
    id: "nexus",
    name: "Nexus",
    role: "Implementeringsagent",
    image: "/agent-nexus.png",
    color: "#f59e0b",
    description:
      "Kobler sammen systemer, setter opp AI-løsninger og sørger for at teknologien faktisk funker i din hverdag.",
    partnerFocus:
      "Tilpasset seniorutvikleren: hjelper med integrasjonsutkast, tekniske sjekklister og koblinger mot kodebase og drift — slik at implementering holder mål i produksjon.",
  },
];

export function getDigitalAgent(id: DigitalAgentId): DigitalAgent {
  const a = DIGITAL_AGENTS.find((x) => x.id === id);
  if (!a) throw new Error(`Unknown agent: ${id}`);
  return a;
}
