import Image from "next/image";

const WHALE_SRC = "/lillehval-hval-snudd-v2.svg";
const JOURNEY_PATH_IMG =
  "/logo-manual-v1.1/Logo%20-%20Reise%20alene%20-%20transparent.svg";

const JOURNEY_NODES = [
  { label: "Usikkerhet", x: 2.5, above: true, color: "#D4840A", delay: "0s" },
  { label: "Erkjennelse", x: 17.1, above: false, color: "#F59E0B", delay: "0.4s" },
  { label: "Nysgjerrighet", x: 34.7, above: true, color: "#8AAD94", delay: "0.8s" },
  { label: "Klarhet", x: 46.6, above: false, color: "#4A7A55", delay: "1.2s" },
  { label: "Mot", x: 74.5, above: true, color: "#1d6e3a", delay: "2.0s" },
  { label: "Handling", x: 96.9, above: false, color: "#14532D", delay: "2.4s" },
] as const;

const JOURNEY_STORY =
  "Selskapets reise fra usikkerhet til Handling - Lillehval guider deg på veien";

function JourneyLegend({ compact }: { compact?: boolean }) {
  return (
    <div
      style={{
        background: "rgba(6,20,12,0.72)",
        border: "1px solid rgba(138,173,148,0.18)",
        backdropFilter: "blur(10px)",
        borderRadius: "10px",
        padding: compact ? "8px 10px" : "6px 12px",
        display: "flex",
        flexDirection: "column",
        gap: compact ? "8px" : "6px",
      }}
    >
      <span
        className="text-balance"
        style={{
          fontSize: compact ? "10px" : "clamp(8px, 1.8vw, 11px)",
          fontWeight: 800,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(138,173,148,0.85)",
          lineHeight: 1.35,
        }}
      >
        Selskapers AI-reise fra Usikkerhet til Handling
      </span>
      <div
        className={
          compact
            ? "grid grid-cols-2 gap-x-2 gap-y-2"
            : "flex flex-wrap items-center gap-x-2 gap-y-1.5"
        }
      >
        {JOURNEY_NODES.map((node) => (
          <div key={node.label} className="flex items-center gap-1.5 min-w-0">
            <span
              style={{
                width: compact ? "6px" : "5px",
                height: compact ? "6px" : "5px",
                borderRadius: "50%",
                background: node.color,
                flexShrink: 0,
                display: "inline-block",
              }}
            />
            <span
              className="leading-tight"
              style={{
                fontSize: compact ? "11px" : "clamp(8px, 1.8vw, 12px)",
                fontWeight: 600,
                color: "rgba(242,237,227,0.6)",
              }}
            >
              {node.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function HeroJourneyBand() {
  return (
    <section
      className="relative z-10 isolate overflow-hidden"
      aria-label={JOURNEY_STORY}
      style={{
        background: "linear-gradient(160deg, #0a2e1a 0%, #061a10 60%, #071e12 100%)",
      }}
    >
      <div
        className="relative z-10 w-full flex-shrink-0 min-h-[340px] sm:min-h-0"
        style={{
          height: "clamp(340px, 42vw, 400px)",
        }}
      >
        <div className="relative h-full w-full overflow-hidden pb-[88px] sm:pb-0">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 55% 80%, rgba(21,128,61,0.18) 0%, transparent 70%), radial-gradient(ellipse 30% 60% at 10% 50%, rgba(245,158,11,0.06) 0%, transparent 60%)",
            }}
          />

          <div
            className="absolute z-20 animate-hero-up left-3 right-3 top-2.5 max-w-[min(42rem,calc(100vw-1.5rem))] text-balance leading-snug sm:left-[max(1rem,calc(50%-32rem))] sm:right-auto sm:top-3.5 sm:max-w-[min(48rem,calc(100vw-3rem))]"
            style={{
              fontSize: "clamp(9px, 2.4vw, 11px)",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(138,173,148,0.45)",
              animationDelay: "0.4s",
            }}
          >
            {JOURNEY_STORY}
          </div>

          <div
            className="absolute flex items-center justify-center gap-2 sm:gap-4 w-[94%] sm:w-[80%] top-[38%] sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 sm:-translate-y-[56%]"
            style={{ zIndex: 10 }}
          >
            <div style={{ position: "relative", width: "clamp(95px, 14vw, 200px)", flexShrink: 0 }}>
              <div
                className="animate-glow-pulse"
                style={{
                  position: "absolute",
                  bottom: "-20%",
                  left: "0px",
                  right: "0px",
                  height: "50%",
                  background:
                    "radial-gradient(ellipse 80% 60% at 55% 50%, rgba(21,128,61,0.28) 0%, transparent 70%)",
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              />
              <div style={{ transform: "scaleX(-1)" }}>
                <Image
                  src={WHALE_SRC}
                  alt="Lillehval hvalen"
                  width={400}
                  height={223}
                  sizes="(max-width: 640px) 95px, min(200px, 14vw)"
                  className="animate-whale-front block w-full relative z-[11]"
                  style={{
                    filter:
                      "drop-shadow(0 16px 32px rgba(21,128,61,0.35)) drop-shadow(0 4px 12px rgba(0,0,0,0.5)) brightness(0.92) saturate(0.8)",
                  }}
                />
              </div>
            </div>

            <div
              className="flex-1 sm:flex-none"
              style={{
                maxWidth: "clamp(260px, 28vw, 420px)",
                minWidth: 0,
                flexShrink: 0,
                position: "relative",
                paddingTop: "clamp(24px, 4vw, 40px)",
                paddingBottom: "clamp(60px, 8vw, 90px)",
                paddingLeft: "8px",
                paddingRight: "28px",
              }}
            >
              {JOURNEY_NODES.map((node) => (
                <div
                  key={node.label}
                  className="animate-node-float hidden sm:flex"
                  style={{
                    position: "absolute",
                    left: `${node.x}%`,
                    ...(node.above ? { top: "0px" } : { bottom: "38px" }),
                    transform: "translateX(-50%)",
                    zIndex: 20,
                    flexDirection: node.above ? "column" : "column-reverse",
                    alignItems: "center",
                    gap: "2px",
                    animationDelay: node.delay,
                  }}
                >
                  <div
                    style={{
                      background: "rgba(6,20,12,0.88)",
                      border: `1px solid ${node.color}44`,
                      backdropFilter: "blur(8px)",
                      borderRadius: "100px",
                      padding: "4px 10px",
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "rgba(242,237,227,0.85)",
                      whiteSpace: "nowrap",
                      display: "flex",
                      alignItems: "center",
                      gap: "3px",
                      letterSpacing: "0.03em",
                    }}
                  >
                    <span
                      style={{
                        width: "4px",
                        height: "4px",
                        borderRadius: "50%",
                        background: node.color,
                        flexShrink: 0,
                        display: "inline-block",
                        boxShadow: `0 0 4px ${node.color}99`,
                      }}
                    />
                    {node.label}
                  </div>
                  <div
                    style={{
                      width: "1px",
                      height: "22px",
                      background: `linear-gradient(${node.above ? "to bottom" : "to top"}, ${node.color}88, transparent)`,
                      flexShrink: 0,
                    }}
                  />
                </div>
              ))}
              <Image
                src={JOURNEY_PATH_IMG}
                alt="Reisepaden fra usikkerhet til klarhet"
                width={560}
                height={180}
                sizes="(max-width: 640px) 100vw, min(420px, 28vw)"
                className="animate-journey-in block w-full relative z-[12]"
                style={{
                  filter: "drop-shadow(0 4px 16px rgba(245,158,11,0.2)) brightness(1.15)",
                }}
              />

              <div style={{ position: "absolute", bottom: "0px", left: "2.5%", right: "3.1%", zIndex: 19 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "rgba(212,132,10,0.7)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    0 % AI
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "rgba(20,83,45,0.9)",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    Full implementering
                  </span>
                </div>
                <div
                  style={{
                    height: "3px",
                    borderRadius: "100px",
                    background:
                      "linear-gradient(to right, #D4840A, #F59E0B 20%, #8AAD94 50%, #4A7A55 75%, #14532D)",
                  }}
                />
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "3px" }}>
                  <span style={{ fontSize: "10px", color: "rgba(138,173,148,0.5)", letterSpacing: "0.08em" }}>
                    mer AI →
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: "30%",
              background: "linear-gradient(to top, rgba(4,14,8,0.6) 0%, transparent 100%)",
              zIndex: 15,
            }}
          />

          <div className="absolute z-20 bottom-3 left-3 right-3 max-w-full sm:left-[max(1rem,calc(50%-32rem))] sm:right-auto sm:max-w-[min(52rem,calc(100vw-2rem))]">
            <div className="sm:hidden">
              <JourneyLegend compact />
            </div>
            <div className="hidden sm:block">
              <JourneyLegend />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
