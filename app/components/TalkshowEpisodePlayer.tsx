"use client";

import { useCallback, useState } from "react";

type Props = {
  youtubeId: string | undefined;
  posterSrc: string;
  localSrc: string;
  title: string;
};

export default function TalkshowEpisodePlayer({ youtubeId, posterSrc, localSrc, title }: Props) {
  const [localFailed, setLocalFailed] = useState(false);

  const onLocalError = useCallback(() => {
    setLocalFailed(true);
  }, []);

  if (youtubeId) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[rgba(26,51,32,0.12)] bg-black shadow-lg">
        <iframe
          title={title}
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  if (!localFailed) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[rgba(26,51,32,0.12)] bg-black shadow-lg">
        <video
          className="h-full w-full object-contain"
          controls
          playsInline
          preload="metadata"
          poster={posterSrc}
          onError={onLocalError}
        >
          <source src={localSrc} type="video/mp4" />
        </video>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border border-dashed border-[rgba(26,51,32,0.25)] bg-white/60 px-6 py-10 text-center"
      style={{ color: "#1a3320" }}
    >
      <p className="text-sm font-semibold text-[#15803d]">Video ikke tilgjengelig ennå</p>
      <p className="mt-3 text-sm leading-relaxed opacity-85">
        Legg innspilt episode som <code className="rounded bg-[rgba(26,51,32,0.08)] px-1.5 py-0.5 text-xs">public/videos/lillehval-talkshow-ep1.mp4</code>, eller sett miljøvariabelen{" "}
        <code className="rounded bg-[rgba(26,51,32,0.08)] px-1.5 py-0.5 text-xs">NEXT_PUBLIC_TALKSHOW_EP1_YOUTUBE_ID</code>{" "}
        til YouTube-videoens ID.
      </p>
    </div>
  );
}
