import { useState } from "react";
import TabContentClose from "../../components/shared/WorkerShared/TabContentClose";
import TabContentEmail from "../../components/shared/WorkerShared/TabContentEmail";
import TabContentPassword from "../../components/shared/WorkerShared/TabContentPassword";
import TabContentProfile from "../../components/shared/WorkerShared/TabContentProfile";
import { Separator } from "../../components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import TabContentProfileCompany from "../../components/shared/Company/TabContentProfileCompany";

export default function CompanySettings() {
  const [page, setPageq] = useState(1);
  return (
    <div className="text-white flex-1 flex flex-col overflow-hidden relative">
      <section className="   font-[800] bg-[#1F44CC] h-[124px] flex items-center justify-center overflow-hidden ">
        <img
          src="/assets/iconnav13.svg"
          alt=""
          className="absolute z-[20] lg:-left-[1%] md:-left-[8%] sm:-left-[30px] top-0 w-[124px] md:w-[142px] -left-[50px]  "
        />
        <p className="md:text-[30px] text-[20px]"> Settings</p>
        <img
          src="/assets/iconnav14.svg"
          alt=""
          className="absolute z-[20] md:-right-[60px] top-0 lg:right-0 sm:-right-[10%] -right-[10%]   overflow-hidden w-[114px] md:w-[122px]"
        />
      </section>

      <div className="bg-[#1E1E1E] flex-1 lg:px-20 sm:px-8 px-3  py-16">
        <div className="bg-[#0A273D]  p-8 rounded-xl">
          <Tabs defaultValue="profile" className="w-full ">
            <TabsList className="xl:w-[80%] w-full bg-transparent relative flex md:justify-between over justify-evenly ">
              <TabsTrigger
                value="profile"
                className={`data-[state=active]:bg-transparent text-white data-[state=active]:text-white
                transition-all
                sm:text-[18px] font-[600] text-[14px]
               mt-2
                tag
                data-[state=active]:after:w-full
                rounded-none 
                shadow-none
                data-[state=active]:border-none
                
                data-[state=active]:rounded-none

                data-[state=active]:shadow-none
                ${page === 1 ? "block" : "!hidden"} md:!block
                `}
              >
                Profile
              </TabsTrigger>

              <TabsTrigger
                value="email"
                className={`data-[state=active]:bg-transparent text-white data-[state=active]:text-white
                transition-all
               mt-2
               sm:text-[18px] font-[600] text-[14px]
                tag
                data-[state=active]:after:w-full
                rounded-none 
                shadow-none
                data-[state=active]:border-none
                
                data-[state=active]:rounded-none

                data-[state=active]:shadow-none 
                ${page === 1 ? "block" : "!hidden"} md:!block
  `}
              >
                Email
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className={`data-[state=active]:bg-transparent text-white data-[state=active]:text-white
                transition-all
               mt-2
               sm:text-[18px] font-[600] text-[14px]
                tag
                data-[state=active]:after:w-full
                rounded-none 
                shadow-none
                data-[state=active]:border-none
                
                data-[state=active]:rounded-none

                data-[state=active]:shadow-none
                ${page === 2 ? "block" : "!hidden"} md:!block
  `}
              >
                Password
              </TabsTrigger>
              <TabsTrigger
                value="closeaccount"
                className={`data-[state=active]:bg-transparent text-white data-[state=active]:text-white
                transition-all
               mt-2
               sm:text-[18px] font-[600] text-[14px]
                tag
                data-[state=active]:after:w-full
                rounded-none 
                shadow-none
                data-[state=active]:border-none
                
                data-[state=active]:rounded-none

                data-[state=active]:shadow-none
                ${page === 2 ? "block" : "!hidden"} md:!block
                `}
              >
                Close Account
              </TabsTrigger>
              <img
                src="/assets/arrowright.svg"
                alt=""
                className={`absolute right-[0] ${
                  page === 1 ? "block" : "!hidden"
                } md:!hidden cursor-pointer`}
                onClick={() => setPageq(2)}
              />
              <img
                src="/assets/arrowleft.svg"
                alt=""
                className={`absolute left-[0] ${
                  page === 2 ? "block" : "!hidden"
                } md:!hidden cursor-pointer`}
                onClick={() => setPageq(1)}
              />
            </TabsList>
            <Separator className="mt-4 border-[1px]" />
            <TabsContent value="profile">
              <TabContentProfileCompany />
            </TabsContent>
            <TabsContent value="email">
              <TabContentEmail />
            </TabsContent>
            <TabsContent value="password">
              <TabContentPassword />
            </TabsContent>
            <TabsContent value="closeaccount">
              <TabContentClose />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
