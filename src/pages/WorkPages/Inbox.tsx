import { useSearchParams } from "react-router-dom";
import InboxBox from "../../components/component/InboxBox";
import InboxMessage from "../../components/component/InboxMessage";

export default function Inbox() {
  let [searchParams, setSearchParams] = useSearchParams();
  const chatNo = searchParams.get("chat");
  return (
    <div className="text-white flex-1 flex flex-col overflow-hidden relative max-h-screen min-h-screen">
      <section className="   font-[800] bg-[#1F44CC] min-h-[124px] flex items-center justify-center overflow-hidden  ">
        <img
          src="/assets/iconnav17.svg"
          alt=""
          className="absolute z-[20] lg:-left-[4%] md:-left-[14%] sm:-left-[100px] top-0 w-[234px] md:w-[252px] -left-[150px]"
        />
        <p className="md:text-[30px] text-[20px]"> Inbox</p>
        <img
          src="/assets/iconnav18.svg"
          alt=""
          className="absolute z-[20] md:-right-[70px] top-0 lg:right-3 sm:-right-[10%] -right-[100px]   overflow-hidden w-[204px] md:w-[212px]"
        />
      </section>

      <div className="bg-[#1E1E1E] flex-1   flex flex-col lg:flex-row  ">
        <div
          className={`lg:w-[25%] lg:border-r-2 flex w-full  flex-col ${
            chatNo ? "hidden" : "block"
          } lg:block `}
        >
          <InboxBox active={true} />
          <InboxBox active={false} />
          <InboxBox active={false} />
          <InboxBox active={false} />
        </div>
        <div
          className={`lg:w-[75%] hidden lg:block  ${
            chatNo ? "!block" : "hidden"
          } `}
        >
          <InboxMessage />
        </div>
      </div>
    </div>
  );
}
