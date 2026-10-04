import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Tufted from "@/components/Tufted";
import { BurstSticker, Sticker } from "@/components/skategrounds/Sticker";

export const metadata: Metadata = {
  title: "Overtonight",
  description:
    "A custom hand-tufted rug for musician Overtonight, from a pixel-style design to the after-dark handoff.",
};

const photos = {
  hero: {
    src: "/collabs/overtonight/photo-15.webp",
    alt: "Three people under blue venue lights holding two hand-tufted character rugs",
    width: 1125,
    height: 1500,
  },
  rug: {
    src: "/collabs/overtonight/photo-07.webp",
    alt: "Black, white and grey pixel-style cat face rug with a pink tongue on grass",
    width: 1125,
    height: 1500,
  },
  detail: {
    src: "/collabs/overtonight/photo-04.webp",
    alt: "A hand resting on the thick pile of the cat face rug",
    width: 1125,
    height: 1500,
  },
  together: {
    src: "/collabs/overtonight/photo-11.webp",
    alt: "The cat face rug beside a second character rug with a BROTHER cap",
    width: 1125,
    height: 1500,
  },
  backs: {
    src: "/collabs/overtonight/photo-12.webp",
    alt: "The reverse sides of two custom rugs laid out on grass",
    width: 1125,
    height: 1500,
  },
  handoff: {
    src: "/collabs/overtonight/photo-14.webp",
    alt: "Three people posing with the finished rugs in a blue-lit venue",
    width: 1500,
    height: 1125,
  },
  outside: {
    src: "/collabs/overtonight/photo-16.webp",
    alt: "Two people posing together outside a music venue at night",
    width: 1125,
    height: 1500,
  },
} as const;

const ticker = ["One of one", "Made by hand", "From art to yarn", "After dark"];

const TRACK = {
  title: "trick or treat",
  spotify: "https://open.spotify.com/track/1lQQyo7aceIvIOoOqIxHpc",
  embed: "https://open.spotify.com/embed/track/1lQQyo7aceIvIOoOqIxHpc",
  apple: "https://music.apple.com/us/album/salem-single/1845477142",
} as const;

function CatStamp({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`cat-stamp relative block size-[4.75rem] shrink-0 overflow-hidden rounded-2xl ${className}`}>
      <Image
        src={photos.rug.src}
        alt=""
        width={photos.rug.width}
        height={photos.rug.height}
        sizes="76px"
        className="h-full w-full object-cover object-[center_72%]"
      />
    </span>
  );
}

