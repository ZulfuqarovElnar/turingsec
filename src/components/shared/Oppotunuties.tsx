import { Link } from "react-router-dom";
import { Button } from "../ui/button";

export default function Oppotunuties() {
  return (
    <section className="sm:px-16 px-8 pb-4 bg-[#061723] ">
      <h2 className="font-[800] text-[32px] py-6 text-white text-left ">
        Opportunities
      </h2>
      <div className="flex w-full justify-between text-white gap-8 flex-col lg:flex-row">
        <div className="pt-20 bg-[url(/assets/images/hacker.jpg)] bg-cover bg-center rounded-2xl p-8 hover:cursor-pointer hover:scale-105 transition-all duration-300 xl:w-1/2 w-full">
          <h2 className="text-[32px]  font-[600]">Hackers</h2>
          <p className="sm:text-[16px] xl:w-[45%] w-[85%] font-[500] text-[12px]">
            Bug bounty platforms offer several opportunities for hackers
          </p>
          <Link to="/opportunitieshacker">
            <Button
              className="bg-[#FFDE31] hover:bg-[#FFDE31]
            text-black mt-4 rounded-xl hover:scale-105 transition-all duration-300 px-8 font-[700]"
            >
              <p> More information</p>
              <img
                src="/assets/images/rightarrow.svg"
                alt=""
                width={20}
                className="ml-4"
              />
            </Button>
          </Link>
        </div>
        <div className="pt-20 bg-[url(/assets/images/company.jpg)]  bg-cover bg-center  rounded-2xl p-8 filter hover:cursor-pointer hover:scale-105 transition-all duration-300 xl:w-1/2 w-full relative h-auto">
          <div className="absolute inset-0 bg-slate-800 opacity-50 rounded-2xl"></div>
          <div className="relative">
            <h2 className="text-[32px] font-[600]">Company</h2>
            <p className="sm:text-[16px] xl:w-[45%] w-[85%] font-[500] text-[12px]">
              Bug bounty platforms offer several opportunities for companies
            </p>
            <Link to="/opportunitiescompany">
              <Button
                className="bg-[#FFDE31] hover:bg-[#FFDE31]
            text-black mt-4 rounded-xl hover:scale-105 transition-all duration-300 px-8 font-[800]"
              >
                <p> More information</p>
                <img
                  src="/assets/images/rightarrow.svg"
                  alt=""
                  width={20}
                  className="ml-4"
                />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
