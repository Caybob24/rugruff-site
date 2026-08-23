import type { CSSProperties, ReactNode } from "react";

/**
 * Slap stickers — the layer of vinyl that ends up on every deck, bin and
 * park rail. They are pure decoration, so they are hidden from screen
 * readers and never take a pointer event; anything that has to be *read*
 * belongs in the copy, not on a sticker.
 *
 * The die-cut look (printed shape, white cut margin, drop shadow) lives in
 * `.sticker` in globals.css. This component adds the two shapes that need
 * geometry rather than a border-radius.
 */

type Common = {
  children: ReactNode;
  /** Rotation in degrees. Real stickers are never straight. */
  tilt?: number;
  bg?: string;
  fg?: string;
  className?: string;
  style?: CSSProperties;
};

export function Sticker({
  children,
  tilt = -5,
  bg,
  fg,
  variant = "slap",
  className = "",
  style,
}: Common & { variant?: "slap" | "round" }) {
  return (
    <span
      aria-hidden="true"
      className={`sticker sticker-peel ${
        variant === "round" ? "sticker-round" : ""
      } ${className}`}
      style={
        {
          "--tilt": `${tilt}deg`,
          ...(bg ? { "--sticker-bg": bg } : {}),
          ...(fg ? { "--sticker-fg": fg } : {}),
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </span>
  );
}

/** Points of a `spikes`-pointed star, as an SVG polygon in a 100x100 box. */
function burstPoints(spikes: number, inner: number, outer: number) {
  const pts: string[] = [];
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outer : inner;
    // Start at 12 o'clock so the shape reads upright.
    const a = (Math.PI * i) / spikes - Math.PI / 2;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`);
  }
  return pts.join(" ");
}

/**
 * The sunburst price sticker off a skate-shop window. The white die-cut
 * margin is a second copy of the shape drawn behind with a fat white
 * stroke — `box-shadow` can't follow a polygon.
 */
export function BurstSticker({
  children,
  tilt = 8,
  bg = "#cf0000",
  fg = "#fff",
  size = 112,
  className = "",
  style,
}: Common & { size?: number }) {
  const pts = burstPoints(12, 34, 50);

  return (
    <span
      aria-hidden="true"
      className={`sticker-burst ${className}`}
      style={{
        width: size,
        height: size,
        transform: `rotate(${tilt}deg)`,
        filter: "drop-shadow(0 5px 10px rgba(0,0,0,.32))",
        ...style,
      }}
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <polygon points={pts} fill="#fff" stroke="#fff" strokeWidth={11} strokeLinejoin="round" />
        <polygon
          points={pts}
          fill={bg}
          stroke="var(--color-ink)"
          strokeWidth={3.5}
          strokeLinejoin="round"
        />
      </svg>
      <span
        className="relative px-3 text-center font-display font-extrabold uppercase leading-[0.95]"
        style={{ color: fg, fontSize: size * 0.155, letterSpacing: "0.02em" }}
      >
        {children}
      </span>
    </span>
  );
}
