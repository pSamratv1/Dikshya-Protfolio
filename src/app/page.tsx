import { getPortfolioData } from "@/lib/action"; // The fetch function we made
import AboutSection from "@/components/AboutSection";
import HeroAnimation from "@/components/HeroAnimation";
import PodcastSection from "@/components/PodcastSection";
import GuestSection from "@/components/GuestSection";
import GallerySection from "@/components/GalleySection";
import TestimonialSection from "@/components/TestimonailSection";
import ContactSection from "@/components/ConatctSection";
import Footer from "@/components/Footer";

// Force dynamic rendering so admin updates show immediately
export const dynamic = "force-dynamic";

export default async function HomePage() {
  // 1. Fetch all data from Database (or defaults)
  const data = await getPortfolioData();
  return (
    <>
      <HeroAnimation data={data.hero} />

      <AboutSection data={data.about} />

      <div id="podcast" className="w-full md:py-20 py-16  bg-[#f4f2eb]">
        <PodcastSection data={data.podcasts} />
      </div>
      <GuestSection data={data.guests} />
      <GallerySection data={data.gallery} />
      <TestimonialSection data={data.testimonials} />
      <ContactSection />

      <Footer />
    </>
  );
}
