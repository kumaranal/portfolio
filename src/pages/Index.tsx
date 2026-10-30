import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import StrengthsSection from "@/components/StrengthsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import EducationSection from "@/components/EducationSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import AssistantWidget from "@/components/assistant/AssistantWidget";

const Index = () => {
  return (
    <div className="site min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <StrengthsSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <CertificationsSection />
        <ContactSection />
      </main>
      <Footer />
      <AssistantWidget />
    </div>
  );
};

export default Index;
