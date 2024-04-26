export default function RankingLine({ data, index }) {
  return (
    <div
      className={`flex justify-between ${
        index == 0 ? "bg-[#2451F5]" : "bg-[#023059] border-b border-black"
      } text-white  h-[60px] items-center sm:px-8 px-0 sm:text-[18px] text-[14px]`}
    >
      <div className="flex-1 text-center">
        {index == 0 ? (
          "Rank"
        ) : (
          <span
            className={`${
              index == 1 ? "text-[#FCE363]" : "text-[#7D99FF]"
            } font-[800] relative`}
          >
            <img
              src="/assets/medal.svg"
              alt=""
              className={`${
                index == 1
                  ? "sm:block hidden absolute min-w-[30px] right-[38px]"
                  : "hidden"
              }  `}
            />
            {data.rank}
          </span>
        )}
      </div>
      <div className="flex-[2] text-center">
        {index == 0 ? (
          "Hunder"
        ) : (
          <div className="flex items-center gap-3 justify-center">
            <div className="hexagon">
              <img src="/assets/images/testimg1.jpeg" alt="" />
            </div>
            <div className="flex flex-col te">
              {data.huntername}
              <img
                src="/assets/flag.svg"
                className="w-[18px] block sm:hidden"
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 text-center hidden sm:block">
        {index == 0 ? (
          "Country"
        ) : (
          <img src="/assets/flag.svg" className="m-auto" />
        )}
      </div>
      <div className="flex-1 text-center">
        {" "}
        {index == 0 ? "Points" : data.points}
      </div>
    </div>
  );
}
