import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import * as React from "react";
import { format } from "date-fns";

import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";
import { Calendar } from "../../../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import ReportLine from "../../component/Company/ReportLine";
import { useGetUserReports } from "../../../queryies/useGetUserReports";
const fakeData = [
  {
    lastActivity: "Name",
    ID: "0000",
    ReportTitle: "title name",
    Program: "name",
    Reward: "name",
    Status: "name",
  },
  {
    lastActivity: "Name",
    ID: "0000",
    ReportTitle: "title name",
    Program: "name",
    Reward: "name",
    Status: "name",
  },
  {
    lastActivity: "Name",
    ID: "0000",
    ReportTitle: "title name",
    Program: "name",
    Reward: "name",
    Status: "name",
  },
  {
    lastActivity: "Name",
    ID: "0000",
    ReportTitle: "title name",
    Program: "name",
    Reward: "name",
    Status: "name",
  },
  {
    lastActivity: "Name",
    ID: "0000",
    ReportTitle: "title name",
    Program: "name",
    Reward: "name",
    Status: "name",
  },
  {
    lastActivity: "Name",
    ID: "0000",
    ReportTitle: "title name",
    Program: "name",
    Reward: "name",
    Status: "name",
  },
  {
    lastActivity: "Name",
    ID: "0000",
    ReportTitle: "title name",
    Program: "name",
    Reward: "name",
    Status: "name",
  },
  {
    lastActivity: "Name",
    ID: "0000",
    ReportTitle: "title name",
    Program: "name",
    Reward: "name",
    Status: "name",
  },
  {
    lastActivity: "Name",
    ID: "0000",
    ReportTitle: "title name",
    Program: "name",
    Reward: "name",
    Status: "name",
  },
  {
    lastActivity: "Name",
    ID: "0000",
    ReportTitle: "title name",
    Program: "name",
    Reward: "name",
    Status: "name",
  },
];
export default function TabContentAll() {
  const [fromdate, setFromDate] = React.useState<Date>();
  const [todate, setToDate] = React.useState<Date>();
  const [page, setPage] = React.useState(1);
  const { data, isLoading } = useGetUserReports();
  const [reports, setReports] = React.useState([]);
  React.useEffect(() => {
    if (!data) return;
    const dat = data.map((item) => {
      return {
        lastActivity: item.lastActivity,
        ID: "0000",
        ReportTitle: item.reportTitle,
        Program: item.companyName,
        Reward: item?.reward ? item?.reward : "-",
        Status: item?.status ? item?.status : "pending",
      };
    });
    setReports([
      {
        lastActivity: "Name",
        ID: "0000",
        ReportTitle: "title name",
        Program: "name",
        Reward: "name",
        Status: "name",
      },

      ...dat,
    ]);
    console.log(dat);
  }, [data]);
  console.log();
  return (
    <div className="w-full mt-8  ">
      <div className="flex gap-3 lg:items-center  w-full flex-col lg:flex-row xl:w-[80%]">
        <Label className="flex  bg-[#2451F5] rounded-2xl px-4 flex-1">
          <img src="/assets/search.svg" alt="" />
          <Input
            type="text"
            placeholder="Search"
            className="bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-none focus-visible:ring-offset-0 placeholder:text-white py-6"
          />
          <img src="/assets/x.svg" alt="" className="cursor-pointer" />
        </Label>
        <div className="flex flex-col relative">
          <Label className="mb-2 lg:absolute static -top-5">From</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "rounded-3xl w-[200px] text-[16px] font-[600] lg:w-auto bg-[#2451F5] hover:bg-[#2451F5] justify-start text-left border-0 hover:text-white ",
                  !fromdate && "text-muted-foreground"
                )}
              >
                {fromdate ? (
                  format(fromdate, "PPP")
                ) : (
                  <span className="text-white">YYYY-MM-DD</span>
                )}
                <img src="/assets/calendar.svg" alt="" className="ml-6 mr-4" />
                {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 dark">
              <Calendar
                mode="single"
                selected={fromdate}
                onSelect={setFromDate}
                initialFocus
                className=""
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
                  "rounded-3xl w-[200px] text-[16px] font-[600] lg:w-auto bg-[#2451F5] hover:bg-[#2451F5] justify-start text-left border-0 hover:text-white ",
                  !todate && "text-muted-foreground"
                )}
              >
                {todate ? (
                  format(todate, "PPP")
                ) : (
                  <span className="text-white">YYYY-MM-DD</span>
                )}
                <img src="/assets/calendar.svg" alt="" className="ml-6 mr-4" />
                {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 dark">
              <Calendar
                mode="single"
                selected={todate}
                onSelect={setToDate}
                initialFocus
                className=""
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="mt-10 rounded-2xl overflow-hidden">
        <div>
          {reports.map((data, i) => (
            <ReportLine data={data} index={i} page={page} setPage={setPage} />
          ))}
        </div>
      </div>
    </div>
  );
}
