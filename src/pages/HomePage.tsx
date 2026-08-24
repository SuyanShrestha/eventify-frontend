import { useEffect } from "react";
import {
  AboutUs,
  ContactUs,
  FeaturedEvents,
  FeaturesSection,
  HeroSection,
  TestimonialSection,
} from "../components/home";
import PreLoader from "../components/ui/Preloader";
import Footer from "../components/Footer";

let page_load = sessionStorage.getItem("page_load") === "true" ? true : false;

const HomePage = () => {
  useEffect(() => {
    !page_load ? sessionStorage.setItem("page_load", "true") : "";
  }, []);

  return (
    <div className="bg-primary-500">
      {!page_load ? <PreLoader /> : ""}

      <HeroSection />
      <FeaturesSection />
      <AboutUs />
      <FeaturedEvents />
      <TestimonialSection />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default HomePage;
