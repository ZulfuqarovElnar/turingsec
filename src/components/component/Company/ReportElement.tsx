import { Button } from "../../ui/button";

export default function ReportElement({
  name,
  img,
}: {
  name: string;
  img: string;
}) {
  return (
    <div className="bg-[#3D0436] flex flex-col text-center items-center py-8 rounded-3xl   ">
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
        
      </div>
      <div className="flex gap-2">
      <Button className="hover:scale-110 transition-all duration-300 rounded-full h-[50px]  sm:h-[55px] w-[180px] sm:w-[150px] bg-[#200F23] text-white  sm:text-[14px] font-[600] text-[16px]   hover:bg-[#200F23]">
        Contact with company
      </Button>
      <Button className="hover:scale-110 transition-all duration-300 rounded-full h-[50px]  sm:h-[55px] w-[180px] sm:w-[150px] bg-[#FFDE31] text-white  sm:text-[14px] font-[600] text-[16px]   hover:bg-[#FFDE31]">
        See Details
      </Button>
      </div>
    </div>
  );
}
