export default function OpportunitiesLine() {
  return (
    <div className="border-2 rounded-3xl border-[#023059] bg-[#023059] lg:px-8 px-4 flex items-center justify-between hover:scale-105 cursor-pointer transition-all duration-300 py-1 ">
      <div className="flex items-center justify-between  ">
        <p className="lg:min-w-12 sm:min-w-8 sm:text-[30px] text-[25px] min-w-[20px]">
          1
        </p>
        <div className="hexagon3 lg:mx-6 mx-0">
          <img src="/assets/flag.svg" alt="" className="" />
        </div>
        <div className="flex flex-col lg:ml-8 ml-3 ">
          <p className="font-[600] text-[14px] sm:text-[16px]">Country</p>
          <p className="flex items-center gap-2">
            <p className="text-[12px] sm:text-[14px] font-[600]">City</p>
          </p>
        </div>
      </div>
      <div className="flex items-center  xl:w-[20%] w-auto ">
        <div className="bg-[#FFDE31]   h-[40px] min-w-[60px]  rounded-xl text-black    sm:text-[25px] text-[22px] lg:ml-12 sm:ml-4 ml-4 sm:mr-4 mr-2 sm:font-[600] font-[700] text-center flex items-center justify-center">
          61
        </div>
        <button className="text-[2px] min-w-8">
          <img
            src="/assets/images/newnext.svg"
            alt=""
            className="sm:w-[23px] w-[18px]"
          />
        </button>
      </div>
    </div>
  );
}
