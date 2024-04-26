import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function InboxMessage() {
  return (
    <div className="py-8 px-8 flex flex-col overflow-y-auto h-full  ">
      <div className="flex items-center gap-4 ">
        <div className="hexagon4">
          <img src="/assets/images/profileimage.jpeg" alt="" />
        </div>
        <p className="text-[24px] font-[600]">Username</p>
      </div>
      <div className=" mt-6 flex flex-col space-y-4 overflow-y-auto flex-1 custom-scrollbar">
        <div className="flex justify-start">
          <div className="bg-yellow-500 h-[50px] rounded-full lg:w-[50%] w-[70%]"></div>
        </div>
        <div className="flex justify-end">
          <div className="bg-blue-500 h-[50px] rounded-full lg:w-[50%] w-[70%] "></div>
        </div>
        <div className="flex justify-start">
          <div className="bg-yellow-500 h-[50px] rounded-full lg:w-[50%] w-[70%]"></div>
        </div>
        <div className="flex justify-end">
          <div className="bg-blue-500 h-[50px] rounded-full lg:w-[50%] w-[70%] "></div>
        </div>
        <div className="flex justify-start">
          <div className="bg-yellow-500 h-[50px] rounded-full lg:w-[50%] w-[70%]"></div>
        </div>
        <div className="flex justify-end">
          <div className="bg-blue-500 h-[50px] rounded-full lg:w-[50%] w-[70%] "></div>
        </div>
        <div className="flex justify-start">
          <div className="bg-yellow-500 h-[50px] rounded-full lg:w-[50%] w-[70%]"></div>
        </div>
        <div className="flex justify-end">
          <div className="bg-blue-500 h-[50px] rounded-full lg:w-[50%] w-[70%] "></div>
        </div>
        <div className="flex justify-start">
          <div className="bg-yellow-500 h-[50px] rounded-full lg:w-[50%] w-[70%]"></div>
        </div>
        <div className="flex justify-end"></div>
      </div>
      <div className="flex-1">
        <Label className="flex items-center relative  ">
          <Input
            type="text"
            className="bg-[#0E1E5A] text-[#fff] border-none rounded-full w-full h-[50px] pl-4 mt-4 focus-visible:outline-none focus-visible:border-none
            focus-visible:ring-offset-0
            focus-visible:ring-0 pr-[90px]
            "
          />
          <div className="bg-[#1F44CC] w-[84px] h-[50px] rounded-full  cursor-pointer absolute top-4 right-0 flex items-center justify-center">
            <img src="/assets/sendbutton.svg" alt="" className="w-[22px]" />
          </div>
        </Label>
      </div>
    </div>
  );
}
