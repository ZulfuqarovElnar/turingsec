import ProgramBox from "../../components/component/Worker/ProgramBox";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useGetAllCompany } from "../../queryies/useGetAllCompany";

export default function Programs() {
  const { data, isPending, isError } = useGetAllCompany();
  console.log(data);

  return (
    <div className="text-white flex-1 flex flex-col overflow-hidden relative">
      <section className="   font-[800] bg-[#1F44CC] h-[124px] flex items-center justify-center overflow-hidden ">
        <img
          src="/assets/iconnav3.svg"
          alt=""
          className="absolute z-[20] lg:-left-[10%] md:-left-[34%] sm:-left-[100px] top-0 w-[294px] md:w-[352px] -left-[150px]  "
        />
        <p className="md:text-[30px] text-[20px]">Programs</p>
        <img
          src="/assets/iconnav4.svg"
          alt=""
          className="absolute z-[20] md:-right-[60px] top-0 lg:right-0 sm:-right-[10%] -right-[20%]   overflow-hidden w-[224px] md:w-[242px]"
        />
      </section>
      <div className="bg-[#1E1E1E] lg:px-20 sm:px-8 px-3  pb-16 flex-1 z-[400] ">
        <div className="mt-8 mb-10 lg:w-[70%] w-[full]">
          <Label className="flex  bg-[#2451F5] rounded-2xl px-4 flex-1">
            <img src="/assets/search.svg" alt="" />
            <Input
              type="text"
              placeholder="Search"
              className="bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-none focus-visible:ring-offset-0 placeholder:text-white py-6"
            />
            <img src="/assets/x.svg" alt="" className="cursor-pointer" />
          </Label>
        </div>
        <div className="grid xl:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {isPending && <p>Loading...</p>}
          {isError && <p>Error</p>}
          {data?.map((program: any) => (
            <ProgramBox key={program.id} {...program} />
          ))}
        </div>
      </div>
    </div>
  );
}
