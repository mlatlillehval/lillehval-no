import Image from "next/image";
import { DIGITAL_AGENTS } from "../data/digitalTeamAgents";
import SectionKicker from "./SectionKicker";

export default function DigitalTeamAgents() {
  return (
    <div className="mb-16">
      <div className="text-center mb-10">
        <SectionKicker>Våre +1</SectionKicker>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1a3320]">
          Tre AI-agenter — én for hver av oss
        </h3>
        <p
          className="mt-3 text-base max-w-xl mx-auto"
          style={{ color: "rgba(26,51,32,0.55)" }}
        >
          Aria, Byte og Nexus er faste støttespillere i hverdagen. Oppgavene deres er tilpasset Marius, Hein og utvikleren — slik at vi får strategi, innsikt og implementering i samme takt.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {DIGITAL_AGENTS.map((agent) => (
          <div
            key={agent.name}
            className="green-card rounded-2xl overflow-hidden flex flex-col"
          >
            <div className="relative w-full" style={{ height: "180px", background: "#f7f4ee" }}>
              <Image
                src={agent.image}
                alt={agent.name}
                fill
                className="object-contain p-4"
              />
            </div>
            <div className="p-5 flex flex-col gap-2 flex-1">
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: agent.color }}
                />
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: agent.color }}
                >
                  {agent.role}
                </span>
              </div>
              <h4 className="text-lg font-extrabold text-[#1a3320]">{agent.name}</h4>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(26,51,32,0.6)" }}>
                {agent.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
