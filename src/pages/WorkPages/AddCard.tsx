import InputCompany from "../../components/component/Company/InputCompany";
// import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { formSchemaProfileUpdate } from "../../lib/schemas";
import Select from "react-select";
import { Label } from "../../components/ui/label";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "../../components/ui/form";

export default function AddCard() {
    const [firstPart, setFirstPart] = useState(true)
    const form = useForm<z.infer<typeof formSchemaProfileUpdate>>({
        resolver: zodResolver(formSchemaProfileUpdate),
        defaultValues: {
            firstname: "",
            lastname: "",
            website: "",
            bio: "",
            username: "",
            city: "",

        },
    });

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
                                                                className="bg-[rgba(254,60,183,0.2)] border-[3px] border-solid border-[rgba(255,255,255,0.13)] text-white rounded-[25px] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-1 placeholder:text-white py-6 h-[50px] mt-[20px] xl:min-w-[250px]"
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
                                                name="firstname"

                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <input
                                                                type="text"

                                                                {...field}
                                                                //defaultValue={userDate?.first_name || ''}
                                                                className="bg-[rgba(254,60,183,0.2)] border-[3px] border-solid border-[rgba(255,255,255,0.13)] text-white rounded-[25px] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-1 placeholder:text-white py-6 h-[50px] mt-[20px] xl:min-w-[250px]"
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
                                            <FormField
                                                //control={form.control}
                                                name="country"

                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormControl>
                                                            <input
                                                                type="text"

                                                                {...field}
                                                                //defaultValue={userDate?.first_name || ''}
                                                                className="bg-[rgba(254,60,183,0.2)] border-[3px] border-solid border-[rgba(255,255,255,0.13)] text-white rounded-[25px] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-1 placeholder:text-white py-6 h-[50px] mt-[20px] xl:min-w-[250px]"
                                                            />
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
                                                            <input
                                                                type="text"

                                                                {...field}
                                                                //defaultValue={userDate?.first_name || ''}
                                                                className="bg-[rgba(254,60,183,0.2)] border-[3px] border-solid border-[rgba(255,255,255,0.13)] text-white rounded-[25px] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-1 placeholder:text-white py-6 h-[50px] mt-[20px] xl:min-w-[250px]"
                                                            />

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
                                                                className="bg-[rgba(254,60,183,0.2)] border-[3px] border-solid border-[rgba(255,255,255,0.13)] text-white rounded-[25px] focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-1 placeholder:text-white py-6 h-[50px] mt-[20px] xl:min-w-[250px]"
                                                            />

                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                        </div>
                                    </div>






                                    <div className="sm:space-x-8 flex items-center mt-16 justify-end  flex-col sm:flex-row gap-4 sm:gap-0">
                                        <Button className="hover:scale-110 transition-all duration-300 rounded-xl h-[45px] text-black sm:h-[50px] w-full sm:w-[220px] bg-[#FFDE31]  sm:text-[18px] font-[600] text-[16px]   hover:bg-[#FFDE31]">
                                            Add
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>




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
