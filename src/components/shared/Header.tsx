import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
export default function Header() {
  return (
    <div className=" flex  justify-between xl:pb-12 pb-4 sm:py-28 flex-col-reverse text-[white] lg:flex-row items-center bg-[#31688F] dark:bg-inherit sm:px-16 mt-[52px] py-20 px-8">
      <motion.div
        animate={{
          x: [-900, 0],
          opacity: [0, 1], // Fade in animation
          scale: [0.5, 1], // Scale animation from 0.5 to 1
          transition: {
            duration: 1, // Duration of the animation (in seconds)
            ease: "easeInOut", // Smooth easing function
          },
        }}
      >
        <div className="md:text-[50px]  md:leading-[60px] text-center lg:text-left text-[30px] leading-[40px] md:mt-8 mt-2 animated-text font-[700] ">
          Discover Report,
          <br />
          <span className="md:text-[35px] text-[25px] "></span>
        </div>
        <p className="md:text-[20px] text-[14px] mt-4 text-center lg:text-left   leading-7 opacity-90 font-urbanist font-[500] ">
          Our Bug Bounty Platform Encourages
          <span className="lg:block inline"> Cybersecurity Collaboration</span>
        </p>
        <div className="flex justify-between my-6 md:w-[80%] m-auto flex-col md:flex-row space-y-4 md:space-y-0   lg:w-[100%] w-[100%] md:space-x-4 space-x-0 items-center">
          <Link to={"/registerhacker"}>
            <Button className="hover:scale-110 transition-all duration-300 rounded-3xlpy-[7px] w-[220px] bg-[#FFDE31] hover:bg-[#FFDE31] text-black font-bold rounded-3xl">
              Register as a hacker
            </Button>
          </Link>
          <Link to={"/registercompany"}>
            <Button className="hover:scale-110 transition-all duration-300 rounded-3xl  py-[7px] w-[220px] bg-transparent text-white  border-2 border-[#FFDE31] font-[600] hover:bg-transparent">
              Register as a Company
            </Button>
          </Link>
        </div>
      </motion.div>
      <motion.div
        className="min-w-[50%]"
        animate={{
          opacity: [0, 1], // Fade in animation
          scale: [0.5, 1], // Scale animation from 0.5 to 1
          transition: {
            duration: 1, // Duration of the animation (in seconds)
            ease: "easeInOut", // Smooth easing function
          },
        }}
      >
        <motion.img
          src="/assets/images/mix-image3.png"
          alt="assets"
          className="m-auto lg:w-[600px] md:w-[400px] w-[300px] "
          transition={{
            y: {
              repeat: Infinity, // Repeat the animation infinitely
              duration: 2, // Duration of each animation cycle (in seconds)
              repeatType: "mirror", // Reverse the animation direction on each repeat
              ease: "easeInOut", // Smooth easing function
            },
          }}
          animate={{
            y: [-30, 30], // Range of vertical motion
          }}
        />
      </motion.div>
    </div>
  );
}
