import InputCompany from "../../component/Company/InputCompany";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import { Label } from "../../ui/label";
import { useState } from "react";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


export default function TabContentEmail() {
  const [currentpasswordVisible, setCurrentPasswordVisible] = useState(false);

  const togglePasswordVisibility = (
    func: React.Dispatch<React.SetStateAction<boolean>>,
    item: boolean
  ) => {
    func(!item);
  };
  const formSchema = z.object({
    password: z.string().min(8, {
    message: "CurrentPassword must be at least 8 characters.",
    }),
    newEmail: z.string().email({
      message: "Invalid email",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      newEmail: "",
    },
  });
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      console.log(data)
      const ele = JSON.parse(localStorage.getItem("user") || "");
      const apiUrl = import.meta.env.VITE_APP_BASE_URL;
      const datt = {
        password: data.password,
        newEmail: data.newEmail,
      };
      const res = await fetch(
        `${apiUrl}/api/auth/change-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specify content type as JSON
            Authorization: `Bearer ${ele.accessToken}`, // Corrected header name
          },
          body: JSON.stringify(datt), // Convert data to JSON string
        }
      );
      console.log(res);
      const resJson = await res.json(); // Parsing the response JSON
      console.log(resJson)

      if (res.ok) {
        // Handle success
        toast.success("Email changed successfully!");
       
      } else {

        toast.error(`${resJson.message}`);
        // Handle error
        console.error("Failed to change email:", res.statusText);
      }
    } catch (err) {

      toast.error("Error while changing email:");
      console.error("Error while changing email:", err);
    }
  }
  return (
    <div className="mt-4">
      <h2 className="sm:text-[23px] text-[16px] font-[600] mb-2 ">Email</h2>
      <p className="sm:text-[18px] text-[12px] font-[500]">
        Want to change your email or password? You've come to the right place.
      </p>
      <div className="sm:mt-14 mt-8 sm:space-y-14 space-y-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-16">
            <div className="flex md:items-center gap-2 flex-col md:flex-row">
              <Label className="sm:text-[18px] text-[12px] font-[600] lg:min-w-[270px] md:min-w-[200px]">
                Current password
              </Label>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Label className="relative flex items-center border rounded-2xl">
                        <InputCompany
                          type={currentpasswordVisible ? "text" : "password"}
                          {...field}
                          placeholder=""
                          className="relative  focus-visible:ring-offset-0 border-none py-2 "
                        />
                        {currentpasswordVisible && (
                          <FaRegEye
                            className="w-[40px] mr-3 h-[20px] cursor-pointer"
                            onClick={() =>
                              togglePasswordVisibility(
                                setCurrentPasswordVisible,
                                currentpasswordVisible
                              )
                            }
                          />
                        )}
                        {!currentpasswordVisible && (
                          <FaRegEyeSlash
                            className="w-[40px] mr-3 h-[20px] cursor-pointer"
                            onClick={() =>
                              togglePasswordVisibility(
                                setCurrentPasswordVisible,
                                currentpasswordVisible
                              )
                            }
                          />
                        )}
                      </Label>
                    </FormControl>

                    <FormMessage className="absolute" />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex md:items-center gap-2 flex-col md:flex-row">
              <Label className="sm:text-[18px] text-[14px] font-[600] lg:min-w-[270px] md:min-w-[200px]">
                New email
              </Label>
              <FormField
                control={form.control}
                name="newEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputCompany
                        type="email"
                        placeholder=""
                        className="relative py-2  lg:w-[250px] w-full"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="sm:space-x-8 flex items-center sm:mt-16 mt-8 justify-end  flex-col sm:flex-row gap-4 sm:gap-0">
              <Button className="hover:scale-110 transition-all duration-300  rounded-xl  w-full h-[50px] sm:h-[50px]  sm:w-[200px] bg-[#2451F5] text-white  sm:text-[18px] font-[600] text-[16px]   hover:bg-[#2451F5]">
                Change Email
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
