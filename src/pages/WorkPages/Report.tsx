// import TabContentAll from "../../components/shared/WorkerShared/TabContentAll";
import {
  Tabs,
  // TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { useGetUserReports } from "../../queryies/useGetUserReports";
import { useGetUserData } from "../../queryies/useGetUserData";
import ReportElement from "../../components/component/Company/ReportElement";
import { Link } from "react-router-dom";
import { useState } from "react";

 

export default function Report() {
  const { data } = useGetUserReports();
  // console.log(data)
  // const currentUser=useGetUserData()
  // console.log(currentUser.data)
  const [searchQuery, setSearchQuery] = useState("");

 
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
 
  const filteredData = (data && Array.isArray(data)) ? data.filter((company) =>
    company.companyName.toLowerCase().includes(searchQuery.toLowerCase())
  ):[];
  // console.log(filteredData)
  

  return (
    <div className="text-white flex-1 flex flex-col overflow-hidden relative min-h-screen">
      <section className="   font-[800] bg-[#1F44CC] h-[124px] flex items-center justify-center overflow-hidden ">
        <img
          src="/assets/iconnav11.svg"
          alt=""
          className="absolute z-[20] lg:-left-[10%] md:-left-[20%] sm:-left-[70px] top-0 w-[224px] md:w-[262px] -left-[100px]  "
        />
        <p className="md:text-[30px] text-[20px]"> Reports</p>
        <img
          src="/assets/iconnav12.svg"
          alt=""
          className="absolute z-[20] md:-right-[60px] top-0 lg:right-0 sm:-right-[10%] -right-[10%]   overflow-hidden w-[144px] md:w-[182px]"
        />
      </section>

      <div className="bg-[#1E1E1E] flex-1 lg:px-20 sm:px-8 px-3  py-16">
        <Tabs defaultValue="All" className=" ">
          <TabsList className="flex bg-[#2451F5] h-[50px] px-0 rounded-2xl lg:pr-[20%] pr-0 xl:w-[80%] w-full">
            <TabsTrigger
              value="All"
              className="bg-transparent sm:text-[18px] text-[16px] font-[600]
              data-[state=active]:bg-[#FFDE31]
              data-[state=active]:rounded-2xl
              flex-1
              h-[50px]
              
              "
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="New"
              className="bg-transparent sm:text-[18px] text-[16px] font-[600]
              data-[state=active]:bg-[#FFDE31]
              data-[state=active]:rounded-2xl
              flex-1
              h-[50px]
              
              "
            >
              New
            </TabsTrigger>
            <TabsTrigger
              value="Closed"
              className="bg-transparent sm:text-[18px] text-[16px] font-[600]
              data-[state=active]:bg-[#FFDE31]
              data-[state=active]:rounded-2xl
              flex-1
              h-[50px]
              
              "
            >
              Closed
            </TabsTrigger>
            <TabsTrigger
              value="Accepted"
              className="bg-transparent sm:text-[18px] text-[16px] font-[600]
              data-[state=active]:bg-[#FFDE31]
              data-[state=active]:rounded-2xl
              flex-1
              h-[50px]
              
              "
            >
              Accepted
            </TabsTrigger>
          </TabsList>
          
        
        </Tabs>
        <div className=" mt-7 flex gap-3 lg:items-center w-full flex-col lg:flex-row xl:w-[80%]">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex bg-[#2451F5] rounded-2xl px-4 flex-1">
            <img src="/assets/search.svg" alt="" />
            <input type="text" className="flex h-10 w-full border border-input px-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-none focus-visible:ring-offset-0 placeholder:text-white py-6" placeholder="Search" onChange={handleSearchInputChange} />
            <img src="/assets/x.svg" alt="" className="cursor-pointer" />
          </label>
        </div>

        
      </div>
      <div className="bg-[#1E1E1E] flex-1 lg:px-20 sm:px-8 px-3  py-16">
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4 ">
          {data && Array.isArray(filteredData) && filteredData.map((company) => (
            company.reports.map((report) => (
              <Link to={`single-report/${report.id}`} key={report.id}>
                <ReportElement
                  key={report.id}
                  name={company.companyName}
                  img="img"
                />
              </Link>
            ))
          ))}
        </div>
        
      </div>
      
      
    </div>
  );
}
