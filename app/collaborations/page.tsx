import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Tufted from "@/components/Tufted";
import Reveal from "@/components/Reveal";
import {
  COLLABS,
  SKATEGROUNDS as SG,
  SKATEGROUNDS_PHOTOS as SG_PHOTO,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Collaborations",
  description:
    "RugRuff has worked with musicians, brands and creators including Overtonight, Skategrounds, Cdp Media, Phantom Kai Boots and Liam Abner Magic.",
};

export default function CollaborationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Collaborations"
        title="Worked With Many Brands & Influencers"
        lead="Giveaways, meetups and one-off pieces made with people I like working with."
      />

      <section className="shell space-y-8 pt-20 md:space-y-10 md:pt-28">
        <Reveal>
          <Link
            href="/collaborations/overtonight"
            className="theme-overtonight night-grid card-lift group block overflow-hidden rounded-[1.75rem] border-[2.5px] border-ink px-6 py-10 text-white shadow-[0_6px_0_0_var(--color-ink)] md:px-12 md:py-14"
          >
            <div className="grid items-center gap-10 md:grid-cols-[1fr_1.05fr] md:gap-14">
              <Tufted
                src="/collabs/overtonight/photo-04.webp"
                alt="A hand resting on the thick pile of a pixel-style cat face rug"
                width={1125}
                height={1500}
                blob={3}
                seed="b"
                pile={16}
                accent="#c45b91"
                sizes="(max-width: 768px) 74vw, 34vw"
                className="mx-auto w-full max-w-xs"
                imgClassName="!h-auto"
              />
              <div>
                <p className="eyebrow !text-[#e7accb]">
                  <span aria-hidden="true" className="inline-block size-2.5 rounded-full bg-[#f1a7c9]" />
                  New &middot; Artist collaboration
                </p>
                <h2 className="text-big mt-3 font-display font-extrabold">
                  Overtonight
                </h2>
                <p className="mt-4 text-xl text-[#e1d7e2]">
                  Pixel-style artwork made into a custom rug for the musician,
                  then handed over under blue lights.
                </p>
                <span className="btn mt-8">
                  See the whole story
                  <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
        <Reveal>
          <Link
            href="/collaborations/skategrounds"
            className="theme-skate card card-lift group block overflow-hidden px-6 py-10 md:px-12 md:py-14"
          >
            <div className="grid items-center gap-10 md:grid-cols-[1fr_1.05fr] md:gap-14">
              <Tufted
                src={SG_PHOTO.rugHero.src}
                alt={SG_PHOTO.rugHero.alt}
                width={SG_PHOTO.rugHero.w}
                height={SG_PHOTO.rugHero.h}
                blob={2}
                seed="c"
                pile={16}
                accent="#cf0000"
                sizes="(max-width: 768px) 74vw, 34vw"
                className="mx-auto w-full max-w-xs"
                imgClassName="!h-auto"
              />

              <div>
                <p className="eyebrow">
                  <span
                    aria-hidden="true"
                    className="inline-block size-2.5 rounded-full bg-coral"
                  />
                  Featured &middot; {SG.partnerLabel}
                </p>
                <h2 className="text-big mt-3 font-display font-extrabold">
                  {SG.name}
                </h2>
                <p className="mt-4 text-xl text-ink-2">
                  A round tufted rug for the crew building a sensor that turns
                  skating into a game you play in real life.
                </p>
                <span className="btn mt-8">
                  See the whole story
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  >
                    &rarr;
                  </span>
                </span>
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      <section className="shell space-y-24 pt-24 md:space-y-32 md:pt-32">
        {COLLABS.map((c, i) => (
          <Reveal key={c.name}>
            <article
              className={`grid items-center gap-12 md:grid-cols-2 md:gap-16 ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <Tufted
                src={c.src}
                alt={c.alt}
                width={c.w}
                height={c.h}
                blob={((i % 4) + 1) as 1 | 2 | 3 | 4}
                seed={(["a", "b", "c"] as const)[i % 3]}
                pile={17}
                accent={c.color}
                sizes="(max-width: 768px) 82vw, 42vw"
                imgClassName="!h-auto"
              />

              <div>
                <p className="eyebrow">
                  Collab {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="text-big mt-3 font-display font-extrabold">
                  {c.name}
                </h2>
                {c.caption && (
                  <p className="mt-4 text-xl text-ink-2">{c.caption}</p>
                )}
                {c.href && (
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-grape mt-8"
                  >
                    {c.linkLabel}
                    <span aria-hidden="true">&#8599;</span>
                  </a>
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </section>

      <section className="shell pt-28 md:pt-36">
        <Reveal>
          <div className="card px-7 py-14 text-center md:px-14">
            <h2 className="text-big font-display font-extrabold">
              Brand or creator?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-lg text-ink-2">
              Open Minded And Easy To Work With — get in touch and let&rsquo;s
              make something.
            </p>
            <Link href="/contact" className="btn mt-8">
              Contact me
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
