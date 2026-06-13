import {
  HEIN_EMAIL,
  HEIN_LINKEDIN_URL,
  HEIN_PHONE_TEL,
  MARIUS_EMAIL,
  MARIUS_LINKEDIN_URL,
  MARIUS_PHONE_TEL,
} from "./siteContact";

export type Founder = {
  id: "marius" | "hein";
  name: string;
  jobTitle: string;
  image: string;
  email: string;
  telephone: string;
  linkedin: string;
  description: string;
};

export const FOUNDERS: Founder[] = [
  {
    id: "marius",
    name: "Marius Langsrud",
    jobTitle: "Medgründer & AI-rådgiver",
    image: "/illustration-marius.jpg",
    email: MARIUS_EMAIL,
    telephone: MARIUS_PHONE_TEL,
    linkedin: MARIUS_LINKEDIN_URL,
    description:
      "Rådgiver og forretningsutvikler med over 15 års erfaring fra PwC og Komplett.no. Hjelper norske bedrifter med AI-strategi, prosessforbedring og implementering.",
  },
  {
    id: "hein",
    name: "Hein Torgersen",
    jobTitle: "Medgründer & AI-rådgiver",
    image: "/illustration-hein-akvarell.png",
    email: HEIN_EMAIL,
    telephone: HEIN_PHONE_TEL,
    linkedin: HEIN_LINKEDIN_URL,
    description:
      "Senior Product Manager med 13 års SaaS-erfaring. Bygger praktiske AI-løsninger for norske bedrifter med fokus på produksjon, ikke bare pilot.",
  },
];
