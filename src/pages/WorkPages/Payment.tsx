import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { useNavigate } from "react-router-dom";
export default function Payment() {
    const navigate = useNavigate();
    
    return (
        <div className="text-white flex-1 flex flex-col overflow-hidden relative">
            <section className="font-[800] bg-[#200F23] h-[124px] flex items-center justify-center overflow-hidden ">
                <img
                    src="/assets/iconnav3.svg"
                    alt=""
                    className="absolute z-[20] lg:-left-[10%] md:-left-[34%] sm:-left-[100px] top-0 w-[294px] md:w-[352px] -left-[150px]"
                />
                <p className="md:text-[30px] text-[20px]">Payment & Rewards</p>
                <img
                    src="/assets/iconnav4.svg"
                    alt=""
                    className="absolute z-[20] md:-right-[60px] top-0 lg:right-0 sm:-right-[10%] -right-[20%] overflow-hidden w-[224px] md:w-[242px]"
                />
            </section>
            <div className="bg-[url(/assets/images/bg-hacktivity.png)] bg-center bg-no-repeat bg-cover flex-1 lg:px-20 sm:px-8 px-3  py-16">
                <h2 className="my-[25px] sm:text-[20px] text-[16px] w-[600]">Overview</h2>
                <div className=" rounded-xl overflow-hidden  flex-1">
                    <div className="rounded-xl sm:text-[18px] text-[16px] font-[600] bg-[#FFDE31] h-[60px] flex items-center px-8 text-black relative">
                        My Summary
               
                        <Button className="hover:scale-105 transition-all duration-300 rounded-3xl  py-[7px]  bg-transparent text-white  border-2 border-[#3D0436] bg-[#3D0436] font-[600] hover:bg-transparent flex gap-4 px-4 w-[160px] absolute right-[20px]" onClick={()=>navigate("card")}>+ Add Payment Method
                        </Button>
                    </div>
                   
                    <div className="bg-[#3D0436] py-8 sm:px-8 px-4">
                     

                    </div>
                </div>
                <h2 className="my-[25px] sm:text-[20px] text-[16px] w-[600]">Earings</h2>
                <div className=" rounded-xl overflow-hidden  flex-1">
                    <div className="rounded-xl sm:text-[18px] text-[16px] font-[600] bg-[#FFDE31] h-[60px] flex items-center px-8 text-black">
                        My Summary
                    </div>
                    <div className="bg-[#3D0436] py-8 sm:px-8 px-4">


                    </div>
                </div>
                <h2 className="my-[25px] sm:text-[20px] text-[16px] w-[600]">Payouts</h2>
                <div className=" rounded-xl overflow-hidden  flex-1">
                    <div className="rounded-xl sm:text-[18px] text-[16px] font-[600] bg-[#FFDE31] h-[60px] flex items-center px-8 text-black">
                        My Summary
                    </div>
                    <div className="bg-[#3D0436] py-8 sm:px-8 px-4">
                     

                    </div>
                </div>
                <h2 className="my-[25px] sm:text-[20px] text-[16px] w-[600]">Adjustments</h2>
                <div className=" rounded-xl overflow-hidden  flex-1">
                    <div className="rounded-xl sm:text-[18px] text-[16px] font-[600] bg-[#FFDE31] h-[60px] flex items-center px-8 text-black">
                        My Summary
                    </div>
                    <div className="bg-[#3D0436] py-8 sm:px-8 px-4">


                    </div>
                </div>
            </div>
            
        </div>
    );
}
