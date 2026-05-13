/** Tillatte møtetider (hele timer), kl. 10–14 inkl. */
export const MOETE_TID_SLOTS = ["10:00", "11:00", "12:00", "13:00", "14:00"] as const;

export type MoeteTidSlot = (typeof MOETE_TID_SLOTS)[number];

export function isAllowedMoeteTid(tid: string): boolean {
  const t = tid.trim();
  return (MOETE_TID_SLOTS as readonly string[]).includes(t);
}
