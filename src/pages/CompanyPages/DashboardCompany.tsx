import { useEffect, useState } from "react";
import Box from "../../components/component/Worker/Box";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useGetReportsForCompanies } from "../../queryies/useGetReportsForCompany";

export default function Dashboard() {
  const [submittedCount, setSubmittedCount] = useState(0);
  const [acceptedCount, setAcceptedCount] = useState(0);
  const [underCount, setUnderCount] = useState(0);
  const [percentage, setPercentage] = useState(0);
  
  const [rewardsCount, setRewardsCount] = useState({
    Low: 0,
    Medium: 0,
    High: 0,
    Critical: 0,
  });

  const { data } = useGetReportsForCompanies();

  useEffect(() => {
    if (data?.length > 0) {
      const reports = data.flatMap(item => item.reports || []);
      const reportCounts = reports.reduce((acc, report) => {
        acc[report.statusForCompany] = (acc[report.statusForCompany] || 0) + 1;
        return acc;
      }, {});
  
      const rewardsCounts = reports.reduce((acc, report) => {
        acc[report.rewardsStatus] = (acc[report.rewardsStatus] || 0) + 1;
        return acc;
      }, { Low: 0, Medium: 0, High: 0, Critical: 0 });
  
      setSubmittedCount(reportCounts.SUBMITTED || 0);
      setAcceptedCount(reportCounts.ASSESSED || 0);
      setUnderCount(reportCounts.UNREVIEWED || 0);
      setRewardsCount(rewardsCounts);
  
      const acceptedPercentage = reports.length > 0 ? Math.round((reportCounts.ASSESSED / reports.length) * 100) : 0;
      setPercentage(acceptedPercentage);
    }
  }, [data]);
  
  return (
    <div className="text-white flex-1 flex flex-col overflow-hidden relative">
      <section className="font-[800] bg-[#200F23] h-[124px] flex items-center justify-center overflow-hidden ">
        <img
          src="/assets/iconnav1.svg"
          alt=""
          className="absolute z-[20] lg:-left-[10%] md:-left-[34%] sm:-left-[100px] top-0 w-[294px] md:w-[392px] -left-[150px]  "
        />
        <p className="md:text-[30px] text-[20px]"> DASHBOARD</p>
        <img
          src="/assets/iconnav2.svg"
          alt=""
          className="absolute z-[20] md:-right-[60px] top-0 lg:right-0 sm:-right-[10%] -right-[20%]   overflow-hidden w-[204px] md:w-[242px]"
        />
      </section>

      <div className="bg-[url(/assets/images/bg-hacker.png)] bg-center bg-no-repeat bg-cover flex-1 lg:px-20 sm:px-8 px-3 py-16">
        <div className="my-8 grid gap-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-2 xl:w-[60%] w-full ">
          <Box text="Max Bounty" />
          <Box text="Total Bounty" />
          <Box text="Average Bounty" />
          <Box text="Submitted Reports" data={submittedCount} />
          <Box text="Under Review Reports" data={underCount} />
          <Box text="Accepted Reports" data={acceptedCount} />
        </div>
        <div className="flex flex-sm-col items-center justify-around bg-[#885389] rounded-[20px] border-[#2451F5] py-[40px] px-[20px]">
          <div style={{ width: 100 }} className="text-center">
            <CircularProgressbar
              value={isNaN(percentage) ? 0 : percentage}
              text={`${isNaN(percentage) ? 0 : percentage}%`}
              styles={buildStyles({
                strokeLinecap: 'round',
                textSize: '16px',
                pathColor: `#660867`,
                textColor: '#fff',
                trailColor: '#3D0436',
              })}
            />
            <p className="my-2 text-[16px] font-[600]">Success Rate</p>
          </div>

          {["Low", "Medium", "High", "Critical"].map((level) => (
            <div className="flex items-center" key={level}>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-4 my-5">
                  <div className="bg-[#3D0436] h-[8px] w-[80px] rounded-full">
                    <div
                      className={`${
                        level === "Low" ? "bg-[#FFDE31]" :
                        level === "Medium" ? "bg-[#2342E3]" :
                        level === "High" ? "bg-[#5AFF31]" :
                        "bg-[#E32323]"
                      } h-[8px] w-[60px] rounded-full`}
                    ></div>
                  </div>
                  <p className="sm:text-[18px] text-[14px] font-[500]">
                    {level}
                  </p>
                </div>
                <div className="w-[40px] flex items-center justify-center text-[16px] font-[500] h-[40px] bg-[#3D0436] rounded-full">
                  {rewardsCount[level]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
