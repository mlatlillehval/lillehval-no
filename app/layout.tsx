import type { Metadata } from "next";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import NeuralNetworkBackground from "./components/NeuralNetworkBackground";
import SocialMediaLinks from "./components/SocialMediaLinks";
import CtaBand from "./components/CtaBand";
import { getSiteUrl } from "@/lib/site-url";
import {
  HEIN_EMAIL,
  HEIN_LINKEDIN_URL,
  HEIN_PHONE_DISPLAY,
  HEIN_PHONE_TEL,
  MARIUS_EMAIL,
  MARIUS_LINKEDIN_URL,
  MARIUS_PHONE_DISPLAY,
  MARIUS_PHONE_TEL,
} from "./data/siteContact";

const WWF_KNOLHVAL_URL = "https://www.wwf.no/dyreleksikon/kn%C3%B8lhval";

const defaultTitle = "Lillehval – AI-rådgivning for norske bedrifter";
const defaultDescription =
  "Vi hjelper norske bedrifter navigere AI-reisen. Fra forståelse til full utnyttelse.";

const siteBase = getSiteUrl();
const canonicalUrl = new URL("/", siteBase).toString();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteBase),
  title: {
    default: defaultTitle,
    template: "%s – Lillehval",
  },
  description: defaultDescription,
  alternates: {
    canonical: canonicalUrl,
  },
  openGraph: {
    type: "website",
    locale: "nb_NO",
    siteName: "Lillehval",
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
    images: [
      {
        url: "/lillehval-logo-v4.svg",
        width: 800,
        height: 200,
        alt: "Lillehval",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="no"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NeuralNetworkBackground />
        <Navbar />

        {children}
        <CtaBand />

        <footer
          className="relative z-10 isolate mt-auto py-8 px-6 text-sm"
          style={{
            background: "#e8e2d4",
            borderTop: "2px solid rgba(34, 139, 70, 0.2)",
            color: "rgba(26, 51, 32, 0.75)",
          }}
        >
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 xl:gap-10 text-center sm:text-left items-start">
            <div className="space-y-1.5">
              <p className="font-semibold text-[#1a3320]">Marius Langsrud</p>
              <p>
                <span className="text-[rgba(26,51,32,0.65)]">Telefon: </span>
                <a
                  href={`tel:${MARIUS_PHONE_TEL}`}
                  className="font-semibold underline-offset-2 hover:underline"
                  style={{ color: "#15803d" }}
                >
                  {MARIUS_PHONE_DISPLAY}
                </a>
              </p>
              <p>
                <span className="text-[rgba(26,51,32,0.65)]">E-post: </span>
                <a
                  href={`mailto:${MARIUS_EMAIL}`}
                  className="font-semibold underline-offset-2 hover:underline break-all"
                  style={{ color: "#15803d" }}
                >
                  {MARIUS_EMAIL}
                </a>
              </p>
              <p>
                <span className="text-[rgba(26,51,32,0.65)]">LinkedIn: </span>
                <a
                  href={MARIUS_LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold underline-offset-2 hover:underline"
                  style={{ color: "#15803d" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Profil
                </a>
              </p>
            </div>
            <div className="space-y-1.5">
              <p className="font-semibold text-[#1a3320]">Hein Torgersen</p>
              <p>
                <span className="text-[rgba(26,51,32,0.65)]">Telefon: </span>
                <a
                  href={`tel:${HEIN_PHONE_TEL}`}
                  className="font-semibold underline-offset-2 hover:underline"
                  style={{ color: "#15803d" }}
                >
                  {HEIN_PHONE_DISPLAY}
                </a>
              </p>
              <p>
                <span className="text-[rgba(26,51,32,0.65)]">E-post: </span>
                <a
                  href={`mailto:${HEIN_EMAIL}`}
                  className="font-semibold underline-offset-2 hover:underline break-all"
                  style={{ color: "#15803d" }}
                >
                  {HEIN_EMAIL}
                </a>
              </p>
              <p>
                <span className="text-[rgba(26,51,32,0.65)]">LinkedIn: </span>
                <a
                  href={HEIN_LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold underline-offset-2 hover:underline"
                  style={{ color: "#15803d" }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  Profil
                </a>
              </p>
            </div>
            <div className="space-y-2 md:col-span-2 lg:col-span-1 w-full md:max-w-lg md:mx-auto lg:max-w-none lg:mx-0">
              <a
                href={WWF_KNOLHVAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-lg outline-offset-4 transition-opacity hover:opacity-90"
              >
                <Image
                  src="/wwf-panda-logo.png"
                  alt="WWF"
                  width={48}
                  height={48}
                  className="h-11 w-11 shrink-0 object-contain"
                />
                <span className="font-semibold text-left text-[#1a3320]">WWF Verdens naturfond</span>
              </a>
              <p className="leading-snug text-[rgba(26,51,32,0.8)]">
                Havet trenger stemmer.{" "}
                <a
                  href={WWF_KNOLHVAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline-offset-2 hover:underline"
                  style={{ color: "#15803d" }}
                >
                  Les om knølhvalen og bli havfadder
                </a>{" "}
                — støtt WWF sitt arbeid for hav og natur.
              </p>
            </div>
            <div className="lg:justify-self-end lg:pt-0 pt-2 border-t border-[rgba(34,139,70,0.15)] lg:border-t-0 w-full md:col-span-2 lg:col-span-1 md:max-lg:flex md:max-lg:justify-center">
              <SocialMediaLinks compact />
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
