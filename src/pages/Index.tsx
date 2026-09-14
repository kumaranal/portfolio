import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import ProofSection from "@/components/ProofSection";
import ApproachSection from "@/components/ApproachSection";
import WorkSection from "@/components/WorkSection";
import DeepDiveSection from "@/components/DeepDiveSection";
import SkillsSection from "@/components/SkillsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <ProofSection />
        <ApproachSection />
        <WorkSection />
        <DeepDiveSection />
        <SkillsSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
