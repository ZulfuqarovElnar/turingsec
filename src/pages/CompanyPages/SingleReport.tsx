import { useParams } from 'react-router-dom';
import { useGetReportById } from '../../queryies/useGetReportById';
import { useCurrentCompany } from '../../context/CurrentCompany';

export default function SingleReport() {
    const { currentCompany } = useCurrentCompany();
    const { id } = useParams();
    console.log("id:" + id)
    const { data: reportData }= useGetReportById(`${id}`)
    console.log(reportData.asset)
    
    return (
            <div className="text-white flex-1 flex flex-col overflow-hidden relative">
                <div className="bg-[#1E1E1E] lg:px-20 sm:px-8 px-3  pb-16 flex-1 z-[400] ">
                    <div className="lg:flex my-4  gap-6 relative hidden mb-16">
                        <div className="hexagon5 mt-3  min-w-[60px]">
                            <img src="/assets/images/programimage2.jpg" alt="" className="" />
                        </div>
                        <div className="xl:w-[60%] w-full">
                            <h2 className="sm:text-[18px] text-[16px] font-[600]">
                                {currentCompany?.name}
                            </h2>
                            <p className="sm:text-[18px] text-[16px] font-[600]">
                                Business title
                            </p>
                            <a href="http://www.turingsec.com/" className="text-[#5BA2F8]">
                                http://www.turingsec.com/
                            </a>
                            <div className="flex justify-between gap-2 flex-wrap">

                                <div>
                                    <p className="sm:text-[18px] text-[16px] font-[600]">
                                        Reports Resolved
                                    </p>
                                    <p className="sm:text-[18px] text-[16px] font-[600]">0</p>
                                </div>

                                <div>
                                    <p className="sm:text-[18px] text-[16px] font-[600]">
                                        Assests in scope 
                                    </p>
                                    <p className="sm:text-[18px] text-[16px] font-[600]">0</p>
                                </div>

                                <div>
                                    <p className="sm:text-[18px] text-[16px] font-[600]">
                                        Average bounty
                                    </p>
                                    <p className="sm:text-[18px] text-[16px] font-[600]">0</p>
                                </div>
                                
                            </div>
                         
                        </div>
                     
                    </div> 
                </div>
            </div>
       
    );
}
