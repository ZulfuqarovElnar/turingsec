import InputCompany from "../../component/Company/InputCompany";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { Label } from "../../ui/label";
import { useState } from "react";
import { Button } from "../../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../../components/ui/form";
import { z } from "zod";
 


export default function TabContentPassword() {
 
  const [currentpasswordVisible, setCurrentPasswordVisible] = useState(false);
  
  const formSchema = z
    .object({
      currentPassword: z.string().min(5, {
        message: "Current password must be at least 8 characters.",
      }),
      newPassword: z.string().min(8, {
        message: "New password must be at least 8 characters.",
      }),
      confirmPassword: z.string().min(8, {
        message: "Confirm Password must be at least 8 characters.",
      }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  const togglePasswordVisibility = (
    func: React.Dispatch<React.SetStateAction<boolean>>,
    item: boolean
  ) => {
    func(!item);
  };
  const [newpasswordVisible, setNewPasswordVisible] = useState(false);

  const [confirmpasswordVisible, setConfirmPasswordVisible] = useState(false);
   
  async function onSubmit(data: z.infer<typeof formSchema>) {
    
    try {
      const hacker = JSON.parse(localStorage.getItem("user") || "");
      const company = JSON.parse(localStorage.getItem("company") || "");
      let accessToken=""
      if (hacker){
        accessToken=hacker.accessToken
      }
      if(company){
        accessToken=company.accessToken
      }
      console.log(accessToken);
      const apiUrl = import.meta.env.VITE_APP_BASE_URL;
      const datt = {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmPassword,
      };
      const res = await fetch(
        `${apiUrl}/api/auth/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Specify content type as JSON
            Authorization: `Bearer ${company.accessToken}`, // Corrected header name
          },
          body: JSON.stringify(datt), // Convert data to JSON string
        }
      );
      console.log(res);
      const resJson = await res.json(); // Parsing the response JSON
      
      if (res.ok) {
        // Handle success
        toast.success("Password changed successfully!");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      } else {
       
        toast.error(`${resJson.message}`);
        // Handle error
        console.error("Failed to change password:", res.statusText);
      }
    } catch (err) {
     
      toast.error("Error while changing password:");
      console.error("Error while changing password:", err);
    }
  }

  return (
    <div className="mt-4">
      <h2 className="sm:text-[23px] text-[16px] font-[600] mb-2 ">Password</h2>
      <p className="sm:text-[18px] text-[12px] font-[500]">
        Please enter your current password to change your password
      </p>
      <div className="sm:mt-14 mt-6 sm:space-y-14 space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-16">
            <div className="flex md:items-center gap-2 flex-col md:flex-row">
              <Label className="sm:text-[18px] text-[12px] font-[600] lg:min-w-[300px] md:min-w-[200px]">
                Current password
              </Label>
              <FormField
                control={form.control}
                name="currentPassword"
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
              <Label className="sm:text-[18px] text-[12px] font-[600] lg:min-w-[300px] md:min-w-[200px]">
                New password
              </Label>
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Label className="relative flex items-center border rounded-2xl">
                        <InputCompany
                          type={newpasswordVisible ? "text" : "password"}
                          placeholder=""
                          {...field}
                          className="relative  focus-visible:ring-offset-0 border-none py-2 "
                        />
                        {newpasswordVisible && (
                          <FaRegEye
                            className="w-[40px] mr-3 h-[20px] cursor-pointer"
                            onClick={() =>
                              togglePasswordVisibility(
                                setNewPasswordVisible,
                                newpasswordVisible
                              )
                            }
                          />
                        )}
                        {!newpasswordVisible && (
                          <FaRegEyeSlash
                            className="w-[40px] mr-3 h-[20px] cursor-pointer"
                            onClick={() =>
                              togglePasswordVisibility(
                                setNewPasswordVisible,
                                newpasswordVisible
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
              <Label className="sm:text-[18px] text-[12px] font-[600] lg:min-w-[300px] md:min-w-[200px]">
                Confirm password
              </Label>
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Label className="relative flex items-center border rounded-2xl">
                        <InputCompany
                          type={confirmpasswordVisible ? "text" : "password"}
                          placeholder=""
                          {...field}
                          className="relative  focus-visible:ring-offset-0 border-none py-2 "
                        />
                        {confirmpasswordVisible && (
                          <FaRegEye
                            className="w-[40px] mr-3 h-[20px] cursor-pointer"
                            onClick={() =>
                              togglePasswordVisibility(
                                setConfirmPasswordVisible,
                                confirmpasswordVisible
                              )
                            }
                          />
                        )}
                        {!confirmpasswordVisible && (
                          <FaRegEyeSlash
                            className="w-[40px] mr-3 h-[20px] cursor-pointer"
                            onClick={() =>
                              togglePasswordVisibility(
                                setConfirmPasswordVisible,
                                confirmpasswordVisible
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
            <div className="sm:space-x-8 flex items-center sm:mt-16 mt-6 justify-end  flex-col-reverse sm:flex-row gap-4 sm:gap-0">
              <Button
                className="hover:scale-110 transition-all duration-300 rounded-xl h-[45px]  sm:h-[50px] w-full sm:w-[150px] bg-transparent text-white  sm:text-[18px] font-[600] text-[12px] border border-[#FFDE31]  hover:bg-transparent"
                type="reset"
                onClick={() => {
                  form.reset();
                }}
              >
                Cancel
              </Button>
              <Button className="hover:scale-110 transition-all duration-300 rounded-xl h-[45px]  sm:h-[50px] w-full sm:w-[220px] bg-[#FFDE31] text-black  sm:text-[18px] font-[600] text-[16px]   hover:bg-[#FFDE31]">
                Update password
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
