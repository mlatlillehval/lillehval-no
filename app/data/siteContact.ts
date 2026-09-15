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
/** Tjenesteområde — vi jobber on-site og digitalt i hele Norge. */
export const COMPANY_AREA_SERVED = "Norge";

/** Coworking-plass hos Friends at Work i Tønsberg sentrum. */
export const COMPANY_OFFICE = {
  venue: "Friends",
  street: "Storgata 30",
  postalCode: "3126",
  city: "Tønsberg",
  country: "NO",
  lat: 59.267172,
  lon: 10.407852,
  display: "Friends, Storgata 30, Tønsberg",
  mapTileSrc: "https://tile.openstreetmap.org/16/34662/19295.png",
  mapEmbedSrc:
    "https://maps.google.com/maps?q=Storgata+30%2C+3126+T%C3%B8nsberg&hl=nb&z=16&output=embed",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Storgata+30%2C+3126+T%C3%B8nsberg",
} as const;

/** Teamkort på /hvorfor-oss — én import i WhyUs */
export const TEAM_PHONES = {
  marius: { display: MARIUS_PHONE_DISPLAY, tel: MARIUS_PHONE_TEL },
  hein: { display: HEIN_PHONE_DISPLAY, tel: HEIN_PHONE_TEL },
} as const;
