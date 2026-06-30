"use client";

import Navbar from "@/components/Navbar";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import BookACall from "@/components/BookACall";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <About />
      <FAQ />
      <BookACall />
      <Footer />
    </div>
  );
}
