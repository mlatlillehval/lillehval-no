import Hero from "./components/Hero";
import PageShell from "./components/PageShell";
import SalesPitch from "./components/SalesPitch";
import { getFrontpageCopy } from "./data/getFrontpageCopy";

export default async function Home() {
  const initialCopy = await getFrontpageCopy();

  return (
    <PageShell>
      <main>
        <Hero initialCopy={initialCopy} />
        <SalesPitch initialCopy={initialCopy} />
      </main>
    </PageShell>
  );
}
