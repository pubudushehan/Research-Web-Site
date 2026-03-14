import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ProblemSection } from "@/components/ProblemSection";
import { AimsSection } from "@/components/AimsSection";
import { MethodologySection } from "@/components/MethodologySection";
import { DatasetSection } from "@/components/DatasetSection";
import { EmotionDetectionSection } from "@/components/EmotionDetectionSection";
import { TimelineSection } from "@/components/TimelineSection";
import { TeamSection } from "@/components/TeamSection";
import { ImpactSection } from "@/components/ImpactSection";
import { ResourcesSection } from "@/components/ResourcesSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { BackToTopButton } from "@/components/BackToTopButton";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <AimsSection />
        <MethodologySection />
        <DatasetSection />
        <EmotionDetectionSection />
        <TimelineSection />
        <TeamSection />
        <ImpactSection />
        <ResourcesSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTopButton />
    </>
  );
}
