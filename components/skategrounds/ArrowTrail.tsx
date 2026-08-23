"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";

type Pt = { x: number; y: number };
/** A rect masked out of the trail, so the line breaks rather than crossing text. */
type Hole = { x: number; y: number; w: number; h: number };

/**
 * A single arrow that weaves down the page and lands on each photo in turn.
 *
 * The route is not hardcoded. On mount (and on resize) the component measures
 * every `[data-arrow-stop]` inside it and builds a smooth curve through
 * waypoints derived from those real boxes — so the same code draws a wide
 * S-bend between two columns on a desktop and a tighter zig-zag down a
 * stacked phone layout, with no breakpoint-specific paths to keep in sync.
 *
 * Two details matter for it to look right:
 *
 *  - The viewBox is set to the wrapper's pixel size, so one SVG unit is one
 *    CSS pixel. That keeps the arrowhead perfectly square. (The site's other
 *    scroll path, YarnThread, stretches a fixed viewBox with
 *    `preserveAspectRatio="none"` and has to un-distort its bead by hand —
 *    an arrowhead that also has to *rotate* can't be fixed up that way.)
 *
 *  - `pathLength={1}` normalises the dash maths to 0..1, so progress maps
 *    straight onto `stroke-dashoffset` no matter how long the real path is.
 *
 * Only `stroke-dashoffset` and the arrowhead transform change per frame;
 * the path itself is React state and is rebuilt only on resize.
 */

/**
 * Catmull-Rom through the points, converted to cubic beziers — the curve
 * passes exactly through every waypoint, which a plain bezier chain would
 * not. `tension` 0 gives straight lines, 1 a natural round curve.
 */
function smoothPath(pts: Pt[], tension = 1): string {
  if (pts.length < 2) return "";

  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;

  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;

    const c1x = p1.x + ((p2.x - p0.x) / 6) * tension;
    const c1y = p1.y + ((p2.y - p0.y) / 6) * tension;
    const c2x = p2.x - ((p3.x - p1.x) / 6) * tension;
    const c2y = p2.y - ((p3.y - p1.y) / 6) * tension;

    d +=
      ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)},` +
      ` ${c2x.toFixed(1)} ${c2y.toFixed(1)},` +
      ` ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }

  return d;
}

