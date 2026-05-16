import Link from "next/link";
import PageShell from "../../components/PageShell";
import TalkshowEpisodePlayer from "../../components/TalkshowEpisodePlayer";
import { TALKSHOW_EPISODE_1 } from "../../data/talkshowEpisode1";
import { createPageMetadata } from "@/lib/seo";

const youtubeId = process.env.NEXT_PUBLIC_TALKSHOW_EP1_YOUTUBE_ID;

export const metadata = createPageMetadata({
  path: "/siste-nyheter/talkshow",
  title: TALKSHOW_EPISODE_1.title,
  description: TALKSHOW_EPISODE_1.topicLead,
});

export default function TalkshowEpisodePage() {
  return (
    <PageShell>
      <main className="min-h-screen px-6 py-16" style={{ background: "#e8e2d4" }}>
      <article className="mx-auto max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#15803d]">Talkshow · ca. {TALKSHOW_EPISODE_1.durationMin} min</p>
        <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-[#1a3320] sm:text-4xl">{TALKSHOW_EPISODE_1.title}</h1>
        <p className="mt-4 text-base leading-relaxed text-[#1a3320]/85">{TALKSHOW_EPISODE_1.topicLead}</p>
        <p className="mt-3 text-sm text-[#1a3320]/65">
          Vert: <strong>{TALKSHOW_EPISODE_1.host}</strong> · Gjester:{" "}
          {TALKSHOW_EPISODE_1.guests.join(" og ")}
        </p>

        <div className="mt-10">
          <TalkshowEpisodePlayer
            youtubeId={youtubeId}
            posterSrc="/ai-aktualitet-talkshow.png"
            localSrc="/videos/lillehval-talkshow-ep1.mp4"
            title={TALKSHOW_EPISODE_1.title}
          />
        </div>

        <details className="mt-12 rounded-2xl border border-[rgba(26,51,32,0.12)] bg-white/50 px-5 py-4">
          <summary className="cursor-pointer text-sm font-bold text-[#1a3320]">Episode-manus (til innspilling)</summary>
          <div className="mt-6 space-y-10 border-t border-[rgba(26,51,32,0.08)] pt-6">
            {TALKSHOW_EPISODE_1.script.map((block) => (
              <section key={block.title}>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#15803d]">{block.approxMin}</p>
                <h2 className="mt-1 text-lg font-extrabold text-[#1a3320]">{block.title}</h2>
                <div className="mt-3 space-y-4 text-sm leading-relaxed text-[#1a3320]/90">
                  {block.lines.map((line, i) => (
                    <p key={i}>
                      <span className="font-bold text-[#1a3320]">{line.who}:</span> {line.text}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </details>

        <p className="mt-10 text-center text-sm">
          <Link href="/siste-nyheter#talkshow" className="font-semibold text-[#15803d] underline-offset-2 hover:underline">
            ← Tilbake til AI aktualitet
          </Link>
        </p>
      </article>
    </main>
    </PageShell>
  );
}
