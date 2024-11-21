import InputCompany from "../../components/component/Company/InputCompany";
// import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchemaProfileUpdate } from "../../lib/schemas";
import { useNavigate } from "react-router-dom";
import { Label } from "../../components/ui/label";
import { useState,useEffect} from "react";
import { Button } from "../../components/ui/button";
import axios from "axios";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../../components/ui/form";

export default function AddCard() {
    const [countriess, setCountriess] = useState([]);
    const [loading, setLoading] = useState(true);

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


    const navigate = useNavigate();
    const [firstPart, setFirstPart] = useState(true)
    const form = useForm<z.infer<typeof formSchemaProfileUpdate>>({
        resolver: zodResolver(formSchemaProfileUpdate),
        defaultValues: {
            firstname: "",
            lastname: "",
            country: "",
            city: "",

        },
    });
    //Countries
    // const countries = [
    //     { value: "us", label: "United States" },
    //     { value: "uk", label: "United Kingdom" },
    //     { value: "az", label: "Azerbaijan" },
    //     { value: "ru", label: "Russian" },
    //     { value: "tr", label: "Turkiye" },
    // ];

    const cities = [
        { value: "us", label: "Miami" },
        { value: "uk", label: "London" },
        { value: "az", label: "Baku" },
        { value: "ru", label: "Nizhny Novgorod" },
        { value: "tr", label: "Ankara" },
    ];

    //Date
    const [day, setDay] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [error, setError] = useState("");

    // Generate options for Day, Month, and Year
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const years = Array.from({ length: 75 }, (_, i) => new Date().getFullYear() - i);

    // Validate the date when all fields are selected
    const validateDate = () => {
        if (!day || !month || !year) {
            setError("Please select a valid date.");
            return false;
        }

        const selectedDate = new Date(year, month - 1, day);
        if (
            selectedDate.getDate() !== parseInt(day) ||
            selectedDate.getMonth() + 1 !== parseInt(month) ||
            selectedDate.getFullYear() !== parseInt(year)
        ) {
            setError("Invalid date. Please select a valid combination.");
            return false;
        }

        setError("");
        return true;
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
                {firstPart ? (


                    <div className="mt-4">
                        <h2 className="sm:text-[23px] text-[16px] font-[600] mb-8 ">
                            PAYMENT INFORMATION
                        </h2>
                        <div className="main">
                            <Form {...form}>
                                <form
                                    //onSubmit={form.handleSubmit(onSubmit)}
                                    className="space-y-4 sm:space-y-8">
                                    <div className="flex sm:items-center gap-4 sm:flex-row">
                                        <div className="">
                                            <Label className="sm:text-[18px] text-[14px] font-[600] md:min-w-[130px] sm:min-w-[100px] ">
                                                First Name
                                            </Label>
                                            <FormField
                                                //control={form.control}
                                                name="firstname"

                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <input
                                                                type="text"

                                                                {...field}
                                                                //defaultValue={userDate?.first_name || ''}
                                                                className="bg-[rgba(254,60,183,0.2)] border-[3px] border-solid border-[rgba(255,255,255,0.13)] text-white rounded-[25px] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-1 placeholder:text-white p-[10px] h-[50px] mt-[20px] xl:min-w-[250px]"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                        </div>
                                        <div className="">
                                            <Label className="sm:text-[18px] text-[14px] font-[600] md:min-w-[130px] sm:min-w-[100px] ">
                                                Last Name
                                            </Label>
                                            <FormField
                                                //control={form.control}
                                                name="lastname"

                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <input
                                                                type="text"

                                                                {...field}
                                                                //defaultValue={userDate?.first_name || ''}
                                                                className="bg-[rgba(254,60,183,0.2)] border-[3px] border-solid border-[rgba(255,255,255,0.13)] text-white rounded-[25px] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-1 placeholder:text-white p-[10px] h-[50px] mt-[20px] xl:min-w-[250px]"
                                                            />

                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                        </div>
                                    </div>

                                    <div className="flex sm:items-center gap-4 sm:flex-row">
                                        <div className="">
                                            <Label className="sm:text-[18px] text-[14px] font-[600] md:min-w-[130px] sm:min-w-[100px] ">Country
                                            </Label>
                                            {/* <ul>
                                                {countriess.map((country) => (
                                                    <li key={country?.cca3}>
                                                        {country?.name?.common} - {country?.region}
                                                    </li>
                                                ))}
                                            </ul> */}
                                            <FormField
                                                //control={form.control}
                                                name="country"

                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <select className="bg-[rgba(254,60,183,0.2)] border-[3px] border-solid border-[rgba(255,255,255,0.13)] text-white rounded-[25px] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-1 placeholder:text-white p-[10px] h-[50px] mt-[20px] xl:min-w-[250px]">
                                                                <option value="" disabled selected></option>
                                                                {countriess.map((country) => (
                                                                    <option key={country?.cca3} className="text-black" value={country.cca3}>
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
                                            <Label className="sm:text-[18px] text-[14px] font-[600] md:min-w-[130px] sm:min-w-[100px] ">City</Label>
                                            <FormField
                                                //control={form.control}
                                                name="city"

                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <select className="bg-[rgba(254,60,183,0.2)] border-[3px] border-solid border-[rgba(255,255,255,0.13)] text-white rounded-[25px] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-1 placeholder:text-white p-[10px] h-[50px] mt-[20px] xl:min-w-[250px]">
                                                                <option value="" disabled selected></option>
                                                                {cities.map((city) => (
                                                                    <option key={city.value} className="text-black" value={city.value}>
                                                                        {city.label}
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
                                            <Label className="sm:text-[18px] text-[14px] font-[600] md:min-w-[130px] sm:min-w-[100px] ">Address
                                            </Label>
                                            <FormField
                                                //control={form.control}
                                                name="address"

                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <input
                                                                type="text"

                                                                {...field}
                                                                //defaultValue={userDate?.first_name || ''}
                                                                className="bg-[rgba(254,60,183,0.2)] border-[3px] border-solid border-[rgba(255,255,255,0.13)] text-white rounded-[25px] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-1 placeholder:text-white p-[10px] h-[50px] mt-[20px] xl:min-w-[250px]"
                                                            />

                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                        </div>
                                    </div>


                                    <div className="flex gap-4">
                                        {/* Day Dropdown */}
                                        <select
                                            value={day}
                                            onChange={(e) => setDay(e.target.value)}
                                            className="bg-[rgba(254,60,183,0.2)] border-[3px] border-solid border-[rgba(255,255,255,0.13)] text-white rounded-[25px] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-1 placeholder:text-white py-3 h-[50px] px-4"
                                        >
                                            <option value="" disabled>
                                                Day
                                            </option>
                                            {days.map((day) => (
                                                <option key={day} value={day}>
                                                    {day}
                                                </option>
                                            ))}
                                        </select>

                                        {/* Month Dropdown */}
                                        <select
                                            value={month}
                                            onChange={(e) => setMonth(e.target.value)}
                                            className="bg-[rgba(254,60,183,0.2)] border-[3px] border-solid border-[rgba(255,255,255,0.13)] text-white rounded-[25px] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-1 placeholder:text-white py-3 h-[50px] px-4"
                                        >
                                            <option value="" disabled>
                                                Month
                                            </option>
                                            {months.map((month, index) => (
                                                <option key={index} value={index + 1}>
                                                    {month}
                                                </option>
                                            ))}
                                        </select>

                                        {/* Year Dropdown */}
                                        <select
                                            value={year}
                                            onChange={(e) => setYear(e.target.value)}
                                            className="bg-[rgba(254,60,183,0.2)] border-[3px] border-solid border-[rgba(255,255,255,0.13)] text-white rounded-[25px] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-1 placeholder:text-white py-3 h-[50px] px-4"
                                        >
                                            <option value="" disabled>
                                                Year
                                            </option>
                                            {years.map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Error Message */}
                                    {error && <p className="text-black-500 mt-2 text-sm">{error}</p>}



                                     
                                </form>
                            </Form>
                            <div className="w-[600] flex  justify-center content-center">

                                <Button className="hover:scale-105 transition-all duration-300 rounded-3xl  py-[7px]  bg-transparent text-white  border-2 border-[rgba(255,234,0,0.3)]  font-[600] hover:bg-[rgba(255,234,0,0.3)] flex gap-4 px-4 w-[160px]" onClick={() => navigate("/work/payment") }>BACK
                                </Button>
                                <Button className="hover:scale-105 transition-all duration-300 rounded-3xl  py-[7px]  bg-transparent text-white  border-2 border-[rgba(255, 255, 255, 0.1) 50%)] bg-[rgba(255,234,0,0.3)] font-[600] hover:bg-transparent flex gap-4 px-4 w-[160px] ml-[10px]" onClick={() => setFirstPart(false)}>NEXT
                                </Button>
                            </div>
                        </div>
                    </div>




                ) : (
                    <div>
                        <h1>SECOND</h1>
                            <div className="sm:space-x-8 flex items-center mt-16 justify-end  flex-col sm:flex-row gap-4 sm:gap-0">
                                <Button className="hover:scale-105 transition-all duration-300 rounded-3xl  py-[7px]  bg-transparent text-white  border-2 border-[rgba(255,234,0,0.3)]  font-[600] hover:bg-[rgba(255,234,0,0.3)] flex gap-4 px-4 w-[160px]" onClick={() => setFirstPart(true)}>BACK
                                </Button>
                                <Button className="hover:scale-105 transition-all duration-300 rounded-3xl  py-[7px]  bg-transparent text-white  border-2 border-[rgba(255, 255, 255, 0.1) 50%)] bg-[rgba(255,234,0,0.3)] font-[600] hover:bg-transparent flex gap-4 px-4 w-[160px] ml-[10px]">
                                    Add
                                </Button>
                            </div>
                    </div>
                )}

                 

            </div>
        </div>
    );
}
