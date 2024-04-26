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
export default function RegisterHackerPage() {
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
      const response = await fetch(
        "https://turingsec-production-de02.up.railway.app/api/auth/login",
        {
          method: "POST", // Fixed syntax: method should be a string
          headers: {
            "Content-Type": "application/json",
          },
          // mode: "no-cors",
          body: JSON.stringify({
            usernameOrEmail: values.email,
            password: values.password,
          }), // Assuming you want to send the form values as JSON in the request body
        }
      );

      if (!response.ok) {
        // Handle error response, e.g., show an error message to the user
        toast.error("Something bad");
        console.error("Error registering hacker:", response.statusText);
        return;
      }

      // If the response is successful, you can do something with the result
      const result = await response.json();
      console.log("Registration successful:", result);

      toast.success("You succesfully logged in as a hacker!");
      setTimeout(() => {
        window.location.href = "/work/dashboard";
      }, 1000);
      // Assuming result.body is an object, you can destructure the properties
      const { userId, access_token } = result;

      localStorage.setItem(
        "user",
        JSON.stringify({
          id: userId as string,
          accessToken: access_token as string,
        })
      );

      // navigate("/work/dashboard");
    } catch (error) {
      toast.error("Something bad");
      // Handle any general error that occurred during the fetch or processing
      console.error("An error occurred:", error);
    }
    // The rest of your code
    console.log(values);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <div className=" flex  flex-col justify-between xl:pb-40 pb-4 sm:py-28  text-[white] lg:flex-row items-center bg-[#061723] dark:bg-inherit sm:px-16 mt-[52px] py-20 px-8 ">
      <div className="lg:w-[60%] w-auto  ">
        <div className="">
          <h2 className="font-[700] sm:text-[45px] text-[28px] mb-2">
            Join as Hacker
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
                        className="bg-[#023059] rounded-xl h-[60px] 
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
                        className="bg-[#023059] rounded-xl  h-[60px] autocomplete-none
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
              <Link to={"/signupashacker"}>
                <p className="text-[#92CCFF] text-[16px] font-[500] text-center cursor-pointer mt-3">
                  Create a Turingsec Account
                </p>
              </Link>
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
