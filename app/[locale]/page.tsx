import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import Work from "@/components/Work";
import Testimonials from "@/components/Testimonials";
import BookACall from "@/components/BookACall";
import Process from "@/components/Process";
import About from "@/components/About";
import FAQ from "@/components/FAQ";

import type { Metadata } from "next";

import { staticPageMetadata, toLocale } from "@/lib/seo";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return staticPageMetadata(toLocale(params.locale), "home", "/");
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Process />
      <About />
      <Work />
      <Testimonials />
      <WhatWeDo />
      <FAQ />
      <BookACall />
    </div>
  );
}
