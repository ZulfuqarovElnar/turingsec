import OpportunitiesLine from "../components/component/OpportunitiesLine";
import OpportunitiesHackerBox from "../components/shared/OpportunitiesHackerBox";
import { Button } from "../components/ui/button";

export default function OpportunitiesHacker() {
  return (
    <>
      <div className=" xl:pb-40  sm:pb-28 sm:pt-16  text-[white] lg:flex-row items-center bg-[#061723] dark:bg-inherit sm:px-16 mt-[52px] pb-20 py-0  px-8 pt-20">
        <div className="flex items-center flex-col lg:flex-row">
          <div className="lg:w-1/2 w-full">
            <h2 className="sm:text-[50px] font-[700] text-[28px]">
              Opportunities for Hackers
            </h2>
            <p className="sm:text-[20px] text-[18px] font-[500] w-full">
              Bug bounty platforms offer several opportunities for hackers:
              <br />
              <br />
              Financial Rewards: Hackers can earn money by finding and reporting
              vulnerabilities to companies and organizations participating in
              bug bounty programs. Depending on the severity of the discovered
              bugs, rewards can range from a few hundred to thousands of
              dollars. Skill Development: Engaging in bug bounty programs allows
              hackers to sharpen their skills in identifying and exploiting
              vulnerabilities across various systems and applications. It offers
              a practical learning ground for ethical hacking and cybersecurity.
            </p>
          </div>
          <div className="m-auto lg:w-1/2 w-full">
            <img
              src="/assets/images/mix-image7.png"
              alt=""
              className="m-auto"
            />
          </div>
        </div>
        <div className="grid xl:grid-cols-3 grid-cols-1 md:grid-cols-2 gap-16 lg:mt-40 mt-10">
          <OpportunitiesHackerBox
            title="Recognition and Reputation "
            text="Successful bug hunters often gain recognition within the cybersecurity community and may even establish a reputation for their skills. Some bug bounty platforms have leaderboards and rankings, showcasing top performers."
            icon={
              <img
                src="/assets/icon5.png"
                className="sm:w-[90px] w-[60px] m-auto"
              />
            }
          />
          <OpportunitiesHackerBox
            title="Networking Opportunities: "
            text="Bug bounty platforms provide a space for hackers to interact with security professionals, companies, and like-minded individuals. This networking can lead to potential job offers, collaborations, or mentorship opportunities."
            icon={
              <img
                src="/assets/icon6.png"
                className="sm:w-[90px] w-[60px] m-auto"
              />
            }
          />
          <OpportunitiesHackerBox
            title="Contributing to Cybersecurity  "
            text="By reporting vulnerabilities, hackers contribute to making the digital world safer. They help companies identify and fix security weaknesses before malicious actors exploit them, thus strengthening overall cybersecurity."
            icon={
              <img
                src="/assets/icon7.png"
                className="sm:w-[90px] w-[60px] m-auto"
              />
            }
          />
          <OpportunitiesHackerBox
            title="Diverse Targets for Comprehensive Testing
          "
            text="Explore a wide array of testing opportunities, including Web, API, Mobile Apps, Cloud, IOT Devices, and more, ensuring comprehensive security coverage."
            icon={
              <img
                src="/assets/icon8.png"
                className="sm:w-[90px] w-[60px] m-auto"
              />
            }
          />
          <OpportunitiesHackerBox
            title="Vulnerability Rating Taxonomy: Efficient Risk Assessment
          "
            text="Adhering to community-driven standards for risk severity, facilitating more efficient and effective work in identifying and addressing vulnerabilities."
            icon={
              <img
                src="/assets/icon9.png"
                className="sm:w-[90px] w-[60px] m-auto"
              />
            }
          />
          <OpportunitiesHackerBox
            title="Additional Benefits "
            text="Expand your professional network, acquire cutting-edge gear, develop advanced skills, and more, ensuring a well-rounded and enriching experience."
            icon={
              <img
                src="/assets/icon10.png"
                className="sm:w-[90px] w-[60px] m-auto"
              />
            }
          />
          <OpportunitiesHackerBox
            title="Expert Community Collaboration
          "
            text="Engage with and learn from top hackers and technologists, fostering a collaborative environment for skill enhancement and knowledge sharing."
            icon={
              <img
                src="/assets/icon11.png"
                className="sm:w-[90px] w-[60px] m-auto"
              />
            }
          />
          <OpportunitiesHackerBox
            title="Security Knowledge Platform: Your Project's Complete Foundation"
            text="An all-in-one foundation managing your projects from start to finish, providing a comprehensive solution for streamlined security operations."
            icon={
              <img
                src="/assets/icon12.png"
                className="sm:w-[90px] w-[60px] m-auto"
              />
            }
          />
          <OpportunitiesHackerBox
            title="24/7 Triage Excellence
          "
            text="Global specialists equipped with advanced tools swiftly validate and prioritize vulnerabilities, expediting the resolution process."
            icon={
              <img
                src="/assets/icon13.png"
                className="sm:w-[90px] w-[60px] m-auto"
              />
            }
          />

          <OpportunitiesHackerBox
            title="TuringMatch: Skillfull Pairing for Success
          "
            text="Cleverly matches hackers of diverse skills and backgrounds with suitable programs, ensuring success for everyone involved."
            icon={
              <img
                src="/assets/icon14.png"
                className="sm:w-[90px] w-[60px] m-auto"
              />
            }
            add={"xl:col-start-2 col-start-auto"}
          />
        </div>
        <div className="mt-20 ">
          <div className="flex justify-between items-center">
            <h2 className="sm:text-[32px] sm:font-[600] text-[28px] font-[700px]">
              Bug Bounties VS. Salary
            </h2>
            <Button className="hover:scale-110 transition-all duration-300 rounded-xl  py-[7px] w-[137px] bg-[#FFDE31] hover:bg-[#FFDE31] text-black  border-2 border-[#FFDE31] font-[800] hidden sm:block ">
              View All
            </Button>
          </div>
          <div className="space-y-4 mt-8">
            <OpportunitiesLine />
            <OpportunitiesLine />
            <OpportunitiesLine />
            <OpportunitiesLine />
            <OpportunitiesLine />
          </div>
        </div>
      </div>
      <div className="bg-[#31688F] pb-20">
        <h2 className="sm:text-[40px] sm:font-[800] font-sans text-[28px] font-[700] text-white sm:text-center pt-10 pb-10 lg:pb-0 text-left ml-8 sm:ml-0">
          Start hacking in 3 easy steps
        </h2>
        <div className="text-white px-16 flex items-center flex-col lg:flex-row">
          <div className="sm:w-[60%]  w-full">
            <div className="pl-10 border-l border-dashed border-white relative  pb-4">
              <h3 className="font-[800] mb-2 text-[18px] sm:text-[20px]">
                1. Create Your Account
              </h3>
              <p className="sm:text-[18px] text-[16px] font-[400]">
                It only takes a few minutes to activate.
              </p>
              <img
                src="/assets/carbon22yes.svg"
                alt=""
                className="absolute top-0 left-0 -ml-[17px] w-[32px] bg-[#31688F]"
              />
            </div>
            <div className="pl-10 border-l border-dashed border-white relative  pb-4">
              <h3 className="font-[800] mb-2 text-[18px] sm:text-[20px]">
                2. Find a Program
              </h3>
              <p className="sm:text-[18px] text-[16px] font-[400]">
                Let us help you find the right one for you.
              </p>
              <img
                src="/assets/carbon22.svg"
                alt=""
                className="absolute top-0 left-0 -ml-[13px] w-[24px] bg-[#31688F]"
              />
            </div>
            <div className="pl-10  border-dashed border-white relative  pb-4">
              <h3 className="font-[800] mb-2 text-[18px] sm:text-[20px]">
                3. Start Hacking
              </h3>
              <p className="sm:text-[18px] text-[16px] font-[400]">
                We make it easy to get rolling right away.
              </p>
              <img
                src="/assets/carbon22.svg"
                alt=""
                className="absolute top-0 left-0 -ml-[13px] w-[24px] bg-[#31688F]"
              />
            </div>
            <Button className="hover:scale-110 transition-all duration-300 rounded-xl  py-[7px] w-[137px] bg-[#FFDE31] hover:bg-[#FFDE31] text-black  border-2 border-[#FFDE31] font-[800] hidden lg:block mt-10">
              Start Today
            </Button>
          </div>
          <div className="m-auto max-w-[600px] lg:w-auto">
            <img src="/assets/images/mix-image8.png" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
