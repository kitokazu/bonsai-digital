export type WorkBucket = "websites" | "ecommerce" | "software";

export type WorkProjectId =
  | "homeHairCoffee"
  | "chnl301"
  | "cgOnlineAcademy"
  | "definex"
  | "influencerAgency"
  | "publicSectorAI"
  | "arGalleryMVP";

export interface WorkProject {
  id: WorkProjectId;
  bucket: WorkBucket;
  image?: string;
  confidential?: boolean;
  inProgress?: boolean;
  slug?: string;
  placeholderColor?: string;
}

export const workProjects: WorkProject[] = [
  {
    id: "influencerAgency",
    bucket: "software",
    image: "/uncharted/dashboard.png",
    slug: "influencer-platform",
  },
  {
    id: "cgOnlineAcademy",
    bucket: "websites",
    image: "/cg-landing.png",
    slug: "cg-online-academy",
  },
  {
    id: "publicSectorAI",
    bucket: "software",
    confidential: true,
    image: "/public-sector/main-page.png",
    slug: "public-sector-ai",
  },
  {
    id: "definex",
    bucket: "websites",
    image: "/define-x-about.png",
    slug: "definex",
  },
  {
    id: "homeHairCoffee",
    bucket: "websites",
    image: "/home-hair-coffee/home-hair-landing.png",
    slug: "home-hair-coffee",
  },
  {
    id: "chnl301",
    bucket: "websites",
    image: "/chnl301/chnl301-landing.png",
    slug: "chnl301",
  },
  {
    id: "arGalleryMVP",
    bucket: "software",
    inProgress: true,
    placeholderColor: "from-accent/20 to-accent/5",
  },
];
