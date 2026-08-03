import { Preloader } from "@/components/layout/Preloader";
import { Nav } from "@/components/layout/Nav";
import { StatusBar } from "@/components/layout/StatusBar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Hero } from "@/components/sections/Hero";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Education } from "@/components/sections/Education";
import { Contact } from "@/components/sections/Contact";

const Index = () => {
  return (
    <SmoothScroll>
      <div className="grain relative min-h-screen bg-background">
        <Preloader />
        <ScrollProgress />
        <Nav />
        <main className="pb-14 md:pb-14">
          <Hero />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </main>
        <Footer />
        <StatusBar />
      </div>
    </SmoothScroll>
  );
};

export default Index;
