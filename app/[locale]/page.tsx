import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import FreeSample from "@/components/FreeSample";
import Work from "@/components/Work";
import About from "@/components/About";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Work />
      <About />
      <Pricing />
      <FreeSample />
      <Contact />
      <Footer />
    </div>
  );
}
