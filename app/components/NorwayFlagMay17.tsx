"use client";

import { useEffect, useState } from "react";

/** Viser norsk flagg 1.–17. mai for å markere grunnlovsdagen. */
export function useShowNorwayFlagMay17(): boolean {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const now = new Date();
    setShow(now.getMonth() === 4 && now.getDate() >= 1 && now.getDate() <= 17);
  }, []);

  return show;
}

type Props = {
  className?: string;
};

export default function NorwayFlagMay17({ className = "" }: Props) {
  return (
    <span
      className={`inline-flex shrink-0 items-center ${className}`.trim()}
      role="img"
      aria-label="17. mai — Grunnlovsdagen"
      title="17. mai"
    >
      <svg
        viewBox="0 0 22 16"
        xmlns="http://www.w3.org/2000/svg"
        className="h-[1.125rem] w-auto rounded-[2px] border border-[rgba(26,51,32,0.12)] shadow-sm sm:h-5"
        aria-hidden
      >
        <rect width="22" height="16" fill="#BA0C2F" />
        <rect x="6" width="4" height="16" fill="#FFFFFF" />
        <rect y="6" width="22" height="4" fill="#FFFFFF" />
        <rect x="7" width="2" height="16" fill="#00205B" />
        <rect y="7" width="22" height="2" fill="#00205B" />
      </svg>
    </span>
  );
}
