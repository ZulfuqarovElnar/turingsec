import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format, isWithinInterval, parseISO } from "date-fns";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Label } from "../../components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import ReportElement from "../../components/component/Company/ReportElement";
import { useGetUserReports } from "../../queryies/useGetUserReports";
import cn from 'classnames';
import { useGetReportsDateRange } from "../../queryies/useGetReportsDateRange";
export default function Report() {
  const { data :reports } = useGetUserReports();
  const [fromDate, setFromDate] = useState<Date | undefined>(undefined);
  const [toDate, setToDate] = useState<Date | undefined>(undefined);
  const [selectedTab, setSelectedTab] = useState<string>("All");
   
  //Tab-lara uyğun məlumatları filtrləyin
  const filteredData = reports && Array.isArray(reports)
    ? reports.map((user) => {
      const filteredReports = user.reports.filter((report) => {
        const createdAt = parseISO(report.createdAt);  
        
        const matchesTab = (() => {
          switch (selectedTab) {
            case "Submitted":
              return report.statusForUser === "SUBMITTED";
            case "Under review":
              return report.statusForUser === "UNDER_REVIEW";
            case "Accepted":
              return report.statusForUser === "ACCEPTED";
            case "Rejected":
              return report.statusForUser === "REJECTED";
            case "All":
            default:
              return true;
          }
        })();

       
        const withinDateRange = (() => {
          if (fromDate && toDate) {
            return isWithinInterval(createdAt, { start: fromDate, end: toDate });
          }
          if (fromDate) {
            return createdAt >= fromDate;
          }
          if (toDate) {
            return createdAt <= toDate;
          }
          return true; // No date filters applied
        })();

        return matchesTab && withinDateRange;
      });

      return { ...user, reports: filteredReports };
    })
    : [];


  return (
    <div className="text-white flex-1 flex flex-col overflow-hidden relative min-h-screen">
      <section className="font-[800] bg-[#200F23] h-[124px] flex items-center justify-center overflow-hidden">
        <img
          src="/assets/iconnav11.svg"
          alt=""
          className="absolute z-[20] lg:-left-[10%] md:-left-[20%] sm:-left-[70px] top-0 w-[224px] md:w-[262px] -left-[100px]"
        />
        <p className="md:text-[30px] text-[20px]"> Reports</p>
        <img
          src="/assets/iconnav12.svg"
          alt=""
          className="absolute z-[20] md:-right-[60px] top-0 lg:right-0 sm:-right-[10%] -right-[10%] overflow-hidden w-[144px] md:w-[182px]"
        />
      </section>

      <div className="bg-[url(/assets/images/bg-reports.png)] bg-center bg-no-repeat bg-cover flex-1 lg:px-20 sm:px-8 px-3 py-16">
        <Tabs defaultValue="All" onValueChange={setSelectedTab} className="">
        <TabsList className="flex bg-[#200F23] h-[50px] px-0 rounded-2xl pr-0 xl:w-[80%] overflow-auto-auto gap-1">
            <TabsTrigger
              value="All"
              className="bg-transparent sm:text-[18px] text-[16px] font-[600] data-[state=active]:bg-[#FFDE31] data-[state=active]:rounded-2xl flex-1 h-[50px]"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="Submitted"
              className="bg-transparent sm:text-[18px] text-[16px] font-[600] data-[state=active]:bg-[#FFDE31] data-[state=active]:rounded-2xl flex-1 h-[50px]"
            >
              Submitted
            </TabsTrigger>
            <TabsTrigger
              value="Under review"
              className="bg-transparent sm:text-[18px] text-[16px] font-[600] data-[state=active]:bg-[#FFDE31] data-[state=active]:rounded-2xl flex-1 h-[50px]"
            >
              Under review
            </TabsTrigger>
            <TabsTrigger
              value="Accepted"
              className="bg-transparent sm:text-[18px] text-[16px] font-[600] data-[state=active]:bg-[#FFDE31] data-[state=active]:rounded-2xl flex-1 h-[50px]"
            >
              Accepted
            </TabsTrigger>
            <TabsTrigger
              value="Rejected"
              className="bg-transparent sm:text-[18px] text-[16px] font-[600] data-[state=active]:bg-[#FFDE31] data-[state=active]:rounded-2xl flex-1 h-[50px]"
            >
              Rejected
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex justify-between lg:mt-14 mb-4 xl:w-[70%] flex-col lg:flex-row">
          <div className="flex gap-4 flex-col lg:flex-row">
            <div className="flex flex-col dark relative">
              <Label className="mb-2 lg:absolute static -top-5">From</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "rounded-3xl w-[165px] text-[14px] font-[600] lg:w-auto bg-[#FFDE31] hover:bg-[#FFDE31] justify-start text-left border-0 hover:text-white",
                      !fromDate && "text-muted-foreground"
                    )}
                  >
                    {fromDate ? (
                      format(fromDate, "PPP")
                    ) : (
                      <span className="text-white">YYYY-MM-DD</span>
                    )}
                    <img
                      src="/assets/calendar.svg"
                      alt=""
                      className="ml-6 mr-4"
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="z-[1000000] dark">
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    onSelect={setFromDate}
                    initialFocus
                    
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex flex-col relative">
              <Label className="mb-2 lg:absolute -top-5 static">To</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "rounded-3xl w-[165px] text-[14px] font-[600] lg:w-auto bg-[#FFDE31] hover:bg-[#FFDE31] justify-start text-left border-0 hover:text-white",
                      !toDate && "text-muted-foreground"
                    )}
                  >
                    {toDate ? (
                      format(toDate, "PPP")
                    ) : (
                      <span className="text-white">YYYY-MM-DD</span>
                    )}
                    <img
                      src="/assets/calendar.svg"
                      alt=""
                      className="ml-6 mr-4"
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="z-[1000000] dark">
                  <Calendar
                    mode="single"
                    selected={toDate}
                    onSelect={setToDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <div className="flex-1 gap-3 py-16">
          <div className="grid 2xl:grid-cols-3 2lg:grid-cols-2 grid-cols-1 gap-4">
            {filteredData &&
              filteredData.map((company) =>
                company.reports
                  .slice() 
                  .reverse() 
                  .map((report) => (
                    <Link to={`single-report/${report.id}`} key={report.id}>
                      <ReportElement
                        key={report.id}
                        name={company.companyName}
                        img="img"
                      />
                    </Link>
                  ))
                )}
            </div>
        </div>
      </div>
    </div>
  );
}
