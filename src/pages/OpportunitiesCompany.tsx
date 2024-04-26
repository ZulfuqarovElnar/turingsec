import OpportunitiesBox from "../components/component/OpportunitiesBox";

export default function OpportunitiesCompany() {
  return (
    <>
      <div className=" xl:pb-20  sm:pb-10 sm:pt-20  text-[white] lg:flex-row items-center bg-[#061723] dark:bg-inherit sm:px-16 mt-[52px] pb-20 py-0  px-8 pt-20">
        <div className="flex  flex-col lg:flex-row">
          <div className="lg:w-1/2 w-full">
            <h2 className="sm:text-[50px] font-[700] text-[28px] mb-4">
              Opportunities for Companies
            </h2>
            <p className="sm:text-[20px] text-[18px] font-[500] w-full">
              Bug bounty platforms offer several opportunities for companies:
              Enhanced Security Testing: Bug bounty programs allow companies to
              crowdsource security testing. This approach helps uncover
              vulnerabilities that might be overlooked in traditional security
              assessments, providing a more comprehensive security evaluation.
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
        <div className="grid gap-8 xl:grid-cols-3 md:grid-cols-2 grid-col-1  mt-10 xl:mt-0">
          <OpportunitiesBox
            title="Access to Diverse Skills"
            text="Companies can tap into a diverse pool of ethical hackers with different expertise and backgrounds by utilizing bug bounty platforms. This variety helps in identifying a wide range of vulnerabilities across various systems and applications."
          />
          <OpportunitiesBox
            title="Cost-Effective Security Testing "
            text="Bug bounty programs often operate on a pay-per-bug model, which can be more cost-effective than hiring full-time security professionals or conducting traditional security audits. Companies only pay for results in the form of validated vulnerabilities."
          />
          <div className="hidden xl:block"></div>
          <OpportunitiesBox
            title="Continuous Security Monitoring"
            text="Bug bounty programs offer continuous testing, allowing companies to maintain an ongoing security assessment rather than relying solely on periodic security audits.

            "
          />
          <OpportunitiesBox
            title="Access to Diverse Skills"
            text="Implementing a bug bounty program demonstrates a commitment to security and transparency. It can positively impact a company's reputation by showing dedication to addressing security concerns proactively.
            "
          />
          <OpportunitiesBox
            title="Faster Vulnerability Remediation"
            text="With a bug bounty program in place, companies can swiftly identify and address vulnerabilities as they are reported, reducing the window of exposure to potential threats."
          />
        </div>
      </div>
    </>
  );
}
