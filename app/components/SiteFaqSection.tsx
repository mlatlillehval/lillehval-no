import type { FaqItem } from "@/lib/seo";

type Props = {
  faqs: FaqItem[];
  heading?: string;
  intro?: string;
  headingLevel?: "h1" | "h2";
};

export default function SiteFaqSection({
  faqs,
  heading = "Ofte stilte spørsmål",
  intro = "Korte svar om Lillehval og hvordan vi jobber med AI i norske bedrifter.",
  headingLevel = "h1",
}: Props) {
  const HeadingTag = headingLevel;

  return (
    <section className="py-16 px-6" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto">
        <HeadingTag
          id="faq-heading"
          className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1a3320] mb-3"
        >
          {heading}
        </HeadingTag>
        {intro ? (
          <p className="text-base leading-relaxed text-[rgba(26,51,32,0.8)] mb-10">{intro}</p>
        ) : null}
        <dl className="space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="text-lg font-bold text-[#1a3320] mb-2">{faq.question}</dt>
              <dd className="text-base leading-relaxed text-[rgba(26,51,32,0.85)]">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
