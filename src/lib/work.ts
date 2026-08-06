export type WorkBucket = "websites" | "ecommerce" | "software";

export type WorkProjectId =
  | "homeHairCoffee"
  | "chnl301"
  | "cgOnlineAcademy"
  | "definex"
  | "influencerAgency"
  | "publicSectorAI"
  | "apexAutowerks"
  | "roleMap"
  | "arGalleryMVP";

export interface WorkProject {
  id: WorkProjectId;
  bucket: WorkBucket;
  image?: string;
  confidential?: boolean;
  inProgress?: boolean;
  /* Built by us as a demo, not a client engagement */
  demo?: boolean;
  slug?: string;
  placeholderColor?: string;
  /* Gradient classes for the colored card frame, drawn from each project's own palette */
  frameClass?: string;
  /* Solid background + letter color for the square logo tile */
  tileClass?: string;
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
    id: "apexAutowerks",
    bucket: "software",
    demo: true,
    image: "/apex-autowerks/dashboard.png",
    slug: "apex-autowerks",
    frameClass: "from-[#7c2a24] to-[#cf6f66]",
    tileClass: "bg-[#7c2a24] text-[#f8dedb]",
  },
  {
    id: "roleMap",
    bucket: "software",
    demo: true,
    image: "/rolemap/matrix.png",
    slug: "rolemap",
    frameClass: "from-[#2b3383] to-[#7f8ae2]",
    tileClass: "bg-[#2b3383] text-[#e0e4fc]",
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
    placeholderColor: "from-accent/20 to-accent/5",
    frameClass: "from-[#8a4c3a] to-[#b07a5e]",
    tileClass: "bg-[#8f5340] text-[#f8e6da]",
  },
];
