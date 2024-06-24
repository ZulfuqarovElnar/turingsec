import Select from "react-select";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import Line from "../../components/shared/WorkerShared/Line";
import RadioInput from "../../components/component/RadioInput";
import { Textarea } from "../../components/ui/textarea";
import { useGetProgramById } from "../../queryies/useGetProgramById";
import { useParams } from "react-router";
// import { useGetCompanyById } from "../../queryies/useGetCompanyById";
import { useEffect, useState} from "react";
import { useSendReport } from "../../queryies/useSendReport";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import WeaknessLine from "../../components/component/WeaknessLine";
import CollabrateBox from "../../components/shared/WorkerShared/CollabrateBox";
import { useGetAllUsers } from "../../queryies/useGetAllUsers";
import AddCollabrateModal from "../../components/shared/WorkerShared/AddCollabrateModal";
import { useCurrentUser } from "../../context/CurrentUser";
import {useRef} from 'react';
import { parseCvss3Vector } from 'vuln-vects';
import { useGetUserData } from "../../queryies/useGetUserData";

export default function ProgramSubmitPage() {
 
  const { programId } = useParams();
 
  const [proofConceptTitle, setProofConceptTitle] = useState<string>("");
  const [proofConceptDescription, setProofConceptDescription] =
    useState<string>("");
  const [description, setDesciptions] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [lastActivityDes, setLastActivity]=useState<string>("");
  const [reportTemplate, setReportTemplate]=useState<string>("");
  const [globalPercent, setGlobalPercent] = useState<number>(100);
  const [percent, setPercent] = useState<number>(0);
  const { data: allUsers } = useGetAllUsers();
  const {data: currentUser}=useGetUserData()
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [weaknessType, setWeaknessType] = useState();
  const [severityValue, setSeverityValue] = useState<string>('');
  const [attackVector, setAttackVector] = useState<string>('N');
const [attackComplexity, setAttackComplexity] = useState<string>('L');
const [privilegesRequired, setPrivilegesRequired] = useState<string>('N');
const [userInteractions, setUserInteractions] = useState<string>('N');
const [integrity, setIntegrity] = useState<string>('N');
const [availability, setAvailability] = useState<string>('N');
const [confidentiality, setConfidentiality] = useState<string>('N');
const [scope, setScope] = useState<string>('U');
const [manual, setManual] = useState<string>('low');

  
  
 
  const severityRef = useRef(null)
  
 
  const {
    data: programData,
    isPending: programPending,
    isError: programError,
  } = useGetProgramById(programId);
  const [openModal, setOpenModal] = useState(false);
  const userData= useGetUserData();
 
  const [collabrates, setCollabrates] = useState([]);
  
 //..............CVSS Values.........
 const handleAttackVector = () => {
  const radios = document.querySelector('input[name="attackvector"]:checked');
  if (radios) {
    setAttackVector(radios.value);
  }
};

const handleAttackComplexity = () => {
  const radios = document.querySelector('input[name="attackcomplexity"]:checked');
  if (radios) {
    setAttackComplexity(radios.value);
  }
};

const handlePrivilegesRequired = () => {
  const radios = document.querySelector('input[name="privilegesrequired"]:checked');
  if (radios) {
    setPrivilegesRequired(radios.value);
  }
};

const handleUserInteractions = () => {
  const radios = document.querySelector('input[name="userinteractions"]:checked');
  if (radios) {
    setUserInteractions(radios.value);
  }
};

const handleScope = () => {
  const radios = document.querySelector('input[name="scope"]:checked');
  if (radios) {
    setScope(radios.value);
  }
};

const handleConfidentiality = () => {
  const radios = document.querySelector('input[name="confidentiality"]:checked');
  if (radios) {
    setConfidentiality(radios.value);
  }
};

const handleIntegrity = () => {
  const radios = document.querySelector('input[name="integrity"]:checked');
  if (radios) {
    setIntegrity(radios.value);
  }
};

const handleAvailability = () => {
  const radios = document.querySelector('input[name="availability"]:checked');
  if (radios) {
    setAvailability(radios.value);
  }
};

const handleManual = () => {
  const radios = document.querySelector('input[name="manual"]:checked');
  if (radios) {
    setManual(radios.value);
  }
};
 //...............CVSS.............
  
  useEffect(() => {
    setCollabrates((prev) =>[currentUser]);
  }, [currentUser]);
 
  const fakeDATA = [
    { label: "Max Bounty", value: 1000,},
    { label: "Total Bounty", value: 1000,},
    { label: "Average Bounty", value: 1000,},
    { label: "Submitted Bounty", value: 1000,},
    { label: "Collaborated Bounty", value: 1000,},
    { label: "Closed Bounty", value: 1000,},
  ];
 
  const fakeWeaknessData = [
    { label: "Access Control", value: 1000,},
    { label: "AII CAPECs", value: 1000,},
    { label: "AII CWEs", value: 1000,},
    { label: "Cryptographic Issues", value: 1000,},
    { label: "Insecure Interaction Between Components", value: 1000,},
    { label: "Memory Corruption", value: 1000,}
  ]
  const [allAssets, setAllAssets] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<File[]>([]);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>)=>{
    let file = e.target.files?.[0];
    if (file) {
      setAttachments((prev) => [...prev,file])
    }
  }

  useEffect(() => {
    if (programData) {
      const assets = programData?.assetTypes?.map((item) => item.assetType);
      setAllAssets(assets);
    }
  }, [programData]);
  
  const handleRadioChange = () => {
    const radios = document.querySelector('input[type="radio"]:checked')
    setSeverityValue(radios.value)
  };

  const mutation = useSendReport(programId);
  async function submitReport() {
    console.log('CVSS Values:');
    console.log('Attack Vector:', attackVector);
    console.log('Attack Complexity:', attackComplexity);
    console.log('Privileges Required:', privilegesRequired);
    console.log('User Interactions:', userInteractions);
    console.log('Scope:', scope);
    console.log('Confidentiality:', confidentiality);
    console.log('Integrity:', integrity);
    console.log('Availability:', availability);
    
    try {
      // const radios =document.querySelector('input[type="radio"]:checked');
      // const severityValue= radios.value;
      console.log(severityValue)
      const vector = `AV:${attackVector}/AC:${attackComplexity}/PR:${privilegesRequired}/UI:${userInteractions}/S:${scope}/C:${confidentiality}/I:${integrity}/A:${availability}`;
      const score = parseCvss3Vector(vector);
      console.log('CVSS Score:', score);

      // localStorage'den kullanıcı verilerini al
      const userString = localStorage.getItem("user");
      const userData = userString ? JSON.parse(userString) : null;
      // Kullanıcı verilerinden sadece kimliği al
      const userId = userData ? userData.id : null;
  
      if (!searchParams.get("line")) {
        return toast.error("Asset is required");
      }
      if (!searchParams.get("weaknessLine")) {
        return toast.error("Weakness is required");
      }
   
      if (!proofConceptTitle) {
        return toast.error("Proof of concept title is required");
      }
      if (!proofConceptDescription) {
        return toast.error("Proof of concept description is required");
      }
      if (collabrates.length === 0) {
        return toast.error("Collaboration is required");
      }
      if (percent !== 100) {
        return toast.error("Collaboration percentage should be 100%");
      }
      if (!severityValue) {
        return toast.error("Severity value is required");
      }
 
      const response = await mutation.mutateAsync({
        lastActivity: lastActivityDes,
        rewardsStatus: manual,
        reportTemplate: reportTemplate,
        ownPercentage: percent,
        collaboratorPayload: collabrates.map(collabrate => ({
          hackerUsername: collabrate.username,
          collaborationPercentage: collabrates.length>1 ?collabrate.collaborationPercentage : 100 ,
        })),
        reportAssetPayload: {
          assetName: selectedAsset?.name || "default name",
          assetType: selectedAsset?.type || "default type",
        },
        weakness: {
          type: weaknessType,
          name: searchParams.get("weaknessLine"),
        },
        proofOfConcept: {
          title: proofConceptTitle,
          vulnerabilityUrl: proofConceptDescription,
          description: description,
        },
        discoveryDetails: {
          timeSpend: lastActivityDes,
        },
        attachments: attachments,
        methodName: severityValue,
        severity: `${severityValue}`,
        attackVector: attackVector === 'H' ? 'High' : 'Low',
        attackComplexity: attackComplexity === 'H' ? 'High' : 'Low',
        privilegesRequired: privilegesRequired === 'H' ? 'High' : 'Low',
        userInteractions: userInteractions === 'R' ? 'Required' : 'None',
        scope: scope === 'C' ? 'Changed' : 'Unchanged',
        confidentiality: confidentiality === 'L' ? 'Low' : 'High',
        integrity: integrity === 'L' ? 'Low' : 'High',
        availability: availability === 'L' ? 'Low' : 'High',
      }
    );

      // Mutation başarılı olduğunda işlemler
      if (response) {
        toast.success("Report submitted successfully");
        setTimeout(() => {
          //window.location.href = "/work/dashboard";
        }, 1000);
      } else {
        console.log("ldlgf;lg;lgfpp[");
        throw new Error("Wrong response");
      }
    } catch (err) {
      console.log(err);
      toast.error("Report submission failed");
    }
  }
  // Util function to get unique asset types
