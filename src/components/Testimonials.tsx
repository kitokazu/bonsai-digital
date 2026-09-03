"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

import { SectionHeading } from "@/components/layout/SectionHeading";
import { TransitionLink } from "@/components/nav/TransitionLink";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";
import { useTranslation } from "@/lib/i18n";
import { fadeRise, viewportOnce } from "@/lib/motion";
import { headshots, type TestimonialItem } from "@/lib/testimonials";
import { workProjects } from "@/lib/work";
import { cn, itemsAlign, textAlign } from "@/lib/utils";

interface Mark {
  src: string;
  /** The testimonial this mark selects. */
  owner: string;
  label: string;
  /** `cover` for marks that carry their own field, `contain` for cut-outs. */
  fit: "cover" | "contain";
  /** Case study slug, which is where the kind of work and the link come from. */
  slug: string;
}

/**
 * Company marks, sized and cropped for a circular node in `public/logos/`.
 * DefineX is the symbol without its wordmark, which is illegible this small;
 * EnPadel and Uncharted only exist on their own brand colour, so they fill
 * their circle rather than sitting on ours.
 */
const marks: Mark[] = [
  {
    src: "/logos/definex-mark.png",
    slug: "definex",
    owner: "taisei",
    label: "DefineX",
    fit: "contain",
  },
  {
    src: "/logos/enpadel-node.png",
    slug: "enpadel",
    owner: "taisei",
    label: "EnPadel",
    fit: "cover",
  },
  {
    src: "/uncharted/uncharted_agency_logo.jpeg",
    slug: "influencer-platform",
    owner: "victor",
    label: "Uncharted Influencer Agency",
    fit: "cover",
  },
];

interface Slot {
  /** Centre point, as a percentage of the stage. */
  x: number;
  y: number;
  /** Diameter as a percentage of the stage width. */
  size: number;
  /** Idle bob, seconds. Satellites only; the featured seat holds still. */
  float: number;
  floatDelay: number;
}

/**
 * The seats, following the design handoff's loose, map-like scatter
 * (reference/design_handoff_testimonials). Seat 0 is the featured one in the
 * middle; the rest ring it.
 *
 * Ordered so that the first N are balanced for any N, because there is one
 * coin per client project and that number only grows. The discs run a little
 * larger than the handoff's: there are fewer of them now that people and
 * marks share a coin, and the same sizes on a thinner stage read as sparse.
 * Positions are percentages, so the composition holds at any stage width.
 */
const SLOTS: Slot[] = [
  { x: 50, y: 50, size: 25, float: 0, floatDelay: 0 },
  { x: 14, y: 28, size: 12.5, float: 5.2, floatDelay: 0 },
  { x: 86, y: 68, size: 12, float: 6.1, floatDelay: 0.8 },
  { x: 78, y: 20, size: 10.5, float: 5.6, floatDelay: 1.6 },
  { x: 22, y: 76, size: 11, float: 6.6, floatDelay: 0.4 },
  { x: 6, y: 64, size: 9, float: 6.4, floatDelay: 1.1 },
  { x: 94, y: 32, size: 9, float: 5.9, floatDelay: 2 },
];

const FEATURED = 0;
const ROTATE_MS = 7000;

/** The handoff's glide: every seat change and the quote entrance use it. */
const GLIDE = { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const };

/** One side of a coin: a company mark or the client behind it. */
interface Face {
  src: string;
  /** `cover` for marks that carry their own field, `contain` for cut-outs. */
  fit: "cover" | "contain";
}

/**
 * A coin: one client project, with its mark on the front and the person who
 * runs it on the back.
 *
 * One coin per project, rather than a mix of person nodes and mark nodes, is
 * what keeps an image from turning up twice. Every coin rests mark side up
 * except the one in the middle, so exactly one person is ever looking out and
 * no two marks are the same project. The rule survives a swap as well,
 * because the arriving and departing coins turn past each other: before the
 * halfway point the arriving one still shows its mark, after it the departing
 * one already does.
 */
interface Coin {
  key: string;
  /** The testimonial this coin belongs to. */
  personId: string;
  /** Case study slug, or "" for a client with no project of their own yet. */
  slug: string;
  label: string;
  /** Front, at rest. */
  mark: Face;
  /** Back, shown by whichever coin holds the middle seat. */
  portrait: Face;
}

/**
 * One coin on the stage. Five nested layers, each owning exactly one thing so
 * none of them fight: the outer holds the seat and takes the pointer, the
 * next glides between seats, the next bobs, the next supplies the
 * perspective, and the coin itself turns.
 *
 * The pointer is read on the outermost layer on purpose. It neither moves nor
 * turns, so its hit area is a stationary circle. Read on the coin instead,
 * the bob would carry the disc out from under a still pointer and the turn
 * would take it edge on to nothing at all, and the hover would stutter
 * between on and off.
 */
