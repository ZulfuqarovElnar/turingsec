import { Link } from "react-router-dom";

import { useState } from "react";

import { TiThMenu } from "react-icons/ti";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "../ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrentUser } from "../../context/CurrentUser";
import { Button } from "../ui/button";
import { useCurrentCompany } from "../../context/CurrentCompany";
export default function Navbar() {
  const { currentUser } = useCurrentUser();
  const { currentCompany } = useCurrentCompany();
  console.log(currentCompany);

  const [hoveredLink, setHoveredLink] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [ani, setAni] = useState(false);
  const handleHover = (link: string) => {
    setHoveredLink(link);
  };

  const resetHover = () => {
    setHoveredLink("");
  };
  const closeSheetDelayed = () => {
    setTimeout(() => {
      setIsOpen(false);
    }, 500); // 3 seconds delay before closing
  };

  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const variantsElement = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };
  return (
    <div
      className="bg-[#0C2F47] text-[
        white]   flex justify-between items-center px-8 sm:px-16 py-2 fixed top-0 w-full z-50 h-[80px]"
    >
      <Link className="hidden sm:block" to={"/"}>
        <img src="/assets/images/newlogo.png" alt="logo" width={150} />
      </Link>
      <Link to={"/"} className="block sm:hidden">
        <img src="/assets/newsmalllogo.png" alt="logo" width={29} />
      </Link>
      <div className="xl:flex space-x-8 hidden mr-16 items-center h-[80px] text-[white]">
        <Link
          to="/aboutus"
          className={`hover:text-blue-700 transition-all duration-300 font-medium ${
            hoveredLink && hoveredLink !== "/aboutus" && "opacity-40"
          }`}
          onMouseEnter={() => handleHover("/aboutus")}
          onMouseLeave={resetHover}
        >
          About us
        </Link>
        <Link
          to="/leaderboard"
          className={`hover:text-blue-700 transition-all duration-300 font-medium ${
            hoveredLink && hoveredLink !== "/leaderboard" && "opacity-40"
          }`}
          onMouseEnter={() => handleHover("/leaderboard")}
          onMouseLeave={resetHover}
        >
          Leaderboard
        </Link>
        <Link
          to={currentUser?.activated ? "/work/programs" : "/registerhacker"}
          className={`hover:text-blue-700 transition-all duration-300 font-medium ${
            hoveredLink && hoveredLink !== "/bugbountyprograms" && "opacity-40"
          }`}
          onMouseEnter={() => handleHover("/bugbountyprograms")}
          onMouseLeave={resetHover}
        >
          Bug Bounty programs
        </Link>
        <Link
          to="/opportunities"
          className={`hover:text-blue-700 transition-all duration-300 font-medium ${
            hoveredLink && hoveredLink !== "opportunities" && "opacity-40"
          }`}
          onMouseEnter={() => handleHover("opportunities")}
          onMouseLeave={resetHover}
        >
          Opportunities
        </Link>
        <Link
          to="/joinus"
          className={`hover:scale-105 transition-all duration-300 font-medium bg-[#2451F5] text-center w-[150px] text-white rounded-3xl py-[7px] ${
            hoveredLink && hoveredLink !== "joinus" && "opacity-40"
          }`}
          onMouseEnter={() => handleHover("joinus")}
          onMouseLeave={resetHover}
        >
          Contact Us
        </Link>
      </div>

      <Sheet
        open={isOpen}
        onOpenChange={(nextIsOpen) => {
          setAni(nextIsOpen);
          if (!nextIsOpen) {
            closeSheetDelayed();
          }

          setIsOpen(true);
        }}
      >
        <SheetTrigger className=" xl:hidden sm:mr-[55px] mr-[63px] ">
          <TiThMenu size={20} style={{ color: "white" }} />
        </SheetTrigger>
        <AnimatePresence mode="wait">
          <SheetContent className="w-[300px]  dark">
            <SheetHeader>
              <Link to={"/"}>
                <img
                  src="/assets/images/newlogo.png"
                  alt="logo"
                  width={200}
                  className="m-auto"
                />
              </Link>
            </SheetHeader>

            <motion.div
              className="flex flex-col  items-center space-y-8 mt-4 text-white"
              variants={variants}
              initial="closed"
              animate={`${ani ? "open" : "closed"}`}
              exit="closed"
            >
              <motion.div variants={variantsElement}>
                <Link
                  to="/aboutus"
                  className={`hover:text-blue-700 transition-all duration-300 font-medium  ${
                    hoveredLink && hoveredLink !== "/aboutus" && "opacity-40"
                  }`}
                  onMouseEnter={() => handleHover("/aboutus")}
                  onMouseLeave={resetHover}
                >
                  About us
                </Link>
              </motion.div>
              <motion.div variants={variantsElement}>
                <Link
                  to="/leaderboard"
                  className={`hover:text-blue-700 transition-all duration-300 font-medium ${
                    hoveredLink &&
                    hoveredLink !== "/leaderboard" &&
                    "opacity-40"
                  }`}
                  onMouseEnter={() => handleHover("/leaderboard")}
                  onMouseLeave={resetHover}
                >
                  Leaderboard
                </Link>
              </motion.div>
              <motion.div variants={variantsElement}>
                <Link
                  to={
                    currentUser?.activated
                      ? "/work/programs"
                      : "/registerhacker"
                  }
                  className={`hover:text-blue-700 transition-all duration-300 font-medium ${
                    hoveredLink &&
                    hoveredLink !== "/bugbountyprograms" &&
                    "opacity-40"
                  }`}
                  onMouseEnter={() => handleHover("/bugbountyprograms")}
                  onMouseLeave={resetHover}
                >
                  Bug Bounty programs
                </Link>
              </motion.div>
              <motion.div variants={variantsElement}>
                <Link
                  to="/opportunities"
                  className={`hover:text-blue-700 transition-all duration-300 font-medium ${
                    hoveredLink &&
                    hoveredLink !== "opportunities" &&
                    "opacity-40"
                  }`}
                  onMouseEnter={() => handleHover("opportunities")}
                  onMouseLeave={resetHover}
                >
                  Opportunities
                </Link>
              </motion.div>
            </motion.div>
          </SheetContent>
        </AnimatePresence>
      </Sheet>

      <div className="absolute sm:right-12 right-6 flex items-center gap-2">
        <Link
          to="/joinus"
          className={`hover:scale-105 transition-all duration-300 font-medium bg-[#2451F5] text-center w-[120px] text-white rounded-3xl py-[7px]  absolute right-28 sm:w-[150px] block xl:hidden text-[14px] sm:text-[16px]  ${
            hoveredLink && hoveredLink !== "joinus" && "opacity-40"
          }`}
          onMouseEnter={() => handleHover("joinus")}
          onMouseLeave={resetHover}
        >
          Contact Us
        </Link>
        {currentUser?.activated && (
          <Link to={"/work/dashboard"}>
            <img
              src="/assets/images/newuserlogo.svg"
              alt="usericon"
              className="w-[54px] cursor-pointer"
            />
          </Link>
        )}
        {currentCompany && (
          <Link to={"/company/dashboard"}>
            <img
              src="/assets/images/newuserlogo.svg"
              alt="usericon"
              className="w-[54px] cursor-pointer"
            />
          </Link>
        )}
        {!currentUser?.activated && !currentCompany && (
          <img
            src="/assets/images/newuserlogo.svg"
            alt="usericon"
            className="w-[54px] cursor-pointer"
          />
        )}

        {/* <button className=" " onClick={toggleDarkMode}>
          {darkMode ? <CgSun /> : <BsFillMoonStarsFill />}
        </button> */}
      </div>
    </div>
  );
}
