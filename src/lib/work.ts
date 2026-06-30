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
  slug?: string;
  placeholderColor?: string;
}

export const workProjects: WorkProject[] = [
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
    id: "cgOnlineAcademy",
    bucket: "websites",
    image: "/cg-landing.png",
    slug: "cg-online-academy",
  },
  {
    id: "definex",
    bucket: "websites",
    image: "/define-x-about.png",
    slug: "definex",
  },
  {
    id: "influencerAgency",
    bucket: "software",
    placeholderColor: "from-primary/20 to-primary/5",
  },
  {
    id: "publicSectorAI",
    bucket: "software",
    confidential: true,
    placeholderColor: "from-muted/80 to-muted/30",
  },
  {
    id: "arGalleryMVP",
    bucket: "software",
    placeholderColor: "from-accent/20 to-accent/5",
  },
];
