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
import { formSchemaHackerLogin } from "../lib/schemas";
import { Link, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../context/CurrentUser";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useCurrentCompany } from "../context/CurrentCompany";
export default function RegisterCompanyPage() {
  const { currentUser } = useCurrentUser();
  const { currentCompany } = useCurrentCompany();

  const form = useForm<z.infer<typeof formSchemaHackerLogin>>({
    resolver: zodResolver(formSchemaHackerLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser?.activated) {
      navigate("/");
    }
  }, [currentUser, navigate]);
  useEffect(() => {
    if (currentCompany?.id) {
      navigate("/");
    }
  }, [currentCompany, navigate]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchemaHackerLogin>) {
    try {
      const apiUrl = import.meta.env.VITE_APP_BASE_URL;
      const response = await fetch(
        `${apiUrl}/api/companies/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }), // Assuming you want to send the form values as JSON in the request body
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        console.error("Error registering hacker:", response.statusText);
        return;
      }

      // If the response is successful, you can do something with the result
      const result = await response.json();
      console.log("Registration successful:", result);

      toast.success(result.meta.message);
      setTimeout(() => {
        navigate("/company/dashboard");
      }, 1000);
      // Assuming result.body is an object, you can destructure the properties
      const { access_token, companyId } = result.data;
      // Check if access_token and companyId are available
      if (!access_token || !companyId) {
        toast.error("Invalid response from server. Please try again.");
        return;
      }
      localStorage.setItem(
        "company",
        JSON.stringify({
          id: companyId,
          accessToken: access_token,
        })
      );


      navigate("/company/dashboard");
    } catch (error) {
      console.error("An error occurred:", error);
    }
    console.log(values);
  }
  return (
    <div className=" flex  flex-col justify-between xl:pb-40 pb-4 sm:py-28  text-[white] lg:flex-row items-center bg-[url(/assets/images/bg-2.png)]  bg-center bg-cover	bg-no-repeat dark:bg-inherit sm:px-16  py-20 px-8 ">
      <div className="lg:w-[60%] w-auto  ">
        <div className="">
          <h2 className="font-[700] sm:text-[45px] text-[28px] mb-2">
            Join as Company
          </h2>
          <p className="font-[400] sm:text-[20px] mb-8  text-[18px]">
            Check out a demo to see how strategic penetration testing helps you
            find weak spots, understand your system better, and tighten security
            for organizations.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 sm:w-[450px] m-auto lg:m-0 w-[317px]
              "
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Email"
                        {...field}
                        className="bg-linear-contact rounded-xl h-[60px] 
                        autocomplete-none
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                        className="bg-linear-contact rounded-xl  h-[60px] autocomplete-none
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
              <Button
                className="bg-[#FFDE31] hover:bg-[#FFDE31]
            text-black mt-4 rounded-xl hover:scale-105 transition-all duration-300  font-[700] w-full h-[60px]"
                type="submit"
              >
                Sign In
              </Button>
              <Link to={"/signupascompany"}>
                <p className="text-[#ffffff] text-[16px] font-[500] text-center cursor-pointer mt-3">
                  Create a Turingsec Account
                </p>
              </Link>
            </form>
          </Form>
        </div>
      </div>
      <div className="lg:w-[100%] mt-8 w-auto pb-12 pt-2">
        <img
          src="/assets/images/seclogo.png"
          alt=""
          className="m-auto w-[300px]"
        />
      </div>
    </div>
  );
}


