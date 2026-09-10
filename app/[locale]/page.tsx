import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import Work from "@/components/Work";
import Testimonials from "@/components/Testimonials";
import BookACall from "@/components/BookACall";
import Process from "@/components/Process";
import About from "@/components/About";
import FAQ from "@/components/FAQ";

import type { Metadata } from "next";

import { SiteSchema } from "@/components/seo/SiteSchema";
import { seoDictionary, staticPageMetadata, toLocale } from "@/lib/seo";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return staticPageMetadata(toLocale(params.locale), "home", "/");
}

export default function Home({ params }: { params: { locale: string } }) {
  const locale = toLocale(params.locale);

  return (
    <div className="min-h-screen">
      <SiteSchema
        locale={locale}
        description={seoDictionary(locale).seo.home.description}
      />
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
