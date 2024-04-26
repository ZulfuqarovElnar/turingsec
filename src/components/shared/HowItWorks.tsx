export default function HowItWorks() {
  return (
    <section className="sm:px-16 pb-12 sm-8 text-white px-8 ">
      <h2 className="font-bold text-[32px] my-6">How it works ?</h2>{" "}
      <p className="sm:text-[20px] font-[400] lg:w-[45%]  w-[100%] text-[16px] ">
        These stages may vary slightly depending on the specific bug bounty
        platform or organization. Effective communication and collaboration
        between researchers and the organization are key throughout the entire
        process.
      </p>
      <div className="flex">
        <div className="mt-8 lg:w-[40%] w-[100%] ml-3">
          <div className="pl-10 border-l border-dashed border-white relative  pb-4">
            <h3 className="font-[800] mb-2 text-[18px] sm:text-[20px]">
              1.Program Launch:
            </h3>
            <p className="sm:text-[20px] text-[16px] font-[400]">
              The organization announces and launches the bug bounty program,
              specifying the scope, rules, and rewards.
            </p>
            <img
              src="/assets/images/carbonyes.svg"
              alt=""
              className="absolute top-0 left-0 -ml-[17px] bg-[#061723;]"
            />
          </div>
          <div className="pl-10 border-l border-dashed border-white relative  pb-4">
            <h3 className="font-[800] mb-2 text-[18px] sm:text-[20px]">
              2.Researcher Registration:
            </h3>
            <p className="sm:text-[20px] text-[16px] font-[400]">
              Security researchers register on the bug bounty platform, agreeing
              to the program's terms and conditions.
            </p>
            <img
              src="/assets/images/carbon.svg"
              alt=""
              className="absolute top-0 left-0 -ml-[17px] bg-[#061723;]"
            />
          </div>
          <div className="pl-10 border-l border-dashed border-white relative  pb-4">
            <h3 className="font-[800] mb-2 text-[18px] sm:text-[20px]">
              3.Bug Hunting:
            </h3>
            <p className="sm:text-[20px] text-[16px] font-[400]">
              Researchers actively search for vulnerabilities within the defined
              scope, using various testing methodologies.
            </p>
            <img
              src="/assets/images/carbon.svg"
              alt=""
              className="absolute top-0 left-0 -ml-[17px] bg-[#061723;]"
            />
          </div>
          <div className="pl-10 border-l border-dashed border-white relative  pb-4">
            <h3 className="font-[800] mb-2 text-[18px] sm:text-[20px]">
              4.Vulnerability Submission:
            </h3>
            <p className="sm:text-[20px] text-[16px] font-[400]">
              Researchers submit their findings, detailing the identified
              vulnerabilities and providing clear steps to reproduce them.
            </p>
            <img
              src="/assets/images/carbon.svg"
              alt=""
              className="absolute top-0 left-0 -ml-[17px] bg-[#061723;]"
            />
          </div>
          <div className="pl-10 border-l border-dashed border-white relative  pb-4">
            <h3 className="font-[800] mb-2 text-[18px] sm:text-[20px]">
              5.Triage and Validation:
            </h3>
            <p className="sm:text-[20px] text-[16px] font-[400]">
              The organization's security team reviews and validates the
              submitted vulnerabilities, assessing their severity and impact.
            </p>
            <img
              src="/assets/images/carbon.svg"
              alt=""
              className="absolute top-0 left-0 -ml-[17px] bg-[#061723;]"
            />
          </div>
          <div className="pl-10 border-l border-dashed border-white relative  ">
            <h3 className="font-[800] mb-2 text-[18px] sm:text-[20px]">
              6.Rewards and Recognition:
            </h3>
            <p className="sm:text-[20px] text-[16px] font-[400]">
              Researchers receive rewards or recognition based on the severity
              and impact of their reported vulnerabilities. This could include
              monetary compensation, public acknowledgment, or other incentives
            </p>
            <img
              src="/assets/images/carbon.svg"
              alt=""
              className="absolute top-0 left-0 -ml-[17px] bg-[#061723;]"
            />
          </div>
        </div>
        <div className="w-[60%] hidden lg:block mx-auto relative left-10 -top-20">
          <img src="/assets/images/mix-image1.png" alt="" className="m-auto " />
        </div>
      </div>
    </section>
  );
}
