import portfolio from "../portfolio.json";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import EducationSection from "../components/EducationSection";
import SkillsSection from "../components/SkillsSection";
import ProjectsSection from "../components/ProjectsSection";
import ExperienceSection from "../components/ExperienceSection";
import CertificatesSection from "../components/CertificatesSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import DataSection from "../components/DataSection";
import BlueprintGrid from "../components/BlueprintGrid";
import { getAvailableSections, hasContent } from "../lib/getData";

const sectionComponents = {
  about: AboutSection,
  education: EducationSection,
  skills: SkillsSection,
  projects: ProjectsSection,
  experience: ExperienceSection,
  certificates: CertificatesSection,
  contact: ContactSection,
};

export default function HomePage() {
  const sections = getAvailableSections(portfolio);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <BlueprintGrid />
      <Navbar data={portfolio} sections={sections} />
      {hasContent(portfolio.hero) && <HeroSection data={portfolio.hero} />}
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        {sections
          .filter((section) => section !== "hero")
          .map((section) => {
            const Section = sectionComponents[section];
            return Section ? (
              <Section key={section} data={portfolio[section]} />
            ) : (
              <DataSection
                key={section}
                section={section}
                data={portfolio[section]}
              />
            );
          })}
      </div>
      <Footer data={portfolio} />
    </main>
  );
}
