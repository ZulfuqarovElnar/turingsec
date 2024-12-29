import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router";
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
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";

import { formSchemaProfileUpdate } from "../../../lib/schemas";
import { useEffect, useMemo, useState } from "react";

import { Button } from "../../ui/button";
import InputCompany from "../../component/Company/InputCompany";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";

import { useGetUserData } from "../../../queryies/useGetUserData";

interface UserData {
  first_name: string;
  last_name: string;
  website: string;
  bio: string;
  username: string;
  city: string;
  linkedin: string;
  twitter: string;
  github: string;
  country: string;
  backgroundImageId: string;
  imageId: string;
}

const breakpoints = [1040, 1224];
const mq = breakpoints.map((bp) => `@media (min-width: ${bp}px)`);

export default function TabContentProfile() {
  const navigate = useNavigate();
  const { data: currentUser } = useGetUserData();
  const [imageSrc, setImageSrc] = useState("");
  const [imageSrcUser, setImageSrcUser] = useState("");
  const [userDate, setUserDate] = useState<UserData | null>(null);
  
  const form = useForm<z.infer<typeof formSchemaProfileUpdate>>({
    resolver: zodResolver(formSchemaProfileUpdate),
    defaultValues: {
      firstname: "",
      lastname: "",
      bio: "",
      username: "",
      linkedin: "",
      twitter: "",
      github: "",
      country: { value: "", label: "Select Country..." },
    },
  });

  const options = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataString = localStorage.getItem("user");
        if (userDataString) {
          const id = currentUser?.hackerId;
          const apiUrl = import.meta.env.VITE_APP_BASE_URL;
          if (id) {
            const res = await fetch(`${apiUrl}/api/hacker/${id}`);
            const responseData = await res.json();
            console.log(responseData);
            setUserDate(responseData.data as UserData);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentUser?.hackerId]);

  useEffect(() => {
    console.log("Fetched userDate:", userDate);
    if (userDate) {
      // const country = options.find(a => {
      //   console.log('Value:', a.value, 'User Date Country:', userDate?.country);
      //   return a.value === userDate?.country;
      // });
      
      // console.log('Found Country:', country);
      
      
      // console.log(options);
      // console.log(country);
      // console.log(typeof userDate?.country); // Check type of userDate?.country
      // console.log(options.map(option => typeof option.value)); // Check types of values in options


      
      form.setValue("firstname", userDate.first_name || "");
      form.setValue("lastname", userDate.last_name || "");
      form.setValue("username", userDate.username || "");
      form.setValue("bio", userDate.bio || "");
      form.setValue("linkedin", userDate.linkedin || "");
      form.setValue("twitter", userDate.twitter || "");
      form.setValue("github", userDate.github || "");
      form.setValue("country", {
        value: userDate.country || "",
        label: userDate.country || "Select Country...",
      });
    }
  }, [userDate, options, form]);

  

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    if (file) reader.readAsDataURL(file);
  };

  const handleFileChangeUser = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setImageSrcUser(reader.result as string);
    if (file) reader.readAsDataURL(file);
  };

  async function onSubmit(data: z.infer<typeof formSchemaProfileUpdate>) {
    if (!imageSrc || !imageSrcUser) {
      toast.error("Please upload images");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user") || "");
      const formData = new FormData();
      formData.append("file", imageSrcUser);
      const res2 = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/api/image-for-hacker/upload`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${user.accessToken}` },
          body: formData,
        }
      );

      const formData2 = new FormData();
      formData2.append("file", imageSrc);
      const res3 = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/api/background-image-for-hacker/upload`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${user.accessToken}` },
          body: formData2,
        }
      );

      const payload = {
        firstName: data.firstname,
        lastName: data.lastname,
        username: data.username,
        country: data.country.value,
        linkedin: data.linkedin,
        github: data.github,
        twitter: data.twitter,
        bio: data.bio,
      };

      console.log(payload);

      const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/api/auth/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      const resJson = await res.json();
      if (res.status === 422) {
        const values = Object.values(resJson);
        toast.error(`${values[0]}`);
      }

      if (!res.ok) {
        throw new Error("Please try again later");
      }

      toast.success("Profile Updated");
      setTimeout(() => navigate('/work/profile'), 1000);
    } catch (err: any) {
      toast.error("Error", err?.message);
    }
  }

  return (
    <div className="mt-4">
      <h2 className="sm:text-[23px] text-[16px] font-[600] mb-8 ">
        Personal information
      </h2>
      <div className="main">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-8
              "
          >
            <div className="flex sm:items-center gap-4 flex-col sm:flex-row">
              <Label className="sm:text-[18px] text-[14px] font-[600] md:min-w-[130px] sm:min-w-[100px]">
                Full Name
              </Label>
              <div className="flex gap-4 flex-col lg:flex-row">
                <FormField
                  control={form.control}
                  name="firstname"

                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputCompany
                          type="text"
                          placeholder="Enter First Name"
                          {...field}
                          defaultValue={userDate?.first_name || ''}
                          className="xl:min-w-[250px]"
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
                        <InputCompany
                          type="text"
                          placeholder="Enter Last Name"
                          {...field}
                          defaultValue={userDate?.last_name || ""}
                          className="xl:min-w-[250px]"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex sm:items-center gap-4 flex-col sm:flex-row">
              <Label className="sm:text-[18px] text-[14px] font-[600] md:min-w-[130px] sm:min-w-[100px]">
                Username
              </Label>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputCompany
                        type="text"
                        placeholder="Username"
                        {...field}
                        defaultValue={userDate?.username || ""}
                        className="xl:min-w-[350px] scale-r-125"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-8 flex-col sm:flex-row">
              <Label className="bg-[#061724] rounded-2xl sm:w-[559px] h-[160px] w-full flex justify-center items-center">
                {imageSrc && (
                  <img
                    src={imageSrc}
                    alt="Uploaded"
                    className="max-w-full max-h-full"
                    style={{ width: "100%", height: "auto" }}
                  />
                )}
              </Label>
              <FormField
                control={form.control}
                name="bigfile"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Label
                        className="bg-[#FFDE31] text-black hover:bg-[#FFDE31] 
                      min-w-[120px]
                      h-[40px]
                      text-[14px] font-[600]  rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300
                      "
                      >
                        Choose File
                        <Input
                          type="file"
                          {...field}
                          onChange={handleFileChange}
                          className="bg-[#200F23] text-black hidden w-full"
                        />
                      </Label>
                    </FormControl>

                    {!imageSrc && (
                      <div className="absolute text-red-500">File upload</div>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-8 flex-col sm:flex-row">
              <Label className="bg-[#061724] hexagon7 py-8  md:m-0">
                {imageSrcUser ? (
                  <img src={imageSrcUser} alt="Uploaded" className="p-2 " />
                ) : (
                  <img src="/assets/images/newuserlogo.svg" alt="" />
                )}
              </Label>{" "}
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Label
                        className="bg-[#FFDE31] text-black hover:bg-[#FFDE31] 
                      min-w-[120px]
                      h-[40px]
                      text-[14px] font-[600]  rounded-xl flex items-center justify-center cursor-pointer hover:scale-105 transition-all duration-300
                      "
                      >
                        Choose File
                        <Input
                          type="file"
                          {...field}
                          onChange={handleFileChangeUser}
                          className="bg-[#FFEC86] text-black hidden w-full"
                        />
                      </Label>
                    </FormControl>

                    {!imageSrcUser && (
                      <div className="absolute text-red-500">File upload</div>
                    )}
                  </FormItem>
                )}
              />
            </div>
            <div className="flex sm:items-center gap-4 flex-col sm:flex-row">
              <Label className="sm:text-[18px] text-[14px] font-[600] md:min-w-[130px] sm:min-w-[100px]">
                Location
              </Label>
              <div className="flex gap-4 flex-col lg:flex-row">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          {...field}
                          placeholder="Select Country"
                          options={options}
                          defaultValue={options.find((option) => option.value === userDate?.country)}
                          styles={{
                            control: (styles) => ({
                              ...styles,
                              background: "transparent",
                              borderRadius: "1rem",
                              width: "100%",
                              [mq[0]]: {
                                width: "250px",
                              },
                              [mq[1]]: {
                                width: "350px",
                              },
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
              </div>
            </div>
            <div className="flex sm:items-center gap-4 flex-col sm:flex-row">
              <Label className="sm:text-[18px] text-[14px] font-[600] md:min-w-[130px] sm:min-w-[100px]">
                Bio
              </Label>
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Bio"
                        {...field}
                        className="bg-transparent text-white placeholder:text-white border focus-visible:border-none focus-visible:outline-none xl:w-[620px] lg:h-[170px] sm:h-[100px] lg:w-[350px] w-full"
                        defaultValue={userDate?.bio || ""}
                      />
                    </FormControl>

                  </FormItem>
                )}
              />
            </div>
            <div className="flex sm:items-center gap-4 flex-col sm:flex-row">
              <Label className="sm:text-[18px] text-[14px] font-[600] md:min-w-[130px] sm:min-w-[100px]">
                Linked in
              </Label>
              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputCompany
                        type="text"
                        placeholder=""
                        {...field}
                        defaultValue={userDate?.linkedin || ""}
                        className="xl:min-w-[350px] scale-r-125"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex sm:items-center gap-4 flex-col sm:flex-row">
              <Label className="sm:text-[18px] text-[14px] font-[600] md:min-w-[130px] sm:min-w-[100px]">
                Twitter
              </Label>
              <FormField
                control={form.control}
                name="twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputCompany
                        type="text"
                        placeholder=""
                        {...field}
                        defaultValue={userDate?.twitter || ""}
                        className="xl:min-w-[350px] scale-r-125"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex sm:items-center gap-4 flex-col sm:flex-row">
              <Label className="sm:text-[18px] text-[14px] font-[600] md:min-w-[130px] sm:min-w-[100px]">
                Github
              </Label>
              <FormField
                control={form.control}
                name="github"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputCompany
                        type="text"
                        placeholder=""
                        {...field}
                        defaultValue={userDate?.github || ""}
                        className="xl:min-w-[350px] scale-r-125"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="sm:space-x-8 flex items-center mt-16 justify-end  flex-col sm:flex-row gap-4 sm:gap-0">
              <Button className="hover:scale-110 transition-all duration-300 rounded-xl h-[45px] text-black sm:h-[50px] w-full sm:w-[220px] bg-[#FFDE31]  sm:text-[18px] font-[600] text-[16px]   hover:bg-[#FFDE31]">
                Update Profile
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
