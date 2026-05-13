import BrandLogo from "./BrandLogo";
import type { BrandLogoKind, BrandSurface } from "../lib/brand";

type ShowcaseCustom = {
  kind: "custom";
  src: string;
  surface: BrandSurface;
  alt: string;
  imgClassName?: string;
};

type ShowcaseBrand = {
  kind: BrandLogoKind;
  surface: BrandSurface;
  alt: string;
  imgClassName?: string;
};

type LogoShowcaseItem = ShowcaseCustom | ShowcaseBrand;

const logoShowcase: LogoShowcaseItem[] = [
  {
    kind: "custom",
    src: "/whale-only.svg",
    surface: "dark",
    alt: "Lillehval — grønhval",
  },
  {
    kind: "journeyOnly",
    surface: "transparent",
    alt: "Lillehval — reise-symbolet",
    imgClassName: "h-auto max-h-7 w-full max-w-[70%] object-contain sm:max-h-8",
  },
  {
    kind: "custom",
    src: "/logo-hval-hoyre-reise.svg",
    surface: "transparent",
    alt: "Lillehval — hval høyre med reise",
  },
  {
    kind: "custom",
    src: "/lillehval-mork.svg",
    surface: "transparent",
    alt: "Lillehval — mørk",
    imgClassName: "h-auto max-h-5 w-full max-w-[45%] object-contain sm:max-h-6",
  },
  {
    kind: "wordmarkWithJourney",
    surface: "light",
    alt: "Lillehval — ordmerke med reise",
    imgClassName: "h-auto max-h-8 w-full max-w-[85%] object-contain sm:max-h-9",
  },
  {
    kind: "wordmarkJourneyInline",
    surface: "transparent",
    alt: "Lillehval — ordmerke med integrert reise",
    imgClassName: "h-auto max-h-9 w-full max-w-[75%] object-contain sm:max-h-10",
  },
];

type Props = {
  /** Avstand over blokken (f.eks. mt-12 under ingress) */
  logoRowClassName?: string;
};

