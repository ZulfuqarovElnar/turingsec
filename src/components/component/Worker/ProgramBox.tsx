import { Button } from "../../ui/button";
import { findDays } from "../../../helpers/findDays";
import { useNavigate } from "react-router";

export default function ProgramBox({
  fromDate,
  toDate,
  id,
}: {
  fromDate: Date;
  toDate: Date;
  id: string;
}) {
  const navigate = useNavigate();
  return (
    <div className=" rounded-xl overflow-hidden">
      <div className="bg-[#023059]  p-0 pb-10 rounded-2xl  relative flex-col">
        <div className="bg-[url('/assets/images/programimage.jpeg')] h-[120px]  bg-center bg-cover  relative w-full">
          <div className="h-full w-full bg-black opacity-60"></div>
          <div className=" absolute top-4 right-4 flex items-center justify-center text-[14px] font-[600] cursor-pointer ">
            <img src="/assets/images/star.png" alt="" />
          </div>
        </div>
        <div className="absolute h-[20px] hexagon5 top-[75px] left-[40px]">
          <img
            src="/assets/images/programimage2.jpg"
            alt=""
            className="absolute top-0 left-0   object-cover "
          />
        </div>
        <div className="py-4 mt-6 px-4">
          <h2 className="text-[18px] sm:text-[20px] font-[600] sm:font-[700] mb-4 lg:mb-0">
            Bug Bounty Program name
          </h2>
          <p className="text-[16px] font-[400]">Collaboration,Retesting</p>
          <div className="flex gap-4 mt-6 sm:flex-col xl:flex-row flex-row  ">
            <div className="rounded-xl  flex items-center px-6 justify-center py-[5px]  border border-[#FFDE31] text-white text-[14px] font-[400]">
              Updated
            </div>
            <div className="rounded-xl  flex items-center px-6 justify-center py-[5px]  border border-[#FFDE31] text-white text-[14px] font-[400]">
              Campaign
            </div>
          </div>
          <p className="sm:text-[18px] text-[16px] font-[600] mt-4">
            Ends in {findDays(new Date(fromDate), new Date(toDate))} days
          </p>
          <p className="sm:text-[20px] text-[18px] font-[700] text-[#FFDE31] my-4">
            Up to $10k
          </p>
          <div className="flex justify-between lg:w-[50%] w-full">
            <div className="flex gap-2 items-center">
              <img src="/assets/images/bugicon.png" alt="" className="" />
              <p className="sm:text-[18px] text-[16px] font-[600]">125</p>
            </div>
            <div className="flex gap-2 items-center">
              <img src="/assets/images/peopleicon.png" alt="" />
              <p className="sm:text-[18px] text-[16px] font-[600]">130</p>
            </div>
          </div>
          <Button
            className="hover:scale-105 transition-all duration-300 rounded-3xl  py-[7px]  bg-transparent text-white  border-2 border-[#2451F5] font-[600] hover:bg-transparent flex gap-4 px-4 w-full mt-6"
            onClick={() => navigate(`${id}`)}
          >
            See Details
          </Button>
        </div>
      </div>
    </div>
  );
}
