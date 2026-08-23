import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Which organic silhouette to cut the photo into. */
  blob?: 1 | 2 | 3 | 4;
  /** Which noise seed frays the pile edge. */
  seed?: "a" | "b" | "c";
  /** Thickness of the white pile ring. */
  pile?: number;
  /** Optional second ring peeking out behind the white, like a two-tone border. */
  accent?: string;
  priority?: boolean;
  /**
   * Load immediately instead of lazily — for an image that is the LCP
   * element. Next 16 deprecated `priority`; `loading`/`fetchPriority` are
   * the replacement and say plainly what they do.
   */
  eager?: boolean;
  sizes?: string;
  className?: string;
  imgClassName?: string;
};

/**
 * A photo finished the way RugRuff finishes a rug: cut to an organic
 * silhouette and wrapped in a thick, frayed white pile edge.
 */
export default function Tufted({
  src,
  alt,
  width,
  height,
  blob = 1,
  seed = "a",
  pile = 16,
  accent,
  priority,
  eager,
  sizes = "(max-width: 768px) 90vw, 45vw",
  className = "",
  imgClassName = "",
}: Props) {
  const seedClass = seed === "b" ? "tufted-b" : seed === "c" ? "tufted-c" : "";

  return (
    <div
      className={`tufted tufted-hover blob-${blob} ${seedClass} ${
        accent ? "tufted-accent" : ""
      } ${className}`}
      style={
        {
          "--pile": `${pile}px`,
          ...(accent ? { "--pile-color": accent } : {}),
        } as React.CSSProperties
      }
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        loading={eager ? "eager" : undefined}
        fetchPriority={eager ? "high" : undefined}
        sizes={sizes}
        className={`h-full w-full rounded-[inherit] object-cover ${imgClassName}`}
      />
    </div>
  );
}
