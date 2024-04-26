import { useEffect, useRef, useState } from "react";
// import Company from "../components/shared/Company";
import Header from "../components/shared/Header";
import InfoPart from "../components/shared/InfoPart";
import LeaderBoard from "../components/shared/LeaderBoard";
import Oppotunuties from "../components/shared/Oppotunuties";
import ShortInfo from "../components/shared/ShortInfo";
import { TiArrowUpThick } from "react-icons/ti";
import HowItWorks from "../components/shared/HowItWorks";
import ContactUs from "../components/shared/ContactUs";

export default function MainPage() {
  const [showArrow, setShowArrow] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleScroll() {
      if (elementRef.current) {
        const elementTop = elementRef.current.getBoundingClientRect().top;
        // Define the threshold to show the arrow (e.g., halfway through the element)
        const scrollThreshold = window.innerHeight / 2;

        if (elementTop < scrollThreshold) {
          setShowArrow(true);
        } else {
          setShowArrow(false);
        }
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function handleScrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <div className="">
      <Header />
      <Oppotunuties />
      {/* <Company /> */}
      <div className="fill bg-[#061723]">
        <InfoPart />

        <ShortInfo ref={elementRef} />
        <LeaderBoard />
        <HowItWorks />
        <ContactUs />
      </div>
      {showArrow && (
        <div
          className="scroll-to-top arrow-animation"
          onClick={handleScrollToTop}
        >
          <TiArrowUpThick size={40} />
        </div>
      )}
    </div>
  );
}