const getUniqueAssetTypes = (assets) => {
  const types = [];
  const uniqueTypes = new Set();
  assets.forEach(asset => {
    if (!uniqueTypes.has(asset.type)) {
      types.push(asset);
      uniqueTypes.add(asset.type);
    }
  });
  return types;
};

// Function to get unique assets
const uniqueAssets = getUniqueAssetTypes([
  ...(programData?.asset?.lowAsset?.assets || []),
  ...(programData?.asset?.mediumAsset?.assets || []),
  ...(programData?.asset?.highAsset?.assets || []),
  ...(programData?.asset?.criticalAsset?.assets || [])
]);

  return (
    <div className="text-white flex-1 flex flex-col overflow-hidden relative">
      <AddCollabrateModal
        isOpen={openModal}
        setOpen={setOpenModal}
        allUsers={allUsers}
        collabrates={collabrates}
        setCollabrates={setCollabrates}
      />
      <div className="bg-[url('/assets/images/programimage.jpeg')] h-[100px]  bg-center bg-cover  relative w-full">
        <div className="h-full w-full bg-black opacity-60"></div>
      </div>
      <div className="bg-[#1E1E1E] lg:px-20 sm:px-8 px-3  pb-16 flex-1 z-[400] ">
        <div className="lg:flex my-4  gap-6 relative hidden mb-16">
          <div className="hexagon5 mt-3  min-w-[60px]">
            <img src="/assets/images/programimage2.jpg" alt="" className="" />
          </div>
          <div className="xl:w-[60%] w-full">
            <h2 className="sm:text-[18px] text-[16px] font-[600]">{}</h2>
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
          <div className="flex-1 flex items-center gap-2 justify-end ml-4">
            <img
              src="/assets/images/starempty.png"
              alt="star"
              className="cursor-pointer"
            />
            <p>Bookmarks</p>
          </div>
        </div>
        <div className="flex my-4  gap-6 relative lg:hidden flex-col sm:mb-16 mb-4">
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
          <div className="flex-1 flex items-center gap-2 justify-end">
            <img
              src="/assets/images/starempty.png"
              alt="star"
              className="cursor-pointer"
            />
            <p>Bookmarks</p>
          </div>
        </div>
        <div className="flex sm:gap-8 flex-col sm:flex-row gap-4  ">
          <div className=" h-[30px] w-[30px] flex items-center justify-center hexagon6 !bg-[#2451F5]">
            1
          </div>
          <div className=" rounded-xl  flex-1">
            <div className="sm:text-[18px] text-[16px] font-[600] bg-[#001D34] h-[60px] flex items-center px-8">
              Asset
            </div>
            <div className="bg-[#0A273D] py-8 sm:px-8 px-4">
              <div className="flex items-center gap-4 flex-col lg:flex-row">
                <div className="lg:w-[60%] w-full">
                  <Label className="flex  bg-[#2451F5] rounded-2xl px-4 w-full">
                    <img src="/assets/search.svg" alt="" />
                    <Input
                      type="text"
                      placeholder="Search"
                      className="bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-none focus-visible:ring-offset-0 placeholder:text-white py-6"
                    />
                    <img
                      src="/assets/x.svg"
                      alt=""
                      className="cursor-pointer"
                    />
                  </Label>
                </div>
                <div className="lg:-[40%] w-full">
                <Select
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      backgroundColor: "#2451F5",
                      border: "none",
                      color: "white",
                      borderRadius: "20px",
                      width: "100%",
                      height: "50px",
                      padding: "0 10px",
                      "&:hover": {
                        borderColor: "none",
                      },
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isFocused ? "#2451F5" : "#2451F5",
                      ":hover": { backgroundColor: "rgb(14 165 233)" },
                      color: state.isFocused ? "white" : "white",
                    }),
                    menuList: (provided, state) => ({
                      ...provided,
                      backgroundColor: "#2451F5",
                      color: "white",
                      padding: "0",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "white",
                    }),
                    singleValue: (provided, state) => {
                      const color = "white";
                        return { ...provided, color };
                      },
                    }}
                  options={uniqueAssets.map(asset => ({
                    label: asset.type,
                    value: asset.type,
                  }))}
                  isSearchable={false}
                  isClearable={true}
                  placeholder="Asset type"
                  onChange={(selectedOption) => {
                    const selectedAsset = uniqueAssets.find(asset => asset.type === selectedOption?.value);
                    setSelectedAsset({
                      name: selectedAsset?.names[0] || '',
                      type: selectedAsset?.type || ''
                    });
                  }}
                />
                </div>
              </div>
              <div className="overflow-y-scroll mt-4 bluescroll max-h-[280px]">
                {selectedAsset ? (
                  [
                    ...(programData?.asset?.lowAsset?.assets || []),
                    ...(programData?.asset?.mediumAsset?.assets || []),
                    ...(programData?.asset?.highAsset?.assets || []),
                    ...(programData?.asset?.criticalAsset?.assets || []),
                  ]
                    .filter(asset => asset.type === selectedAsset.type)
                    .flatMap((asset) => asset.names.map((name, index) => (
                      <Line key={`${asset.id}-${index}`} text={name} asset={asset} />
                    )))
                ) : (
                  <p className="px-8 py-4 bg-[#2B5D83] sm:text-[16px] text-[14px] font-[600]">Assets type seçin.</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex sm:gap-8 flex-col sm:flex-row gap-4 mt-4">
          <div className=" h-[30px] w-[30px] flex items-center justify-center hexagon6 !bg-[#2451F5]">
            2
          </div>
          <div className=" rounded-xl   flex-1">
            <div className="sm:text-[18px] text-[16px] font-[600] bg-[#001D34] h-[60px] flex items-center px-8">
              Report template
            </div>
            <div className="bg-[#0A273D] py-8 sm:px-8 px-4">
              <div className="flex items-center gap-4 flex-col lg:flex-row">
                <div className=" w-full">
                  <Select
                  
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        backgroundColor: "#2451F5",
                        border: "none",
                        color: "white",
                        borderRadius: "20px",

                        width: "100%",
                        height: "50px",
                        padding: "0 10px",
                        "&:hover": {
                          borderColor: "none",
                        },
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isFocused
                          ? "#2451F5"
                          : "#2451F5",
                        ":hover": { backgroundColor: "rgb(14 165 233)" },
                        color: state.isFocused ? "white" : "white",
                      }),
                      menuList: (provided, state) => ({
                        ...provided,
                        backgroundColor: "#2451F5",
                        color: "white",
                        padding: "0",
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        color: "white",
                      }),
                      singleValue: (provided, state) => {
                        const color = "white";
                        return { ...provided, color };
                      },
                    }}
                    options={fakeDATA}
                    isSearchable={false}
                    isClearable={true}
                    placeholder="Choose your own template"
                    onChange={(selectedOption)=>setReportTemplate(selectedOption.label)}
                  
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex sm:gap-8 flex-col sm:flex-row gap-4 mt-4">
          <div className=" h-[30px] w-[30px] flex items-center justify-center hexagon6 !bg-[#2451F5]">
            3
          </div>
          <div className=" rounded-xl overflow-hidden  flex-1">
            <div className="sm:text-[18px] text-[16px] font-[600] bg-[#001D34] h-[60px] flex items-center px-8">
              Weakness
            </div>
            <div className="bg-[#0A273D] py-8 sm:px-8 px-4">
              <div className="flex items-center gap-4 flex-col lg:flex-row">
                <div className="lg:w-[60%] w-full">
                  <Label className="flex  bg-[#2451F5] rounded-2xl px-4 w-full">
                    <img src="/assets/search.svg" alt="" />
                    <Input
                      type="text"
                      placeholder="Search"
                      className="bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-none focus-visible:ring-offset-0 placeholder:text-white py-6"
                    />
                    <img
                      src="/assets/x.svg"
                      alt=""
                      className="cursor-pointer"
                    />
                  </Label>
                </div>
                <div className="lg:-[40%] w-full">
                  <Select
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        backgroundColor: "#2451F5",
                        border: "none",
                        color: "white",
                        borderRadius: "20px",

                        width: "100%",
                        height: "50px",
                        padding: "0 10px",
                        "&:hover": {
                          borderColor: "none",
                        },
                      }),
                      option: (provided, state) => ({
                        ...provided,
                        backgroundColor: state.isFocused
                          ? "#2451F5"
                          : "#2451F5",
                        ":hover": { backgroundColor: "rgb(14 165 233)" },
                        color: state.isFocused ? "white" : "white",
                      }),
                      menuList: (provided, state) => ({
                        ...provided,
                        backgroundColor: "#2451F5",
                        color: "white",
                        padding: "0",
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        color: "white",
                      }),
                      singleValue: (provided, state) => {
                        const color = "white";
                        return { ...provided, color };
                      },
                    }}
                    options={fakeWeaknessData}
                    isSearchable={false}
                    isClearable={true}
                    placeholder="Weakness type"
                    onChange={(selectedOption)=>{
                      setWeaknessType(selectedOption.label);
                       
                    }}
                  />
                </div>
              </div>
              <div className="overflow-y-scroll mt-4 bluescroll h-[280px]">
                <WeaknessLine text="SQL Injection" />
                <WeaknessLine text="XSS" />
                <WeaknessLine text="CSRF" />
                <WeaknessLine text="XSS" />
                <WeaknessLine text="XXE" />
                <WeaknessLine text="RCE" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex sm:gap-8 mt-4 flex-col sm:flex-row gap-4">
          <div className=" h-[30px] w-[30px] flex items-center justify-center hexagon6 !bg-[#2451F5]">
            4
          </div>
          <div className=" rounded-xl overflow-hidden  flex-1">
            <div className="sm:text-[18px] text-[16px] font-[600] bg-[#001D34] h-[60px] flex items-center px-8">
              Severity
            </div>
            <div className="bg-[#0A273D] py-8 sm:px-8 px-4">
              <div className="flex justify-between lg:items-center mb-4 xl:w-[70%] w-full flex-col lg:flex-row gap-4 " onChange={handleRadioChange} >
                <RadioInput 
                  name="test1"
                  value="manual"
                  id="test1"
                  label="Manual"
                />
                <RadioInput
                  name="test1"
                  value="CVSS"
                  id="test2"
                  label="CVSS"
               
                />
              </div>
              
              {severityValue === 'CVSS' ? (
                <>
                <div className=" items-center gap-4">
                <h2 className="sm:text-[18px] text-[16px] font-[600] mb-2">
                  Severity calculation method
                </h2>
                <Select
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      backgroundColor: "#2451F5",
                      border: "none",
                      color: "white",
                      borderRadius: "20px",

                      width: "100%",
                      height: "50px",
                      padding: "0 10px",
                      "&:hover": {
                        borderColor: "none",
                      },
                    }),
                    option: (provided, state) => ({
                      ...provided,
                      backgroundColor: state.isFocused ? "#2451F5" : "#2451F5",
                      ":hover": { backgroundColor: "rgb(14 165 233)" },
                      color: state.isFocused ? "white" : "white",
                    }),
                    menuList: (provided, state) => ({
                      ...provided,
                      backgroundColor: "#2451F5",
                      color: "white",
                      padding: "0",
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "white",
                    }),
                    singleValue: (provided, state) => {
                      const color = "white";
                      return { ...provided, color };
                    },
                  }}
                  options={fakeDATA}
                  isSearchable={false}
                  isClearable={true}
                  placeholder=" Period"
                />
              </div>
                <div className="mt-4 severity" id="withSev" ref={severityRef}>
                <div className="xl:h-[70px] h-[110px] bg-[#2B5D83] flex xl:items-center sm:px-4 px-4 border-b border-black flex-col xl:flex-row gap-4">
                  <div className="min-w-[200px] mt-2 xl:mt-0">
                    Attack vector
                  </div>
                  <div className="xl:flex-nowrap grid xl:grid-cols-4 xl:gap-8 gap-y-0 gap-x-8 grid-cols-2 flex-1" onChange={handleAttackVector}>
                    <RadioInput
                      name="attackvector"
                      value="N"
                      id="Network"
                      label="Network"
                    />
                    <RadioInput
                      name="attackvector"
                      value="A"
                      id="Adjacent"
                      label="Adjacent"
                    />
                    <RadioInput
                      name="attackvector"
                      value="L"
                      id="Local"
                      label="Local"
                    />
                    <RadioInput
                      name="attackvector"
                      value="P"
                      id="Physical"
                      label="Physical"
                    />
                  </div>

                </div>
                <div className="xl:h-[70px] h-[110px] bg-[#2B5D83] flex xl:items-center sm:px-4 px-4 border-b border-black flex-col xl:flex-row gap-4">
                  <div className="min-w-[200px] mt-2 xl:mt-0">
                    Attack complexity
                  </div>
                  <div className="xl:flex-nowrap grid xl:grid-cols-4  xl:gap-8 gap-y-0 gap-x-8 grid-cols-2 flex-1" onChange={handleAttackComplexity}>
                  <RadioInput
                    name="attackcomplexity"
                    value="L"
                    id="Low"
                    label="Low"
                  />
                  <RadioInput
                    name="attackcomplexity"
                    value="H"
                    id="High"
                    label="High"
                  />

                  </div>
                </div>
                <div className="xl:h-[70px] h-[110px] bg-[#2B5D83] flex xl:items-center sm:px-4 px-4 border-b border-black flex-col xl:flex-row gap-4">
                  <div className="min-w-[200px] mt-2 xl:mt-0">
                    Privileges required
                  </div>
                  <div className="xl:flex-nowrap grid xl:grid-cols-4  xl:gap-8 gap-y-0 gap-x-8 grid-cols-2 flex-1" onChange={handlePrivilegesRequired}>
                    <RadioInput
                      name="privilegesrequired"
                      value="N"
                      id="None2"
                      label="None"
                    />
                    <RadioInput
                      name="privilegesrequired"
                      value="L"
                      id="Low2"
                      label="Low"
                    />
                    <RadioInput
                      name="privilegesrequired"
                      value="H"
                      id="High2"
                      label="High"
                    />
                  </div>
                </div>
                <div className="xl:h-[70px] h-[110px] bg-[#2B5D83] flex xl:items-center sm:px-4 px-4 border-b border-black flex-col xl:flex-row gap-4">
                  <div className="min-w-[200px] mt-2 xl:mt-0">
                    User interactions
                  </div>
                  <div className="xl:flex-nowrap grid xl:grid-cols-4  xl:gap-8 gap-y-0 gap-x-8 grid-cols-2 flex-1" onChange={handleUserInteractions}>
                    <RadioInput
                      name="userinteractions"
                      value="N"
                      id="None3"
                      label="None"
                    />
                    <RadioInput
                      name="userinteractions"
                      value="R"
                      id="Required"
                      label="Required"
                    />
                  </div>
                </div>
                <div className="xl:h-[70px] h-[110px] bg-[#2B5D83] flex xl:items-center sm:px-4 px-4 border-b border-black flex-col xl:flex-row gap-4">
                  <div className="min-w-[200px] mt-2 xl:mt-0">Scope</div>
                  <div className="xl:flex-nowrap grid xl:grid-cols-4  xl:gap-8 gap-y-0 gap-x-8 grid-cols-2 flex-1" onChange={handleScope}>
                    <RadioInput
                      name="scope"
                      value="U"
                      id="Unchanged"
                      label="Unchanged"
                    />
                    <RadioInput
                      name="scope"
                      value="C"
                      id="Changed"
                      label="Changed"
                    />
                  </div>
                </div>
                <div className="xl:h-[70px] h-[110px] bg-[#2B5D83] flex xl:items-center sm:px-4 px-4 border-b border-black flex-col xl:flex-row gap-4">
                  <div className="min-w-[200px] mt-2 xl:mt-0">
                    Confidentiality
                  </div>
                  <div className="xl:flex-nowrap grid xl:grid-cols-4  xl:gap-8 gap-y-0 gap-x-8 grid-cols-2 flex-1" onChange={handleConfidentiality}>
                    <RadioInput
                      name="confidentiality"
                      value="N"
                      id="None4"
                      label="None"
                    />
                    <RadioInput
                      name="confidentiality"
                      value="L"
                      id="Low4"
                      label="Low"
                    />
                    <RadioInput
                      name="confidentiality"
                      value="H"
                      id="High4"
                      label="High"
                    />
                  </div>
                </div>
                <div className="xl:h-[70px] h-[110px] bg-[#2B5D83] flex xl:items-center sm:px-4 px-4 border-b border-black flex-col xl:flex-row gap-4">
                  <div className="min-w-[200px] mt-2 xl:mt-0">Integrity</div>
                  <div className="xl:flex-nowrap grid xl:grid-cols-4  xl:gap-8 gap-y-0 gap-x-8 grid-cols-2 flex-1" onChange={handleIntegrity}>
                    <RadioInput
                      name="integrity"
                      value="N"
                      id="None5"
                      label="None"
                    />
                    <RadioInput
                      name="integrity"
                      value="L"
                      id="Low5"
                      label="Low"
                    />
                    <RadioInput
                      name="integrity"
                      value="H"
                      id="High5"
                      label="High"
                    />
                  </div>
                </div>
                <div className="xl:h-[70px] h-[110px] bg-[#2B5D83] flex xl:items-center sm:px-4 px-4 border-b border-black flex-col xl:flex-row gap-4">
                  <div className="min-w-[200px] mt-2 xl:mt-0">
                    Availability
                  </div>
                  <div className="xl:flex-nowrap grid xl:grid-cols-4  xl:gap-8 gap-y-0 gap-x-8 grid-cols-2 flex-1" onChange={handleAvailability}>
                    <RadioInput
                      name="availability"
                      value="N"
                      id="None6"
                      label="None"
                    />
                    <RadioInput
                      name="availability"
                      value="L"
                      id="Low6"
                      label="Low"
                    />
                    <RadioInput
                      name="availability"
                      value="H"
                      id="High6"
                      label="High"
                    />
                  </div>
                </div>
                 
              </div></>
              ): severityValue==='manual' ?(
                <div className="mt-4 severity" id="withoutSev">
                  <div className="xl:h-[70px] h-[110px] bg-[#2B5D83] flex xl:items-center sm:px-4 px-4 border-b border-black flex-col xl:flex-row gap-4">
                    <div className="min-w-[200px] mt-2 xl:mt-0">
                      Manual
                    </div>
                    <div className="xl:flex-nowrap grid xl:grid-cols-4  xl:gap-8 gap-y-0 gap-x-8 grid-cols-2 flex-1" onChange={handleManual}>
                      <RadioInput
                        name="manual"
                        value="low"
                        id="Low7"
                        label="Low"
                      />
                      <RadioInput
                        name="manual"
                        value="medium"
                        id="Medium"
                        label="Medium"
                      />
                      <RadioInput
                        name="manual"
                        value="high"
                        id="High7"
                        label="High"
                      />
                      <RadioInput
                        name="manual"
                        value="critical"
                        id="Critical"
                        label="Critical"
                      />
                    </div>
                  </div>
                </div>):(
                  <div></div>
                )}
              

              
            </div>
          </div>
        </div>
        <div className="flex sm:gap-8 flex-col sm:flex-row gap-4 mt-4">
          <div className=" h-[30px] w-[30px] flex items-center justify-center hexagon6 !bg-[#2451F5]">
            5
          </div>
          <div className=" rounded-xl overflow-hidden  flex-1">
            <div className="sm:text-[18px] text-[16px] font-[600] bg-[#001D34] h-[60px] flex items-center px-8">
              Proof of Concept
            </div>
            <div className="bg-[#0A273D] py-8 sm:px-8 px-4">
              <div className="flex items-center gap-4 flex-col lg:flex-row">
                <div className="w-full">
                  <Input
                    type="text"
                    placeholder="Title"
                    className="bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-2 border-[#2451F5]  focus-visible:ring-offset-0 placeholder:text-white py-6"
                    value={proofConceptTitle}
                    onChange={(e) => setProofConceptTitle(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <h2 className="sm:text-[18px] text-[16px] font-[600] mt-4">
                  URL
                </h2>
                <div className="w-full mt-4">
                  <Input
                    type="text"
                    placeholder="Vulnerability URL"
                    className="bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-2 focus-visible:ring-offset-0 placeholder:text-white py-6"
                    value={proofConceptDescription}
                    onChange={(e) => setProofConceptDescription(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <h2 className="sm:text-[18px] text-[16px] font-[600] mt-4">
                  Descriptions
                </h2>
                <div className="w-full mt-4">
                  <Textarea
                    placeholder="Descriptions"
                    className="bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-2 focus-visible:ring-offset-0 placeholder:text-white py-6"
                    onChange={(e) => setDesciptions(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-between mt-4 flex-col lg:flex-row">
                <div className="lg:w-[50%] w-full">
                  <h3 className="font-700 sm:text-[18px]  text-[16px] mb-4">
                    Attachments
                  </h3>
                  <p className="font-[400] sm:text-[16px] text-[14px] lg:w-[50%] w-full">
                    Attach proof-of-concept script,screenshots,screen recordings
                  </p>
                </div>
                <div className="flex-1 mt-4 lg:mt-0">
                  <label
                    htmlFor="attachFile"
                    className="hover:scale-105 transition-all duration-300 rounded-xl  py-[7px]  bg-[#2451F5] text-white  border-2 border-[#2451F5] font-[600] hover:bg-[#2451F5] flex gap-2 px-4 h-[50px] w-[170px] items-center cursor-pointer"
                  >
                    <img
                      src="/assets/attach.svg"
                      alt=""
                      className="w-[15px] m-0"
                    />
                    <p className="text-[14px]">Add attachments</p>
                    <input onInput={handleInput} type="file" className="hidden" id="attachFile" />
                  </label>
                  {attachments.length > 0 && (
                    <div className="mt-2 text-gray-700">
                      
                      <ul>
                        {attachments.map((file, index) => (
                          <li key={index}>{file.name}</li>
                        ))}
                      </ul>
                    </div>
                  )}


                  <p className="mt-4">
                    You can attach up to 20 files. Please keep individual upload
                    size under 400MB.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex sm:gap-8 flex-col sm:flex-row gap-4 mt-4">
          <div className=" h-[30px] w-[30px] flex items-center justify-center hexagon6 !bg-[#2451F5]">
            6
          </div>
          <div className=" rounded-xl overflow-hidden  flex-1">
            <div className="sm:text-[18px] text-[16px] font-[600] bg-[#001D34] h-[60px] flex items-center px-8">
              Discovery details
            </div>
            <div className="bg-[#0A273D] py-8 sm:px-8 px-4">
              <div className="flex items-center gap-4 flex-col lg:flex-row">
                <div className="w-full">
                  <Input
                    type="text"
                    placeholder="Time spend"
                    className="bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-2 border-[#2451F5]  focus-visible:ring-offset-0 placeholder:text-white py-6"
                    onChange={(e) => setLastActivity(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex  flex-col    lg:flex-row lg:gap-16 gap-4  mt-4 ">
          <div className="flex flex-col gap-4">
            <h3>Add Collabrate</h3>
            <Button
              className="hover:scale-105 transition-all duration-300 rounded-xl  py-[7px]  bg-[#2451F5] text-white  border-2 border-[#2451F5] font-[600] hover:bg-[#2451F5] flex gap-4 px-4 w-[160px] "
              onClick={() => setOpenModal(true)}
            >
              Add Collaborate
            </Button>
          </div>
          <div className="flex-1 space-y-4">
            {collabrates.map((item, i) => {
              return (
                <CollabrateBox
                  key={item?.id} // Assuming item.id is a unique identifier
                  percent={percent}
                  globalPercentage={globalPercent}
                  setPercent={setPercent}
                  username={item?.username}
                  city={item?.city || "city"}
                  index={i}
                  setCollabrates={setCollabrates}
                  id={item?.id}
                />
              );
            })}
          </div>
        </div>

        <div className="mt-4 flex gap-4  justify-end flex-col-reverse md:flex-row items-end">
          <Button className="hover:scale-105 transition-all duration-300 rounded-3xl  py-[7px]  bg-transparent text-white  border-2 border-[#2451F5] font-[600] hover:bg-transparent flex gap-4 px-4 w-[160px] ">
            Create Draft
          </Button>
          <Button
            className="hover:scale-105 transition-all duration-300 rounded-3xl  py-[7px]  bg-[#2451F5] text-white  border-2 border-[#2451F5] font-[600] hover:bg-[#2451F5] flex gap-4 px-4 w-[160px] "
            onClick={submitReport}
          >
            <p>Submit Report</p>
            <img src="/assets/sendbutton.svg" alt="" className="  " />
          </Button>
        </div>
      </div>
    </div>
  );
}
