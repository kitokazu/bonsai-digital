export type WorkBucket = "websites" | "ecommerce" | "software";

export type WorkProjectId =
  | "homeHairCoffee"
  | "chnl301"
  | "cgOnlineAcademy"
  | "definex"
  | "influencerAgency"
  | "publicSectorAI"
  | "ecommerceOps"
  | "employeeManagement"
  | "enpadel"
  | "milleGrass"
  | "nicolita"
  | "arGalleryMVP";

export interface WorkProject {
  id: WorkProjectId;
  bucket: WorkBucket;
  image?: string;
  /* Basename of a looping clip in public/, without extension. Plays on the
     card in place of the still, with .webm and .mp4 sitting beside it. */
  video?: string;
  confidential?: boolean;
  inProgress?: boolean;
  slug?: string;
  placeholderColor?: string;
  /* Gradient classes for the colored card frame, drawn from each project's own palette */
  frameClass?: string;
  /* Solid background + letter color for the square logo tile */
  tileClass?: string;
  /* Overrides the tile letter, which otherwise comes from the title's first
     character. Needed where two titles would start with the same letter. */
  tileLabel?: string;
}

export const workProjects: WorkProject[] = [
  {
    id: "influencerAgency",
    bucket: "software",
    image: "/uncharted/dashboard.png",
    slug: "influencer-platform",
    frameClass: "from-[#3b3463] to-[#7c72c0]",
    tileClass: "bg-[#3b3463] text-[#d9d4f6]",
  },
  {
    id: "ecommerceOps",
    bucket: "software",
    image: "/apex-autowerks/dashboard.png",
    slug: "ecommerce-ops",
    tileLabel: "EC",
    frameClass: "from-[#7c2a24] to-[#cf6f66]",
    tileClass: "bg-[#7c2a24] text-[#f8dedb]",
  },
  {
    id: "employeeManagement",
    bucket: "software",
    image: "/rolemap/matrix.png",
    slug: "employee-management",
    tileLabel: "EM",
    frameClass: "from-[#2b3383] to-[#7f8ae2]",
    tileClass: "bg-[#2b3383] text-[#e0e4fc]",
  },
  {
    id: "enpadel",
    bucket: "websites",
    image: "/enpadel/scroll-poster.jpg",
    video: "/enpadel/scroll",
    slug: "enpadel",
    frameClass: "from-[#012f21] to-[#4c7d68]",
    tileClass: "bg-[#012f21] text-[#e7dfcd]",
  },
  {
    id: "milleGrass",
    bucket: "websites",
    image: "/mille-grass/hero.jpg",
    slug: "mille-grass",
    frameClass: "from-[#2f6a76] to-[#8fc3ce]",
    tileClass: "bg-[#2f6a76] text-[#e8f3f5]",
  },
  {
    id: "nicolita",
    bucket: "websites",
    image: "/nicolita/hero.jpg",
    slug: "nicolita",
    frameClass: "from-[#3d5c48] to-[#a3bfab]",
    tileClass: "bg-[#3d5c48] text-[#e8f0ea]",
  },
  {
    id: "cgOnlineAcademy",
    bucket: "websites",
    image: "/cg-landing.png",
    slug: "cg-online-academy",
    frameClass: "from-[#7d4247] to-[#b98a86]",
    tileClass: "bg-[#7d4247] text-[#f4e0dd]",
  },
  {
    id: "publicSectorAI",
    bucket: "software",
    confidential: true,
    image: "/public-sector/main-page.png",
    slug: "public-sector-ai",
    frameClass: "from-[#31507c] to-[#7b9ac4]",
    tileClass: "bg-[#31507c] text-[#dbe6f6]",
  },
  {
    id: "definex",
    bucket: "websites",
    image: "/define-x-about.png",
    slug: "definex",
    frameClass: "from-[#14203c] to-[#43619b]",
    tileClass: "bg-[#14203c] text-[#c9d7f0]",
  },
  {
    id: "homeHairCoffee",
    bucket: "websites",
    image: "/home-hair-coffee/home-hair-landing.png",
    slug: "home-hair-coffee",
    frameClass: "from-[#3a362f] to-[#94897a]",
    tileClass: "bg-[#302c26] text-[#ece5d8]",
  },
  {
    id: "chnl301",
    bucket: "websites",
    image: "/chnl301/chnl301-landing.png",
    slug: "chnl301",
    frameClass: "from-[#26201a] to-[#77624c]",
    tileClass: "bg-[#26201a] text-[#e9d6b0]",
  },
  {
    id: "arGalleryMVP",
    bucket: "software",
    inProgress: true,
    image: "/ar-gallery/home.jpg",
    slug: "ar-gallery",
    frameClass: "from-[#1c241e] to-[#4f6353]",
    tileClass: "bg-[#27312a] text-[#e3d8bc]",
  },
];
