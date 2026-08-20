import MastheadCollage from "@/components/zine/MastheadCollage";
import BioSection from "@/components/zine/BioSection";
import SitesPanel from "@/components/zine/SitesPanel";
import CreatorJourneyGrid from "@/components/zine/CreatorJourneyGrid";
import JourneyFooter from "@/components/zine/JourneyFooter";

export default function Home() {
  return (
    <main className="zine-page relative min-h-screen w-full">
      <div className="relative w-full">
        <MastheadCollage />
        <BioSection />
        <SitesPanel />
        <CreatorJourneyGrid />
        <JourneyFooter />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 border-[8px] sm:border-[12px] border-black"
      />
    </main>
  );
}
