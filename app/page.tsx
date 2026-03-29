import Hero from "./components/Hero";
import Challenges from "./components/Challenges";
import UseCases from "./components/UseCases";
import AITimeline from "./components/AITimeline";
import MarqueeSection from "./components/MarqueeSection";
import Phases from "./components/Phases";
import NewsSection from "./components/NewsSection";
import WhyUs from "./components/WhyUs";

export default function Home() {
  return (
    <main>
      <Hero />
      <AITimeline />
      <UseCases />
      <Challenges />
      <Phases />
      <MarqueeSection />
      <NewsSection />
      <WhyUs />
    </main>
  );
}
