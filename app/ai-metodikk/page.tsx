import Phases from "../components/Phases";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-metodikk – Lillehval",
  description: "AI-reisen i seks faser. Fra forvirring til full utnyttelse.",
};

export default function AIMetodikk() {
  return (
    <main>
      <Phases />
    </main>
  );
}