export default function ArrowTrail({ children }: { children: ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const drawRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGGElement>(null);

  const [box, setBox] = useState({ w: 0, h: 0 });
  const [d, setD] = useState("");
  const [holes, setHoles] = useState<Hole[]>([]);
  // Scoped so a second trail on the same page can't reuse this mask.
  const maskId = `arrow-trail-mask-${useId().replace(/:/g, "")}`;

  // ---- Route -------------------------------------------------------------
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const measure = () => {
      const wrapBox = wrap.getBoundingClientRect();
      const w = wrapBox.width;
      const h = wrapBox.height;
      if (!w || !h) return;

      const stops = [
        ...wrap.querySelectorAll<HTMLElement>("[data-arrow-stop]"),
      ];

      const pts: Pt[] = [];

      stops.forEach((stop, i) => {
        const r = stop.getBoundingClientRect();
        const left = r.left - wrapBox.left;
        const top = r.top - wrapBox.top;

        // What decides the approach is whether the photo sits in a column or
        // in the middle of a stacked layout — not how wide it is. A centred
        // photo has no free gutter on either side, so the line has to use the
        // page margin outside the text; testing width alone gets this wrong
        // between 640px and the 768px column breakpoint, where the photo is
        // both centred and comfortably narrower than the page.
        const cx = left + r.width / 2;
        const centred = Math.abs(cx - w / 2) < w * 0.12;

        if (centred) {
          // Alternate margins so it still weaves rather than running straight
          // down one edge.
          pts.push({ x: i % 2 === 0 ? 12 : w - 12, y: top + r.height / 2 });
        } else {
          // Two-column layout: swing into the gutter beside the photo. The
          // offset has to clear the tufted pile ring (~20px past the image
          // box) or the line grazes the fluff instead of the open space.
          const onLeft = left + r.width / 2 < w / 2;
          pts.push({
            x: onLeft ? left + r.width + 38 : left - 38,
            y: top + r.height / 2,
          });
        }
      });

      if (!pts.length || !stops.length) return;

      // ---- Knock the copy out of the trail ------------------------------
      // The trail is painted over the page (it has to be — a full-bleed dark
      // section would otherwise cover it), so anywhere it crosses a word it
      // makes that word hard to read. Rather than fade the whole line, punch
      // holes in it: collect a rect per *line box* of text and mask them out,
      // so the line looks like it ducks behind the words and comes out the
      // other side, at full strength everywhere else.
      const holes: Hole[] = [];
      const pad = 7; // half the stroke width, plus a little air

      const addRect = (r: DOMRect) => {
        if (!r.width || !r.height) return;
        holes.push({
          x: r.left - wrapBox.left - pad,
          y: r.top - wrapBox.top - pad,
          w: r.width + pad * 2,
          h: r.height + pad * 2,
        });
      };

      // Running text: one rect per rendered line, not one for the whole
      // block — a paragraph's bounding box is mostly empty space, and
      // masking all of it would break the line far more than necessary.
      for (const el of wrap.querySelectorAll<HTMLElement>(
        "h1, h2, h3, h4, dt, dd, p, li",
      )) {
        const range = document.createRange();
        range.selectNodeContents(el);
        for (const r of range.getClientRects()) addRect(r as DOMRect);
      }

      // Buttons and stickers are small rotated boxes; their own border box is
      // a better fit than the line boxes of the text inside them.
      for (const el of wrap.querySelectorAll<HTMLElement>(
        ".btn, .sticker, .sticker-burst",
      )) {
        addRect(el.getBoundingClientRect());
      }

      setHoles(holes);

      // Enter and leave vertically, in line with the first and last stop,
      // rather than from the centre of the page — a diagonal run-in just
      // cuts across the section heading on its way to the first photo.
      //
      // The entry also starts a little above the first stop rather than at
      // the very top of the trail, so the line drops into the first photo
      // out of open space instead of straight down through the copy.
      const firstTop = stops[0].getBoundingClientRect().top - wrapBox.top;
      pts.unshift({ x: pts[0].x, y: Math.max(0, firstTop - 110) });
      pts.push({ x: pts[pts.length - 1].x, y: h });

      setBox({ w, h });
      setD(smoothPath(pts));
    };

    // Measuring forces layout, so coalesce bursts of triggers into one pass.
    let frame = 0;
    const schedule = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          frame = 0;
          measure();
        });
    };

    measure();

    const ro = new ResizeObserver(schedule);
    ro.observe(wrap);
    // Images settling can shift stops without changing the wrapper's size.
    for (const stop of wrap.querySelectorAll("[data-arrow-stop]"))
      ro.observe(stop);

    // Reveal fades each block in from 26px down, and a transform does not
    // trigger a ResizeObserver — so text measured before its reveal settles
    // would leave every mask hole sitting 26px low. Re-measure as they land.
    const onSettle = (e: TransitionEvent) => {
      if ((e.target as HTMLElement).classList?.contains("reveal")) schedule();
    };
    wrap.addEventListener("transitionend", onSettle);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      ro.disconnect();
      wrap.removeEventListener("transitionend", onSettle);
    };
  }, []);

  // ---- Draw-on-scroll ----------------------------------------------------
  useEffect(() => {
    const wrap = wrapRef.current;
    const path = drawRef.current;
    const head = headRef.current;
    if (!wrap || !path || !d) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      path.style.strokeDashoffset = "0";
      if (head) head.style.opacity = "0";
      return;
    }

    const total = path.getTotalLength();
    // The path starts below the top of the wrapper, so scroll progress has to
    // be measured against the path's own vertical extent — against the
    // wrapper's, the arrow would already be part-drawn when it first appears.
    const bbox = path.getBBox();
    let frame = 0;

    const update = () => {
      frame = 0;
      const r = wrap.getBoundingClientRect();
      const vh = window.innerHeight;

      // 0 when the path's top reaches 65% down the screen, 1 when its
      // bottom does — so the arrow leads the reader rather than trailing.
      const top = r.top + bbox.y;
      const span = bbox.height - vh * 0.35;
      const progress = Math.min(
        1,
        Math.max(0, (vh * 0.65 - top) / Math.max(span, 1)),
      );

      path.style.strokeDashoffset = String(1 - progress);

      if (head) {
        const at = total * progress;
        const p = path.getPointAtLength(at);
        // Tangent from a point a hair further along; near the very end,
        // look backwards instead so the head never spins on the last pixel.
        const ahead = path.getPointAtLength(Math.min(total, at + 2));
        const behind = path.getPointAtLength(Math.max(0, at - 2));
        const angle =
          (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI;

        head.setAttribute(
          "transform",
          `translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${angle.toFixed(1)})`,
        );
        head.style.opacity = progress > 0.004 && progress < 0.996 ? "1" : "0";
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [d]);

  return (
    <div ref={wrapRef} className="relative">
      {/* Drawn *over* the content, not behind it. The trail crosses a
          full-bleed dark section, whose own background would otherwise paint
          straight over a layer sitting underneath — and a trail that vanishes
          for a whole section is worse than one that overlaps a photo edge.
          Waypoints are placed in the gutter/margin so it clears the copy. */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-20 h-full w-full"
        viewBox={`0 0 ${box.w || 1} ${box.h || 1}`}
        fill="none"
      >
        <defs>
          {/* White shows the trail, black hides it. One black rect per line of
              text, so the line breaks around the words instead of running
              through them. */}
          <mask id={maskId} maskUnits="userSpaceOnUse">
            <rect
              x={0}
              y={0}
              width={box.w || 1}
              height={box.h || 1}
              fill="#fff"
            />
            {holes.map((r, i) => (
              <rect
                key={i}
                x={r.x.toFixed(1)}
                y={r.y.toFixed(1)}
                width={r.w.toFixed(1)}
                height={r.h.toFixed(1)}
                fill="#000"
              />
            ))}
          </mask>
        </defs>

        <g mask={`url(#${maskId})`}>
          {/* The route not yet travelled, dotted like a trick line on a park map */}
          <path
            d={d}
            stroke="var(--color-ink-3)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray="1 10"
            opacity={0.35}
          />
          {/* The route travelled so far */}
          <path
            ref={drawRef}
            d={d}
            stroke="var(--color-coral)"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
          />
          <g
            ref={headRef}
            style={{ opacity: 0, transition: "opacity .3s ease" }}
          >
            <path
              d="M -11 -11 L 5 0 L -11 11"
              fill="none"
              stroke="var(--color-coral)"
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  );
}
