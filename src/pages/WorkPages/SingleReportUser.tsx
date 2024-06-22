import { useParams } from 'react-router-dom';
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import Line from "../../components/shared/WorkerShared/Line";
import RadioInput from "../../components/component/RadioInput";
// import { useGetCompanyById } from "../../queryies/useGetCompanyById";
import { useState } from "react";
// import { useSearchParams } from "react-router-dom";
// import { useCurrentUser } from "../../context/CurrentUser";
import { Textarea } from '../../components/ui/textarea';
import { useGetUserReports } from '../../queryies/useGetUserReports';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faFile } from '@fortawesome/free-regular-svg-icons';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Add the icon to the library
library.add(faFile);
library.add(faVideo)


export default function SingleReportUser() {
    const { id } = useParams();

    const { data } = useGetUserReports();
    console.log(data)
    console.log("id: " + id)
    let filteredReport;
    data.forEach((user) => {
        user.reports.forEach((report) => {
            if (report.id === parseInt(`${id}`)) {
                filteredReport = report;
            }
        });
    });
    console.log(filteredReport);
  
    const [proofConceptTitle, setProofConceptTitle] = useState<string>("");
    const [allAssets, setAllAssets] = useState<string[]>([]);
    const collaborators = filteredReport.collaborators
    const [enlarged, setEnlarged] = useState(null);

    const handleEnlarge = (index) => {
        setEnlarged(enlarged === index ? null : index);
    };

    const getAttachmentStyle = (index) => {
        if (enlarged === index) {
            return {
                width: '300px',
                height:'180px',
                transition: 'width 0.3s ease-in-out, height 0.3s ease-in-out',
                zIndex: 1000,
                position: 'relative',
            };
        } else {
            return {
                width: '100px',
                height: '40px',
                transition: 'transform 0.3s ease-in-out',
            };
        }

    }
    return (
        <div className="text-white flex-1 flex flex-col overflow-hidden relative">


            <div className="bg-[#1E1E1E] lg:px-20 sm:px-8 px-3  pb-16 flex-1 z-[400] ">
                <div className="lg:flex my-4  gap-6 relative hidden mb-16">
                    <div className="hexagon5 mt-3  min-w-[60px]">
                        <img src="/assets/images/programimage2.jpg" alt="" className="" />
                    </div>
                    <div className="xl:w-[60%] w-full">
                        <h2 className="sm:text-[18px] text-[16px] font-[600]">{ }</h2>
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
                                <p className="sm:text-[18px] text-[16px] font-[600]">10</p>
                            </div>
                            <div>
                                <p className="sm:text-[18px] text-[16px] font-[600]">
                                    Average bounty
                                </p>
                                <p className="sm:text-[18px] text-[16px] font-[600]">8</p>
                            </div>
                        </div>
                    </div>{" "}
                    <div className="flex-1 flex items-center gap-2 justify-end ml-4">
                        <img src="/assets/images/starempty.png" alt="star" className="cursor-pointer" />
                        <p>Bookmarks</p>
                    </div>
                </div>

                <div className="flex sm:gap-8 flex-col sm:flex-row gap-4  ">
                    <div className=" h-[30px] w-[30px] flex items-center justify-center hexagon6 !bg-[#2451F5]">
                        1
                    </div>
                    <div className=" rounded-xl overflow-hidden  flex-1">
                        <div className="sm:text-[18px] text-[16px] font-[600] bg-[#001D34] h-[60px] flex items-center px-8">
                            Asset
                        </div>
                        <div className="bg-[#0A273D] py-8 sm:px-8 px-4">
                            <div className="flex items-center gap-4 flex-col lg:flex-row">
                                <div className="lg:-[40%] w-full">
                                    <Label className="flex  bg-[#2451F5] rounded-2xl px-4 w-full">
                                        <Input value={filteredReport.asset.assetName} type="text" placeholder="Max Bounty"
                                            className="bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-none focus-visible:ring-offset-0 placeholder:text-white py-6" />
                                    </Label>
                                </div>

                                <div className="lg:-[40%] w-full">
                                    <Label className="flex  bg-[#2451F5] rounded-2xl px-4 w-full">
                                        <Input value={filteredReport.asset.assetType} type="text" placeholder="Max Bounty"
                                            className="bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-none focus-visible:ring-offset-0 placeholder:text-white py-6" />
                                    </Label>
                                </div>
                            </div>
                            <div className="overflow-y-scroll mt-4 bluescroll max-h-[280px]">
                                {allAssets?.map((item: string) => (
                                    <Line text={item} />
                                ))}
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
                                    <Label className="flex  bg-[#2451F5] rounded-2xl px-4 w-full">
                                        <Input type="text" placeholder="Max Bounty" value={filteredReport.reportTemplate}
                                            className="bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-none focus-visible:ring-offset-0 placeholder:text-white py-6" />
                                    </Label>
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

                                <div className="lg:-[40%] w-full">
                                    <Label className="flex  bg-[#2451F5] rounded-2xl px-4 w-full">
                                        <Input value={filteredReport.weakness.name} type="text" placeholder="Max Bounty"
                                            className="bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-none focus-visible:ring-offset-0 placeholder:text-white py-6" />
                                    </Label>
                                </div>

                                <div className="lg:-[40%] w-full">


                                    <Label className="flex  bg-[#2451F5] rounded-2xl px-4 w-full">
                                        <Input value={filteredReport.weakness.type} type="text" placeholder="Max Bounty"
                                            className="bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-none focus-visible:ring-offset-0 placeholder:text-white py-6" />
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex sm:gap-8 mt-4 flex-col sm:flex-row gap-4">
                    <div className=" h-[30px] w-[30px] flex items-center justify-center hexagon6 !bg-[#2451F5]">
                        4
                    </div>
                    <div className=" overflow-hidden  flex-1">
                        <div
                            className="rounded-xl sm:text-[18px] text-[16px] font-[600] bg-[#001D34] h-[60px] flex items-center px-8">
                            Severity
                        </div>
                        {filteredReport.methodName==='CVSS'?(
                            <div className="bg-[#0A273D] py-8 sm:px-8 px-4">
                                <div
                                    className="flex justify-between lg:items-center mb-4 xl:w-[70%] w-full flex-col lg:flex-row gap-4 ">
                      
                                    <RadioInput name="test1" value="test2" id="test2" label="CVSS" checked />
                                </div>
                                <div className=" items-center gap-4">
                                    <h2 className="sm:text-[18px] text-[16px] font-[600] mb-2">
                                        Calculation: 7/10
                                    </h2>
                                </div>
                                <div className="mt-4">
                                    <div className='flex'>

                                        <div
                                            className="xl:h-[70px] h-[110px] bg-[#2B5D83] flex xl:items-center sm:px-4 px-4 border-b border-black flex-col xl:flex-row gap-4">
                                            <div className="min-w-[200px] mt-2 xl:mt-0">
                                                Attack vector
                                            </div>
                                            <div
                                                className="xl:flex-nowrap grid xl:grid-cols-4  xl:gap-8 gap-y-0 gap-x-8 grid-cols-2 flex-1">
                                                <RadioInput name="attackvector" value={filteredReport.attackvector} id="Network" label={filteredReport.attackVector} checked />
                                            </div>
                                        </div>
                                        <div
                                            className="xl:h-[70px] h-[110px] bg-[#2B5D83] flex xl:items-center sm:px-4 px-4 border-b border-black flex-col xl:flex-row gap-4">
                                            <div className="min-w-[200px] mt-2 xl:mt-0">
                                                Scope
                                            </div>
                                            <div
                                                className="xl:flex-nowrap grid xl:grid-cols-4  xl:gap-8 gap-y-0 gap-x-8 grid-cols-2 flex-1">
                                                <RadioInput name="scope" value={filteredReport.scope} id="Low3" label={filteredReport.scope} checked />

                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex'>

                                        <div
                                            className="xl:h-[70px] h-[110px] bg-[#2B5D83] flex xl:items-center sm:px-4 px-4 border-b border-black flex-col xl:flex-row gap-4">
                                            <div className="min-w-[200px] mt-2 xl:mt-0">
                                                Attack complexity
                                            </div>
                                            <div
                                                className="xl:flex-nowrap grid xl:grid-cols-4  xl:gap-8 gap-y-0 gap-x-8 grid-cols-2 flex-1">
                                                <RadioInput name="attackcomplexity" value={filteredReport.attackComplexity} id="Network" label={filteredReport.attackComplexity} checked />
                                            </div>
                                        </div>
                                        <div
                                            className="xl:h-[70px] h-[110px] bg-[#2B5D83] flex xl:items-center sm:px-4 px-4 border-b border-black flex-col xl:flex-row gap-4">
                                            <div className="min-w-[200px] mt-2 xl:mt-0">
                                                Confidentially
                                            </div>
                                            <div
                                                className="xl:flex-nowrap grid xl:grid-cols-4  xl:gap-8 gap-y-0 gap-x-8 grid-cols-2 flex-1">
                                                <RadioInput name="confidentiality" value={filteredReport.confidentiality} id="Low2" label={filteredReport.confidentiality} checked />

                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex'>

                                        <div
                                            className="xl:h-[70px] h-[110px] bg-[#2B5D83] flex xl:items-center sm:px-4 px-4 border-b border-black flex-col xl:flex-row gap-4">
                                            <div className="min-w-[200px] mt-2 xl:mt-0">
                                                User interactions
                                            </div>
                                            <div
                                                className="xl:flex-nowrap grid xl:grid-cols-4  xl:gap-8 gap-y-0 gap-x-8 grid-cols-2 flex-1">
                                                <RadioInput name="userinteraction" value={filteredReport.userInteractions} id="Network" label={filteredReport.userInteractions}
                                                    checked />
                                            </div>
                                        </div>
                                        <div
                                            className="xl:h-[70px] h-[110px] bg-[#2B5D83] flex xl:items-center sm:px-4 px-4 border-b border-black flex-col xl:flex-row gap-4">
                                            <div className="min-w-[200px] mt-2 xl:mt-0">
                                                Integrity
                                            </div>
                                            <div
                                                className="xl:flex-nowrap grid xl:grid-cols-4  xl:gap-8 gap-y-0 gap-x-8 grid-cols-2 flex-1">
                                                <RadioInput name="integrity" value={filteredReport.integrity} id="Low4" label={filteredReport.integrity} checked />


                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex'>

                                        <div
                                            className="xl:h-[70px] h-[110px] bg-[#2B5D83] flex xl:items-center sm:px-4 px-4 border-b border-black flex-col xl:flex-row gap-4">
                                            <div className="min-w-[200px] mt-2 xl:mt-0">
                                                Privileges required
                                            </div>
                                            <div
                                                className="xl:flex-nowrap grid xl:grid-cols-4  xl:gap-8 gap-y-0 gap-x-8 grid-cols-2 flex-1">
                                                <RadioInput name="privileges" value={filteredReport.privilegesRequired} id="Network" label={filteredReport.privilegesRequired} checked />
                                            </div>
                                        </div>
                                        <div
                                            className="xl:h-[70px] h-[110px] bg-[#2B5D83] flex xl:items-center sm:px-4 px-4 border-b border-black flex-col xl:flex-row gap-4">
                                            <div className="min-w-[200px] mt-2 xl:mt-0">
                                                Availability
                                            </div>
                                            <div
                                                className="xl:flex-nowrap grid xl:grid-cols-4  xl:gap-8 gap-y-0 gap-x-8 grid-cols-2 flex-1">
                                                <RadioInput name="availability" value={filteredReport.availability} id="Low1" label={filteredReport.availability} checked />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ):(
                                <div className="bg-[#0A273D] py-8 sm:px-8 px-4">
                                    <div
                                        className=" flex justify-between lg:items-center mb-4 xl:w-[70%] w-full flex-col lg:flex-row gap-4 ">
                                        <RadioInput name="test1" value="test1" id="test1" label="Manual" checked/>
                                    </div>
                                   
                                    <div className="mt-4 ">
                                        <div className='flex'>

                                            <div
                                                className="xl:h-[70px] h-[110px] bg-[#2B5D83] flex xl:items-center sm:px-4 px-4 border-b border-black flex-col xl:flex-row gap-4">
                                                <div className="min-w-[800px] mt-2 xl:mt-0">
                                                    Manual
                                                </div>
                                                <div
                                                    className="xl:flex-nowrap grid xl:grid-cols-4  xl:gap-8 gap-y-0 gap-x-8 grid-cols-2 flex-1">
                                                    <RadioInput name="manual" value={filteredReport.rewardsStatus} id="Network" label={filteredReport.rewardsStatus}
                                                        checked={true} />
                                                </div>
                                            </div>
                                         
                                        </div>

                                    </div>
                                </div>
                        )}
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
                            <div className="flex items-center gap-4 flex-col lg:flex-col">
                                <div className="w-full">
                                    <h2 className="sm:text-[18px] text-[16px] font-[600] mt-4">
                                        Title
                                    </h2>
                                    <Input type="text" placeholder="Title"
                                        className="bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-2 border-[#2451F5]  focus-visible:ring-offset-0 placeholder:text-white py-6 mt-2"
                                        value={filteredReport.proofOfConcept.title} onChange={(e) => setProofConceptTitle(e.target.value)}
                                    />
                                </div>
                                <div className="w-full">

                                    <h2 className="sm:text-[18px] text-[16px] font-[600] mt-4">
                                        URL
                                    </h2>
                                    <Input type="text" placeholder="URL"
                                        className="bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-2 focus-visible:ring-offset-0 placeholder:text-white mt-2 py-6"
                                        value={filteredReport.proofOfConcept.vulnerabilityUrl} />
                                </div>
                                <div className="w-full">

                                    <h2 className="sm:text-[18px] text-[16px] font-[600] mt-4">
                                        Descriptions
                                    </h2>
                                    <Textarea type="text" placeholder="Description" value={filteredReport.proofOfConcept.description}
                                        className="bg-transparent h-[100px] text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-2 focus-visible:ring-offset-0 placeholder:text-white pb-5 mt-2 " />
                                </div></div>



                        </div>
                    </div>
                </div>

                <div className="flex sm:gap-8 flex-col sm:flex-row gap-4 mt-4">

                    <div className=" h-[30px] w-[30px] flex items-center justify-center hexagon6 !bg-[#2451F5]">
                        6
                    </div>

                    <div className=" rounded-xl overflow-hidden  flex-1">
                        <div className="sm:text-[18px] text-[16px] font-[600] bg-[#001D34] h-[60px] flex items-center px-8">
                            Attachments
                        </div>

                        <div className="bg-[#0A273D] py-8 sm:px-8 px-4">
                            <div className="flex gap-4 flex-col">
                                {filteredReport.attachments.length > 0 ? (
                                    <div className="w-full flex gap-9">
                                        {filteredReport.attachments.map((a, index) => (
                                            (a.contentType === 'image/jpeg' || a.contentType === 'image/png') ? (
                                                <div key={index} onClick={() => handleEnlarge(index)} >
                                                    <img 
                                                    className="cursor-pointer" 
                                                    src={a.url} 
                                                    alt={`attachment-${index}`} 
                                                    style={getAttachmentStyle(index)} />
                                                   

                                                </div>
                                            ) : a.contentType.startsWith('video/') ? (
                                        <div key={index}>
                                            <a href={a.url} target="_blank" rel="noopener noreferrer">
                                                <FontAwesomeIcon icon={faVideo} size="2xl" style={{ color: "#f3f4f7" }} />
                                                Video
                                            </a>
                                        </div>
                                        ) : (
                                        <div key={index}>
                                            <a href={a.url} target="_blank" rel="noopener noreferrer">
                                                <FontAwesomeIcon icon={faFile} size="2xl" style={{ color: "#f3f4f7" }} />
                                                File
                                            </a>
                                        </div>
                                        )

                                        ))}
                                    </div>
                                ) : (
                                    <div className="w-full">No attachments</div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex sm:gap-8 flex-col sm:flex-row gap-4 mt-4">
                    <div className=" h-[30px] w-[30px] flex items-center justify-center hexagon6 !bg-[#2451F5]">
                        7
                    </div>
                    <div className=" rounded-xl overflow-hidden  flex-1">
                        <div className="sm:text-[18px] text-[16px] font-[600] bg-[#001D34] h-[60px] flex items-center px-8">
                            Discovery details
                        </div>
                        <div className="bg-[#0A273D] py-8 sm:px-8 px-4">
                            <div className="flex gap-4 flex-col">
                                <div>
                                    Time Spent
                                </div>
                                <div className="w-full">
                                    <Input value={filteredReport.discoveryDetails.timeSpend} type="text" placeholder="Time spend"
                                        className="bg-transparent text-white rounded-2xl focus:outline-none focus-visible:ring-0 border-2 border-[#2451F5]  focus-visible:ring-offset-0 placeholder:text-white py-6" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex  flex-col  lg:flex-row lg:gap-16 gap-4  mt-4 ">
                    <div className="flex flex-col gap-4">

                    </div>
                    <div className="flex-1 w-full flex gap-[50px]">
                        {/* HACKERS */}

                        {collaborators.map((c) => (
                            <div className="bg-[#0A273D]  px-14 py-6 rounded-2xl flex items-center justify-between w-full relative">
                                <div className="flex items-center">
                                    <div className="hexagon5 m-auto md:m-0 ">
                                        <img src={"/assets/images/profileimage.jpeg"} alt="" />
                                    </div>
                                    <div className="flex-1 ml-4">
                                        <h3 className="text-[18px] font-[600]">{c.hackerUsername}</h3>
                                        <div className="flex items-center gap-2">
                                            <img src="/assets/flag.svg" className="w-[18px] " />
                                            <p className="text-[16px] font-[400]">Baku</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[#001D34] rounded-l-xl rounded-r-xl overflow-hidden flex">
                                    <input type="number"
                                        className="w-[50px] py-1 px-3 bg-[#001D34] border-r border-white text-white focus:outline-none focus-visible:ring-0" value={c.collaborationPercentage}
                                    />
                                    <div className="bg-[#001D34] w-[50px]   flex items-center justify-center "
                                    >
                                        %
                                    </div>
                                </div>
                            </div>

                        ))}






                    </div>
                </div>


            </div>
        </div>
    );
}