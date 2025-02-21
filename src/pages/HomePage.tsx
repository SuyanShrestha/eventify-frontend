import { useEffect } from "react";
import IntroSection from "../components/home/IntroSection";
import PreLoader from "../components/ui/Preloader";

let page_load = sessionStorage.getItem("page_load") === "true" ? true : false;

const HomePage = () => {
  useEffect(() => {
    !page_load ? sessionStorage.setItem("page_load", "true") : "";
  }, []);

  return (
    <div>
      {!page_load ? <PreLoader /> : ""}

      <IntroSection />
    </div>
  );
};

export default HomePage;
