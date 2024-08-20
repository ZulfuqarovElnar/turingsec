import { Button } from "../../ui/button";

export default function ReportElement({
  name,
  img,
}: {
  name: string;
  img: string;
}) {
  return (
    <div className="bg-[#3D0436] flex flex-col text-center items-center py-10 rounded-3xl w-[340px]">
      <div className="hexagon4 m-auto md:m-0">
        <img
          src={`${img ? img : "/assets/images/profileimage.jpeg"}`}
          alt="Profile"
          className=""
        />
      </div>
      <h3 className="sm:text-[20px] text-[18px] font-[600] mt-6 mb-2 text-white">
        {name}
      </h3>
      <p className="sm:text-[16px] text-[14px] font-[400] text-white">Bug bounty</p>
      <div className="flex justify-between gap-4 mt-6 mb-9">
        <Button
          className="hover:scale-110 transition-all duration-300 rounded-full h-[30px] w-[120px] bg-yellow-400 text-black font-[600] text-[14px]
          hover:bg-yellow-500 hover:text-white"
        >
          2 Scopes
        </Button>
        <Button
          className="hover:scale-110 transition-all duration-300 rounded-full h-[30px] w-[120px] bg-yellow-400 text-black font-[600] text-[14px]
          hover:bg-yellow-500 hover:text-white"
        >
          Hall of Fame
        </Button>
      </div>
      <div className="flex justify-between gap-4 ">
        <Button
          className="hover:scale-110 transition-all duration-300 rounded-full h-[50px] w-[140px] bg-[#2451F5] text-white font-semibold sm:text-[14px] text-[12px]
          hover:bg-[#1E3A8A] hover:text-yellow-400"
        >
          Contact With Hacker
        </Button>
        <Button
          className="hover:scale-110 transition-all duration-300 rounded-full h-[50px] w-[140px] bg-yellow-500 text-black font-semibold sm:text-[14px] text-[12px]
          hover:bg-yellow-600 hover:text-white"
        >
          View Report
        </Button>
      </div>
    </div>
  );
}
