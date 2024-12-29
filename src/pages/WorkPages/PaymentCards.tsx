    import { useEffect, useState } from "react";
    import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    } from "../../components/ui/form";
    import { Label } from "../../components/ui/label";
    import axios from "axios";
    import { useForm } from "react-hook-form";
    import { Button } from "../../components/ui/button";
    import { useNavigate } from "react-router-dom";

    export default function PaymentCards() {
    const [countriess, setCountriess] = useState([]);
    const [loading, setLoading] = useState(true);
    const form = useForm(); // Initialize the form instance
    const navigate = useNavigate();
    const [firstPart, setFirstPart] = useState(true);

    useEffect(() => {
        // Fetch countries using REST Countries API
        axios
        .get("https://restcountries.com/v3.1/all")
        .then((response) => {
            // Sort countries alphabetically by name.common
            const sortedCountries = response.data.sort((a, b) =>
            a.name.common.localeCompare(b.name.common)
            );
            setCountriess(sortedCountries);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching countries:", error);
            setLoading(false);
        });
    }, []);

    const cards = [
        {
        balance: "$5,750.20",
        number: "5282 3456 7890 1289",
        expiry: "09/25",
        bgColor: "bg-purple-500",
        },
        {
        balance: "$2,150.75",
        number: "1234 5678 9012 3456",
        expiry: "01/27",
        bgColor: "bg-blue-500",
        },
        {
        balance: "$10,320.50",
        number: "9876 5432 1098 7654",
        expiry: "12/30",
        bgColor: "bg-green-500",
        },
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="text-white flex-1 flex flex-col overflow-hidden  ">
            <section className="font-[800] bg-[#0C0C0C] h-[124px] flex items-center justify-between overflow-hidden px-16">
                <p className="md:text-[40px] text-[30px] text-[#FFFFFEEE] font-medium">My Cards</p>
                <div className="flex gap-8 items-center">
                <select
                    name=""
                    id=""
                    className="text-[22px] font-bold block appearance-none bg-transparent border-none py-2 px-3 rounded leading-tight focus:outline-none focus:border-blue-500  focus-visible:ring-0 focus-visible:ring-offset-1 placeholder:text-white cursor-pointer "
                >
                    <option value="">En</option>
                    <option value="">Ru</option>
                    <option value="">Tr</option>
                </select>
                <div className="flex gap-6 items-center">
                    <Button className="rounded-[50%] py-7 cursor-pointer bg-[#A0A0A026]">
                    <img src="/assets/notif icon.svg" alt="" />
                    </Button>
                    <Button className="rounded-[50%] py-7 cursor-pointer bg-[#A0A0A026]">
                    <img src="/assets/chat icon.svg" alt="" />
                    </Button>
                    <div className="h-12 w-[1px] bg-[#878787FE]"></div>
                    <Button className="rounded-[50%] py-7 cursor-pointer bg-[#A0A0A026]">
                    <img src="/assets/Style7.svg" alt="" />
                    </Button>
                </div>
                <span className="md:text-[20px] text-[16px] text-[#FFFFFEEE] cursor-pointer">
                    Daniel
                </span>
                </div>
            </section>
        <div className="bg-[#0C0C0C] flex-1 flex-col lg:px-20 sm:px-8 px-3 py-16 ">
            <div className="flex flex-col w-[540px] items-end">
                <div className="flex gap-16 relative">
                <Button className="bg-[#B181E7CC] py-[120px] rounded-[28px]">
                    <img src="/assets/plus icon.svg" alt="" />
                </Button>
                <div className="flex justify-center items-center">
                    <div className="relative w-96 h-56">
                    {/* Cards */}
                    {cards.map((card, index) => (
                        <div
                        key={index}
                        className={`absolute w-96 h-56 ${
                            card.bgColor
                        } text-white rounded-xl shadow-lg transition-transform duration-500 ease-in-out ${
                            index === activeIndex
                            ? "transform translate-x-0 rotate-0 z-10"
                            : index < activeIndex
                            ? "transform -translate-x-15 -rotate-6 z-0"
                            : "transform translate-x-15 -rotate-6 z-0"
                        }`}
                        style={{
                            opacity: index === activeIndex ? 1 : 0.8,
                        }}
                        >
                        <div className="p-6 flex flex-col h-full justify-between">
                            {/* Card Info */}
                            <div>
                            <span className="text-sm opacity-70">
                                Current Balance
                            </span>
                            <h2 className="text-2xl font-bold mt-1">
                                {card.balance}
                            </h2>
                            </div>

                            {/* Card Details */}
                            <div className="flex justify-between items-center">
                            <div>
                                <span className="block text-lg tracking-widest">
                                {card.number}
                                </span>
                                <span className="block text-sm mt-2 opacity-70">
                                {card.expiry}
                                </span>
                            </div>
                            {/* Mastercard Logo */}
                            <div className="flex items-center space-x-2">
                                <img src="/assets/mastercard_logo.svg" alt="" />
                            </div>
                            </div>
                        </div>
                        </div>
                    ))}
                    </div>
                        {/* <div className="absolute bottom-[1%] left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
                        {cards.map((_, index) => (
                        <button
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                            activeIndex === index ? "bg-gray-200" : "bg-gray-400"
                            }`}
                            onClick={() => setActiveIndex(index)}
                        ></button>
                        ))}
                    </div> */}
                </div>
                </div>

                <div className="flex gap-16 py-16">
                    <div className="flex gap-5 items-center">
                        <div className="bg-[#222222] w-[75px] py-5 rounded-[26px] flex items-center flex-col gap-1">
                            <img src="/assets/left down icon.svg" alt="" />
                            <span className="text-[#B181E7] md:text-[14px] text-[14px] font-medium ">Receive</span>
                        </div>
                        <span className="text-white md:text-[24px] text-[24px] font-medium">$6,640</span>
                    </div>
                    <div className="flex gap-5 items-center">
                        <div className="bg-[#222222] w-[75px] py-5 rounded-[26px] flex items-center flex-col gap-1">
                            <img src="/assets/right up icon.svg" alt="" />
                            <span className="text-[#B181E7] md:text-[14px] text-[14px] font-medium ">Send</span>
                        </div>
                        <span className="text-white md:text-[24px] text-[24px] font-medium">$4,640</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <span className="md:text-[36px] text-26px text-[#FFFFFEEE]">Transfer</span>
                <div className="ml-[50px] flex gap-14">
                    <div className="flex gap-8">
                        <div className="flex flex-col items-center relative py-10">
                            <div className="bg-[#222222] px-12 pt-10 py-8 rounded-[26px] flex items-center flex-col gap-3">
                                <img className="absolute top-[14px]" src="/assets/transfer user icon.svg" alt="" />
                                <div className="flex flex-col gap-2 pt-3 items-center">
                                    <span className="md:text-[16px] text-16px text-[#AEAEAE] font-medium">Tom Hardy</span>
                                    <span className="md:text-[18px] text-18px text-[#FFFFFEFE] font-medium">$50,60</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex gap-8">
                        <div className="flex flex-col items-center relative py-10">
                            <div className="bg-[#222222] px-12 pt-10 py-8 rounded-[26px] flex items-center flex-col gap-3">
                                <img className="absolute top-[14px]" src="/assets/transfer user icon.svg" alt="" />
                                <div className="flex flex-col gap-2 pt-3 items-center">
                                    <span className="md:text-[16px] text-16px text-[#AEAEAE] font-medium">Tom Hardy</span>
                                    <span className="md:text-[18px] text-18px text-[#FFFFFEFE] font-medium">$50,60</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-8">
                        <div className="flex flex-col items-center relative py-10">
                            <div className="bg-[#222222] px-12 pt-10 py-8 rounded-[26px] flex items-center flex-col gap-3">
                                <img className="absolute top-[14px]" src="/assets/transfer user icon.svg" alt="" />
                                <div className="flex flex-col gap-2 pt-3 items-center">
                                    <span className="md:text-[16px] text-16px text-[#AEAEAE] font-medium">Tom Hardy</span>
                                    <span className="md:text-[18px] text-18px text-[#FFFFFEFE] font-medium">$50,60</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
    }
