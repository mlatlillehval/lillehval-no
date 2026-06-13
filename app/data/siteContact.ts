/** Marius Langsrud — brukes i navigasjon og footer som hovedkontakt */
export const MARIUS_PHONE_DISPLAY = "+47 48 16 55 93";
export const MARIUS_PHONE_TEL = "+4748165593";
export const MARIUS_EMAIL = "ml@lillehval.no";
/** Oppdater til riktig profil-URL */
export const MARIUS_LINKEDIN_URL = "https://www.linkedin.com/in/marius-langsrud";

/** Hein Torgersen */
export const HEIN_PHONE_DISPLAY = "+47 95 47 67 77";
export const HEIN_PHONE_TEL = "+4795476777";
export const HEIN_EMAIL = "ht@lillehval.no";
/** Oppdater til riktig profil-URL */
export const HEIN_LINKEDIN_URL = "https://www.linkedin.com/in/hein-torgersen";

/** Synlig i header og footer (samme som Marius) */
export const SITE_PHONE_DISPLAY = MARIUS_PHONE_DISPLAY;
export const SITE_PHONE_TEL = MARIUS_PHONE_TEL;

export const COMPANY_NAME = "Lillehval AS";
export const COMPANY_TAGLINE = "Norsk AI-rådgivning for bedrifter";
/** Ingen fast kontoradresse — vi jobber on-site og digitalt i hele Norge. */
export const COMPANY_AREA_SERVED = "Norge";

/** Teamkort på /hvorfor-oss — én import i WhyUs */
export const TEAM_PHONES = {
  marius: { display: MARIUS_PHONE_DISPLAY, tel: MARIUS_PHONE_TEL },
  hein: { display: HEIN_PHONE_DISPLAY, tel: HEIN_PHONE_TEL },
} as const;
