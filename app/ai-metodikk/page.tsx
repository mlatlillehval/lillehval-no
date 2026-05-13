import { permanentRedirect } from "next/navigation";

/** Tidligere egen side; illustrasjon og faser ligger under AI-reisen på /ai-tjenester. */
export default function AIMetodikkPage() {
  permanentRedirect("/ai-tjenester");
}
