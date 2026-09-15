import AeoCategoryView from "../components/AeoCategoryView";
import { AI_RADGIVNING } from "../data/aeoIntent";
import { createPageMetadata, OG_IMAGES } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: AI_RADGIVNING.path,
  title: "AI-rådgivning for norske bedrifter",
  description: AI_RADGIVNING.description,
  ogImage: OG_IMAGES.aiTjenester,
});

export default function AiRadgivningPage() {
  return <AeoCategoryView page={AI_RADGIVNING} />;
}
