import AboutUsComponent from "../components/shared/AboutUsComponent";

export default function AboutUs() {
  return (
    <div className=" xl:pb-40  sm:py-28   text-[white] lg:flex-row items-center bg-[#061723] dark:bg-inherit sm:px-16 mt-[52px] py-20  px-8 text-left  sm:text-center xl:text-left static w-full sm:pb-0">
      <div className="flex w-full flex-col xl:flex-row">
        <div className="m-auto xl:m-0">
          <h2 className="xl:w-[295px] w-[full] sm:text-[45px] font-[700] sm:leading-[60px] mb-6 text-[28px] leading-[50px]">
            Hunt Bugs Reap Bounties.
          </h2>
          <p className="xl:w-[358px] w-full h-[72px] ext-[20px]">
            Success in cybersecurity hinges on a collaborative team; the right
            team can determine victory or defeat.
          </p>
        </div>
        <div className="m-auto">
          <img
            src="/assets/images/mix-image5.png"
            alt=""
            className="relative xl:left-14 xl:-top-10 sm:-top-14 top-0 left-0"
          />
        </div>
      </div>
      <div className="xl:relative -top-24  static sm:text-center text-left xl:text-left">
        <h2 className="xl:w-[463px] w-auto sm:text-[45px] font-[700] sm:leading-[60px] xl:mb-2 xl:mx-0 sm:m-auto m-0 text-[28px] leading-[50px]">
          Why turingsourced security?
        </h2>
        <div className="flex items-start relative  pb-[150px] flex-col-reverse xl:flex-row ">
          <div className="m-auto ">
            <img
              src="/assets/images/mix-image4.png"
              alt=""
              className="relative sm:-top-[100px] -top-[40px] xl:static xl:top-0"
            />
          </div>
          <div className="m-auto xl:m-0">
            <p className="xl:w-[600px] w-auto xl:h-[293px] sm:text-[20px] font-[500] xl:mb-28 h-auto mb-12  block mt-8 text-[18px]">
              Many organizations face challenges in detecting vulnerabilities
              ahead of attackers due to limited resources and skills. Relying
              solely on reactive tools often produces ineffective and noisy
              results, overlooking emerging risks. Even advanced companies may
              underestimate the creativity and diverse skills of modern
              attackers.
              <span className="hidden xl:inline">
                To bridge the skills gap and rebalance the dynamics between
                attackers and defenders, crowdsourcing has emerged. This
                approach motivates ethical hackers to report crucial bugs.
                However, integrating crowdsourcing into security strategies
                proves challenging for many firms. Existing tools have
                limitations, and consulting-based methods struggle to scale
                efficiently and reliably.
              </span>
            </p>
            <p className="xl:w-[640px] w-auto sm:text-[20px] font-[500] block text-[18px]">
              <span className="inline xl:hidden">
                {" "}
                To bridge the skills gap and rebalance the dynamics between
                attackers and defenders, crowdsourcing has emerged. This
                approach motivates ethical hackers to report crucial bugs.
                However, integrating crowdsourcing into security strategies
                proves challenging for many firms. Existing tools have
                limitations, and consulting-based methods struggle to scale
                efficiently and reliably.
              </span>
              Turingsec has transformed the concept of security collaboration by
              adopting a platform-driven strategy. This approach ensures that
              the most suitable researchers are engaged according to your
              requirements and environment precisely when needed. All
              operational aspects are expertly handled, providing you with a
              seamlessly managed experience.
            </p>
          </div>
        </div>
        <div className="relative sm:-top-[300px] xl:top-0 -top-[200px]">
          <div className="xl:mb-20 sm:mb-4 mb-14 relative ">
            <h2 className="xl:w-[492px] w-full sm:text-[45px] font-[700] sm:leading-[60px] leading-[52px] mb-6 m-auto xl:m-0 text-[28px]">
              Complete involvement with TuringSec
            </h2>
            <p className="xl:w-[508px] w-full h-[82px] sm:text-[20px] font-[500] m-auto xl:m-0 text-[18px]">
              Our method with TuringSec provides an extensive array of
              advantages. It's time to progress beyond restrictive, outdated
              solutions and fully capitalize on the
            </p>
          </div>
          <div className="flex justify-between xl:items-start relative flex-col xl:flex-row items-center">
            <div>
              <AboutUsComponent
                title={"Access specialized talent"}
                text={
                  "We meticulously curate and mobilize adept security researchers from a global, diverse community, assembling the right team for your specific needs at the right times."
                }
                icon={<img src="/assets/icon1.svg" className="min-w-[30px]" />}
              />
              <AboutUsComponent
                title={"Build on a decade of success"}
                text={
                  "Our platform uniquely integrates ten years of accumulated crowdsourced insights on vulnerabilities, assets, researcher contributions, and diverse environments."
                }
                icon={<img src="/assets/icon2.svg" className="min-w-[30px]" />}
              />
            </div>
            <div className="m-auto">
              <AboutUsComponent
                title={"Platform advantage"}
                text={
                  "The Bugcrowd Platform provides scalability, reliability, and continuous improvement, outperforming isolated tools and consultancy services."
                }
                icon={<img src="/assets/icon3.svg" className="min-w-[30px]" />}
              />
              <AboutUsComponent
                title={"Trust in streamlined triage"}
                text={
                  "Successful collaboration relies on rapid, battle-tested triage and prioritization, reducing noise and facilitating faster remediation."
                }
                icon={<img src="/assets/icon4.svg" className="min-w-[30px]" />}
              />
              <AboutUsComponent
                title={"Harness data, tech, and human expertise"}
                text={
                  "Effective collaboration requires orchestrating data, technology, and human intelligence to accelerate the resolution of vulnerabilities."
                }
                icon={<img src="/assets/icon15.svg" className="min-w-[30px]" />}
              />
            </div>
          </div>
          <img
            src="/assets/images/mix-image6.png"
            alt=""
            className="xl:absolute xl:-top-[240px] xl:right-0 m-auto relative -top-[100px]"
          />
        </div>
      </div>
    </div>
  );
}
