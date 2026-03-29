import UseCases from "../components/UseCases";
import Challenges from "../components/Challenges";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI-tjenester – Lillehval",
  description: "Fire tjenesteområder og hva AI kan gjøre for deg.",
};

export default function AITjenester() {
  return (
    <main>
      <UseCases />
      <Challenges />
    </main>
  );
}
