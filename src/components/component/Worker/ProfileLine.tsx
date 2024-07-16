export default function ProfileLine({ data, index }) {
  return (
    <div
      className={`flex justify-between ${
        index == 0 ? "bg-[#FFDE31] text-[#000]" : "bg-[#3D0436] border text-white"
      }   h-[60px] border-[#693E64] items-center sm:px-8 px-0 sm:text-[18px] text-[14px]`}
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
