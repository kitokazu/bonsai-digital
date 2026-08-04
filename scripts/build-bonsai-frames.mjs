// Builds the scroll-scrubbed bonsai frames used by the Process section
// (src/components/ProcessBonsai.tsx) from public/bonsai-animation.mp4.
//
// Why frames rather than scrubbing the video element: setting currentTime
// from scroll makes the browser seek, and seeking is only smooth if the
// file is re-encoded with very dense keyframes, which costs more bytes than
// the frames do. Preloaded frames also scrub exactly, with no decode stall.
//
// Why the paper is stripped: the source is dark ink on a near-static washi
// background. Kept as-is, every frame re-encodes that paper grain (~54KB a
// frame, ~5.5MB total) and the opaque rectangle would also cover the
// section's own colour wash. Instead each pixel's darkness against the
// paper becomes an alpha value, so the frames carry ink only. They land
// around a third of the size and composite straight over whatever the
// section background is doing.
//
// Run manually, it is not part of the build:
//   npm i -D playwright-core && npx playwright install chromium
//   node scripts/build-bonsai-frames.mjs
import { chromium } from "playwright-core";
import { execFileSync } from "child_process";
import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, resolve, join } from "path";
import { tmpdir } from "os";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "public/bonsai-animation.mp4");
const OUT = join(ROOT, "public/process-bonsai-film");
const TMP = join(tmpdir(), "bonsai-frames");

const FPS = 10; // 10 fps over a 10s source = 100 frames
const WIDTH = 1100; // upscaled at display size, but this is soft ink art
const QUALITY = 0.72;
// Paper grain sits a few percent below pure paper luma. Zeroing anything
// under this keeps the frames mostly empty, which is what makes them small.
const GRAIN_FLOOR = 0.07;
// Flat ink colour the alpha is painted with: a dark, slightly green
// charcoal so the tree sits in the brand palette rather than pure black.
const INK = [42, 58, 50];
// Coverage multiplier applied after the grain floor, to stop the mid-grey
// source from multiplying out to a washed-looking tree.
const GAIN = 1.45;

rmSync(TMP, { recursive: true, force: true });
mkdirSync(TMP, { recursive: true });
mkdirSync(OUT, { recursive: true });

console.log("decoding frames...");
execFileSync("ffmpeg", [
  "-v", "error", "-y",
  "-i", SRC,
  "-map", "0:v:0", "-an",
  "-vf", `fps=${FPS},scale=${WIDTH}:-2`,
  "-q:v", "2",
  join(TMP, "f%03d.jpg"),
]);

const names = readdirSync(TMP).filter((f) => f.endsWith(".jpg")).sort();
console.log(`decoded ${names.length} frames, converting to ink-only webp...`);

const browser = await chromium.launch(
  process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}
);
const page = await browser.newPage({ viewport: { width: 100, height: 100 } });

let total = 0;
for (const [i, name] of names.entries()) {
  const dataUrl =
    "data:image/jpeg;base64," + readFileSync(join(TMP, name)).toString("base64");

  const webp = await page.evaluate(
    async ({ dataUrl, quality, floor, first, ink, gain }) => {
      const img = new Image();
      img.src = dataUrl;
      await img.decode();
      const c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      const ctx = c.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0);
      const id = ctx.getImageData(0, 0, c.width, c.height);
      const d = id.data;

      // Paper reference: the top-left corner is bare paper in every frame,
      // including the last, because the canopy never reaches the corners.
      if (first) {
        let sum = 0, n = 0;
        for (let y = 0; y < 40; y++) {
          for (let x = 0; x < 40; x++) {
            const o = (y * c.width + x) * 4;
            sum += 0.299 * d[o] + 0.587 * d[o + 1] + 0.114 * d[o + 2];
            n++;
          }
        }
        window.__paper = sum / n;
      }
      const paper = window.__paper;

      for (let o = 0; o < d.length; o += 4) {
        const luma = 0.299 * d[o] + 0.587 * d[o + 1] + 0.114 * d[o + 2];
        // How much darker than paper this pixel is, as coverage.
        let a = (paper - luma) / paper;
        a = a <= floor ? 0 : (a - floor) / (1 - floor);
        // The source is mostly mid greys, which multiply out to a washed
        // pale tree. Deepen the coverage so the ink keeps its weight.
        a = Math.min(1, a * gain);
        // Frames stay opaque and are composited with CSS multiply instead
        // of carrying an alpha channel. An alpha channel is encoded
        // losslessly here and costs several times more than the picture
        // itself; leaving it out and flattening bare paper to pure white
        // gives large uniform areas the lossy encoder throws away almost
        // for free. Ink is tinted toward the brand charcoal on the way, so
        // multiply lands a warm dark sage rather than neutral grey.
        a = Math.max(0, Math.min(1, a));
        d[o] = Math.round(255 - a * (255 - ink[0]));
        d[o + 1] = Math.round(255 - a * (255 - ink[1]));
        d[o + 2] = Math.round(255 - a * (255 - ink[2]));
        d[o + 3] = 255;
      }
      ctx.putImageData(id, 0, 0);
      return c.toDataURL("image/webp", quality);
    },
    {
      dataUrl,
      quality: QUALITY,
      floor: GRAIN_FLOOR,
      first: i === 0,
      ink: INK,
      gain: GAIN,
    }
  );

  const buf = Buffer.from(webp.split(",")[1], "base64");
  total += buf.length;
  writeFileSync(join(OUT, `f${String(i + 1).padStart(3, "0")}.webp`), buf);
}

await browser.close();
rmSync(TMP, { recursive: true, force: true });

writeFileSync(
  join(OUT, "manifest.json"),
  JSON.stringify({ count: names.length, width: WIDTH }, null, 2) + "\n"
);
console.log(
  `wrote ${names.length} frames, ${(total / 1024 / 1024).toFixed(2)}MB total`
);
