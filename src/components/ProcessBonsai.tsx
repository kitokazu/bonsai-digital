"use client";

import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

// A panoramic ink-sketch bonsai that draws itself in as the process deck
// scrolls. The composition wraps the card deck: ground and grasses along
// the bottom, a trunk rising up the right margin, and one long branch that
// sweeps left across the bottom and climbs the left margin. Foliage pads
// are shaped like real bonsai cloud pads (flat underside, lumpy top) and
// roughened by a turbulence filter so they read as brushwork rather than
// geometry. The margins stay visible at any viewport height, so the tree's
// finale never hides behind the cards; the bottom sweep slipping behind
// the deck is what makes it feel like a layer of the page.
const INK = "hsl(150 22% 28% / 0.38)";
const INK_SOFT = "hsl(150 18% 34% / 0.22)";
const FOLIAGE = "hsl(150 24% 34% / 0.2)";
const FOLIAGE_SOFT = "hsl(150 20% 45% / 0.14)";

const ProcessBonsai = ({
  progress,
  className,
}: {
  progress: MotionValue<number>;
  className?: string;
}) => {
  const reduceMotion = useReducedMotion();

  // Each group gets its own scroll window so growth tracks the four steps:
  // ground on Listen, trunk through Build, the sweep and climb through
  // Refine, foliage settling in as the work ships.
  const groundDraw = useTransform(progress, [0, 0.14], [0, 1]);
  const trunkDraw = useTransform(progress, [0.06, 0.42], [0, 1]);
  const sweepDraw = useTransform(progress, [0.26, 0.5], [0, 1]);
  const riseDraw = useTransform(progress, [0.46, 0.7], [0, 1]);
  const branchDraw = useTransform(progress, [0.4, 0.66], [0, 1]);
  const twigDraw = useTransform(progress, [0.6, 0.82], [0, 1]);

  // Foliage arrives in three staggered waves rather than all at once.
  const bloom1Opacity = useTransform(progress, [0.66, 0.85], [0, 1]);
  const bloom1Scale = useTransform(progress, [0.66, 0.85], [0.88, 1]);
  const bloom2Opacity = useTransform(progress, [0.72, 0.91], [0, 1]);
  const bloom2Scale = useTransform(progress, [0.72, 0.91], [0.88, 1]);
  const bloom3Opacity = useTransform(progress, [0.79, 0.97], [0, 1]);
  const bloom3Scale = useTransform(progress, [0.79, 0.97], [0.88, 1]);

  // Round linecaps render a dot even at pathLength 0, so each stroke stays
  // hidden until its own draw actually begins.
  const groundVis = useTransform(groundDraw, [0, 0.04], [0, 1]);
  const trunkVis = useTransform(trunkDraw, [0, 0.04], [0, 1]);
  const sweepVis = useTransform(sweepDraw, [0, 0.04], [0, 1]);
  const riseVis = useTransform(riseDraw, [0, 0.04], [0, 1]);
  const branchVis = useTransform(branchDraw, [0, 0.04], [0, 1]);
  const twigVis = useTransform(twigDraw, [0, 0.04], [0, 1]);

  const draw = (value: MotionValue<number>, visible: MotionValue<number>) =>
    reduceMotion ? { pathLength: 1 } : { pathLength: value, opacity: visible };
  const bloom = (opacity: MotionValue<number>, scale: MotionValue<number>) => ({
    transformBox: "fill-box" as const,
    transformOrigin: "50% 70%",
    ...(reduceMotion ? { opacity: 1, scale: 1 } : { opacity, scale }),
  });

  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMaxYMax slice"
      fill="none"
      className={cn("h-full w-full", className)}
    >
      <defs>
        {/* Roughens the foliage pads so they read as brush dabs */}
        <filter id="bonsai-rough" x="-20%" y="-30%" width="140%" height="160%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="3"
            seed="7"
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale="10"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      {/* Ground: a long soil line, a rock, and a few grass flicks */}
      <motion.path
        d="M 150 872 C 420 884, 880 884, 1230 866"
        stroke={INK}
        strokeWidth="4.5"
        strokeLinecap="round"
        style={draw(groundDraw, groundVis)}
      />
      <motion.path
        d="M 1260 884 C 1320 890, 1380 888, 1418 880"
        stroke={INK_SOFT}
        strokeWidth="3"
        strokeLinecap="round"
        style={draw(groundDraw, groundVis)}
      />
      <motion.path
        d="M 66 874 C 76 856, 104 854, 114 872"
        stroke={INK}
        strokeWidth="3"
        strokeLinecap="round"
        style={draw(groundDraw, groundVis)}
      />
      <motion.path
        d="M 96 864 C 94 848, 100 838, 96 822"
        stroke={INK_SOFT}
        strokeWidth="2"
        strokeLinecap="round"
        style={draw(groundDraw, groundVis)}
      />
      <motion.path
        d="M 112 868 C 116 852, 112 844, 118 830"
        stroke={INK_SOFT}
        strokeWidth="2"
        strokeLinecap="round"
        style={draw(groundDraw, groundVis)}
      />
      <motion.path
        d="M 130 870 C 128 856, 134 848, 130 836"
        stroke={INK_SOFT}
        strokeWidth="2"
        strokeLinecap="round"
        style={draw(groundDraw, groundVis)}
      />

      {/* Trunk: rises from the soil and leans through the right margin,
          with a dry-brush companion stroke for weight */}
      <motion.path
        d="M 1230 874 C 1250 780, 1320 740, 1330 640 C 1340 540, 1300 480, 1330 380 C 1345 320, 1358 292, 1368 250"
        stroke={INK}
        strokeWidth="6"
        strokeLinecap="round"
        style={draw(trunkDraw, trunkVis)}
      />
      <motion.path
        d="M 1246 874 C 1262 806, 1300 776, 1310 716"
        stroke={INK_SOFT}
        strokeWidth="3.5"
        strokeLinecap="round"
        style={draw(trunkDraw, trunkVis)}
      />

      {/* The signature: one long branch sweeping left across the bottom,
          then climbing the left margin */}
      <motion.path
        d="M 1292 770 C 1110 832, 850 856, 610 850 C 450 844, 330 830, 244 794"
        stroke={INK}
        strokeWidth="4.5"
        strokeLinecap="round"
        style={draw(sweepDraw, sweepVis)}
      />
      <motion.path
        d="M 244 794 C 160 766, 120 700, 112 620 C 104 544, 120 480, 108 404"
        stroke={INK}
        strokeWidth="4"
        strokeLinecap="round"
        style={draw(riseDraw, riseVis)}
      />

      {/* Upper branches in the right margin */}
      <motion.path
        d="M 1336 560 C 1368 540, 1392 542, 1416 520"
        stroke={INK}
        strokeWidth="3.5"
        strokeLinecap="round"
        style={draw(branchDraw, branchVis)}
      />
      <motion.path
        d="M 1332 424 C 1312 408, 1300 410, 1286 396"
        stroke={INK}
        strokeWidth="3"
        strokeLinecap="round"
        style={draw(branchDraw, branchVis)}
      />
      <motion.path
        d="M 1364 258 C 1370 234, 1380 222, 1390 202"
        stroke={INK}
        strokeWidth="3"
        strokeLinecap="round"
        style={draw(branchDraw, branchVis)}
      />

      {/* Secondary twigs on the climb and the margin */}
      <motion.path
        d="M 116 560 C 104 548, 100 540, 88 532"
        stroke={INK_SOFT}
        strokeWidth="2"
        strokeLinecap="round"
        style={draw(twigDraw, twigVis)}
      />
      <motion.path
        d="M 112 452 C 122 442, 124 434, 134 426"
        stroke={INK_SOFT}
        strokeWidth="2"
        strokeLinecap="round"
        style={draw(twigDraw, twigVis)}
      />
      <motion.path
        d="M 1400 530 C 1404 514, 1400 506, 1406 492"
        stroke={INK_SOFT}
        strokeWidth="2"
        strokeLinecap="round"
        style={draw(twigDraw, twigVis)}
      />
      <motion.path
        d="M 1378 300 C 1382 286, 1378 278, 1384 264"
        stroke={INK_SOFT}
        strokeWidth="2"
        strokeLinecap="round"
        style={draw(twigDraw, twigVis)}
      />

      {/* Foliage: cloud pads with flat undersides and lumpy tops, the way
          bonsai canopies are actually pruned. Roughened by the filter. */}
      <motion.g filter="url(#bonsai-rough)" style={bloom(bloom1Opacity, bloom1Scale)}>
        <path
          d="M 48 546 C 44 534, 58 526, 74 528 C 80 518, 98 516, 110 522 C 122 518, 132 524, 130 534 C 134 542, 124 548, 110 548 C 96 554, 68 554, 56 550 C 50 550, 46 548, 48 546 Z"
          fill={FOLIAGE}
        />
        <ellipse cx="88" cy="536" rx="22" ry="7" fill={FOLIAGE_SOFT} />
      </motion.g>
      <motion.g filter="url(#bonsai-rough)" style={bloom(bloom1Opacity, bloom1Scale)}>
        <path
          d="M 1358 508 C 1354 496, 1368 488, 1384 490 C 1390 480, 1408 478, 1420 484 C 1432 480, 1442 486, 1440 496 C 1444 504, 1434 510, 1420 510 C 1406 516, 1378 516, 1366 512 C 1360 512, 1356 510, 1358 508 Z"
          fill={FOLIAGE}
        />
        <ellipse cx="1398" cy="496" rx="24" ry="8" fill={FOLIAGE_SOFT} />
      </motion.g>

      <motion.g filter="url(#bonsai-rough)" style={bloom(bloom2Opacity, bloom2Scale)}>
        <path
          d="M 64 392 C 60 380, 74 372, 90 374 C 96 364, 114 362, 126 368 C 138 364, 148 370, 146 380 C 150 388, 140 394, 126 394 C 112 400, 84 400, 72 396 C 66 396, 62 394, 64 392 Z"
          fill={FOLIAGE}
        />
        <ellipse cx="106" cy="382" rx="24" ry="8" fill={FOLIAGE_SOFT} />
      </motion.g>
      <motion.g filter="url(#bonsai-rough)" style={bloom(bloom2Opacity, bloom2Scale)}>
        <path
          d="M 1268 396 C 1266 386, 1278 380, 1290 382 C 1296 374, 1312 372, 1320 378 C 1330 376, 1336 382, 1334 390 C 1336 396, 1328 400, 1318 400 C 1306 404, 1282 404, 1272 400 C 1268 400, 1266 398, 1268 396 Z"
          fill={FOLIAGE}
        />
        <ellipse cx="1300" cy="388" rx="18" ry="6" fill={FOLIAGE_SOFT} />
      </motion.g>

      <motion.g filter="url(#bonsai-rough)" style={bloom(bloom3Opacity, bloom3Scale)}>
        <path
          d="M 646 854 C 642 842, 660 832, 682 836 C 688 822, 714 818, 732 826 C 742 814, 768 814, 778 824 C 794 822, 804 832, 798 842 C 804 852, 788 860, 770 858 C 754 866, 716 868, 694 862 C 672 864, 650 862, 646 854 Z"
          fill={FOLIAGE}
        />
        <ellipse cx="716" cy="840" rx="38" ry="11" fill={FOLIAGE_SOFT} />
      </motion.g>
      <motion.g filter="url(#bonsai-rough)" style={bloom(bloom3Opacity, bloom3Scale)}>
        <path
          d="M 1346 206 C 1342 196, 1356 188, 1372 190 C 1378 180, 1396 178, 1408 184 C 1420 180, 1430 186, 1428 196 C 1432 204, 1422 210, 1408 210 C 1396 216, 1366 216, 1354 212 C 1348 212, 1344 210, 1346 206 Z"
          fill={FOLIAGE}
        />
        <ellipse cx="1386" cy="194" rx="24" ry="8" fill={FOLIAGE_SOFT} />
      </motion.g>
    </svg>
  );
};

export default ProcessBonsai;
