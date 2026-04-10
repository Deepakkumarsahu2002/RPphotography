import HeroSlider from "@/components/HeroSlider";
import FeaturedGallery from "@/components/FeaturedGallery";
import VideoPreview from "@/components/VideoPreview";
import AboutPreview from "@/components/AboutPreview";
import PackagesPreview from "@/components/PackagesPreview";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactCTA from "@/components/ContactCTA";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => (
  <>
    <Navbar />
    <main>
      <HeroSlider />
      <FeaturedGallery />
      <VideoPreview />
      <AboutPreview />
      <PackagesPreview />
      <TestimonialsSection />
      <FAQSection />
      <ContactCTA />
    </main>
    <Footer />
  </>
);

export default Index;
