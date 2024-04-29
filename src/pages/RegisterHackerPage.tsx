import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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

type LoginFormValues = {
  email: string;
  password: string;
};


export default function RegisterHackerPage() {
  const { currentUser } = useCurrentUser();
  const { currentCompany } = useCurrentCompany();
  const form = useForm<LoginFormValues>({
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

  async function onSubmit(values: LoginFormValues) {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usernameOrEmail: values.email,
          password: values.password,
          accessToken: currentUser?.accessToken,
          hackerId: currentUser?.hackerId,
        }),
      });
  
      if (!response.ok) {
        toast.error("Invalid username or password");
        console.error("Error logging in:", response.statusText);
        return;
      }
  
      const result = await response.json();
      console.log("Login successful:", result);
  
      toast.success("You successfully logged in as a hacker!");
  
      // Save user data to local storage
      const { userId, access_token } = result;
      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: userId,
          accessToken: access_token,
        })
      );
  
      setTimeout(() => {
        navigate("/work/dashboard");
      }, 1000);
    } catch (error) {
      toast.error("Something bad");
      console.error("An error occurred:", error);
    }
  }
  
  return (
    <div className="flex flex-col justify-between xl:pb-40 pb-4 sm:py-28 text-white lg:flex-row items-center bg-[#061723] dark:bg-inherit sm:px-16 mt-[52px] py-20 px-8">
      <div className="lg:w-[60%] w-auto">
        <div className="">
          <h2 className="font-[700] sm:text-[45px] text-[28px] mb-2">
            Join as Hacker
          </h2>
          <p className="font-[400] sm:text-[20px] mb-8 text-[18px]">
            Check out a demo to see how strategic penetration testing helps you
            find weak spots, understand your system better, and tighten security
            for organizations.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 sm:w-[450px] m-auto lg:m-0 w-[317px]"
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
                        className="bg-[#023059] rounded-xl h-[60px] autocomplete-none outline-none border-none placeholder:text-white pl-8 focus-visible:ring-0 focus-visible:ring-offset-1"
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
                        className="bg-[#023059] rounded-xl h-[60px] autocomplete-none outline-none pl-8 border-none placeholder:text-white focus-visible:ring-0 focus-visible:ring-offset-1"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="bg-[#FFDE31] hover:bg-[#FFDE31] text-black mt-4 rounded-xl hover:scale-105 transition-all duration-300 font-[700] w-full h-[60px]"
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
