"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

// The bonsai ink animation that grows as the process deck scrolls. Frames
// are built from public/bonsai-animation.mp4 by
// scripts/build-bonsai-frames.mjs and written to public/process-bonsai-film.
//
// Frames rather than a <video>: scrubbing a video means seeking on every
// scroll event, which only stays smooth with a very dense keyframe
// re-encode, and that costs more bytes than these frames do. Preloaded
// frames scrub exactly and never stall on a decode.
//
// The frames are opaque, with bare paper flattened to pure white, and are
// composited with `mix-blend-mode: multiply`. White multiplies to nothing,
// so only the ink lands and the section's own colour wash still shows
// through and keeps shifting underneath it.
const FRAME_COUNT = 100;
const FRAME_SRC = (i: number) =>
  `/process-bonsai-film/f${String(i + 1).padStart(3, "0")}.webp`;

// Kept in step with the visibility gate in Process.tsx. The CSS class only
// hides the canvas; without matching the query here the frames would still
// be fetched on phones, which is the whole payload for none of the picture.
const GATE = "(min-width: 1360px)";

// The source is a centred, symmetrical tree and the card deck covers the
// middle 80% of the section, so there is no placement that keeps the whole
// tree clear of the cards. It is treated as a backdrop instead: full
// bleed, centred, and faint enough that the deck stays the subject while
// the canopy above it and the pot below it read as one large ink painting
// growing behind the content.
const FOCUS_X = 0.5;

// Only the outer canopy ever clears the cards, so the frames are pushed a
// little past cover to bring the branches into the margins sooner. It trims
// the outermost leaf tips at the end, which is not missed.
const ZOOM = 1.16;

// Where the scroll picks the animation up. Zero plays the whole thing from
// the empty pot. The earliest stages are smaller than the card deck, so
// they read as an empty pot and a few shoots below the cards rather than a
// visible sapling; raise this to skip straight to where branches clear the
// deck.
const FIRST_FRAME = 0;

const ProcessBonsai = ({
  progress,
  className,
}: {
  progress: MotionValue<number>;
  className?: string;
}) => {
  const reduceMotion = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<(HTMLImageElement | null)[]>(
    Array(FRAME_COUNT).fill(null)
  );
  const drawnRef = useRef(-1);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(GATE);
    const sync = () => setActive(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Paint the requested frame, falling back to the nearest one that has
  // actually loaded so scrolling during the initial fetch still shows the
  // growth rather than an empty section.
  const draw = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let img = framesRef.current[index];
    for (let d = 1; !img && d < FRAME_COUNT; d++) {
      img = framesRef.current[index - d] ?? framesRef.current[index + d];
    }
    if (!img) return;

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(w * dpr)) canvas.width = Math.round(w * dpr);
    if (canvas.height !== Math.round(h * dpr))
      canvas.height = Math.round(h * dpr);

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Multiply treats white as a no-op, so clearing to white rather than
    // transparent keeps the untouched area from darkening the section.
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, w, h);

    const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight) * ZOOM;
    const dw = img.naturalWidth * scale;
    const dh = img.naturalHeight * scale;
    ctx.drawImage(img, (w - dw) * FOCUS_X, (h - dh) / 2, dw, dh);
    drawnRef.current = index;
  }, []);

  const frameFor = useCallback(
    (p: number) =>
      Math.max(
        FIRST_FRAME,
        Math.min(
          FRAME_COUNT - 1,
          FIRST_FRAME + Math.round(p * (FRAME_COUNT - 1 - FIRST_FRAME))
        )
      ),
    []
  );

  // Draw whatever the current scroll position calls for. Frames arrive out
  // of order, so this has to be driven by the progress value rather than by
  // whichever image happened to load: at the very top of the section the
  // progress never changes, and drawing the first arrival left a half grown
  // tree on screen instead of the empty pot.
  const drawCurrent = useCallback(() => {
    draw(reduceMotion ? FRAME_COUNT - 1 : frameFor(progress.get()));
  }, [draw, frameFor, progress, reduceMotion]);

  useEffect(() => {
    if (!active) return;

    // With reduced motion the tree is shown grown and still, so only the
    // final frame is worth fetching.
    const wanted = reduceMotion
      ? [FRAME_COUNT - 1]
      : // Coarse pass first so every scroll position has something to show
        // early, then a full pass fills in the gaps.
        [
          ...Array.from({ length: 10 }, (_, i) =>
            Math.min(
              FRAME_COUNT - 1,
              FIRST_FRAME + Math.round((i * (FRAME_COUNT - 1 - FIRST_FRAME)) / 9)
            )
          ),
          ...Array.from(
            { length: FRAME_COUNT - FIRST_FRAME },
            (_, i) => FIRST_FRAME + i
          ),
        ];

    let cancelled = false;
    let cursor = 0;

    const next = () => {
      if (cancelled) return;
      while (cursor < wanted.length && framesRef.current[wanted[cursor]]) cursor++;
      if (cursor >= wanted.length) return;
      const index = wanted[cursor++];
      const img = new Image();
      img.decoding = "async";
      img.onload = () => {
        if (cancelled) return;
        framesRef.current[index] = img;
        // Every arrival can be a closer match for where the reader already
        // is, so re-resolve against the live scroll position.
        drawCurrent();
        next();
      };
      img.onerror = next;
      img.src = FRAME_SRC(index);
    };
    for (let i = 0; i < 6; i++) next();

    window.addEventListener("resize", drawCurrent);
    return () => {
      cancelled = true;
      window.removeEventListener("resize", drawCurrent);
    };
  }, [active, reduceMotion, drawCurrent]);

  useMotionValueEvent(progress, "change", (p) => {
    if (!active || reduceMotion) return;
    const index = frameFor(p);
    if (index !== drawnRef.current) draw(index);
  });

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("h-full w-full mix-blend-multiply", className)}
    />
  );
};

export default ProcessBonsai;
