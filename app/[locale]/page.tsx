import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import Work from "@/components/Work";
import Process from "@/components/Process";
import BookACall from "@/components/BookACall";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <WhatWeDo />
      <Work />
      <BookACall />
      <Process />
      <Footer />
    </div>
  );
}
