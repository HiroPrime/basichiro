import MastheadCollage from "@/components/zine/MastheadCollage";
import BioSection from "@/components/zine/BioSection";
import SitesPanel from "@/components/zine/SitesPanel";
import CreatorJourneyGrid from "@/components/zine/CreatorJourneyGrid";
import JourneyFooter from "@/components/zine/JourneyFooter";
import ClimbingPixelCharacter from "@/components/zine/ClimbingPixelCharacter";

export default function Home() {
  return (
    <main className="zine-page relative min-h-screen w-full">
      <div className="relative mx-auto w-full max-w-[480px] sm:max-w-[540px] md:max-w-[620px] lg:max-w-[680px]">
        <MastheadCollage />
        <BioSection />
        <SitesPanel />
        <CreatorJourneyGrid />
        <JourneyFooter />
      </div>
      <ClimbingPixelCharacter />
    </main>
  );
}
