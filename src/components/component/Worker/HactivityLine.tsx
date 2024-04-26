import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
export default function HactivityLine({ data, index, page, setPage }) {
  return (
    <div
      className={`flex justify-between ${
        index == 0 ? "bg-[#2451F5]" : "bg-[#023059] border-b border-black"
      } text-white  h-[60px] items-center sm:px-8 px-0 sm:text-[18px] text-[14px]`}
    >
      <div
        className={`flex-1 text-center ${
          page === 2 ? "hidden" : "block"
        } lg:block`}
      >
        {index == 0 ? (
          <div className="relative">Hunter</div>
        ) : (
          <div className="flex items-center gap-3 justify-center">
            <div className="hexagon">
              <img src="/assets/images/testimg1.jpeg" alt="" />
            </div>
            <div className="flex flex-col te">{data.huntername}</div>
          </div>
        )}
      </div>
      <div
        className={`flex-1 text-center ${
          page === 2 ? "hidden" : "block"
        } lg:block`}
      >
        {index == 0 ? (
          <div className="relative flex justify-center items-center ">
            <p> Bug tag</p>
            <img
              src="/assets/arrowright.svg"
              alt=""
              className="relative  sm:h-[16px] sm:left-4 left-2 h-[14px ] cursor-pointer block lg:hidden"
              onClick={() => setPage(2)}
            />
          </div>
        ) : (
          data.bugtag
        )}
      </div>
      <div
        className={`flex-1 text-center ${
          page === 1 ? "hidden" : "block"
        } lg:block`}
      >
        {" "}
        {index == 0 ? (
          <div className="relative flex justify-center items-center ">
            <img
              src="/assets/arrowleft.svg"
              alt=""
              className="relative  sm:h-[16px] sm:right-4 right-2 h-[14px ] cursor-pointer block lg:hidden"
              onClick={() => setPage(1)}
            />{" "}
            <p> Status</p>
          </div>
        ) : (
          <div className="text-[#FFEC86]">{data.status}</div>
        )}
      </div>
      <div
        className={`flex-1 text-center ${
          page === 1 ? "hidden" : "block"
        } lg:block `}
      >
        {" "}
        {index == 0 ? "Date" : data.date}
      </div>
    </div>
  );
}