function StageNode({
  coin,
  slot,
  featured,
  spins,
  hovered,
  turned,
  reduceMotion,
  onHover,
  onSelect,
}: {
  coin: Coin;
  slot: Slot;
  featured: boolean;
  /** Half turns banked from previous swaps, so a coin never unwinds. */
  spins: number;
  /** Pointer is over this coin's seat. Drives the lift, not the turn. */
  hovered: boolean;
  /** Show the other side. Decided by the parent, which can see every coin. */
  turned: boolean;
  reduceMotion: boolean;
  onHover: (key: string | null) => void;
  onSelect: (key: string) => void;
}) {
  /* Width and the centring margins share one value, so the floor that keeps
     a satellite tappable on a phone also keeps it centred. */
  const size = featured
    ? `max(${slot.size}%, 5.5rem)`
    : `max(${slot.size}%, 2.75rem)`;

  /* Mark side at rest, portrait side in the middle. Banked turns are added
     rather than the angle being toggled, so each swap carries on in the same
     direction instead of rewinding the last one. A hover adds a further half
     turn, always forward, whichever side the coin was resting on. */
  const rotateY = reduceMotion
    ? 0
    : spins * 360 + (featured ? 180 : 0) + (turned ? 180 : 0);

  const ring = featured
    ? "testimonial-ring-featured"
    : "testimonial-ring-satellite";

  const face = (side: Face, back: boolean) => (
    <span
      className={cn(
        "testimonial-ring testimonial-coin-face rounded-full",
        ring,
        back && "testimonial-coin-back",
        !featured && hovered && "testimonial-ring-lifted",
        featured && "testimonial-ring-centre",
      )}
    >
      <span className="block h-full w-full overflow-hidden rounded-full bg-muted">
        <Image
          src={side.src}
          alt=""
          aria-hidden
          width={288}
          height={288}
          sizes="(min-width: 1200px) 14rem, 20vw"
          className={cn(
            "h-full w-full rounded-full",
            side.fit === "cover" ? "object-cover" : "object-contain p-[18%]",
          )}
        />
      </span>
    </span>
  );

  return (
    <div
      className="absolute aspect-square"
      style={{
        left: `${slot.x}%`,
        top: `${slot.y}%`,
        width: size,
        marginLeft: `calc(${size} / -2)`,
        marginTop: `calc(${size} / -2)`,
        zIndex: featured ? 3 : 2,
      }}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") onHover(coin.key);
      }}
      onPointerLeave={() => onHover(null)}
      onPointerCancel={() => onHover(null)}
    >
      <motion.div layout transition={GLIDE} className="h-full w-full">
        <motion.div
          className="h-full w-full"
          animate={
            featured || reduceMotion || !slot.float
              ? { y: 0 }
              : { y: [0, -9, 0] }
          }
          transition={
            featured || reduceMotion || !slot.float
              ? GLIDE
              : {
                  duration: slot.float,
                  delay: slot.floatDelay,
                  ease: "easeInOut",
                  repeat: Infinity,
                }
          }
        >
          {/* The perspective lives here, off the turning element: on the coin
              itself it is applied after the rotation and the turn comes out
              flat. */}
          <div className="h-full w-full [perspective:900px]">
            <motion.button
              type="button"
              onClick={() => onSelect(coin.key)}
              aria-label={coin.label}
              aria-current={featured ? "true" : undefined}
              className={cn(
                "testimonial-coin block h-full w-full rounded-full",
                featured ? "cursor-default" : "cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              )}
              animate={{
                rotateY,
                scale: hovered && !featured ? 1.08 : 1,
              }}
              transition={{
                rotateY: { duration: 0.8, ease: GLIDE.ease },
                scale: { duration: 0.35, ease: GLIDE.ease },
              }}
            >
              {face(coin.mark, false)}
              {face(coin.portrait, true)}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

/** The labelled sections of a full write-up, in the client's own words. */
function FullSections({
  item,
  locale,
  className,
}: {
  item: TestimonialItem;
  locale: string;
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "flex flex-col gap-5",
        textAlign(locale as "en" | "ja"),
        className,
      )}
    >
      {item.sections.map((section) => (
        <div key={section.label}>
          <dt className="mb-1.5 text-xs font-medium tracking-[0.04em] text-primary">
            {section.label}
          </dt>
          <dd
            className={cn(
              "font-serif text-foreground",
              locale === "ja"
                ? "text-[0.9375rem] leading-[1.9]"
                : "text-[1.0625rem] leading-[1.55]",
            )}
          >
            {section.text}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Testimonials, from the design handoff: client faces and company marks on a
 * loose scatter over a faint grid, one featured in the middle, the quote
 * below. Choosing another node swaps its seat with the featured one, so both
 * glide and everyone else stays put.
 *
 * Every node is a real client or a real client's mark, so the stage fills
 * out as more testimonials come in rather than being padded with stock
 * faces. Choosing a mark features the person who runs that company.
 */
const Testimonials = () => {
  const { t, locale } = useTranslation();
  const { label, heading, description, readMore } = t.testimonials;
  const items = t.testimonials.items as TestimonialItem[];
  const reduceMotion = usePrefersReducedMotion();

  /* One coin per client project, in list order. A client with no mark yet
     still gets a coin, carrying their portrait on both sides: nothing to
     show on the front, but they keep their place on the stage. */
  const coins: Coin[] = items.flatMap((item) => {
    const portrait = { src: headshots[item.id], fit: "cover" as const };
    if (!portrait.src) return [];

    const owned = marks.filter((mark) => mark.owner === item.id);
    if (!owned.length) {
      return [
        {
          key: item.id,
          personId: item.id,
          slug: "",
          label: item.name,
          mark: portrait,
          portrait,
        },
      ];
    }

    return owned.map((mark) => ({
      key: mark.src,
      personId: item.id,
      slug: mark.slug,
      label: `${mark.label}, ${item.name}`,
      mark: { src: mark.src, fit: mark.fit },
      portrait,
    }));
  });

  /* The coin holding the middle seat. Tracked by coin rather than by person
     because a client can run more than one project, and clicking either of
     their coins has to move that coin, not just change the quote. */
  const [featuredKey, setFeaturedKey] = useState(coins[0]?.key);
  /* Seat index per coin. Only two entries change on a select. */
  const [seatOf, setSeatOf] = useState<Record<string, number>>(() =>
    Object.fromEntries(coins.map((coin, index) => [coin.key, index])),
  );
  /* Held while the pointer is over the stage or the quote: rotating away
     from something the reader is looking at is worse than not rotating. */
  const [held, setHeld] = useState(false);
  /* Bumped on every select so the rotation timer starts over. */
  const [tick, setTick] = useState(0);
  /* Half turns banked per coin, so a coin never rewinds its last turn. */
  const [spins, setSpins] = useState<Record<string, number>>({});
  /* The coin under the pointer. Held here rather than in the coin, because
     deciding which side a coin may show means seeing all of them at once. */
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  /* The full write-up, open in the dialog. */
  const [dialogOpen, setDialogOpen] = useState(false);

  const featuredRef = useRef(featuredKey);
  featuredRef.current = featuredKey;

  const select = useCallback((key: string) => {
    const current = featuredRef.current;
    if (key === current) return;

    setSeatOf((prev) => ({
      ...prev,
      [current]: prev[key],
      [key]: prev[current],
    }));
    /* The departing coin banks a turn so its half turn back to its mark runs
       forward. The arriving one needs none: going featured adds the 180 that
       brings its portrait round. Both travel in the same direction, and they
       pass each other, so only one portrait is ever face on. */
    setSpins((prev) => ({ ...prev, [current]: (prev[current] ?? 0) + 1 }));
    /* The clicked coin leaves the pointer behind as it travels, and arriving
       still marked as hovered would turn it straight back over. */
    setHoveredKey(null);
    setFeaturedKey(key);
    setTick((n) => n + 1);
  }, []);

  /* Never rotate away from a write-up someone has opened. */
  const rotating =
    !held &&
    !dialogOpen &&
    !reduceMotion &&
    new Set(coins.map((c) => c.personId)).size > 1;

  /* Skips past a client's other projects to the next different person, so
     the words on screen always change when the stage does. */
  useEffect(() => {
    if (!rotating) return;

    const id = setTimeout(() => {
      const at = coins.findIndex((coin) => coin.key === featuredRef.current);
      const person = coins[at]?.personId;
      const next = coins
        .slice(at + 1)
        .concat(coins.slice(0, at))
        .find((coin) => coin.personId !== person);
      if (next) select(next.key);
    }, ROTATE_MS);

    return () => clearTimeout(id);
  }, [rotating, coins, tick, select]);

  if (!coins.length) return null;

  const featured = coins.find((coin) => coin.key === featuredKey) ?? coins[0];
  const active =
    items.find((item) => item.id === featured.personId) ?? items[0];

  /* What kind of work this was, and where to read about it. Both come from
     the coin rather than the testimonial, because a client can run more than
     one project and the two are rarely the same kind of job. The label is the
     one already on the work cards, so a visitor meets the same vocabulary
     twice, and it is written in both languages already. */
  /* Which coins are turned over right now.
  
     A hover turns the coin under the pointer. The catch is a client with more
     than one project: hovering one of Taisei's coins while another of his is
     in the middle would put the same face on screen twice. So in that one
     case the middle coin turns to its own mark for as long as the pointer
     stays, which keeps a single face on the stage and happens to say plainly
     that these two projects are the same person. */
  const hoveredCoin = coins.find((coin) => coin.key === hoveredKey) ?? null;
  const centreStandsAside =
    !!hoveredCoin &&
    hoveredCoin.key !== featured.key &&
    hoveredCoin.personId === featured.personId;

  const isTurned = (coin: Coin) =>
    coin.key === featured.key
      ? coin.key === hoveredKey || centreStandsAside
      : coin.key === hoveredKey;

  const project = workProjects.find((entry) => entry.slug === featured.slug);
  const kind = project ? t.work.projects[project.id].tag : "";
  const projectHref = featured.slug
    ? `/work/${featured.slug}`
    : active.projectHref;
  const hasFull = active.sections?.length > 0;
  const quoteType =
    locale === "ja"
      ? "text-[1rem] leading-[1.9]"
      : "text-[clamp(1.0625rem,1.4vw,1.25rem)] leading-[1.55]";
  const hold = {
    onPointerEnter: () => setHeld(true),
    onPointerLeave: () => setHeld(false),
  };

  return (
    <section
      id="testimonials"
      className="section-padding overflow-hidden bg-primary/5"
    >
      <div className="container mx-auto px-6">
        <SectionHeading eyebrow={label} heading={heading} lede={description} />

        {/* The stage. Layers back to front: grid, pulsing glow, speckle halo,
            then the nodes. */}
        <motion.div
          variants={fadeRise}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          {...hold}
          style={{ "--coins": coins.length } as CSSProperties}
          className="testimonial-stage relative mx-auto mt-2 select-none sm:mt-4"
        >
          <div
            aria-hidden
            className="testimonial-stage-grid absolute inset-0"
          />
          <div aria-hidden className="testimonial-stage-glow" />
          <div
            aria-hidden
            className="testimonial-stage-speckle absolute inset-0"
          />

          <LayoutGroup id="testimonials">
            {coins.map((coin) => {
              const seat = seatOf[coin.key] ?? FEATURED;
              return (
                <StageNode
                  key={coin.key}
                  coin={coin}
                  slot={SLOTS[seat % SLOTS.length]}
                  featured={seat === FEATURED}
                  spins={spins[coin.key] ?? 0}
                  hovered={coin.key === hoveredKey}
                  turned={isTurned(coin)}
                  reduceMotion={reduceMotion}
                  onHover={setHoveredKey}
                  onSelect={select}
                />
              );
            })}
          </LayoutGroup>
        </motion.div>

        {/* The quote. Fixed floor so switching between a longer and a shorter
            one does not shunt the dots and whatever follows. */}
        {/* No aria-live here on purpose: with the stage rotating on its own,
            a live region would keep interrupting a screen reader. Each node
            and dot is a labelled button, so the quotes stay reachable. */}
        <div
          {...hold}
          className={cn(
            "mx-auto mt-4 flex w-full max-w-[40rem] flex-col sm:mt-5",
            "min-h-[21rem] sm:min-h-[16rem] lg:min-h-[15rem]",
            itemsAlign(locale),
            textAlign(locale),
          )}
        >
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <AnimatePresence mode="wait">
              <motion.figure
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ duration: 0.7, ease: GLIDE.ease }}
                className={cn(
                  "relative flex flex-col gap-4",
                  itemsAlign(locale),
                )}
              >
                {/* Out of the flow: as a block it cost a line of height plus
                    a gap at the top of a section that has to stay short. It
                    sits off the quote's shoulder instead, where it still
                    marks the passage without pushing it down. */}
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute -top-7 select-none font-serif text-[3.5rem] leading-none text-primary/20",
                    locale === "ja" ? "-left-1" : "left-1/2 -translate-x-1/2",
                  )}
                >
                  &ldquo;
                </span>

                {/* The quote is the way in to the full write-up: the whole
                  paragraph opens it, and the sage tail says so. Only the
                  clients who gave one get the button. */}
                {hasFull ? (
                  <blockquote
                    className={cn(
                      "font-serif text-foreground [text-wrap:pretty]",
                      quoteType,
                    )}
                  >
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className={cn(
                          "group inline rounded-lg text-inherit",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background",
                          textAlign(locale),
                        )}
                      >
                        {active.quote}{" "}
                        <span className="inline-flex items-baseline gap-1 whitespace-nowrap font-sans text-[0.8125rem] font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors group-hover:decoration-primary">
                          {readMore}
                          <ArrowRight className="h-3 w-3 self-center transition-transform duration-300 group-hover:translate-x-0.5" />
                        </span>
                      </button>
                    </DialogTrigger>
                  </blockquote>
                ) : (
                  <blockquote
                    className={cn(
                      "font-serif text-foreground [text-wrap:pretty]",
                      quoteType,
                    )}
                  >
                    {active.quote}
                  </blockquote>
                )}

                <figcaption
                  className={cn(
                    "mt-1 flex flex-col gap-0.5",
                    itemsAlign(locale),
                  )}
                >
                  <p className="text-[1.0625rem] font-semibold tracking-[0.01em] text-foreground">
                    {active.name}
                  </p>
                  <p className="text-sm tracking-[0.03em] text-muted-foreground">
                    {[active.role, active.company]
                      .filter(Boolean)
                      .join(locale === "ja" ? "、" : ", ")}
                  </p>

                  <div
                    className={cn(
                      "mt-3 flex flex-wrap items-center gap-x-4 gap-y-2",
                      locale === "ja" ? "justify-start" : "justify-center",
                    )}
                  >
                    {/* The kind of work, in the same pill the work cards use.
                        It names the job the quote is actually about, which
                        the client's own title cannot: Taisei's two projects
                        are a brand site and a platform. */}
                    {kind && (
                      <span className="rounded-full border border-primary/30 px-3 py-1 text-xs font-medium text-primary">
                        {kind}
                      </span>
                    )}

                    {projectHref && (
                      <TransitionLink
                        href={projectHref}
                        className="group inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-primary/80"
                      >
                        {active.projectLabel}
                        <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                      </TransitionLink>
                    )}
                  </div>
                </figcaption>
              </motion.figure>
            </AnimatePresence>

            {hasFull && (
              <DialogContent
                className={cn(
                  "max-h-[88vh] w-[calc(100%-2rem)] max-w-2xl overflow-y-auto rounded-[1.5rem] border-border/60 bg-background p-7 sm:p-10",
                  textAlign(locale),
                )}
              >
                <div
                  className={cn(
                    "flex items-center gap-4",
                    locale === "ja" ? "" : "flex-col text-center",
                  )}
                >
                  <span className="block h-14 w-14 shrink-0 overflow-hidden rounded-full bg-muted">
                    <Image
                      src={headshots[active.id]}
                      alt=""
                      aria-hidden
                      width={112}
                      height={112}
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <div>
                    <DialogTitle className="font-serif text-2xl font-semibold leading-tight text-foreground">
                      {active.name}
                    </DialogTitle>
                    <DialogDescription className="mt-1 text-sm tracking-[0.03em] text-muted-foreground">
                      {[active.role, active.company]
                        .filter(Boolean)
                        .join(locale === "ja" ? "、" : ", ")}
                    </DialogDescription>
                  </div>
                </div>

                <FullSections
                  item={active}
                  locale={locale}
                  className="mt-4 border-t border-border/60 pt-6"
                />

                {projectHref && (
                  <TransitionLink
                    href={projectHref}
                    className={cn(
                      "group mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-primary/80",
                      locale === "ja"
                        ? "justify-self-start"
                        : "justify-self-center",
                    )}
                  >
                    {active.projectLabel}
                    <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </TransitionLink>
                )}
              </DialogContent>
            )}
          </Dialog>
        </div>

        {/* One dot per person. Marks do not get a dot: they are shortcuts
            to a person, not testimonials of their own. */}
        <div
          className={cn(
            "mx-auto mt-5 flex w-full max-w-[40rem] items-center gap-2.5",
            locale === "ja" ? "justify-start" : "justify-center",
          )}
        >
          {items.map((item) => {
            const current = item.id === active.id;
            /* A dot stands for a person, so it moves that person's first
               project into the middle. */
            const first = coins.find((coin) => coin.personId === item.id);
            if (!first) return null;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => select(first.key)}
                aria-label={item.name}
                aria-current={current ? "true" : undefined}
                className={cn(
                  "h-1.5 rounded-full transition-[width,background-color] duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  current
                    ? "w-7 bg-primary"
                    : "w-1.5 bg-primary/25 hover:bg-primary/40",
                )}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
