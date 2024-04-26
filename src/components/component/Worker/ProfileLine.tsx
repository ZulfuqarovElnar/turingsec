export default function ProfileLine({ data, index }) {
  return (
    <div
      className={`flex justify-between ${
        index == 0 ? "bg-[#2451F5]" : "bg-[#023059] border-b border-black"
      } text-white  h-[60px] items-center sm:px-8 px-0 sm:text-[18px] text-[14px]`}
    >
      <div className="flex-1 text-center ">
        {index == 0 ? "Bug tag" : data.bugtag}
      </div>
      <div className="flex-1 text-center">
        {" "}
        {index == 0 ? (
          "Status"
        ) : (
          <div className="text-[#FFEC86]">{data.status}</div>
        )}
      </div>
      <div className="flex-1 text-center">
        {" "}
        {index == 0 ? "Date" : data.date}
      </div>
    </div>
  );
}
