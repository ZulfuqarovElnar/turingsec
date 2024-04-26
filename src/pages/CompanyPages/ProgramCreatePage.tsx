import React, { useEffect } from "react";
import LevelBar from "../../components/component/LevelBar";

import { Button } from "../../components/ui/button";
import { Label } from "../../components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { cn } from "../../lib/utils";
import { format, set } from "date-fns";
import { Calendar } from "../../components/ui/calendar";
import { Textarea } from "../../components/ui/textarea";
import { useCurrentCompany } from "../../context/CurrentCompany";
import toast from "react-hot-toast";
import Modal from "../../components/component/Modal";
import { useGetCompanyProgram } from "../../queryies/useGetCompanyProgram";
import { Input } from "../../components/ui/input";

export default function ProgramCreatePage() {
  const { currentCompany } = useCurrentCompany();
  const [fromdate, setFromDate] = React.useState<Date>();
  const [todate, setToDate] = React.useState<Date>();
  const [page, setPage] = React.useState(1);
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const [policy, setPolicy] = React.useState("");
  const [info, setInfo] = React.useState("");
  const [lowElement, setLowElement] = React.useState<
    { assetType: string; price: string }[]
  >([]);
  const [mediumElement, setMediumElement] = React.useState<
    { assetType: string; price: string }[]
  >([]);
  const [highElement, setHighElement] = React.useState<
    { assetType: string; price: string }[]
  >([]);
  const [criticalElement, setCriticalElement] = React.useState<
    { assetType: string; price: string }[]
  >([]);

  const [strictyTest, setStrictyTest] = React.useState("");
  const [stricty, setStricty] = React.useState([
    "Failure to invalidate Session issues",
    "No Rate Limiting on Form issues unless the researcher can demonstrate a strong security impact ",
    "Vulnerabilities that only result in inconsequential losses for Exoscale ",
    "No Rate Limiting on Form issues unless the researcher can demonstrate a strong security impact ",
    "Failure to invalidate Session issues",
    "Vulnerabilities that only result in inconsequential losses for Exoscale ",
  ]);
  const [scopeText, setScopeText] = React.useState("");
  const [scopeType, setScopeType] = React.useState("out");
  const [inScope, setInScope] = React.useState([
    "No Rate Limiting on Form issues unless the researcher can demonstrate a strong ",
    "Vulnerabilities that only result in inconsequential losses for Exoscale ",
    "Vulnerabilities that only result in inconsequential losses for Exoscale ",
  ]);
  const [outScope, setOutScope] = React.useState([
    "Failure to invalidate Session issues",
    "Vulnerabilities that only result in inconsequential losses for Exoscale ",
    "Failure to invalidate Session issues",
  ]);

  const { data } = useGetCompanyProgram();
  console.log(data);
  useEffect(() => {
    console.log(data, "sdsdsd");
    if (data?.length > 0) {
      console.log("flllllllll,");
      setInfo(data[0]?.notes);
      setPolicy(data[0]?.policy);
      setFromDate(new Date(data[0]?.fromDate));
      setToDate(new Date(data[0]?.toDate));
      const low = data[0]?.assetTypes.filter(
        (element) => element.level === "easy"
      );
      const medium = data[0]?.assetTypes.filter(
        (element) => element.level === "medium"
      );
      const high = data[0]?.assetTypes.filter(
        (element) => element.level === "hard"
      );
      const critical = data[0]?.assetTypes.filter(
        (element) => element.level === "critical"
      );
      setLowElement(low);
      setMediumElement(medium);
      setHighElement(high);
      setCriticalElement(critical);
    }
  }, [data]);
  async function createProgram() {
    try {
      if (!info) {
        return toast.error("Please fill in the information");
      }
      if (!policy) {
        return toast.error("Please fill in the policy");
      }
      if (!fromdate || !todate) {
        return toast.error("Please fill in the date");
      }
      if (
        lowElement.length === 0 &&
        mediumElement.length === 0 &&
        highElement.length === 0 &&
        criticalElement.length === 0
      ) {
        return toast.error("Please fill in the reward");
      }
      const allElement: {}[] = [];
      lowElement.map((element) => {
        allElement.push({ level: "easy", ...element });
      });
      mediumElement.map((element) => {
        allElement.push({ level: "medium", ...element });
      });
      highElement.map((element) => {
        allElement.push({ level: "hard", ...element });
      });
      criticalElement.map((element) => {
        allElement.push({ level: "critical", ...element });
      });

      const res = await fetch(
        "https://turingsec-production-de02.up.railway.app/api/bug-bounty-programs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " +
              JSON.parse(localStorage.getItem("company")).accessToken,
          },

          body: JSON.stringify({
            notes: info,
            policy,
            fromDate: fromdate,
            toDate: todate,
            assetTypes: allElement,
          }),
        }
      );
      if (res.ok) {
        return toast.success("Program Updated Successfully");
      } else {
        return toast.error("Failed to create program");
      }
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }
  function onSubmitAddRewarModal(data) {
    if (data.level === "easy") {
      setLowElement([
        ...lowElement,
        { assetType: data.type, price: data.reward },
      ]);
    }
    if (data.level === "medium") {
      setMediumElement([
        ...mediumElement,
        { assetType: data.type, price: data.reward },
      ]);
    }
    if (data.level === "high") {
      setHighElement([
        ...highElement,
        { assetType: data.type, price: data.reward },
      ]);
    }
    if (data.level === "critical") {
      setCriticalElement([
        ...criticalElement,
        { assetType: data.type, price: data.reward },
      ]);
    }
  }
  return (
    <div className="text-white flex-1 flex flex-col overflow-hidden relative">
      <Modal
        isOpen={isOpen}
        onClose={toggleModal}
        onSubmit={onSubmitAddRewarModal}
      />
      <div className="bg-[url('/assets/images/programimage.jpeg')] h-[100px]  bg-center bg-cover  relative w-full">
        <div className="h-full w-full bg-black opacity-60"></div>
      </div>
      <div className="bg-[#1E1E1E] lg:px-20 sm:px-8 px-3  pb-16 flex-1 z-[400] ">
        <div className="lg:flex my-4  gap-6 relative hidden mb-16">
          <div className="hexagon5 mt-3  min-w-[60px]">
            <img src="/assets/images/programimage2.jpg" alt="" className="" />
          </div>
          <div className="xl:w-[60%] w-full">
            <h2 className="sm:text-[18px] text-[16px] font-[600]">
              {currentCompany?.name}
            </h2>
            <p className="sm:text-[18px] text-[16px] font-[600]">
              Business title
            </p>
            <a href="http://www.turingsec.com/" className="text-[#5BA2F8]">
              http://www.turingsec.com/
            </a>
            <div className="flex justify-between gap-2 flex-wrap">
              <div>
                <p className="sm:text-[18px] text-[16px] font-[600]">
                  Reports Resolved
                </p>
                <p className="sm:text-[18px] text-[16px] font-[600]">0</p>
              </div>
              <div>
                <p className="sm:text-[18px] text-[16px] font-[600]">
                  Reports Resolved
                </p>
                <p className="sm:text-[18px] text-[16px] font-[600]">0</p>
              </div>
              <div>
                <p className="sm:text-[18px] text-[16px] font-[600]">
                  Reports Resolved
                </p>
                <p className="sm:text-[18px] text-[16px] font-[600]">0</p>
              </div>
            </div>
          </div>{" "}
          <div className="flex-1 flex justify-end">
            <button className="bg-[#1F44CC] rounded-full w-[40px] h-[40px] p-[5px] ">
              <img src="/assets/pen.svg" alt="edit" />
            </button>
          </div>
        </div>
        <div className="flex my-4  sm:gap-6 gap-2 relative lg:hidden flex-col sm:mb-16 mb-4">
          <div className="flex gap-6">
            <div className="hexagon5 mt-3  min-w-[60px]">
              <img src="/assets/images/programimage2.jpg" alt="" className="" />
            </div>
            <div className="xl:w-[60%] w-full">
              <h2 className="sm:text-[18px] text-[16px] font-[600]">
                {currentCompany?.name}
              </h2>
              <p className="sm:text-[18px] text-[16px] font-[600]">
                Business title
              </p>
              <a href="http://www.program.com/" className="text-[#5BA2F8]">
                http://www.program.com/
              </a>
              <div className="flex justify-between gap-2 flex-wrap"></div>
            </div>
          </div>
          <div className="flex justify-between gap-2 flex-wrap lg:hidden">
            <div>
              <p className="sm:text-[18px] text-[16px] font-[600]">
                Reports Resolved
              </p>
              <p className="sm:text-[18px] text-[16px] font-[600]">0</p>
            </div>
            <div>
              <p className="sm:text-[18px] text-[16px] font-[600]">
                Reports Resolved
              </p>
              <p className="sm:text-[18px] text-[16px] font-[600]">0</p>
            </div>
            <div>
              <p className="sm:text-[18px] text-[16px] font-[600]">
                Reports Resolved
              </p>
              <p className="sm:text-[18px] text-[16px] font-[600]">0</p>
            </div>
          </div>
          <div className="flex-1 flex justify-end">
            <button className="bg-[#1F44CC] rounded-full  p-[5px]  ">
              <img src="/assets/pen.svg" alt="edit" />
            </button>
          </div>
        </div>
        <div>
          <div className="rounded-2xl overflow-hidden">
            <div className="bg-[#001D34] h-[70px] flex items-center px-8 justify-between">
              <div className="flex items-center gap-4">
                <img src="/assets/images/increase.png" alt="" />
                <p className="text-[#FFEC86]">Active Campaign</p>
              </div>
            </div>
            <div className="bg-[#0A273D] px-6 pt-6 pb-10">
              <div className="flex justify-between lg:mt-4 mb-4  xl:w-[70%] flex-col  lg:flex-row">
                <div className="flex items-center gap-4 mb-4 lg:mb-0">
                  <p className="sm:text-[18px] text-[16px] font-[600]">
                    Time spend
                  </p>
                  <img src="/assets/images/info.png" alt="" />
                </div>
                <div className="flex gap-4 flex-col lg:flex-row">
                  <div className="flex flex-col dark relative">
                    <Label className="mb-2 lg:absolute static -top-5">
                      From
                    </Label>
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
                          <img
                            src="/assets/calendar.svg"
                            alt=""
                            className="ml-6 mr-4"
                          />
                          {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className=" z-[1000000] dark">
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
                          <img
                            src="/assets/calendar.svg"
                            alt=""
                            className="ml-6 mr-4"
                          />
                          {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className=" z-[1000000] dark">
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
              </div>
              <h2 className="sm:text-[18px] text-[16px] font-[600]">
                Assets eligible:All in-scope assets
              </h2>
              <div className="my-8 flex justify-between flex-col xl:flex-row">
                {/* <LevelBar color="#FFDE31" level={60} label="Low" />
                <LevelBar color="#2342E3" level={60} label="Medium" />
                <LevelBar color="#5AFF31" level={60} label="High" />
                <LevelBar color="#E32323" level={60} label="Critical" /> */}
                <div className={`flex items-center gap-4 `}>
                  <div className="bg-[#00467C] h-[8px] w-[100px] rounded-full">
                    <div
                      className={`bg-[#FFDE31] h-[8px] w-[60px] rounded-full`}
                    ></div>
                  </div>

                  <p className="sm:text-[18px] text-[16px] font-[600]">
                    Yellow
                  </p>
                </div>

                <div className={`flex items-center gap-4 `}>
                  <div className="bg-[#00467C] h-[8px] w-[100px] rounded-full">
                    <div
                      className={`bg-[#2342E3] h-[8px] w-[60px] rounded-full`}
                    ></div>
                  </div>

                  <p className="sm:text-[18px] text-[16px] font-[600]">
                    Medium
                  </p>
                </div>
                <div className={`flex items-center gap-4 `}>
                  <div className="bg-[#00467C] h-[8px] w-[100px] rounded-full">
                    <div
                      className={`bg-[#5AFF31] h-[8px] w-[60px] rounded-full`}
                    ></div>
                  </div>

                  <p className="sm:text-[18px] text-[16px] font-[600]">High</p>
                </div>
                <div className={`flex items-center gap-4 `}>
                  <div className="bg-[#00467C] h-[8px] w-[100px] rounded-full">
                    <div
                      className={`bg-[#E32323] h-[8px] w-[60px] rounded-full`}
                    ></div>
                  </div>

                  <p className="sm:text-[18px] text-[16px] font-[600]">
                    Critical
                  </p>
                </div>
              </div>

              <Textarea
                className="bg-transparent hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 border-2 border-[#2451F5] h-[160px] rounded-2xl"
                value={info}
                onChange={(e) => setInfo(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className=" flex justify-between items-center mt-2">
          <h2 className="my-[10px] sm:text-[20px] text-[16px] w-[600]">
            Reward
          </h2>
          <Button className="w-[100px]" onClick={() => setIsOpen(true)}>
            Add
          </Button>
        </div>
        <div className="rounded-2xl overflow-hidden">
          <div className="bg-[#001D34] h-[70px] items-center px-8 flex ">
            <div className="my-8 flex justify-between flex-1">
              {/* <LevelBar color="#FFDE31" level={60} label="Low" />
              <LevelBar color="#2342E3" level={60} label="Medium" />
              <LevelBar color="#5AFF31" level={60} label="High" />
              <LevelBar color="#E32323" level={60} label="Critical" /> */}
              <p className="flex-1 text-center">Level</p>
              <p className="flex-1 text-center hidden lg:block">Asset Type</p>
              <p className="flex-1 text-center hidden lg:block">Price</p>
            </div>
          </div>
          <div className="bg-[#0A273D] px-8 border-b border-black py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between flex-col lg:flex-row items-center lg:items-stretch">
                <div className={`flex items-center gap-4  flex-1 `}>
                  <div className="bg-[#00467C] h-[8px] w-[100px] rounded-full">
                    <div
                      className={`bg-[#FFDE31] h-[8px] w-[60px] rounded-full`}
                    ></div>
                  </div>

                  <p className="sm:text-[18px] text-[16px] font-[600]">Low</p>
                </div>
                <div className="flex-1 text-center block lg:hidden ">
                  {lowElement.map((element) => (
                    <div>
                      <p className="sm:text-[18px] text-[16px] font-[600]">
                        {element.assetType}
                      </p>
                      <p className="sm:text-[18px] text-[16px] font-[600]">
                        {element.price}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex-1 text-center lg:block hidden  ">
                  {lowElement.map((element) => (
                    <p className="sm:text-[18px] text-[16px] font-[600]">
                      {element.assetType}
                    </p>
                  ))}
                </div>
                <div className="flex-1 text-center hidden lg:block ">
                  {lowElement.map((element) => (
                    <p className="sm:text-[18px] text-[16px] font-[600]">
                      {element.price}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#0A273D] px-8 border-b border-black py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between flex-col lg:flex-row items-center lg:items-stretch">
                <div className={`flex items-center gap-4 flex-1 `}>
                  <div className="bg-[#00467C] h-[8px] w-[100px] rounded-full">
                    <div
                      className={`bg-[#2342E3] h-[8px] w-[60px] rounded-full`}
                    ></div>
                  </div>

                  <p className="sm:text-[18px] text-[16px] font-[600]">
                    Medium
                  </p>
                </div>
                <div className="flex-1 text-center block lg:hidden ">
                  {mediumElement.map((element) => (
                    <div>
                      <p className="sm:text-[18px] text-[16px] font-[600]">
                        {element.assetType}
                      </p>
                      <p className="sm:text-[18px] text-[16px] font-[600]">
                        {element.price}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex-1 text-center hidden lg:block">
                  {mediumElement.map((element) => (
                    <p className="sm:text-[18px] text-[16px] font-[600]">
                      {element.assetType}
                    </p>
                  ))}
                </div>
                <div className="flex-1 text-center hidden lg:block">
                  {mediumElement.map((element) => (
                    <p className="sm:text-[18px] text-[16px] font-[600]">
                      {element.price}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#0A273D] px-8 border-b border-black py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between items-center lg:items-stretch flex-col lg:flex-row">
                <div className={`flex items-center gap-4 flex-1 `}>
                  <div className="bg-[#00467C] h-[8px] w-[100px] rounded-full">
                    <div
                      className={`bg-[#5AFF31] h-[8px] w-[60px] rounded-full`}
                    ></div>
                  </div>

                  <p className="sm:text-[18px] text-[16px] font-[600]">High</p>
                </div>
                <div className="flex-1 text-center block lg:hidden ">
                  {highElement.map((element) => (
                    <div>
                      <p className="sm:text-[18px] text-[16px] font-[600]">
                        {element.assetType}
                      </p>
                      <p className="sm:text-[18px] text-[16px] font-[600]">
                        {element.price}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex-1 text-center hidden lg:block">
                  {highElement.map((element) => (
                    <p className="sm:text-[18px] text-[16px] font-[600]">
                      {element.assetType}
                    </p>
                  ))}
                </div>
                <div className="flex-1 text-center hidden lg:block">
                  {highElement.map((element) => (
                    <p className="sm:text-[18px] text-[16px] font-[600]">
                      {element.price}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#0A273D] px-8 border-b border-black py-4">
            <div className="flex items-center justify-between">
              <div className="flex-1 flex justify-between flex-col lg:flex-row items-center lg:items-stretch">
                <div className={`flex items-center gap-4 flex-1 `}>
                  <div className="bg-[#00467C] h-[8px] w-[100px] rounded-full">
                    <div
                      className={`bg-[#E32323] h-[8px] w-[60px] rounded-full`}
                    ></div>
                  </div>

                  <p className="sm:text-[18px] text-[16px] font-[600]">
                    Critical
                  </p>
                </div>
                <div className="flex-1 text-center block lg:hidden ">
                  {criticalElement.map((element) => (
                    <div>
                      <p className="sm:text-[18px] text-[16px] font-[600]">
                        {element.assetType}
                      </p>
                      <p className="sm:text-[18px] text-[16px] font-[600]">
                        {element.price}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex-1 text-center hidden lg:block">
                  {criticalElement.map((element) => (
                    <p className="sm:text-[18px] text-[16px] font-[600]">
                      {element.assetType}
                    </p>
                  ))}
                </div>
                <div className="flex-1 text-center hidden lg:block">
                  {criticalElement.map((element) => (
                    <p className="sm:text-[18px] text-[16px] font-[600]">
                      {element.price}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <h2 className="my-[10px] sm:text-[20px] text-[16px] w-[600]">Policy</h2>
        <div className="bg-[#0A273D] p-8 rounded-xl">
          <Textarea
            className="bg-transparent hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 border-2 border-[#2451F5] h-[160px] rounded-2xl"
            value={policy}
            onChange={(e) => setPolicy(e.target.value)}
          />
        </div>

        <div className="rounded-2xl overflow-hidden mt-8">
          <div className="bg-[#001D34] h-[70px] flex items-center px-8 justify-between">
            <div className="flex items-center gap-4">
              <img src="/assets/stricty.svg" alt="" />
              <p className="">Stricty Prohibet</p>
            </div>
          </div>
          <div className="bg-[#0A273D] p-8 grid lg:grid-cols-2 gap-12 grid-cols-1">
            {stricty.map((element, index) => (
              <div className="flex gap-4">
                <div className="min-w-[40px]">
                  <div className=" !h-[30px] !w-[30px] flex items-center justify-center hexagon6 !bg-[#2451F5] ">
                    <div className="flex items-center justify-center hexagon6 !h-[27px] !w-[27px] !bg-[#0A273D]">
                      {index + 1}
                    </div>
                  </div>
                </div>
                <p>{element}</p>
                <div
                  className="text-red-500 cursor-pointer"
                  onClick={() => {
                    const newStricty = stricty.filter((el, i) => i !== index);
                    setStricty(newStricty);
                  }}
                >
                  X
                </div>
              </div>
            ))}
            <div className="m-auto lg:col-span-2 flex flex-col items-center ">
              <Textarea
                className="bg-transparent focus-visible:outline-none focus-visible:ring-offset-0"
                value={strictyTest}
                onChange={(e) => setStrictyTest(e.target.value)}
              />
              <Button
                className="mt-2"
                onClick={() => {
                  setStricty([...stricty, strictyTest]);
                  setStrictyTest("");
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </div>

        <div className="rounded-2xl overflow-hidden mt-8">
          <div className="bg-[#001D34] h-[70px] flex items-center px-8 justify-between">
            <div className="flex items-center gap-4">
              <img src="/assets/stroke.svg" alt="" />
              <p className="">Scope</p>
            </div>
          </div>
          <div className="bg-[#0A273D] p-8  ">
            <div className="gap-12 flex  flex-col lg:flex-row">
              <div>
                <h3 className="mb-6">Out of Scope</h3>
                {outScope.map((element, index) => (
                  <div className="flex gap-4 mt-4">
                    <div className="bg-yellow-500 min-w-[8px] h-[8px] rounded-full mt-2"></div>
                    <p>{element}</p>
                    <div
                      className="text-red-500 cursor-pointer"
                      onClick={() => {
                        const newOutScope = outScope.filter(
                          (el, i) => i !== index
                        );
                        setOutScope(newOutScope);
                      }}
                    >
                      X
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="mb-6">In of Scope</h3>
                {inScope.map((element, index) => (
                  <div className="flex gap-4 mt-4">
                    <div className="bg-yellow-500 min-w-[8px] h-[8px] rounded-full mt-2"></div>
                    <p>{element}</p>
                    <div
                      className="text-red-500 cursor-pointer"
                      onClick={() => {
                        const newInScope = inScope.filter(
                          (el, i) => i !== index
                        );
                        setInScope(newInScope);
                      }}
                    >
                      X
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 mt-12">
              <Textarea
                className="bg-transparent focus-visible:outline-none focus-visible:ring-offset-0 w-[250px]"
                value={scopeText}
                onChange={(e) => setScopeText(e.target.value)}
              />
              <select
                value={scopeType}
                onChange={(e) => setScopeType(e.target.value)}
                className="
                border
                text-black
                focus-visible:outline-none focus-visible:ring-offset-0"
              >
                <option
                  value="out"
                  className="
                bg-transparent
                "
                >
                  Out of Scope
                </option>
                <option value="in">In of Scope</option>
              </select>
              <Button
                onClick={() => {
                  if (scopeType === "out") {
                    setOutScope([...outScope, scopeText]);
                  }
                  if (scopeType === "in") {
                    setInScope([...inScope, scopeText]);
                  }
                  setScopeText("");
                }}
              >
                Add
              </Button>
            </div>
          </div>
        </div>

        <Button
          className="hover:scale-105 transition-all mt-4 duration-300 rounded-xl  py-[9px]  bg-transparent text-white  border-2 border-[#2451F5] font-[600] hover:bg-transparent flex gap-4 px-4 w-[120px] ml-auto"
          onClick={createProgram}
        >
          Update
        </Button>
      </div>
    </div>
  );
}
