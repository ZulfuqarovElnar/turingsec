import InputCompany from "../../components/component/Company/InputCompany";
import Box from "../../components/component/Worker/Box";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

export default function ProgramCompany() {
  return (
    <div className="text-white flex-1 flex flex-col overflow-hidden ">
      <section className="   font-[800] bg-[#1F44CC] h-[124px] flex items-center justify-center overflow-hidden ">
        <img
          src="/assets/iconnav1.svg"
          alt=""
          className="absolute z-[20] lg:left-[17%] md:left-[13%] sm:-left-[50px] top-0 w-[294px] md:w-[392px] -left-[80px]  "
        />
        <p className="md:text-[30px] text-[20px]"> Program</p>
        <img
          src="/assets/iconnav2.svg"
          alt=""
          className="absolute z-[20] md:-right-[0] top-0 sm:-right-[10%] -right-[20%]   overflow-hidden w-[204px] md:w-[242px]"
        />
      </section>
      <div className=" bg-[#1F44CC]  w-full absolute top-0 left-0 h-[30px] ">
        ssdd
      </div>
      <div className="bg-[#1E1E1E] flex-1 lg:px-20 sm:px-8 px-3  py-16">
        <div className="flex items-center gap-8 flex-col xl:flex-row">
          <div className="bg-[url('/assets/images/companyprogramimage.png')] md:h-[250px] h-[250px] bg-cover bg-center relative rounded-3xl overflow-hidden xl:min-w-[45%]  sm:min-w-[450px] w-[90%] md:w-[auto] ">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <button className="bg-[#BDBDBD] rounded-full absolute z-20 right-5 top-5 p-[10px]">
              <img src="/assets/blackpen.svg" alt="edit" />
            </button>
          </div>
          <div className="xl:w-full w-auto flex flex-col gap-4  items-center">
            <div className="flex items-center xl:gap-16 gap-4 flex-col sm:flex-row">
              <Label className="sm:text-[20px]  sm:min-w-[140px] min-w-0 font-[600] text-[18px]">
                Program Name
              </Label>
              <InputCompany
                placeholder="name"
                className="max-w-[330px] sm:text-[16px] text-[14px]"
              />
            </div>
            <div className="flex items-center gap-4 xl:gap-16 flex-col sm:flex-row">
              <Label
                className=" sm:text-[20px] sm:min-w-[140px]
              min-w-0  font-[600] text-[18px]"
              >
                Program Type
              </Label>
              <InputCompany
                placeholder="Bug bounty"
                className="max-w-[330px] sm:text-[16px] text-[14px]"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-8 mt-12 flex-col xl:flex-row items-center">
          <p className="sm:text-[18px] font-[600] text-[16px]">About Program</p>
          <div className="sm:text-[18px] text-[16px] font-[400] border rounded-xl p-4 sm:pr-20 sm:pb-20 ">
            Provide detailed information about the company, including its
            history, founding date, key milestones, and any notable
            achievements. This helps establish credibility and builds trust with
            visitors. In the context of cybersecurity, it's essential to
            reassure visitors about the security measures your company has in
            place to protect their data. This could include encryption
            protocols, compliance with industry standards (such as GDPR or
            HIPAA), regular security audits, and any other relevant security
            practices.
          </div>
        </div>
        <div className="mt-20">
          <h2 className="sm:text-[25px] text-[20px] mb-6">Announcments</h2>
          <div className="flex gap-4 flex-col lg:flex-row">
            <div className="text-center py-4 xl:px-20 px-8 bg-[#023059] rounded-2xl relative pb-12 lg:w-1/2 w-full">
              <h2 className="sm:text-[22px] text-[20px] font-[700] mb-2">
                New
              </h2>
              <p className="sm:text-[18px] font-[400] text-[16px] mb-2">
                Provide detailed information about the company, including its
                history, founding date, key milestones, and any notable
                achievements. This helps establish credibility and builds trust
                with visitors.
              </p>
              <p className="sm:text-[18px] text-[16px] font-[500] absolute right-4 bottom-4">
                20.04.2024
              </p>
            </div>
            <div className="text-center py-4 xl:px-20 px-8 bg-[#023059] rounded-2xl relative pb-12 lg:w-1/2 w-full">
              <h2 className="sm:text-[22px] text-[20px] font-[700] mb-2">
                New bug Hunting Style Competition
              </h2>
              <p className="sm:text-[18px] font-[400] text-[16px] mb-2">
                Key milestones, and any notable achievements. This helps
                establish credibility and builds trust with visitors.
              </p>
              <p className="sm:text-[18px] text-[16px] font-[500] absolute right-4 bottom-4">
                02.05.2024
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