function NightTicker() {
  return (
    <div className="overflow-hidden border-y-[2.5px] border-[#e6a8b7] bg-[#9d2e4b] py-3 text-white">
      <div className="marquee-track flex w-max">
        {Array.from({ length: 5 }, (_, copy) => (
          <div
            key={copy}
            aria-hidden={copy > 0 || undefined}
            className="flex shrink-0 items-center gap-7 pr-7 md:gap-10 md:pr-10"
          >
            {ticker.map((word) => (
              <span
                key={word}
                className="flex shrink-0 items-center gap-7 font-display text-lg font-extrabold uppercase tracking-tight md:gap-10 md:text-xl"
              >
                {word}
                <span aria-hidden="true" className="text-sm">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function PhotoCard({
  photo,
  number,
  caption,
}: {
  photo: (typeof photos)[keyof typeof photos];
  number: string;
  caption: string;
}) {
  return (
    <Reveal>
      <figure className="night-photo-card group overflow-hidden rounded-[1.75rem]">
        <div className="overflow-hidden rounded-t-[1.55rem]">
          <Image
            {...photo}
            alt={photo.alt}
            sizes="(max-width: 768px) 90vw, 30vw"
            className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
          />
        </div>
        <figcaption className="flex items-center gap-4 border-t-2 border-[#efb2d1]/60 px-5 py-4 text-sm font-bold text-[#f5eaf2]">
          <span className="font-display text-xl font-extrabold text-[#eea8ca]">{number}</span>
          {caption}
        </figcaption>
      </figure>
    </Reveal>
  );
}

export default function OvertonightPage() {
  return (
    <div className="theme-overtonight overtonight-page text-[#fbf5f8]">
      <section className="night-grid relative overflow-hidden py-12 md:py-20">
        <div aria-hidden="true" className="absolute -right-32 -top-32 size-[34rem] rounded-full bg-[#5b4fb5]/30 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-48 left-0 size-[30rem] rounded-full bg-[#b13c75]/20 blur-3xl" />
        <div className="shell relative">
          <Link
            href="/collaborations"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#dfcbd9] underline-offset-4 transition-colors hover:text-white hover:underline"
          >
            <span aria-hidden="true">←</span> All collaborations
          </Link>

          <div className="mt-12 grid items-center gap-16 md:grid-cols-[1.05fr_0.95fr] md:gap-12 lg:gap-20">
            <div>
              <Reveal>
                <p className="eyebrow !text-[#e7accb]">
                  <span aria-hidden="true" className="inline-block size-2.5 rounded-full bg-[#f1a7c9]" />
                  Artist collaboration
                </p>
                <h1 className="text-huge mt-5 font-display font-extrabold leading-[0.9]">
                  Overtonight
                  <span className="block text-[#f1a4b4]">× RugRuff</span>
                </h1>
              </Reveal>
              <Reveal delay={90}>
                <p className="mt-8 max-w-xl text-xl leading-relaxed text-[#e1d7e2]">
                  A custom rug for musician Overtonight. Pixel-sharp artwork
                  turned into soft, hand-tufted yarn, then brought out into the
                  night.
                </p>
              </Reveal>
              <Reveal delay={150}>
                <div className="mt-9 flex flex-wrap gap-4">
                  <a href="#listen" className="btn">
                    Listen while you look <span aria-hidden="true">↓</span>
                  </a>
                  <a href="#the-rug" className="btn btn-night-plain">
                    See the rug <span aria-hidden="true">↓</span>
                  </a>
                </div>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-14 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-[#b9adbf]">
                  <span aria-hidden="true" className="h-px w-10 bg-[#d597b6]" />
                  Familiar artwork. A whole different texture.
                </p>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <div className="relative mx-auto max-w-[24rem] md:max-w-none">
                <div className="night-hero-frame overflow-hidden rounded-[2rem]">
                  <Image
                    {...photos.hero}
                    alt={photos.hero.alt}
                    loading="eager"
                    fetchPriority="high"
                    sizes="(max-width: 768px) 86vw, 40vw"
                    className="aspect-[4/5] w-full object-cover object-center"
                  />
                </div>
                <BurstSticker
                  tilt={12}
                  size={108}
                  bg="#ef9fc4"
                  fg="#17111f"
                  className="absolute -right-3 -top-8 md:-right-7"
                >
                  One of one
                </BurstSticker>
                <Sticker
                  tilt={-8}
                  bg="#9d2e4b"
                  fg="#fff"
                  className="absolute -bottom-4 -left-3 md:-left-8"
                >
                  Made to be held
                </Sticker>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <NightTicker />

      <section id="listen" className="shell scroll-mt-24 py-24 md:py-32">
        <Reveal>
          <div className="mb-10 flex items-center gap-5">
            <CatStamp className="-rotate-6" />
            <div>
              <p className="eyebrow !text-[#e7accb]">Soundtrack / Press play</p>
              <p className="mt-1 text-sm font-medium text-[#bdb0c1]">Overtonight on the speakers, RugRuff on the floor.</p>
            </div>
          </div>
          <div className="night-music-card relative grid gap-8 overflow-hidden rounded-[2rem] p-5 sm:p-8 md:grid-cols-[1fr_0.9fr] md:gap-12 md:p-12">
            <div aria-hidden="true" className="night-music-noise pointer-events-none absolute inset-0" />
            <div className="relative z-10 flex flex-col justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-[#f3a9b7]">Featured track · 01 / 01</p>
                <h2 className="text-big mt-5 font-display font-extrabold text-white">Put the music on.</h2>
                <p className="mt-5 max-w-md text-lg leading-relaxed text-[#e0d0d5]">
                  Play Overtonight&apos;s <cite className="font-bold not-italic text-white">{TRACK.title}</cite> while you explore the piece. The player shows the release artwork beside its hand-tufted counterpart.
                </p>
              </div>
              <div className="mt-9">
                <iframe
                  title={`${TRACK.title} by Overtonight on Spotify`}
                  src={TRACK.embed}
                  width="100%"
                  height="152"
                  loading="lazy"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  className="block rounded-xl border-0"
                />
                <p className="mt-4 text-sm text-[#cdbbc3]">
                  <a href={TRACK.spotify} target="_blank" rel="noopener noreferrer" className="font-bold text-white underline decoration-[#ed8ba3] underline-offset-4 hover:text-[#f4a7b9]">Open in Spotify ↗</a>
                  <span aria-hidden="true" className="mx-3 text-[#a08b99]">/</span>
                  <a href={TRACK.apple} target="_blank" rel="noopener noreferrer" className="font-bold text-white underline decoration-[#ed8ba3] underline-offset-4 hover:text-[#f4a7b9]">Apple Music ↗</a>
                </p>
              </div>
            </div>
            <figure className="night-record-photo relative z-10 overflow-hidden rounded-[1.5rem]">
              <Image
                {...photos.detail}
                alt={photos.detail.alt}
                sizes="(max-width: 768px) 80vw, 35vw"
                className="aspect-square h-full w-full object-cover object-[center_62%]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#110d13] via-[#110d13]/85 to-transparent px-5 pb-5 pt-12 font-display text-sm font-extrabold uppercase tracking-[0.14em] text-white">
                The character, in yarn
              </figcaption>
            </figure>
          </div>
        </Reveal>
      </section>

      <section id="the-rug" className="shell scroll-mt-24 py-24 md:py-36">
        <div className="grid items-center gap-16 md:grid-cols-2 md:gap-20">
          <Reveal>
            <div className="relative mx-auto max-w-md px-5">
              <Tufted
                {...photos.rug}
                blob={2}
                seed="b"
                pile={20}
                accent="#c45b91"
                sizes="(max-width: 768px) 80vw, 40vw"
                imgClassName="!h-auto"
              />
              <Sticker
                tilt={8}
                bg="#f1a7c9"
                fg="#17111f"
                className="absolute -right-2 bottom-10 md:-right-5"
              >
                Pixel to pile
              </Sticker>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p className="eyebrow !text-[#e7accb]">01 / The rug</p>
            <h2 className="text-big mt-5 max-w-xl font-display font-extrabold">
              A familiar face, made touchable.
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-[#d7ccd9]">
              Every square edge of the design had to read clearly in yarn. The
              black outline gives it its shape; white and grey build the face;
              one small pink detail brings it to life.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              {[
                ["01", "Cut to shape"],
                ["02", "Hand tufted"],
                ["03", "Finished by hand"],
              ].map(([number, label]) => (
                <span key={number} className="rounded-full border-2 border-[#e0b6d2]/50 px-4 py-2 text-sm font-bold text-[#f7ddec]">
                  <span className="mr-2 text-[#eea8ca]">{number}</span>{label}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="night-panel border-y-[2.5px] border-[#59425e] py-24 md:py-32">
        <div className="shell">
          <Reveal>
            <p className="eyebrow !text-[#e7accb]">02 / Up close</p>
            <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2 className="text-big max-w-2xl font-display font-extrabold">
                The details do the talking.
              </h2>
              <p className="max-w-sm text-lg leading-relaxed text-[#d7ccd9]">
                A closer look at the pile, the pair together, and the work on
                the reverse side.
              </p>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-7 md:grid-cols-2">
            <PhotoCard photo={photos.detail} number="01" caption="Soft enough to get your hands on" />
            <PhotoCard photo={photos.backs} number="02" caption="A look at the back" />
          </div>
          <Reveal>
            <article className="night-brother-pass mt-8 grid overflow-hidden rounded-[1.75rem] md:grid-cols-[1fr_1fr]">
              <Image {...photos.together} alt={photos.together.alt} sizes="(max-width: 768px) 90vw, 44vw" className="aspect-[4/3] h-full w-full object-cover object-[center_65%]" />
              <div className="flex flex-col justify-center p-7 sm:p-10 md:p-12">
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#f0a2b6]">The other face in the frame</p>
                <h3 className="mt-4 font-display text-5xl font-extrabold uppercase tracking-tight text-white md:text-6xl">Brother.</h3>
                <p className="mt-5 max-w-sm text-lg leading-relaxed text-[#e0d0d5]">
                  The second rug wears the word right on its cap. Overtonight calls his listeners “bros” on his artist profile — a small detail that makes this pair feel personal.
                </p>
                <a href="https://audiomack.com/overtonight" target="_blank" rel="noopener noreferrer" className="mt-6 self-start text-sm font-bold text-white underline decoration-[#ed8ba3] underline-offset-4 hover:text-[#f4a7b9]">Overtonight on Audiomack ↗</a>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section id="the-handoff" className="shell scroll-mt-24 py-24 md:py-36">
        <div className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <Reveal>
            <p className="eyebrow !text-[#e7accb]">03 / The handoff</p>
            <h2 className="text-big mt-5 font-display font-extrabold">
              Out of the workshop. Into the night.
            </h2>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-[#d7ccd9]">
              October 2 was Overtonight&apos;s Denver show at the Marquis. The photos from that evening show the finished pieces together under blue venue lights.
            </p>
            <div className="mt-8 flex items-center gap-4">
              <CatStamp className="rotate-6" />
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#e7accb]">Denver · 02 Oct 2026<br />Captured after dark</p>
            </div>
            <a href="https://www.livenation.com/event/G5vzZ_G6Jflr4/overtonight" target="_blank" rel="noopener noreferrer" className="mt-5 inline-block text-sm font-bold text-[#f4d7e0] underline decoration-[#e08aa0] underline-offset-4 hover:text-white">Show at the Marquis ↗</a>
            <Link href="/collaborations" className="btn btn-night-plain mt-9">
              More collaborations <span aria-hidden="true">→</span>
            </Link>
          </Reveal>
          <Reveal delay={80}>
            <div className="relative">
              <figure className="night-hero-frame overflow-hidden rounded-[1.75rem]">
                <Image {...photos.handoff} alt={photos.handoff.alt} sizes="(max-width: 768px) 90vw, 50vw" className="h-auto w-full" />
                <figcaption className="bg-[#261b2a] px-4 py-3 text-xs font-bold uppercase tracking-[0.12em] text-[#f3c5d4]">Denver show night · October 2, 2026</figcaption>
              </figure>
              <Sticker
                tilt={-7}
                bg="#f1a7c9"
                fg="#17111f"
                className="absolute -bottom-4 -left-2 md:-left-7"
              >
                Handed over
              </Sticker>
            </div>
          </Reveal>
        </div>
        <Reveal>
          <figure className="night-photo-card mx-auto mt-20 max-w-md overflow-hidden rounded-[1.75rem] md:mt-24">
            <Image {...photos.outside} alt={photos.outside.alt} sizes="(max-width: 768px) 90vw, 380px" className="h-auto w-full" />
            <figcaption className="border-t-2 border-[#efb2d1]/60 px-5 py-4 text-sm font-bold text-[#f5eaf2]">Later that night, outside</figcaption>
          </figure>
        </Reveal>
      </section>

      <section className="shell pb-8 pt-4 md:pb-12">
        <Reveal>
          <div className="card relative px-7 py-14 text-center text-ink md:px-14 md:py-20">
            <Sticker tilt={-10} bg="#9d2e4b" fg="#fff" className="absolute -left-2 -top-4 md:left-8">
              Your art, in yarn
            </Sticker>
            <h2 className="text-big font-display font-extrabold">Got an idea of your own?</h2>
            <p className="mx-auto mt-5 max-w-lg text-lg leading-relaxed text-ink-2">
              A logo, a character, a piece of artwork: send it over and let&apos;s
              see what it could look like tufted.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <Link href="/ordering" className="btn">Start an order</Link>
              <Link href="/collaborations" className="btn btn-plain">All collaborations</Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
