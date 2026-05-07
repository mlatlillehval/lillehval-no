import Hero from "./components/Hero";
import SalesPitch from "./components/SalesPitch";
import { getFrontpageCopy } from "./data/getFrontpageCopy";

export default async function Home() {
  const initialCopy = await getFrontpageCopy();

  return (
    <main>
      <Hero initialCopy={initialCopy} />
      <SalesPitch initialCopy={initialCopy} />
    </main>
  );
}
