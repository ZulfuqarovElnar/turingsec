import { Button } from "../../ui/button";

export default function ReportElement({
  name,
  img,
}: {
  name: string;
  img: string;
}) {
  return (
    <div className="bg-[#023059] flex flex-col text-center items-center py-8 rounded-3xl   ">
      <div className="hexagon4 m-auto md:m-0">
        <img
          src={`${img ? img : "/assets/images/profileimage.jpeg "}`}
          alt=""
          className=""
        />
      </div>
      <h3 className="sm:text-[20px] text-[18px] font-[600] mt-6 mb-2">
        {name}
      </h3>
      <p className="sm:text-[16px] text-[14px] font-[400]">Bug bounty</p>
      <div className="flex justify-between gap-4 mt-6 mb-6 lg:flex-col sm:flex-row flex-col">
        <div className="bg-[#FFEC86] text-[#023059] rounded-3xl py-2 w-[150px]">
          2 Scopes
        </div>
        <div className="bg-[#FFEC86] text-[#023059] rounded-3xl py-2 w-[150px]">
          Hall of fame
        </div>
      </div>
      <Button className="hover:scale-110 transition-all duration-300 rounded-full h-[50px]  sm:h-[65px] w-[180px] sm:w-[220px] bg-[#2451F5] text-white  sm:text-[18px] font-[600] text-[16px]   hover:bg-[#2451F5]">
        Contact With Hacker
      </Button>
    </div>
  );
}
