import type { Metadata } from "next";
import Link from "next/link";
import Tufted from "@/components/Tufted";
import Reveal from "@/components/Reveal";
import ArrowTrail from "@/components/skategrounds/ArrowTrail";
import { Sticker, BurstSticker } from "@/components/skategrounds/Sticker";
import {
  SKATEGROUNDS as SG,
  SKATEGROUNDS_PHOTOS as PHOTO,
  SKATEGROUNDS_SPECS,
} from "@/lib/site";

export const metadata: Metadata = {
  title: "Skategrounds",
  description:
    "A round hand-tufted rug made with Skategrounds, the Utah crew building a sensor that turns skateboarding into a game you play in real life.",
};

/* ------------------------------------------------------------------ */

/**
 * A strip of tape running across the page. Same mechanism as the site's
 * LoopMarquee — COPIES groups sliding left by exactly one group — so the
 * shared `marquee` keyframes (which translate -20%) stay correct.
 */
const TICKER = ["Send It", "Land It", "Tufted In Denver", "One Of One"];
const COPIES = 5;

function GripTicker() {
  return (
    <div className="overflow-hidden border-y-[2.5px] border-coral-deep bg-coral py-3 text-white">
      <div className="marquee-track flex w-max">
        {Array.from({ length: COPIES }, (_, copy) => (
          <div
            key={copy}
            aria-hidden={copy > 0 || undefined}
            className="flex shrink-0 items-center gap-6 pr-6 md:gap-10 md:pr-10"
          >
            {TICKER.map((word) => (
              <span
                key={word}
                className="flex shrink-0 items-center gap-6 font-display text-lg font-extrabold uppercase tracking-tight md:gap-10 md:text-xl"
              >
                {word}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="size-4 shrink-0"
                  fill="currentColor"
                >
                  <path d="M12 0 14.5 9.5 24 12 14.5 14.5 12 24 9.5 14.5 0 12 9.5 9.5Z" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Section heading block, so the two big sections stay typographically identical. */
function SectionHead({
  step,
  eyebrow,
  title,
  children,
  dark = false,
}: {
  step: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <Reveal>
      <p className={`eyebrow ${dark ? "!text-white/60" : ""}`}>
        <span
          aria-hidden="true"
          className="inline-flex size-6 items-center justify-center rounded-full bg-coral font-display text-[0.6875rem] text-white"
        >
          {step}
        </span>
        {eyebrow}
      </p>
      <h2
        className={`text-big mt-4 max-w-2xl font-display font-extrabold ${
          dark ? "text-white" : ""
        }`}
      >
        {title}
      </h2>
      <div
        className={`mt-5 max-w-xl space-y-4 text-lg leading-relaxed ${
          dark ? "text-white/70" : "text-ink-2"
        }`}
      >
        {children}
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */

export default function SkategroundsPage() {
  return (
    // One class swaps --color-coral to the Skategrounds red for everything
    // below it: buttons, the eyebrow dots, the ticker, the scroll arrow.
    <div className="theme-skate">
      {/* ---- Hero ---------------------------------------------------- */}
      <section className="relative pb-16 pt-10 md:pt-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20"
        >
          <div className="absolute -left-28 -top-24 size-[26rem] rounded-full bg-coral/25 blur-3xl" />
          <div className="absolute -right-24 top-10 size-[20rem] rounded-full bg-ink/10 blur-3xl" />
        </div>

        <div className="shell">
          <div className="grid items-center gap-14 md:grid-cols-[1.1fr_1fr] md:gap-16">
            <div>
              <Reveal>
                <p className="eyebrow">
                  <span
                    aria-hidden="true"
                    className="inline-block size-2.5 rounded-full bg-coral"
                  />
                  Collaboration &middot; {SG.partnerLabel}
                </p>
                <h1 className="text-huge mt-4 font-display font-extrabold">
                  Skategrounds
                  <span className="text-coral"> &times; </span>
                  RugRuff
                </h1>
              </Reveal>

              <Reveal delay={90}>
                <p className="mt-7 max-w-xl text-xl leading-relaxed text-ink-2">
                  Skategrounds are building a sensor that turns skating into a
                  game you play in real life. They needed their mark made
                  physical &mdash; so it got tufted by hand, cut round, and
                  finished with the fat white pile edge every RugRuff piece
                  gets.
                </p>
              </Reveal>

              <Reveal delay={150}>
                <div className="mt-9 flex flex-wrap gap-4">
                  <a
                    href={SG.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn"
                  >
                    skategrounds.tech
                    <span aria-hidden="true">&#8599;</span>
                  </a>
                  <a
                    href={SG.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-plain"
                  >
                    {SG.instagramHandle}
                    <span aria-hidden="true">&#8599;</span>
                  </a>
                </div>
              </Reveal>
            </div>

            {/* The rug itself, with vinyl slapped around it. */}
            <Reveal delay={120}>
              <div className="relative mx-auto max-w-md">
                <Tufted
                  src={PHOTO.rugHero.src}
                  alt={PHOTO.rugHero.alt}
                  width={PHOTO.rugHero.w}
                  height={PHOTO.rugHero.h}
                  blob={2}
                  seed="c"
                  pile={20}
                  accent="#cf0000"
                  eager
                  sizes="(max-width: 768px) 84vw, 40vw"
                  imgClassName="!h-auto"
                />

                <BurstSticker
                  tilt={-12}
                  size={116}
                  className="absolute -left-6 -top-6 md:-left-10"
                >
                  One of one
                </BurstSticker>

                <Sticker
                  tilt={7}
                  bg="#131316"
                  fg="#fff"
                  className="absolute -bottom-3 -right-2 md:-right-8"
                >
                  Hand tufted
                </Sticker>

                <Sticker
                  variant="round"
                  tilt={-16}
                  bg="#ffc300"
                  className="absolute -bottom-6 left-2 w-[4.6rem] text-[0.625rem] leading-[1.15] md:left-0"
                >
                  Round
                  <br />
                  cut
                </Sticker>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <GripTicker />

      {/* ---- The weaving trail --------------------------------------- */}
      <ArrowTrail>
        {/* ---- 01 · The rug ------------------------------------------ */}
        <section className="shell pt-24 md:pt-32">
          <SectionHead step="01" eyebrow="The Rug" title="Their Mark, Made In Yarn">
            <p>
              Black over red, cut to a circle rather than a rectangle, then
              bound and backed so it can actually live on a floor. The white
              edge is the part that takes longest &mdash; it is trimmed by hand
              until the pile stands up on its own.
            </p>
          </SectionHead>

          <div className="mt-20 space-y-24 md:mt-24 md:space-y-32">
            {/* Photo — left */}
            <article className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <div data-arrow-stop className="relative mx-auto w-full max-w-[17.5rem] sm:max-w-sm">
                <Tufted
                  src={PHOTO.pileEdge.src}
                  alt={PHOTO.pileEdge.alt}
                  width={PHOTO.pileEdge.w}
                  height={PHOTO.pileEdge.h}
                  blob={1}
                  seed="a"
                  pile={17}
                  accent="#cf0000"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 82vw, 40vw"
                  imgClassName="!h-auto"
                />
                <Sticker
                  tilt={-8}
                  className="absolute -right-3 top-6 md:-right-6"
                >
                  Pile up close
                </Sticker>
              </div>

              <Reveal>
                <h3 className="font-display text-3xl font-extrabold md:text-4xl">
                  A Two-Tone Face
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-ink-2">
                  The red sits low and dense, the black above it, and the two
                  meet on a clean line straight across the middle &mdash; no
                  gap, no bleed between the colours.
                </p>
              </Reveal>
            </article>

            {/* Photo — right */}
            <article className="grid items-center gap-10 md:grid-cols-2 md:gap-16 md:[&>*:first-child]:order-2">
              <div data-arrow-stop className="relative mx-auto w-full max-w-[17.5rem] sm:max-w-sm">
                <Tufted
                  src={PHOTO.label.src}
                  alt={PHOTO.label.alt}
                  width={PHOTO.label.w}
                  height={PHOTO.label.h}
                  blob={3}
                  seed="b"
                  pile={17}
                  accent="#131316"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 82vw, 40vw"
                  imgClassName="!h-auto"
                />
                <Sticker
                  tilt={9}
                  bg="#131316"
                  fg="#fff"
                  className="absolute -left-3 bottom-8 md:-left-7"
                >
                  Signed &amp; labelled
                </Sticker>
              </div>

              <Reveal>
                <h3 className="font-display text-3xl font-extrabold md:text-4xl">
                  Finished, Not Just Made
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-ink-2">
                  Every piece leaves with a woven label sewn into the edge. It
                  is the last thing that goes on, and the easiest way to tell a
                  real one.
                </p>
              </Reveal>
            </article>

            {/* Photo — left */}
            <article className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <div data-arrow-stop className="relative mx-auto w-full max-w-[17.5rem] sm:max-w-sm">
                <Tufted
                  src={PHOTO.rugBack.src}
                  alt={PHOTO.rugBack.alt}
                  width={PHOTO.rugBack.w}
                  height={PHOTO.rugBack.h}
                  blob={4}
                  seed="c"
                  pile={17}
                  accent="#cf0000"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 82vw, 40vw"
                  imgClassName="!h-auto"
                />
                <Sticker tilt={-6} className="absolute -right-3 bottom-6 md:-right-6">
                  Non-slip back
                </Sticker>
              </div>

              <Reveal>
                <h3 className="font-display text-3xl font-extrabold md:text-4xl">
                  Built To Get Stood On
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-ink-2">
                  Glued, backed and bound all the way round. It stays where you
                  put it, and the pile does not shed when it gets walked on in
                  skate shoes.
                </p>
              </Reveal>
            </article>
          </div>
        </section>

        {/* ---- 02 · The sensor --------------------------------------- */}
        <section className="griptape relative mt-28 border-y-[2.5px] border-ink py-24 md:mt-36 md:py-32">
          <div className="shell">
            <SectionHead
              step="02"
              eyebrow="What Skategrounds Build"
              title="A Sensor That Knows You Landed It"
              dark
            >
              <p>
                It bolts under the baseplate of your front truck using the
                bolts you already have &mdash; nothing gets drilled and nothing
                gets modified. From there it reads every flip you throw and
                works out, on its own, whether you rode away from it.
              </p>
              <p>
                That turns a session into something you can actually look back
                at: a timeline of what you tried, replays of the tricks in 3D,
                and a running count against the 564 in the book.
              </p>
            </SectionHead>

            {/* Photo sits right here, between two left-hand photos, so the
                trail keeps alternating sides instead of running dead straight
                down the page for three stops. */}
            <div className="mt-16 grid items-center gap-14 md:grid-cols-2 md:gap-16 md:[&>*:first-child]:order-2">
              <div
                data-arrow-stop
                className="relative mx-auto w-full max-w-[17.5rem] sm:max-w-sm"
              >
                <Tufted
                  src={PHOTO.sensorCloseup.src}
                  alt={PHOTO.sensorCloseup.alt}
                  width={PHOTO.sensorCloseup.w}
                  height={PHOTO.sensorCloseup.h}
                  blob={2}
                  seed="a"
                  pile={18}
                  accent="#cf0000"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 82vw, 40vw"
                  imgClassName="!h-auto"
                />
                <BurstSticker
                  tilt={10}
                  size={104}
                  className="absolute -right-5 -top-7 md:-right-9"
                >
                  Bolts on
                </BurstSticker>
                <Sticker
                  tilt={-7}
                  bg="#cf0000"
                  fg="#fff"
                  className="absolute -bottom-3 -left-3 md:-left-7"
                >
                  No drilling
                </Sticker>
              </div>

              <Reveal delay={80}>
                <dl className="grid grid-cols-2 gap-3">
                  {SKATEGROUNDS_SPECS.map((spec) => (
                    <div
                      key={spec.label}
                      className="rounded-2xl border-[2.5px] border-white/25 bg-white/5 px-4 py-5"
                    >
                      <dt className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-white/50">
                        {spec.label}
                      </dt>
                      <dd className="mt-2 font-display text-2xl font-extrabold text-white">
                        {spec.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                <a
                  href={SG.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn mt-8"
                >
                  {SG.callToAction}
                  <span aria-hidden="true">&#8599;</span>
                </a>
              </Reveal>
            </div>

            {/* The same sensor on Caleb's own board — a left-hand stop, so the
                trail crosses back before it leaves the dark section. */}
            <div className="mt-24 grid items-center gap-14 md:grid-cols-2 md:gap-16">
              <div
                data-arrow-stop
                className="relative mx-auto w-full max-w-[17.5rem] sm:max-w-sm"
              >
                <Tufted
                  src={PHOTO.sensor.src}
                  alt={PHOTO.sensor.alt}
                  width={PHOTO.sensor.w}
                  height={PHOTO.sensor.h}
                  blob={4}
                  seed="c"
                  pile={18}
                  accent="#ffffff"
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 82vw, 40vw"
                  imgClassName="!h-auto"
                />
                <Sticker
                  tilt={8}
                  className="absolute -right-3 top-4 md:-right-7"
                >
                  Fitted up
                </Sticker>
              </div>

              <Reveal delay={60}>
                <h3 className="font-display text-3xl font-extrabold text-white md:text-4xl">
                  Then You Just Skate
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-white/70">
                  Once it is on there is nothing to press and nothing to set
                  up. It sits under the truck, out of the way of your feet and
                  out of the way of the grind.
                </p>
                {/* gap has to clear the 5px white die-cut spread on each
                    sticker, or they read as one joined strip. */}
                <div className="mt-7 flex flex-wrap gap-x-5 gap-y-4">
                  <Sticker tilt={-4} bg="#131316" fg="#fff">
                    Splash proof
                  </Sticker>
                  <Sticker tilt={5}>iOS &amp; Android</Sticker>
                  <Sticker tilt={-6} bg="#cf0000" fg="#fff">
                    1 yr warranty
                  </Sticker>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ---- 03 · The handover ------------------------------------- */}
        <section className="shell pt-28 md:pt-36">
          {/* Photo on the right, so the trail crosses over one last time
              after the left-hand stop that closed the sensor section. */}
          <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16 md:[&>*:first-child]:order-2">
            <div
              data-arrow-stop
              className="relative mx-auto w-full max-w-[17.5rem] sm:max-w-sm"
            >
              <Tufted
                src={PHOTO.makers.src}
                alt={PHOTO.makers.alt}
                width={PHOTO.makers.w}
                height={PHOTO.makers.h}
                blob={1}
                seed="b"
                pile={18}
                accent="#cf0000"
                sizes="(max-width: 640px) 280px, (max-width: 768px) 82vw, 40vw"
                imgClassName="!h-auto"
              />
              <Sticker
                tilt={-9}
                bg="#cf0000"
                fg="#fff"
                className="absolute -bottom-2 -left-3 md:-left-8"
              >
                {SG.partnerLabel}
              </Sticker>
              <BurstSticker
                tilt={13}
                size={92}
                bg="#131316"
                className="absolute -right-4 -top-6 md:-right-8"
              >
                Handed over
              </BurstSticker>
            </div>

            <SectionHead
              step="03"
              eyebrow="Handover"
              title="Utah Hardware, Denver Yarn"
            >
              <p>
                Both ends of this are small and independent. Skategrounds build
                their sensor out of Utah; the rug was tufted in Denver, and the
                two met in the middle to hand it over in person.
              </p>
              <p>
                If you are making something and want a piece of it in yarn,
                that is the whole job &mdash; send over the artwork and it comes
                back as an object.
              </p>
            </SectionHead>
          </div>
        </section>
      </ArrowTrail>

      {/* ---- CTA ------------------------------------------------------ */}
      <section className="shell pt-28 md:pt-36">
        <Reveal>
          <div className="card relative px-7 py-14 text-center md:px-14">
            <Sticker
              tilt={-11}
              bg="#8b63c4"
              fg="#fff"
              className="absolute -left-2 -top-4 md:left-8"
            >
              Slap it anywhere
            </Sticker>
            <BurstSticker
              tilt={14}
              size={88}
              bg="#ffc300"
              fg="#14110d"
              className="absolute -right-3 -top-6 md:right-10"
            >
              Made to order
            </BurstSticker>

            <h2 className="text-big font-display font-extrabold">
              Want one like it?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-lg text-ink-2">
              Brand, team or one-off &mdash; open minded and easy to work with.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link href="/ordering" className="btn">
                Start an order
              </Link>
              <Link href="/collaborations" className="btn btn-plain">
                All collaborations
              </Link>
            </div>
            <p className="mt-8 text-sm text-ink-3">
              Shot with{" "}
              <a
                href={SG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="yarn-underline font-semibold text-ink-2"
              >
                {SG.instagramHandle}
              </a>{" "}
              &mdash;{" "}
              <a
                href={SG.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="yarn-underline font-semibold text-ink-2"
              >
                see the post
              </a>
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
