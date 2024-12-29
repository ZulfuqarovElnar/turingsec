    import { useEffect, useState } from "react";
    import { Link } from "react-router-dom";
    import { Button } from "../../components/ui/button";
    import { useNavigate } from "react-router-dom";
    import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    } from "../../components/ui/form";

    export default function Payment() {
    const navigate = useNavigate();

    const [date, setDate] = useState("");
    const day = Array.from({ length: 31 }, (_, i) => i + 1);

    const [selectedOption, setSelectedOption] = useState("all-time"); // Initial selected option

    const handleRadioChange = (option) => {
        setSelectedOption(option);
    };

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
            <h2 className="my-[25px] font-bold sm:text-[25px] text-[30px] w-[600]">
            Overview
            </h2>
            <div className=" rounded-xl overflow-hidden  flex-1">
            <div className="rounded-xl sm:text-[20px] text-[20px] font-[700] bg-[#FFDE31] h-[60px] flex items-center px-8 text-black relative">
                My Summary
            </div>
            <div className="bg-[#3D0436] py-16 sm:px-8 px-4 flex items-center justify-center">
                <div className="flex flex-col w-full justify-between gap-5">
                <div className="flex w-full justify-between gap-3">
                    <div className="flex flex-col bg-[#FE3CB733] items-start justify-center gap-2 rounded-[20px] px-4 w-[325px] h-[144px]">
                    <h2 className="text-[20px] xss:text-[18px] sm:text-[20px] font-[600] text-white">
                        Total rewards earned
                    </h2>
                    <h2 className="text-[20px] xss:text-[18px] sm:text-[20px] font-[600] text-white">
                        Total paid
                    </h2>
                    <h2 className="text-[20px] xss:text-[18px] sm:text-[20px] font-[600] text-white">
                        Adjustments
                    </h2>
                    </div>
                    <div className="flex flex-col justify-center gap-2">
                    <h2 className="text-[20px] font-[600] text-white">$0</h2>
                    <h2 className="text-[20px] font-[600] text-white">$0</h2>
                    <h2 className="text-[20px] font-[600] text-white">$0</h2>
                    </div>
                </div>
                <input
                    type="range"
                    className="w-full h-2 bg-[#FFDE31] rounded-lg cursor-pointer accent-[#FFDE31] focus:outline-none"
                />
                <div className="flex w-full justify-between">
                    <h2 className="text-[20px] font-[600] text-white">
                    Outstanding balance
                    </h2>
                    <h2 className="text-[20px] font-[600] text-white">$0</h2>
                </div>
                </div>
            </div>
            </div>
            <h2 className="my-[25px] font-bold sm:text-[25px] text-[30px] w-[600]">
            Earnings
            </h2>
            <div className=" rounded-xl overflow-hidden  flex-1">
            <div className="xss:overflow-scroll md:overflow-auto  rounded-xl sm:text-[20px] text-[20px] font-[700] justify-around bg-[#FFDE31] h-[60px] flex items-center px-8 text-black">
                <div className="rounded-xl sm:text-[20px] text-[20px] font-[700] h-[60px] flex items-center px-8 text-black">
                Source
                </div>
                <div className="rounded-xl sm:text-[20px] text-[20px] font-[700] h-[60px] flex items-center px-8 text-black">
                Awarded By
                </div>
                <div className="rounded-xl sm:text-[20px] text-[20px] font-[700] h-[60px] flex items-center px-8 text-black">
                Awarded At
                </div>
                <div className="rounded-xl sm:text-[20px] text-[20px] font-[700] h-[60px] flex items-center px-8 text-black">
                Amount
                </div>
            </div>
            <div className="bg-[#3D0436] py-16 sm:px-8 px-4 flex items-center justify-center">
                <h2 className="text-[24px] font-[600]">Nothing to show yet</h2>
            </div>
            </div>
            <h2 className="my-[25px] font-bold sm:text-[25px] text-[30px] w-[600]">
            Payouts
            </h2>
            <div className=" rounded-xl overflow-hidden  flex-1">
            <div className=" xss:overflow-scroll md:overflow-auto rounded-xl sm:text-[20px] text-[20px] font-[700] justify-around bg-[#FFDE31] h-[60px] flex items-center px-8 text-black">
                <div className="rounded-xl sm:text-[20px] text-[20px] font-[700] h-[60px] flex items-center px-8 text-black">
                Amount
                </div>
                <div className="rounded-xl sm:text-[20px] text-[20px] font-[700] h-[60px] flex items-center px-8 text-black">
                Paid out at
                </div>
                <div className="rounded-xl sm:text-[20px] text-[20px] font-[700] h-[60px] flex items-center px-8 text-black">
                Referance
                </div>
                <div className="rounded-xl sm:text-[20px] text-[20px] font-[700] h-[60px] flex items-center px-8 text-black">
                Payout provider
                </div>
                <div className="rounded-xl sm:text-[20px] text-[20px] font-[700] h-[60px] flex items-center px-8 text-black">
                Status
                </div>
            </div>
            <div className="bg-[#3D0436] py-16 sm:px-8 px-4 flex items-center justify-center">
                <h2 className="text-[24px] font-[600]">Nothing to show yet</h2>
            </div>
            </div>
            <h2 className="my-[25px] font-bold sm:text-[25px] text-[30px] w-[700]">
            Adjustments
            </h2>
            <div className=" rounded-xl overflow-hidden  flex-1">
            <div className="xss:overflow-scroll md:overflow-auto rounded-xl sm:text-[20px] text-[20px] font-[700] justify-around bg-[#FFDE31] h-[60px] flex items-center px-8 text-black">
                <div className="rounded-xl sm:text-[20px] text-[20px] font-[700] h-[60px] flex items-center px-8 text-black">
                Category
                </div>
                <div className="rounded-xl sm:text-[20px] text-[20px] font-[700] h-[60px] flex items-center px-8 text-black">
                Note
                </div>
                <div className="rounded-xl sm:text-[20px] text-[20px] font-[700] h-[60px] flex items-center px-8 text-black">
                Adjust at
                </div>
                <div className="rounded-xl sm:text-[20px] text-[20px] font-[700] h-[60px] flex items-center px-8 text-black">
                Amount
                </div>
            </div>
            <div className="bg-[#3D0436] py-16 sm:px-8 px-4 flex items-center justify-center">
                <h2 className="text-[24px] font-[600]">Nothing to show yet</h2>
            </div>
            </div>

            <div className="flex flex-col pt-10">
            <h2 className=" font-bold sm:text-[25px] text-[30px] w-[600] ">
                Verification Letter
            </h2>
            <div className="flex justify-between w-full items-center xss:flex-col md:flex-row ">
                <div className="flex gap-8">
                <div className="flex gap-2">
                    <input
                    type="radio"
                    className="accent-[#FFDE31] block"
                    checked={selectedOption === "all-time"}
                    onChange={() => handleRadioChange("all-time")}
                    />
                    <h2 className="my-[25px] font-bold xss:text-[24px] sm:text-[30px] text-[30px] w-[600]">
                    All time
                    </h2>
                </div>
                <div className="flex gap-2">
                    <input
                    type="radio"
                    className="accent-[#FFDE31] block"
                    checked={selectedOption === "custom-date"}
                    onChange={() => handleRadioChange("custom-date")}
                    />
                    <h2 className="my-[25px] font-bold xss:text-[24px] sm:text-[30px] text-[30px] w-[600]">
                    Custom date
                    </h2>
                </div>
                </div>
                <div className="">
                <select
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className={`xss:w-full bg-[#FFEA004D] border-[3px] border-solid border-[rgba(255,255,255,0.13)] text-white rounded-[5px] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-1 placeholder:text-white py-3 h-[50px] px-20 font-bold ${
                    selectedOption === "all-time"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    disabled={selectedOption === "all-time"}
                >
                    <option className="text-[600]" value="" disabled>
                    05/02/2020 - 07/01/2024
                    </option>
                    {day.map((day) => (
                    <option key={day} value={day}>
                        {day}
                    </option>
                    ))}
                </select>
                </div>
            </div>
            </div>

            <div className="text-white flex-1 flex flex-col overflow-hidden relative pb-[100px] ">
            <div className=" flex-1 lg:px-20 sm:px-8 px-3 py-36 flex justify-center ">
                <div className="flex flex-col gap-8 items-center justify-between h-[400px] w-full">
                <div className="flex gap-4 items-center self-end">
                    <button className=""></button>
                    <img src="/assets/translate.svg" alt="" className="flex" />
                    <select
                    name=""
                    id=""
                    className="text-[22px] font-bold block w-full appearance-none bg-transparent border-none py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:border-blue-500  focus-visible:ring-0 focus-visible:ring-offset-1 placeholder:text-white "
                    >
                    <option value="">English</option>
                    <option value="">Russian</option>
                    <option value="">Turkish</option>
                    </select>
                </div>
                <div className="flex flex-col gap-8 items-center w-full ">
                    <div className="flex gap-4 items-center xss:flex-col md:flex-row">
                    <img
                        src="/assets/lineicons_cash-app.svg"
                        alt="icon"
                        className=""
                    />
                    <h2 className="text-[25px] font-bold xss:text-[24px] xss:text-center sm:text-[30px] ">Payout method Setup</h2>
                    </div>
                    <h2 className="text-[25px] xss:text-[24px] sm:text-[30px] text-center font-semibold">
                    You do not currently have a payment method setup
                    </h2>
                    <Button
                    className="w-full hover:scale-105 transition-all duration-300 text-[18px] font-semibold text-white bg-[#FE3CB733] px-16 py-6 rounded-[25px] flex items-center gap-4 border-[3px] border-solid border-[rgba(255,255,255,0.13)]"
                    onClick={() => navigate("addcard")}
                    >
                    <img src="/assets/plus icon.svg" alt="" />
                    Add Payment Method
                    </Button>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    }
