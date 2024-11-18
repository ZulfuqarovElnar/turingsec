// import InputCompany from "../../components/component/Company/InputCompany";

// import toast from "react-hot-toast";

import { useState } from "react";
import { Button } from "../../components/ui/button";
// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormMessage,
// } from "../../components/ui/form";

export default function AddCard() {
    const [firstPart, setFirstPart] = useState(true)

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
                {firstPart ? (
                    <div>First</div>
                ) : (
                    <div>Second</div>
                )}

                <div className="w-[600] flex  justify-center content-center">
                    
                    <Button className="hover:scale-105 transition-all duration-300 rounded-3xl  py-[7px]  bg-transparent text-white  border-2 border-[rgba(255,234,0,0.3)]  font-[600] hover:bg-[rgba(255,234,0,0.3)] flex gap-4 px-4 w-[160px]" onClick={() => setFirstPart(true)}>BACK
                    </Button>
                    <Button className="hover:scale-105 transition-all duration-300 rounded-3xl  py-[7px]  bg-transparent text-white  border-2 border-[rgba(255, 255, 255, 0.1) 50%)] bg-[rgba(255,234,0,0.3)] font-[600] hover:bg-transparent flex gap-4 px-4 w-[160px] ml-[10px]" onClick={() => setFirstPart(false)}>NEXT
                    </Button>
                </div>
                
            </div>
        </div>
    );
}
