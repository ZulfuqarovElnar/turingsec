import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { formSchemaCompanyRegister } from "../lib/schemas";
import { Textarea } from "../components/ui/textarea";
import Select from "react-select";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useCurrentUser } from "../context/CurrentUser";
import { useCurrentCompany } from "../context/CurrentCompany";
import { useEffect } from "react";
export default function SignupCompanyPage() {
  const { currentUser } = useCurrentUser();
  const { currentCompany } = useCurrentCompany();
  const navigate = useNavigate();
  const options = [
    {
      value: "Check",
      label: "Check",
    },
    {
      value: "Hello",
      label: "Hello",
    },
    {
      value: "One",
      label: "One",
    },
  ];
  const form = useForm<z.infer<typeof formSchemaCompanyRegister>>({
    resolver: zodResolver(formSchemaCompanyRegister),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      companyName: "",
      jobtitle: "",
      message: "",
      assets: {
        value: "",
        label: "Select Assets",
      },
    },
  });
  useEffect(() => {
    if (currentUser?.activated) {
      navigate("/");
    }
  }, [currentUser, navigate]);
  useEffect(() => {
    if (currentCompany?.activated) {
      navigate("/");
    }
  }, [currentCompany, navigate]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchemaCompanyRegister>) {
    console.log({
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      company_name: values.companyName,
      job_title: values.jobtitle,
      assets: values.assets.value,
      message: values.message,
      approved: false,
    });
    try {
      const res = await fetch(
        "https://turingsec-production-de02.up.railway.app/api/companies/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: values.firstName,
            last_name: values.lastName,
            email: values.email,
            company_name: values.companyName,
            job_title: values.jobtitle,
            assets: values.assets.value,
            message: values.message,
            approved: false,
          }),
        }
      );
      if (!res.ok) {
        // Handle error response, e.g., show an error message to the user
        toast.error("Something bad");
        console.error("Error registering company:", res.statusText);
        return;
      }

      // If the response is successful, you can do something with the result

      const result = await res.json();
      console.log("Registration successful:", result);
      toast.success("You succesfully create account as a company!");
      navigate("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  }
  return (
    <div className=" flex  flex-col justify-between xl:pb-40 pb-4 sm:py-18  text-[white] lg:flex-row items-center bg-[#061723] dark:bg-inherit sm:px-16 mt-[52px] py-20 px-8 ">
      <div className="lg:w-[60%] w-auto  ">
        <div className="">
          <h2 className="font-[700] sm:text-[45px] text-[28px] mb-2">
            Join as Company
          </h2>
          <p className="font-[400] sm:text-[20px] mb-8  text-[18px]">
            See a personalized demo to learn how strategic penetration testing
            helps you take control of your vulnerabilities, spot security gaps,
            and boost your overall security.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 w-[100%] m-auto lg:m-0 sm:w-[450px]
            "
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="First Name"
                        {...field}
                        className="bg-[#023059] rounded-xl h-[60px] sm:w-[450px] w-[317px]
                      outline-none border-none 
                      placeholder:text-white
                    pl-8
                      focus-visible:ring-0
                      focus-visible:ring-offset-1
                    
                     "
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Last Name"
                        {...field}
                        className="bg-[#023059] rounded-xl  h-[60px] sm:w-[450px] w-[317px]
                      outline-none 
                      pl-8 border-none 
                      placeholder:text-white
                    
                      focus-visible:ring-0
                      focus-visible:ring-offset-1
                    
                     "
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Company Email Address"
                        {...field}
                        className="bg-[#023059] rounded-xl  h-[60px] sm:w-[450px] w-[317px]
                      outline-none border-none 
                      placeholder:text-white
                    pl-8
                      focus-visible:ring-0
                      focus-visible:ring-offset-1
                    
                     "
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Company Name"
                        {...field}
                        className="bg-[#023059] rounded-xl h-[60px] sm:w-[450px] w-[317px]
                      outline-none border-none 
                      placeholder:text-white
                    pl-8
                      focus-visible:ring-0
                      focus-visible:ring-offset-1
                    
                     "
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
                      <Input
                        placeholder="Job Title"
                        {...field}
                        className="bg-[#023059] rounded-xl  h-[60px] sm:w-[450px] w-[317px]
                      outline-none border-none 
                      placeholder:text-white
                    pl-8
                      focus-visible:ring-0
                      focus-visible:ring-offset-1
                    
                     "
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="assets"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        {...field}
                        placeholder="Select Country"
                        options={options}
                        styles={{
                          control: (styles) => ({
                            ...styles,
                            background: "#023059",
                            borderRadius: "0.5rem",
                            height: "60px",
                            autocomplete: "none",
                            outline: "none",
                            paddingLeft: "8px",
                            border: "none",
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
                            padding: "0 10px",
                          }),
                          singleValue: (styles) => ({
                            ...styles,
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
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Write your message..."
                        {...field}
                        className="bg-[#023059] h-[170px] xl:w-[630px] w-[100%]  pt-4  rounded-xl 
                      outline-none border-none 
                      placeholder:text-white
                    pl-8
                      focus-visible:ring-0
                      focus-visible:ring-offset-1
                    
                     "
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                className="bg-[#FFDE31] hover:bg-[#FFDE31]
            text-black  rounded-xl hover:scale-105  sm:w-[450px] w-[317px] transition-all duration-300  font-[700]  h-[60px]  "
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="lg:w-[100%] mt-8 w-auto pb-12 pt-2">
        <img
          src="/assets/images/seclog.png"
          alt=""
          className="m-auto w-[300px]"
        />
      </div>
    </div>
  );
}
