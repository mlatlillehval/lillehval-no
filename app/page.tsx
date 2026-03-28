import Hero from "./components/Hero";
import Challenges from "./components/Challenges";
import AITimeline from "./components/AITimeline";
import MarqueeSection from "./components/MarqueeSection";
import Phases from "./components/Phases";
import NewsSection from "./components/NewsSection";
import WhyUs from "./components/WhyUs";

export default function Home() {
  return (
    <main>
      <Hero />
      <Challenges />
      <AITimeline />
      <MarqueeSection />
      <Phases />
      <NewsSection />
      <WhyUs />
    </main>
  );
}
