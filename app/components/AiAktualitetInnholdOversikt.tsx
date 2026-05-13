import Image from "next/image";
import Link from "next/link";

const thumbClass =
  "relative shrink-0 overflow-hidden rounded-xl border border-[rgba(26,51,32,0.12)] bg-white/50 shadow-sm";

export default function AiAktualitetInnholdOversikt() {
  return (
    <div className="mt-20 border-t border-[rgba(26,51,32,0.1)] pt-16">
      <div className="mb-10 max-w-3xl">
        <h2 className="text-2xl font-extrabold tracking-tight text-[#1a3320] sm:text-3xl">Innhold fra ett talkshow</h2>
        <p className="mt-3 text-sm leading-relaxed text-[#1a3320]/80 sm:text-base">
          Vi tar utgangspunkt i én samtale i studio. Derfra lages{" "}
          <strong>én videoutsendelse</strong>, <strong>én lydversjon</strong> av samme innhold,{" "}
          <strong>ett nyhetsbrev</strong> med oppsummering og tips, og <strong>fem korte snutter</strong> til sosiale
          medier.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
        <article id="talkshow" className="scroll-mt-28 flex gap-4 sm:gap-5">
          <div className={`${thumbClass} h-[7.5rem] w-[11.5rem] sm:h-[8.5rem] sm:w-[13rem]`}>
            <Image
              src="/ai-aktualitet-talkshow.png"
              alt="Talkshow-video"
              width={208}
              height={130}
              className="h-full w-full object-cover object-center"
              sizes="208px"
            />
          </div>
          <div className="min-w-0 pt-0.5">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#15803d]">Talkshow</p>
            <h3 className="mt-1 text-lg font-extrabold text-[#1a3320] sm:text-xl">Video · ca. 15 min</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#1a3320]/75">
              Full episode med Ingvild som vert og Hein og Marius som gjester — som video.
            </p>
            <Link
              href="/siste-nyheter/talkshow"
              className="mt-3 inline-block text-sm font-bold text-[#15803d] underline-offset-2 hover:underline"
            >
              Se episode og manus →
            </Link>
          </div>
        </article>

        <article id="podcast" className="scroll-mt-28 flex gap-4 sm:gap-5">
          <div className={`${thumbClass} h-[7.5rem] w-[11.5rem] sm:h-[8.5rem] sm:w-[13rem]`}>
            <Image
              src="/ai-aktualitet-podcast.png"
              alt="Podcast lyd"
              width={208}
              height={130}
              className="h-full w-full object-cover object-center"
              sizes="208px"
            />
          </div>
          <div className="min-w-0 pt-0.5">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#15803d]">Podcast</p>
            <h3 className="mt-1 text-lg font-extrabold text-[#1a3320] sm:text-xl">Lyd · ca. 15 min</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#1a3320]/75">
              Samme samtale som talkshowet — kun lyd, til podkastspiller og lytting på farten.
            </p>
          </div>
        </article>

        <article id="nyhetsbrev" className="scroll-mt-28 flex gap-4 sm:gap-5 lg:col-span-2">
          <div className={`${thumbClass} h-[7.5rem] w-[11.5rem] sm:h-[8.5rem] sm:w-[13rem]`}>
            <Image
              src="/ai-aktualitet-nyhetsbrev.png"
              alt="Nyhetsbrev"
              width={208}
              height={130}
              className="h-full w-full object-cover object-center"
              sizes="208px"
            />
          </div>
          <div className="min-w-0 pt-0.5">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#15803d]">Nyhetsbrev</p>
            <h3 className="mt-1 text-lg font-extrabold text-[#1a3320] sm:text-xl">E-post · 1 utsendelse</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#1a3320]/75">
              AI-trender, konkrete tips og korte oppsummeringer knyttet til episoden — rett i innboksen.
            </p>
          </div>
        </article>

        <article id="shorts" className="scroll-mt-28 lg:col-span-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
            <div className="flex gap-2 sm:gap-2.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className={`relative ${thumbClass} h-[5.75rem] w-[3.25rem] sm:h-[6.5rem] sm:w-[3.5rem]`}
                >
                  <Image
                    src="/ai-aktualitet-shorts.png"
                    alt={`Short ${n} av fem`}
                    width={56}
                    height={100}
                    className="h-full w-full object-cover object-center"
                    sizes="56px"
                  />
                  <span
                    className="absolute bottom-1 right-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded bg-[#1a3320]/85 px-1 text-[10px] font-bold text-white"
                    aria-hidden
                  >
                    {n}
                  </span>
                </div>
              ))}
            </div>
            <div className="min-w-0 pt-0.5 sm:max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#15803d]">Shorts</p>
              <h3 className="mt-1 text-lg font-extrabold text-[#1a3320] sm:text-xl">5 korte snutter</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#1a3320]/75">
                Utklipp fra talkshowet — vertikale videoer til <strong>Instagram</strong>, <strong>TikTok</strong> og{" "}
                <strong>YouTube</strong> (Shorts / Reels). Én illustrasjon viser formatet; i praksis fem ulike klipp per
                episode.
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
