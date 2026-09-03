import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import Work from "@/components/Work";
import Testimonials from "@/components/Testimonials";
import BookACall from "@/components/BookACall";
import Process from "@/components/Process";
import About from "@/components/About";
import FAQ from "@/components/FAQ";

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
