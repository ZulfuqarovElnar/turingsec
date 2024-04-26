import { forwardRef } from "react";

const ShortInfo = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div
      className="mx-16 mt-6 flex justify-evenly md:py-8 py-16 flex-col gap-16 md:gap-0 md:flex-row back rounded-[20px] text-white "
      ref={ref}
    >
      <div className="flex flex-col  items-center leading-[60px]">
        <img src="/assets/world-white.svg" alt="world" className=" w-[55px]" />
        <p className=" font-[700] text-[35px]">100</p>
        <p className="md:leading-6  text-center text-[16px] leading-5 font-[700]">
          GLOBAL BRANDS
          <br /> USE TURINGSEC
        </p>
      </div>
      <div className="flex flex-col  items-center leading-[60px]">
        <img src="/assets/bag-white.svg" alt="world" className=" w-[55px]" />
        <p className=" font-bold text-[35px]">254</p>
        <p className="md:leading-6  text-center text-[14px] leading-5 font-[700]">
          ETHICAL HACKERS
          <br /> AT THE READY
        </p>
      </div>
      <div className="flex flex-col  items-center leading-[60px]">
        <img src="/assets/click-white.svg" alt="world" className="w-[55px]" />
        <p className=" font-bold text-[35px]">550</p>
        <p className="md:leading-6  text-center text-[14px] leading-5 font-[700]">
          VALID VULNERABILITIES
          <br /> RESOLVED TO DATE
        </p>
      </div>
    </div>
  );
});

export default ShortInfo;
