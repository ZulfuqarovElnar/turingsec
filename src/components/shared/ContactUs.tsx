import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Select from "react-select";

// import ReactCountryFlag from "react-country-flag";
import { Toaster, toast } from "react-hot-toast";
import countryList from "react-select-country-list";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";

import { contactUsSchema } from "../../lib/schemas";
import { useMemo } from "react";

import { Button } from "../ui/button";
import InputCompany from "../component/Company/InputCompany";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import ContactUsInput from "../component/ContactUsInput";
export default function ContactUs() {
  const breakpoints = [1040, 1224];

  const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

  const form = useForm<z.infer<typeof contactUsSchema>>({
    resolver: zodResolver(contactUsSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      companyname: "",
      businessemail: "",
      jobtitle: "",
      country: {
        value: "",
        label: "Country",
      },
      write: "",
    },
  });
  const options = useMemo(() => countryList().getData(), []);
  function onSubmit(data: z.infer<typeof contactUsSchema>) {
    console.log(data);
  }

  return (
    <div className="text-white bg-[#1F44CC]  py-12 relative">
      <img
        src="/assets/images/contactusicon1.png"
        alt=""
        className="absolute right-0 top-0 w-[11%]"
      />
      <img
        src="/assets/images/contactusicon2.png"
        alt=""
        className="absolute left-0 bottom-0 w-[11%]"
      />
      <div className="flex items-center flex-col text-center">
        <h2 className="sm:text-[40px] text-[25px] font-[700]">
          Speak with a Security Expert
        </h2>
        <p className="sm:text-[20px] text-[16px] px-24">
          We can help you detect and resolve vulnerabilities before they are
          exploited
        </p>
      </div>
      <div className="px-[15%] mt-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="
            grid sm:grid-cols-2 grid-cols-1 gap-y-4 gap-x-8
              "
          >
            <FormField
              control={form.control}
              name="firstname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ContactUsInput
                      type="text"
                      placeholder="First Name"
                      {...field}
                      className=""
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ContactUsInput
                      type="text"
                      placeholder="Last Name"
                      {...field}
                      className=""
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyname"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ContactUsInput
                      type="text"
                      placeholder="Company Name"
                      {...field}
                      className=""
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessemail"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ContactUsInput
                      type="text"
                      placeholder="Business email"
                      {...field}
                      className=""
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="jobtitle"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <ContactUsInput
                      type="text"
                      placeholder="Job Title"
                      {...field}
                      className=""
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      {...field}
                      options={options}
                      styles={{
                        control: (styles) => ({
                          ...styles,
                          background: "#061723",
                          borderRadius: "0.5rem",
                          width: "100%",
                          borderWidth: "0",

                          autocomplete: "none",
                          outline: "none",
                          paddingLeft: "8px",

                          border: "1",
                          color: "white",
                        }),
                        option: (styles) => ({
                          ...styles,
                          background: "#023059",
                          padding: "10px 20px",
                          scrollbarColor: "red",

                          ":hover": {
                            background: "rgb(100 116 139)",
                          },
                        }),
                        menuList: (styles) => ({
                          ...styles,
                          padding: "0px",

                          "::-webkit-scrollbar": {
                            width: "0px",
                            height: "0px",
                          },
                        }),
                        input: (styles) => ({
                          ...styles,
                          color: "white",
                          // background: "red",
                          // padding: "0 10px",
                          height: "38px",
                        }),
                        singleValue: (styles) => ({
                          ...styles,
                          fontSize: "14px",
                          color: "white",
                          padding: "10px",
                        }),
                        placeholder: (styles) => ({
                          ...styles,
                          color: "white",
                          padding: "10px",
                        }),
                      }}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="write"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormControl>
                    <Textarea
                      placeholder="Write"
                      {...field}
                      className="bg-[#061723] border-0 focus-visible:outline-none focus-visible:ring-0 
                      
                      focus-visible:ring-offset-1 placeholder:text-white col-span-2 sm:h-[217px] h-[180px]"
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="sm:space-x-8 flex items-center justify-center sm:col-span-2   flex-col sm:flex-row gap-4 sm:gap-0">
              <Button className="hover:scale-110 transition-all duration-300 rounded-xl h-[45px]  sm:h-[50px] w-full sm:w-[220px] bg-[#FFDE31] text-[#1F44CC]  sm:text-[18px] font-[600] text-[16px]   hover:bg-[#FFDE31]">
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
