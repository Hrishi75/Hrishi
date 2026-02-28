import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Blogs from "@/components/sections/Blogs";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import Loader from "@/components/effects/Loader";
import CherryBlossoms from "@/components/effects/CherryBlossoms";
import SlashTransition from "@/components/effects/SlashTransition";

export default function Home() {
  return (
    <>
      <Loader />
      <CherryBlossoms />
      <SlashTransition />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Blogs />
      <Contact />
      <Footer />
    </>
  );
}