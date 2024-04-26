import NotificationBox from "../../components/component/NotificationBox";
import NotificationMessage from "../../components/component/NotificationMessage";
import Box from "../../components/component/Worker/Box";

export default function Notification() {
  return (
    <div className="text-white flex-1 flex flex-col overflow-hidden relative min-h-screen">
      <section className="   font-[800] bg-[#1F44CC] h-[124px] flex items-center justify-center overflow-hidden ">
        <img
          src="/assets/iconnav15.svg"
          alt=""
          className="absolute z-[20] lg:-left-[4%] md:-left-[14%] sm:-left-[100px] top-0 w-[234px] md:w-[252px] -left-[150px]  "
        />
        <p className="md:text-[30px] text-[20px]"> Notification</p>
        <img
          src="/assets/iconnav16.svg"
          alt=""
          className="absolute z-[20] md:-right-[70px] top-0 lg:right-3 sm:-right-[10%] -right-[100px]   overflow-hidden w-[204px] md:w-[242px]"
        />
      </section>

      <div className="bg-[#1E1E1E] flex-1    flex flex-col lg:flex-row">
        <div className="lg:w-[25%] lg:border-r-2 flex flex-row lg:flex-col">
          <NotificationBox
            active={true}
            text="Update profile 80% updated"
            date="26.02.2024"
          />
          <NotificationBox
            active={false}
            text="Your No 00532 reports accepted"
            date="27.02.2024"
          />
        </div>
        <div className="lg:w-[75%]">
          <NotificationMessage />
        </div>
      </div>
    </div>
  );
}
