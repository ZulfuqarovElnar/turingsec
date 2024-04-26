import { Divide } from "lucide-react";

export default function ReportLine({ data, index, page, setPage }) {
  return (
    <div
      className={`flex justify-between ${
        index == 0 ? "bg-[#2451F5]" : "bg-[#023059] border-b border-black"
      } text-white  h-[60px] items-center sm:px-8 px-0 sm:text-[18px] text-[14px] `}
    >
      <div
        className={`flex-1 text-center ${
          page === 1 ? "block" : "hidden"
        } lg:block`}
      >
        {index == 0 ? "Last Activity" : data.lastActivity}
      </div>
      <div
        className={`flex-1 text-center ${
          page === 1 ? "block" : "hidden"
        } lg:block`}
      >
        {index == 0 ? (
          <div className="relative flex justify-center items-center ">
            <p> ID</p>
            <img
              src="/assets/arrowright.svg"
              alt=""
              className="relative sm:left-4 left-2 sm:h-[16px] h-[14px ] cursor-pointer block lg:hidden"
              onClick={() => setPage(2)}
            />
          </div>
        ) : (
          data.ID
        )}
      </div>
      <div
        className={`flex-1 text-center ${
          page === 2 ? "block" : "hidden"
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
            <p> Report Title</p>
          </div>
        ) : (
          data.ReportTitle
        )}
      </div>
      <div
        className={`flex-1 text-center ${
          page === 2 ? "block" : "hidden"
        } lg:block`}
      >
        {" "}
        {index == 0 ? (
          <div className="relative flex justify-center items-center ">
            <p> Program</p>
            <img
              src="/assets/arrowright.svg"
              alt=""
              className="relative sm:left-4 left-2 sm:h-[16px] h-[14px ] cursor-pointer block lg:hidden"
              onClick={() => setPage(3)}
            />
          </div>
        ) : (
          data.Program
        )}
      </div>
      <div
        className={`flex-1 text-center ${
          page === 3 ? "block" : "hidden"
        } lg:block`}
      >
        {" "}
        {index == 0 ? (
          <div className="relative flex justify-center items-center ">
            <img
              src="/assets/arrowleft.svg"
              alt=""
              className="relative  sm:h-[16px] sm:right-4 right-2 h-[14px ] cursor-pointer block lg:hidden"
              onClick={() => setPage(2)}
            />{" "}
            <p> Rewards</p>
          </div>
        ) : (
          data.Reward
        )}
      </div>
      <div
        className={`flex-1 text-center ${
          page === 3 ? "block" : "hidden"
        } lg:block`}
      >
        {" "}
        {index == 0 ? "Status" : data.Status}
      </div>
    </div>
  );
}