export default function LillehvalLogoStory({ logoRowClassName = "mt-12" }: Props) {
  return (
    <div className={`w-full max-w-5xl mx-auto ${logoRowClassName}`}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-10 xl:gap-12">
        {/* Logoer — venstre: samme «ramme»-språk, sticky på desktop */}
        <div
          className="mx-auto w-full max-w-sm shrink-0 lg:mx-0 lg:w-[min(100%,360px)] xl:w-[min(100%,400px)] lg:sticky lg:top-28 lg:self-start"
          aria-label="Lillehval — logo-varianter"
        >
          <div
            className="grid grid-cols-1 gap-3 rounded-2xl border p-4 sm:gap-4 sm:p-5 lg:h-full"
            style={{
              borderColor: "rgba(21,128,61,0.16)",
              background: "linear-gradient(165deg, rgba(255,255,255,0.95) 0%, rgba(237,244,234,0.55) 100%)",
              boxShadow: "0 1px 0 rgba(255,255,255,0.8) inset, 0 8px 28px rgba(5,46,31,0.07)",
            }}
          >
            {logoShowcase.map((logo) => (
              <div
                key={logo.alt}
                className="flex min-h-[5.5rem] items-center justify-center overflow-hidden rounded-xl border p-3 shadow-sm sm:min-h-[6.25rem] sm:p-4 transition-shadow duration-200 hover:shadow-md"
                style={{
                  borderColor: "rgba(21,128,61,0.1)",
                  background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(248,250,248,0.92) 100%)",
                }}
              >
                {logo.kind === "custom" ? (
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className={
                      logo.imgClassName ??
                      "h-auto max-h-14 w-full max-w-full object-contain sm:max-h-[4rem]"
                    }
                  />
                ) : (
                  <BrandLogo
                    kind={logo.kind}
                    surface={logo.surface}
                    alt={logo.alt}
                    width={200}
                    height={120}
                    className={
                      logo.imgClassName ??
                      "h-auto max-h-14 w-full max-w-full object-contain sm:max-h-[4rem]"
                    }
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Historie — høyre: matcher venstre + grønn «rygg» som binder til logo */}
        <div
          className="relative min-w-0 flex-1 overflow-hidden rounded-2xl border border-l-[4px] p-6 text-left text-base leading-relaxed sm:p-8"
          style={{
            color: "rgba(26,51,32,0.82)",
            borderColor: "rgba(21,128,61,0.18)",
            borderLeftColor: "#15803d",
            background: "linear-gradient(165deg, rgba(255,255,255,0.96) 0%, rgba(237,244,234,0.48) 52%, rgba(255,255,255,0.94) 100%)",
            boxShadow: "0 1px 0 rgba(255,255,255,0.75) inset, 0 8px 28px rgba(5,46,31,0.07)",
          }}
        >
          <div
            className="pointer-events-none absolute -top-16 right-0 h-48 w-48 rounded-full opacity-[0.11] blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(21,128,61,0.45) 0%, transparent 72%)" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute bottom-0 left-1/3 h-40 w-56 rounded-full opacity-[0.09] blur-3xl"
            style={{ background: "radial-gradient(circle, rgba(245,158,11,0.35) 0%, transparent 70%)" }}
            aria-hidden
          />
          <div className="relative space-y-5">
          <p className="text-lg font-semibold leading-snug text-[#14532d] sm:text-xl">
            Lillehvals logo er bygget rundt en grønhval. Det er ikke tilfeldig.
          </p>
          <p>
            Hvalen er et av naturens mest fascinerende skapninger — intelligent, sosialt og i konstant
            bevegelse gjennom et hav som er langt større enn det vi kan se fra overflaten. Slik er det
            med AI også. Mulighetene er enorme, dype og til dels ukjente — og de vokser for hver dag
            som går.
          </p>
          <p>
            På hvalens kropp lyser et konstellasjonsmønster. Punkter forbundet av linjer — som stjerner
            på nattehimmelen, som noder i et nevralt nettverk, som muligheter som venter på å bli
            oppdaget og koblet sammen. Rundt hvalen flyter binærtall — teknologiens grunnspråk — som
            minner om at dette er en fremtid bygget på data, logikk og læring.
          </p>
          <p>
            Men hvalen svømmer ikke stresset. Den beveger seg med ro og retning. Det er Lillehvals
            tilnærming: ikke overvelme, ikke selge frykt — men guide, forklare og hjelpe bedrifter å
            finne sin vei i et landskap som stadig endrer seg.
          </p>
          <p>Hvalen svømmer inn i reisen — og leder deg fremover.</p>
          <p>
            Fra hvalens hode strekker reise-symbolet seg ut foran den — fem noder forbundet av linjer
            som beveger seg opp og ned. Det er ikke en rett linje. Det er en reise med spørsmål,
            erkjennelse og gjennombrudd. Slik ser den virkelige AI-reisen ut for norske bedrifter.
          </p>
          <p>
            Fargene i reise-symbolet bærer historien. Det starter i amber og gull — fargen på
            usikkerhet, spørsmålstegn og potensialet som ennå ikke er grepet. Det er der de fleste
            norske bedrifter befinner seg i dag: de ser AI-bølgen, men vet ikke helt hvor de skal
            begynne. Gradvis beveger fargene seg gjennom lysegrønt — erkjennelse, nysgjerrighet, de
            første stegene — og ender i dyp mørkgrønt: klarhet, handling og målbare resultater.
          </p>
          <p>Den siste og største noden er endepunktet. Det er dit Lillehval hjelper deg.</p>
          <p>
            Lillehval hjelper deg å se mønsteret i mulighetene, prioritere de riktige og implementere
            det som gir raskest og størst verdi for din bedrift. En partner som holder seg i front,
            forstår hva som kommer, og hjelper deg å gripe det når det er riktig for deg.
          </p>
          <p className="font-medium text-[#1a3320]">
            Fra der du er i dag — til dit du vil. Vi er guiden.
          </p>
          </div>
        </div>
      </div>
    </div>
  );
}
