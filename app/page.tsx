import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Architecture from "@/components/sections/Architecture";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

import Loader from "@/components/effects/Loader";
import CherryBlossoms from "@/components/effects/CherryBlossoms";

export default function Home() {
  return (
    <>
      <Loader />
      <CherryBlossoms />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Architecture />
      <Contact />
      <Footer />
    </>
  );
}
