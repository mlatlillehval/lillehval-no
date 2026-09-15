import AeoCategoryView from "../components/AeoCategoryView";
import { AI_IMPLEMENTERING } from "../data/aeoIntent";
import { createPageMetadata, OG_IMAGES } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: AI_IMPLEMENTERING.path,
  title: "AI-implementering for norske bedrifter",
  description: AI_IMPLEMENTERING.description,
  ogImage: OG_IMAGES.aiForklart,
});

export default function AiImplementeringPage() {
  return <AeoCategoryView page={AI_IMPLEMENTERING} />;
}
