import { useNavigate, useParams } from "react-router";
// import LevelBar from "../../components/component/LevelBar";

import { Button } from "../../components/ui/button";
//import { useGetCompanyById } from "../../queryies/useGetCompanyById";
import { useGetProgramById } from "../../queryies/useGetProgramById";
import { useEffect, useState } from "react";
// import { set } from "date-fns";

export default function ProgramOnePage() {
  const { programId } = useParams();

  const {
    data: programData,
    isPending: programPending,
    isError: programError,
  } = useGetProgramById(programId);

  useEffect(() => {
    if (programData) {
      localStorage.setItem(
        "programId",
        JSON.stringify({
          id: programId,
        })
      );
    }
  }, [programData, programId]);

  const [maxLength, setMaxLength] = useState(0);

  useEffect(() => {
    if (programData && programData.asset) {
      const easyAssets = programData.asset.lowAsset.assets;
      const mediumAssets = programData.asset.mediumAsset.assets;
      const highAssets = programData.asset.highAsset.assets;
      const criticalAssets = programData.asset.criticalAsset.assets;

      const lengths = [
        easyAssets.length,
        mediumAssets.length,
        highAssets.length,
        criticalAssets.length,
      ];

      const maxLength = Math.max(...lengths);
      setMaxLength(maxLength);
    }
  }, [programData]);

  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("submit");
  };

  if (programPending) return <div>Loading...</div>;
  if (programError) return <div>Error fetching program data!</div>;

  // Ensure programData and programData.asset are defined before accessing
  if (!programData || !programData.asset) {
    return <div></div>;
  }

  return (
    <div className="text-white flex-1 flex flex-col overflow-hidden relative">
      <div className="bg-[url('/assets/images/programimage.jpeg')] h-[100px]  bg-center bg-cover  relative w-full">
        <div className="h-full w-full bg-black opacity-60"></div>
      </div>
      <div className="bg-[#1E1E1E] lg:px-20 sm:px-8 px-3  pb-16 flex-1 z-[400] ">
        <div className="lg:flex my-4  gap-6 relative hidden mb-16">
          <div className="hexagon5 mt-3  min-w-[60px]">
            <img src="/assets/images/programimage2.jpg" alt="" className="" />
          </div>
          <div className="xl:w-[60%] w-full">
            <h2 className="sm:text-[18px] text-[16px] font-[600]">
              {/* {data?.first_name + " " + data?.last_name} */}
            </h2>
            <p className="sm:text-[18px] text-[16px] font-[600]">
              Business title
            </p>
            <a href="http://www.program.com/" className="text-[#5BA2F8]">
              http://www.program.com/
            </a>
            <div className="flex justify-between gap-2 flex-wrap">
              <div>
                <p className="sm:text-[18px] text-[16px] font-[600]">
                  Reports Resolved
                </p>
                <p className="sm:text-[18px] text-[16px] font-[600]">12</p>
              </div>
              <div>
                <p className="sm:text-[18px] text-[16px] font-[600]">
                  Assets in scope
                </p>
                <p className="sm:text-[18px] text-[16px] font-[600]">12</p>
              </div>
              <div>
                <p className="sm:text-[18px] text-[16px] font-[600]">
                  Average bounty
                </p>
                <p className="sm:text-[18px] text-[16px] font-[600]">12</p>
              </div>
            </div>
          </div>{" "}
          <div className="flex-1 ">
            <Button
              className="hover:scale-105 transition-all duration-300 rounded-3xl  py-[7px]  bg-[#2451F5] text-white  border-2 border-[#2451F5] font-[600] hover:bg-[#2451F5] flex gap-4 px-4 w-[160px] ml-auto"
              onClick={handleSubmit}
            >
              <p>Submit Report</p>
              <img src="/assets/sendbutton.svg" alt="" className="  " />
            </Button>
          </div>
        </div>
        <div className="flex my-4  gap-6 relative lg:hidden flex-col mb-16">
          <div className="flex gap-6">
            <div className="hexagon5 mt-3  min-w-[60px]">
              <img src="/assets/images/programimage2.jpg" alt="" className="" />
            </div>
            <div className="xl:w-[60%] w-full">
              <h2 className="sm:text-[18px] text-[16px] font-[600]">
                {/* {data?.first_name + " " + data?.last_name} */}
              </h2>
              <p className="sm:text-[18px] text-[16px] font-[600]">
                Business title
              </p>
              <a href="http://www.program.com/" className="text-[#5BA2F8]">
                http://www.program.com/
              </a>
              <div className="flex justify-between gap-2 flex-wrap"></div>
            </div>
          </div>
          <div className="flex justify-between gap-2 flex-wrap lg:hidden">
            <div>
              <p className="sm:text-[18px] text-[16px] font-[600]">
                Reports Resolved
              </p>
              <p className="sm:text-[18px] text-[16px] font-[600]">12</p>
            </div>
            <div>
              <p className="sm:text-[18px] text-[16px] font-[600]">
                Reports Resolved
              </p>
              <p className="sm:text-[18px] text-[16px] font-[600]">12</p>
            </div>
            <div>
              <p className="sm:text-[18px] text-[16px] font-[600]">
                Reports Resolved
              </p>
              <p className="sm:text-[18px] text-[16px] font-[600]">12</p>
            </div>
          </div>
          <div className="flex-1 ">
            <Button
              className="hover:scale-105 transition-all duration-300 rounded-3xl  py-[7px]  bg-[#2451F5] text-white  border-2 border-[#2451F5] font-[600] hover:bg-[#2451F5] flex gap-4 px-4 w-[160px] ml-auto"
              onClick={() => navigate("submit")}
            >
              <p>Submit Report</p>
              <img src="/assets/sendbutton.svg" alt="" className="  " />
            </Button>
          </div>
        </div>
        <div>
          <div className="rounded-2xl overflow-hidden">
            <div className="bg-[#001D34] h-[70px] flex items-center px-8 justify-between">
              <div className="flex items-center gap-4">
                <p className="text-[#FFEC86]"> </p>
              </div>
              <div className="flex items-center gap-4">
                <p className="hidden sm:block">Ends in 15 days</p>
                <img src="/assets/images/info.png" alt="" />
              </div>
            </div>
            <div className="bg-[#0A273D] px-6 pt-6 pb-10">

              <p className="sm:text-[16px] text-[14px] font-[400]">
                {programData?.notes}
              </p>
            </div>
          </div>
        </div>
        <h2 className="my-[10px] sm:text-[20px] text-[16px] w-[600]">Reward</h2>
        <div className="rounded-2xl overflow-hidden">
    <div className="bg-[#001D34] h-[70px] items-center px-8 flex">
      <div className="my-8 flex justify-between flex-1">
        <div className={`flex items-center gap-4 `}>
          <div className="bg-[#00467C] h-[8px] w-[100px] rounded-full">
            <div className={`bg-[#FFDE31] h-[8px] w-[60px] rounded-full`}></div>
          </div>
          <p className="sm:text-[18px] text-[16px] font-[600]">Low</p>
        </div>
        <div className={`flex items-center gap-4 `}>
          <div className="bg-[#00467C] h-[8px] w-[100px] rounded-full">
            <div className={`bg-[#2342E3] h-[8px] w-[60px] rounded-full`}></div>
          </div>
          <p className="sm:text-[18px] text-[16px] font-[600]">Medium</p>
        </div>
        <div className={`flex items-center gap-4 `}>
          <div className="bg-[#00467C] h-[8px] w-[100px] rounded-full">
            <div className={`bg-[#5AFF31] h-[8px] w-[60px] rounded-full`}></div>
          </div>
          <p className="sm:text-[18px] text-[16px] font-[600]">High</p>
        </div>
        <div className={`flex items-center gap-4 `}>
          <div className="bg-[#00467C] h-[8px] w-[100px] rounded-full">
            <div className={`bg-[#E32323] h-[8px] w-[60px] rounded-full`}></div>
          </div>
          <p className="sm:text-[18px] text-[16px] font-[600]">Critical</p>
        </div>
      </div>
    </div>

    <div className="bg-[#0A273D] px-8 border-b border-black py-4">
      {Array.from({ length: maxLength }).map((_, i) => (
        <div key={i} className="mb-4">
          <div className="flex lg:flex-row items-center justify-between gap-4">
            {/* Low Asset */}
            <div className="flex-1 text-center min-w-[100px] p-4 bg-[#00467C] rounded-lg shadow-md">
              <p className="text-[#FFDE31] font-semibold">
                {programData.asset.lowAsset.assets[i]?.type || "-"}
              </p>
              <p className="text-white">
                {programData.asset.lowAsset.assets[i]?.names.join(", ") || "-"}
              </p>
              <p className="text-white">
                {programData.asset.lowAsset.assets[i]?.price || "-"}
              </p>
            </div>

            {/* Medium Asset */}
            <div className="flex-1 text-center min-w-[100px] p-4 bg-[#2342E3] rounded-lg shadow-md">
              <p className="text-[#FFDE31] font-semibold">
                {programData.asset.mediumAsset.assets[i]?.type || "-"}
              </p>
              <p className="text-white">
                {programData.asset.mediumAsset.assets[i]?.names.join(", ") || "-"}
              </p>
              <p className="text-white">
                {programData.asset.mediumAsset.assets[i]?.price || "-"}
              </p>
            </div>

            {/* High Asset */}
            <div className="flex-1 text-center min-w-[100px] p-4 bg-[#5AFF31] rounded-lg shadow-md">
              <p className="text-[#00467C] font-semibold">
                {programData.asset.highAsset.assets[i]?.type || "-"}
              </p>
              <p className="text-gray-900">
                {programData.asset.highAsset.assets[i]?.names.join(", ") || "-"}
              </p>
              <p className="text-gray-900"> 
                {programData.asset.highAsset.assets[i]?.price || "-"}
              </p>
            </div>

            {/* Critical Asset */}
            <div className="flex-1 text-center min-w-[100px] p-4 bg-[#E32323] rounded-lg shadow-md">
              <p className="text-[#FFDE31] font-semibold">
                {programData.asset.criticalAsset.assets[i]?.type || "-"}
              </p>
              <p className="text-white">
                {programData.asset.criticalAsset.assets[i]?.names.join(", ") || "-"}
              </p>
              <p className="text-white">
                {programData.asset.criticalAsset.assets[i]?.price || "-"}
              </p>
            </div> 
          </div>
        </div>
      ))}
    </div>
  </div>
        <h2 className="my-[10px] sm:text-[20px] text-[16px] w-[600]">Policy</h2>
        <div className="bg-[#0A273D] h-[365px] rounded-xl p-4">
          {" "}
          {programData?.policy}
        </div>
        <div className="bg-[#001D34] mt-7 h-[70px] flex items-center px-8 justify-between">
            <div className="flex items-center gap-4">
              <img src="/assets/stricty.svg" alt="" />
              <p className="">Stricty Prohibet</p>
            </div>
          </div>
        <div className="bg-[#0A273D] h-[365px] rounded-xl p-4 flex flex-wrap">
        <ul className="w-1/2">
          {programData?.prohibits
            .slice(0, Math.ceil(programData?.prohibits.length / 2))
            .map((item, index) => (
              <li className=" flex items-center gap-2 py-3 px-2" key={index}>
                <div className="min-w-[40px]">
                  <div className=" !h-[30px] !w-[30px] flex items-center justify-center hexagon6 !bg-[#2451F5] ">
                    <div className="flex items-center justify-center hexagon6 !h-[27px] !w-[27px] !bg-[#0A273D]">
                      {index + 1}
                    </div>
                  </div>
                </div>
                {item.prohibitAdded}</li>
            ))}
        </ul>
        <ul className="w-1/2">
          {programData?.prohibits
            .slice(Math.ceil(programData?.prohibits.length / 2))
            .map((item, index) => (
              <li className="flex items-start gap-2 py-4 px-3" key={index}>
                <div className="min-w-[40px]">
                  <div className=" !h-[30px] !w-[30px] flex items-center justify-center hexagon6 !bg-[#2451F5] ">
                    <div className="flex items-center justify-center hexagon6 !h-[27px] !w-[27px] !bg-[#0A273D]">
                      {index + 1 + Math.ceil(programData?.prohibits.length / 2)}
                    </div>
                  </div>
                </div>{item.prohibitAdded}</li>
            ))}
        </ul>
      </div>

        <div className="mt-10">
          <div className="bg-[#001D34] h-[70px] flex items-center px-8 justify-between">
            <div className="flex items-center gap-4">
              <img src="/assets/stroke.svg" alt="" />
              <p className="">Scope</p>
            </div>
          </div>
          <div className="bg-[#0A273D] p-8 rounded-xl">
              <div className="gap-12 flex  flex-col lg:flex-row">
                <div>
                  <h3 className="mb-6">Out of Scope</h3>
                <div className="list-disc ml-6">
                  {programData?.outOfScope.map((item, index) => (
                    <div className="flex gap-4 mt-4" key={index}>
                      <div className="bg-yellow-500 min-w-[8px] h-[8px] rounded-full mt-2"></div>
                      <span key={index}>{item}</span>
                    </div>
                  ))}
                </div>
                </div>
                <div>
                  <h3 className="mb-6">In of Scope</h3>
                  <div className="list-disc ml-6">
                    {programData?.inScope.map((item, index) => (
                      <div className="flex gap-4 mt-4" key={index}>
                        <div className="bg-yellow-500 min-w-[8px] h-[8px] rounded-full mt-2"></div>
                        <span  key={index}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
