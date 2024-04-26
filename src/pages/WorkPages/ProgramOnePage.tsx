import { useNavigate, useParams } from "react-router";
import LevelBar from "../../components/component/LevelBar";

import { Button } from "../../components/ui/button";
import { useGetCompanyById } from "../../queryies/useGetCompanyById";
import { useGetProgramById } from "../../queryies/useGetProgramById";
import { useEffect, useState } from "react";
import { set } from "date-fns";

export default function ProgramOnePage() {
  const { programId } = useParams();

  const {
    data: programData,
    isPending: programPending,
    isError: programError,
  } = useGetProgramById(programId);

  console.log(programData);
  console.log(programData);
  const { data, isPending, isError } = useGetCompanyById(
    programData?.companyId
  );
  const [easyAssets, setEasyAssets] = useState([]);
  const [mediumAssets, setMediumAssets] = useState([]);
  const [highAssets, setHighAssets] = useState([]);
  const [criticalAssets, setCriticalAssets] = useState([]);
  const [maxlength, setMaxlength] = useState(0);
  useEffect(() => {
    if (programData) {
      const easyAssets = programData.assetTypes.filter(
        (asset) => asset.level === "easy"
      );
      const mediumAssets = programData.assetTypes.filter(
        (asset) => asset.level === "medium"
      );
      const highAssets = programData.assetTypes.filter(
        (asset) => asset.level === "hard"
      );
      const criticalAssets = programData.assetTypes.filter(
        (asset) => asset.level === "critical"
      );

      // Calculate the lengths of all arrays
      const lengths = [
        easyAssets.length,
        mediumAssets.length,
        highAssets.length,
        criticalAssets.length,
      ];
      setEasyAssets(easyAssets);
      setMediumAssets(mediumAssets);
      setHighAssets(highAssets);
      setCriticalAssets(criticalAssets);

      // Find the maximum length
      const maxLength = Math.max(...lengths);
      setMaxlength(maxLength);
    }
  }, [programData]);
  console.log(easyAssets);
  const navigate = useNavigate();
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
              {data?.first_name + " " + data?.last_name}
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
          </div>{" "}
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
        <div className="flex my-4  gap-6 relative lg:hidden flex-col mb-16">
          <div className="flex gap-6">
            <div className="hexagon5 mt-3  min-w-[60px]">
              <img src="/assets/images/programimage2.jpg" alt="" className="" />
            </div>
            <div className="xl:w-[60%] w-full">
              <h2 className="sm:text-[18px] text-[16px] font-[600]">
                {data?.first_name + " " + data?.last_name}
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
                <img src="/assets/images/increase.png" alt="" />
                <p className="text-[#FFEC86]">Active Campaign</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="hidden sm:block">Ends in 15 days</p>
                <img src="/assets/images/info.png" alt="" />
              </div>
            </div>
            <div className="bg-[#0A273D] px-6 pt-6 pb-10">
              <h2 className="sm:text-[18px] text-[16px] font-[600]">
                Assets eligible:All in-scope assets
              </h2>
              <div className="my-8 flex justify-between flex-col xl:flex-row">
                <div className={`flex items-center gap-4 `}>
                  <div className="bg-[#00467C] h-[8px] w-[100px] rounded-full">
                    <div
                      className={`bg-[#FFDE31] h-[8px] w-[60px] rounded-full`}
                    ></div>
                  </div>

                  <p className="sm:text-[18px] text-[16px] font-[600]">
                    Yellow
                  </p>
                </div>
                <div className={`flex items-center gap-4 `}>
                  <div className="bg-[#00467C] h-[8px] w-[100px] rounded-full">
                    <div
                      className={`bg-[#2342E3] h-[8px] w-[60px] rounded-full`}
                    ></div>
                  </div>

                  <p className="sm:text-[18px] text-[16px] font-[600]">
                    Medium
                  </p>
                </div>
                <div className={`flex items-center gap-4 `}>
                  <div className="bg-[#00467C] h-[8px] w-[100px] rounded-full">
                    <div
                      className={`bg-[#5AFF31] h-[8px] w-[60px] rounded-full`}
                    ></div>
                  </div>

                  <p className="sm:text-[18px] text-[16px] font-[600]">High</p>
                </div>
                <div className={`flex items-center gap-4 `}>
                  <div className="bg-[#00467C] h-[8px] w-[100px] rounded-full">
                    <div
                      className={`bg-[#E32323] h-[8px] w-[60px] rounded-full`}
                    ></div>
                  </div>

                  <p className="sm:text-[18px] text-[16px] font-[600]">
                    Critical
                  </p>
                </div>
              </div>

              <p className="sm:text-[16px] text-[14px] font-[400]">
                {programData?.notes}
              </p>
            </div>
          </div>
        </div>
        <h2 className="my-[10px] sm:text-[20px] text-[16px] w-[600]">Reward</h2>
        <div className="rounded-2xl overflow-hidden">
          <div className="bg-[#001D34] h-[70px] items-center px-8 flex ">
            <div className="my-8 flex justify-between flex-1">
              <div className={`flex items-center gap-4 `}>
                <div className="bg-[#00467C] h-[8px] w-[100px] rounded-full">
                  <div
                    className={`bg-[#FFDE31] h-[8px] w-[60px] rounded-full`}
                  ></div>
                </div>

                <p className="sm:text-[18px] text-[16px] font-[600]">Yellow</p>
              </div>
              <div className={`flex items-center gap-4 `}>
                <div className="bg-[#00467C] h-[8px] w-[100px] rounded-full">
                  <div
                    className={`bg-[#2342E3] h-[8px] w-[60px] rounded-full`}
                  ></div>
                </div>

                <p className="sm:text-[18px] text-[16px] font-[600]">Medium</p>
              </div>
              <div className={`flex items-center gap-4 `}>
                <div className="bg-[#00467C] h-[8px] w-[100px] rounded-full">
                  <div
                    className={`bg-[#5AFF31] h-[8px] w-[60px] rounded-full`}
                  ></div>
                </div>

                <p className="sm:text-[18px] text-[16px] font-[600]">High</p>
              </div>
              <div className={`flex items-center gap-4 `}>
                <div className="bg-[#00467C] h-[8px] w-[100px] rounded-full">
                  <div
                    className={`bg-[#E32323] h-[8px] w-[60px] rounded-full`}
                  ></div>
                </div>

                <p className="sm:text-[18px] text-[16px] font-[600]">
                  Critical
                </p>
              </div>
            </div>
          </div>
          {Array.from({ length: maxlength }).map((index, i) => (
            <div className="bg-[#0A273D] px-8 border-b border-black py-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 text-center">
                  <p>
                    {easyAssets[i]?.assetType ? easyAssets[i].assetType : "-"}
                  </p>
                  <p> {easyAssets[i]?.price ? easyAssets[i].price : "-"}</p>
                </div>
                <div className="flex-1 text-center">
                  <p>
                    {" "}
                    {mediumAssets[i]?.assetType
                      ? mediumAssets[i].assetType
                      : "-"}
                  </p>
                  <p> {mediumAssets[i]?.price ? mediumAssets[i].price : "-"}</p>
                </div>
                <div className="flex-1 text-center">
                  <p>
                    {" "}
                    {highAssets[i]?.assetType ? highAssets[i].assetType : "-"}
                  </p>
                  <p> {highAssets[i]?.price ? highAssets[i].price : "-"}</p>
                </div>
                <div className="flex-1 text-center">
                  <p>
                    {" "}
                    {criticalAssets[i]?.assetType
                      ? criticalAssets[i].assetType
                      : "-"}
                  </p>
                  <p>
                    {" "}
                    {criticalAssets[i]?.price ? criticalAssets[i].price : "-"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <h2 className="my-[10px] sm:text-[20px] text-[16px] w-[600]">Policy</h2>
        <div className="bg-[#0A273D] h-[365px] rounded-xl p-4">
          {" "}
          {programData?.policy}
        </div>
      </div>
    </div>
  );
}
