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


    export default function PaymentTransfer() {

    const [countriess, setCountriess] = useState([]);
    const [loading, setLoading] = useState(true);
    const form = useForm(); // Initialize the form instance
    const navigate = useNavigate();
    const [firstPart, setFirstPart] = useState(true)

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

    return (
        <div className="text-white flex-1 flex flex-col overflow-hidden relative ">
        <section className="font-[800] bg-[#200F23] h-[124px] flex items-center justify-center overflow-hidden">
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
        <div className="bg-[url(/assets/images/bg-hacktivity.png)] bg-center bg-no-repeat bg-cover flex-1 lg:px-20 sm:px-8 px-3 py-16 ">
            <div className="flex flex-col items-center ">
            <Form {...form}>
                <div className="flex sm:items-start gap-8 xss:flex-col pt-8">
                <div className="flex items-center w-full justify-center gap-4 bg-[#FE3CB733] px-5 py-8 rounded-[25px] border-[3px] border-solid border-[rgba(255,255,255,0.13)]  xl:m-w-[500px] ">
                    <img src="/assets/bank icon.svg" alt="" />
                    <h2 className="text-[25px] font-semibold xss:text-[20px] md:text-[25px] ">Bank Transfer</h2>
                </div>
                <div className="">
                    <Label className="sm:text-[20px] text-[22px] font-[600] md:min-w-[130px] sm:min-w-[100px]">
                    Bank Account Country
                    </Label>
                    <FormField
                    control={form.control} // Pass the control from useForm
                    name="accountcountry"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <select
                            {...field}
                            className="bg-[rgba(254,60,183,0.2)] w-full border-[3px] border-solid border-[rgba(255,255,255,0.13)] text-white rounded-[25px] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-1 placeholder:text-white p-[10px] h-[50px] mt-[20px] xl:min-w-[500px]"
                            >
                            <option value="" disabled selected></option>
                            {countriess.map((country) => (
                                <option
                                key={country?.cca3}
                                className="text-black"
                                value={country.cca3}
                                >
                                {country?.name?.common}
                                </option>
                            ))}
                            </select>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                <h2 className="sm:text-[20px] text-[22px] font-[600] md:min-w-[130px] sm:min-w-[100px]">Bank Account Currency</h2>
                <h2 className="sm:text-[20px] text-[22px] font-[600] md:min-w-[130px] sm:min-w-[100px]">US Dollar (USD)</h2>

                <div className="">  
                    <Label className="sm:text-[20px] text-[22px] font-[600] md:min-w-[130px] sm:min-w-[100px] flex items-center gap-2">
                    IBAN <img src="/assets/questionicon.svg" alt="" />
                    </Label>
                    <FormField
                    control={form.control} // Pass the control from useForm
                    name="iban"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <select
                            {...field}
                            className="bg-[rgba(254,60,183,0.2)] w-full border-[3px] border-solid border-[rgba(255,255,255,0.13)] text-white rounded-[25px] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-1 placeholder:text-white p-[10px] h-[50px] mt-[20px] xl:min-w-[500px]"
                            >
                            <option value="" disabled selected></option>
                            {countriess.map((country) => (
                                <option
                                key={country?.cca3}
                                className="text-black"
                                value={country.cca3}
                                >
                                {country?.name?.common}
                                </option>
                            ))}
                            </select>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                <div className="">
                    <Label className="sm:text-[20px] text-[22px] font-[600] md:min-w-[130px] sm:min-w-[100px]">
                    Name of Account Holder
                    </Label>
                    <FormField
                    control={form.control} // Pass the control from useForm
                    name="accountname"
                    render={({ field }) => (
                        <FormItem>
                        <FormControl>
                            <select
                            {...field}
                            className="bg-[rgba(254,60,183,0.2)] w-full border-[3px] border-solid border-[rgba(255,255,255,0.13)] text-white rounded-[25px] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-1 placeholder:text-white p-[10px] h-[50px] mt-[20px] xl:min-w-[500px]"
                            >
                            <option value="" disabled selected></option>
                            {countriess.map((country) => (
                                <option
                                key={country?.cca3}
                                className="text-black"
                                value={country.cca3}
                                >
                                {country?.name?.common}
                                </option>
                            ))}
                            </select>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>
                </div>
            </Form>
            <div className="w-full flex items-center justify-center content-center pt-[60px] gap-4">
                <Button
                className="hover:scale-105 transition-all duration-300 rounded-3xl  py-[7px]  bg-transparent text-white  border-2 border-[rgba(255,234,0,0.3)]  font-[600] hover:bg-[rgba(255,234,0,0.3)] flex gap-4 px-4 w-[260px]"
                onClick={() => navigate("/work/payment/addcard")}
                >
                BACK
                </Button>
                <Button
                className="hover:scale-105 transition-all duration-300 rounded-3xl  py-[7px]  bg-transparent text-white  border-2 border-[rgba(255, 255, 255, 0.1) 50%)] bg-[rgba(255,234,0,0.3)] font-[600] hover:bg-transparent flex gap-4 px-4 w-[260px]"
                onClick={() => navigate("/work/payment/paymentcards")}
                >
                ADD
                </Button>
            </div>
            </div>
        </div>
        </div>
    );
    }
