import Image from "next/image";
import Link from "next/link";
import { getAllBlogPosts, getReadMinutes } from "../data/aiBlogPosts";
import { FOUNDERS } from "../data/founders";
import ForsideBloggKarusell from "./ForsideBloggKarusell";

export default function ForsideBevis() {
  const posts = getAllBlogPosts()
    .slice(0, 3)
    .map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      image: post.image,
      publishedLabel: new Date(post.publishedAt).toLocaleDateString("nb-NO", {
        dateStyle: "long",
      }),
      readMinutes: getReadMinutes(post),
    }));

  if (posts.length === 0) {
    return null;
  }

  return (
    <section
      className="relative z-10 px-6 py-16 sm:py-20 lg:px-12"
      aria-labelledby="forside-bevis-heading"
    >
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.9fr)] lg:items-start lg:gap-x-16">
        <div className="min-w-0">
          <h2
            id="forside-bevis-heading"
            className="m-0 text-2xl font-extrabold tracking-tight sm:text-3xl"
            style={{ color: "#1a3320" }}
          >
            Siste fra bloggen
          </h2>
          <ForsideBloggKarusell posts={posts} />
        </div>

        <div className="min-w-0">
          <h3
            className="m-0 text-xl font-extrabold tracking-tight"
            style={{ color: "#1a3320" }}
          >
            De du møter
          </h3>
          <p
            className="mt-3 text-sm leading-relaxed"
            style={{ color: "rgba(26,51,32,0.75)" }}
          >
            To partnere. Ingen AI-avdeling mellom dere og oss.
          </p>

          <ul className="mt-8 m-0 flex list-none flex-col gap-5 p-0">
            {FOUNDERS.map((person) => (
              <li key={person.id}>
                <Link
                  href="/hvorfor-oss"
                  className="focus-ring flex min-h-11 items-center gap-4 rounded-2xl p-3 no-underline transition-colors hover:bg-[rgba(21,128,61,0.06)]"
                >
                  <Image
                    src={person.image}
                    alt=""
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px] shrink-0 rounded-full object-cover"
                    style={{ border: "1px solid rgba(21,128,61,0.2)" }}
                  />
                  <span className="min-w-0">
                    <span
                      className="block text-base font-extrabold leading-snug"
                      style={{ color: "#1a3320" }}
                    >
                      {person.name}
                    </span>
                    <span
                      className="mt-0.5 block text-sm leading-snug"
                      style={{ color: "rgba(26,51,32,0.75)" }}
                    >
                      {person.jobTitle}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
