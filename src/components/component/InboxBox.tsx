import { useSearchParams } from "react-router-dom";

export default function InboxBox({ active }) {
  let [searchParams, setSearchParams] = useSearchParams();
  return (
    <div
      className={`flex items-center gap-4  ${
        active ? "bg-[#023059]" : ""
      } px-4 py-2 w-full cursor-pointer hover:bg-[#023059] transition-all duration-300 border border-[#023059] lg:border-0`}
      onClick={() => {
        //add ?chat=1 to the url
        setSearchParams({ chat: "1" });
      }}
    >
      <div className="hexagon5">
        <img src="/assets/images/profileimage.jpeg" alt="" />
      </div>
      <p className="text-[18px] font-[600]">Username</p>
    </div>
  );
}
