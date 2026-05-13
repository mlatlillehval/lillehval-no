/**
 * Norske offentlige helligdager (virkedager som ikke kan bookes).
 * Fast dato + bevegelige dager fra påske. Alle sammenligninger bruker gregoriansk kalenderdato
 * via UTC middag for å unngå tidssonefeil på server (Vercel) og i nettleser.
 *
 * Inkluderer: nyttårsdag, skjærtorsdag, langfredag, 2. påskedag, 1. mai, 17. mai, Kristi himmelfartsdag,
 * 2. pinsedag, 1. og 2. juledag. (1. påskedag og 1. pinsedag faller alltid på søndag.)
 */

function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

/** Kalenderdato som YYYY-MM-DD (UTC-kanonisk dag). */
export function calendarKeyUtc(year: number, monthIndex: number, day: number): string {
  const t = new Date(Date.UTC(year, monthIndex, day, 12, 0, 0));
  return `${t.getUTCFullYear()}-${pad2(t.getUTCMonth() + 1)}-${pad2(t.getUTCDate())}`;
}

/** Påskedag (gregoriansk, vestlig beregning). Returnerer [år, måned 0-basert, dag] i UTC-kalender. */
export function easterSundayParts(year: number): [number, number, number] {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const monthMeeus = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  const monthIndex = monthMeeus - 1;
  const t = new Date(Date.UTC(year, monthIndex, day, 12, 0, 0));
  return [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()];
}

function addCalendarDaysUtc(y: number, m0: number, d: number, delta: number): [number, number, number] {
  const t = new Date(Date.UTC(y, m0, d + delta, 12, 0, 0));
  return [t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate()];
}

function partsToKey(parts: [number, number, number]): string {
  return calendarKeyUtc(parts[0], parts[1], parts[2]);
}

const holidaySetCache = new Map<number, Set<string>>();

function buildHolidayYmdSet(year: number): Set<string> {
  const s = new Set<string>();
  const addParts = (p: [number, number, number]) => {
    s.add(partsToKey(p));
  };

  addParts([year, 0, 1]);

  const e = easterSundayParts(year);
  addParts(addCalendarDaysUtc(e[0], e[1], e[2], -3));
  addParts(addCalendarDaysUtc(e[0], e[1], e[2], -2));
  addParts(addCalendarDaysUtc(e[0], e[1], e[2], 1));

  addParts([year, 4, 1]);
  addParts([year, 4, 17]);

  addParts(addCalendarDaysUtc(e[0], e[1], e[2], 39));
  addParts(addCalendarDaysUtc(e[0], e[1], e[2], 50));

  addParts([year, 11, 25]);
  addParts([year, 11, 26]);

  return s;
}

export function getNorwegianPublicHolidayYmdSet(year: number): Set<string> {
  let set = holidaySetCache.get(year);
  if (!set) {
    set = buildHolidayYmdSet(year);
    holidaySetCache.set(year, set);
  }
  return set;
}

/** Søndag/lørdag for denne kalenderdatoen (UTC middag). */
export function isWeekendUtc(year: number, monthIndex: number, day: number): boolean {
  const w = new Date(Date.UTC(year, monthIndex, day, 12, 0, 0)).getUTCDay();
  return w === 0 || w === 6;
}

export function isNorwegianPublicHolidayUtc(year: number, monthIndex: number, day: number): boolean {
  const key = calendarKeyUtc(year, monthIndex, day);
  const y = Number(key.slice(0, 4));
  return getNorwegianPublicHolidayYmdSet(y).has(key);
}

/** Dagens dato i Europe/Oslo som YYYY-MM-DD (for sammenligning med ønsket dato). */
export function todayYmdOslo(now: Date = new Date()): string {
  return now.toLocaleDateString("sv-SE", { timeZone: "Europe/Oslo" });
}

/** True hvis datoen ikke kan bookes: fortid (Oslo), helg eller norsk helligdag. */
export function isBlockedBookingDayUtc(
  year: number,
  monthIndex: number,
  day: number,
  now: Date = new Date()
): boolean {
  const key = calendarKeyUtc(year, monthIndex, day);
  if (key < todayYmdOslo(now)) return true;
  if (isWeekendUtc(year, monthIndex, day)) return true;
  if (isNorwegianPublicHolidayUtc(year, monthIndex, day)) return true;
  return false;
}

/** Parser YYYY-MM-DD som kalenderdato (ikke UTC-midnatt-skift). */
export function parseYmdParts(ymd: string): { y: number; m: number; d: number } | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(ymd.trim());
  if (!match) return null;
  const y = Number(match[1]);
  const mo = Number(match[2]);
  const d = Number(match[3]);
  if (!Number.isFinite(y) || !Number.isFinite(mo) || !Number.isFinite(d)) return null;
  if (mo < 1 || mo > 12 || d < 1 || d > 31) return null;
  return { y, m: mo - 1, d };
}
