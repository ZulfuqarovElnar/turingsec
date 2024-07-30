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
  const { data: currentUser } = useGetUserData();
  const [imageSrc, setImageSrc] = useState("");
  const [imageSrcUser, setImageSrcUser] = useState("");
  const [imageRealSrc, setImageRealSrc] = useState("");
  const [imageRealSrcUser, setImageRealSrcUser] = useState("");
  const [userDate, setUserDate] = useState<UserData | null>(null);
  // const [userImage, setUserImage] = useState("");
  // const [backgroundImage, setBackgroundImage] = useState("");
  // console.log(currentUser)
  const form = useForm<z.infer<typeof formSchemaProfileUpdate>>({
    resolver: zodResolver(formSchemaProfileUpdate),
    defaultValues: {
      firstname: userDate?.first_name || "",
      lastname: userDate?.last_name || "",
      website: userDate?.website || "",
      bio: userDate?.bio || "",
      username: userDate?.username || "",
      city: userDate?.city || "",
      linkedin: userDate?.linkedin || "",
      twitter: userDate?.twitter || "",
      github: userDate?.github || "",
      country: userDate?.country
        ? { value: userDate?.country, label: userDate?.country }
        : { value: "", label: "Select Country..." },
    },
  });
  const options = useMemo(() => countryList().getData(), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataString = localStorage.getItem("user");
        // console.log("userData:", userDataString);

        if (userDataString) {
          const userData = JSON.parse(userDataString);
          const { id } = userData;
          const apiUrl = import.meta.env.VITE_APP_BASE_URL;

          if (id) {
            const res = await fetch(`${apiUrl}/api/hacker/${id}`);
            const responseData = await res.json();
            const fetchedData = responseData.data;
            // console.log("User data from hacker API:", fetchedData);
            setUserDate(fetchedData as UserData);


          } else {
            console.log("Kullanıcı oturum açmamış veya userId depolanmamış.");
          }


          if (id) {
            const res1 = await fetch(
              `${apiUrl}/api/background-image-for-hacker/download/${id}`
            );

            const backgroundImageBlob = await res1.blob();

            const res2 = await fetch(
              `${apiUrl}/api/image-for-hacker/download/${id}`
            );

            const userImageBlob = await res2.blob();

            setImageSrcUser(URL.createObjectURL(userImageBlob));
            setImageSrc(URL.createObjectURL(backgroundImageBlob));
          } else {
            console.log("Kullanıcı oturum açmamış veya userId depolanmamış.");
          }
        } else {
          console.log("Kullanıcı oturum açmamış veya userId depolanmamış.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentUser?.hackerId]);

  useEffect(() => {
    if (currentUser) {
      const country = options.filter(
        (a) => a.value === userDate?.country
      );

      form.setValue("firstname", userDate?.first_name || "");
      form.setValue("lastname", userDate?.last_name || "");
      form.setValue("username", currentUser?.username || "");
      form.setValue("website", userDate?.website || "");
      form.setValue("bio", userDate?.bio || "");
      form.setValue("city", userDate?.city || "");
      form.setValue("linkedin", userDate?.linkedin || "");
      form.setValue("twitter", userDate?.twitter || "");
      form.setValue("github", userDate?.github || "");
      form.setValue("country", {
        value: country[0]?.value || "",
        label: country[0]?.label || "Select Country...",
      });
    }
  }, [userDate]);

  const handleFileChange = (e) => {
    // console.log(e);
    const file = e.target.files[0];
    setImageRealSrc(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      // console.log(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    console.log(imageRealSrc)
  };
  const handleFileChangeUser = (e) => {
    const file = e.target.files[0];
    setImageRealSrcUser(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrcUser(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    console.log(imageRealSrcUser)
  }


  async function onSubmit(data: z.infer<typeof formSchemaProfileUpdate>) {
    console.log("submitttttttttttttttttttttttttt")
    if (!imageSrc || !imageSrcUser) {
      toast.error("Please upload images");
      return;
    }

    // console.log(data)
    // console.log(imageSrc) 
    // console.log(imageSrcUser);
    try {
      const user = JSON.parse(localStorage.getItem("user") || "");
      
      const formData = new FormData();
      const apiUrl = import.meta.env.VITE_APP_BASE_URL;
      console.log("yesssssssssssssssssssssssssssssssssssssssssssss")
      console.log(imageRealSrcUser)
      formData.append("file", imageRealSrcUser);


      const res2 = await fetch(
        `${apiUrl}/api/image-for-hacker/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: formData,
        }
      );
      const formData2 = new FormData();
      formData2.append("file", imageRealSrc);
      const res3 = await fetch(
        `${apiUrl}/api/background-image-for-hacker/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: formData2,
        }
      );
      // console.log(res2, res3);

      const data3 = await res2.json(); // Parsing response JSON
      console.log(data3);
      const payload = {
        firstName: data.firstname,
        lastName: data.lastname,
        username: data.username,
        country: data.country.value,
        linkedin: data.linkedin,
        github: data.github,
        twitter: data.twitter,
        city: data.city,
        website: data.website,
        bio: data.bio
      }
      const res = await fetch(
        `${apiUrl}/api/auth/update-profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.accessToken}`,
          },
          body: JSON.stringify(payload),
        }
      );
      // console.log(res3);
      // console.log(res2);

      const resJson = await res.json(); // Parsing the response JSON
      if (res.status === 422) {
        const values = Object.values(resJson)
        toast.error(`${values[0]}`)
      };
      console.log(resJson);

      if (!res.ok) {

        throw new Error("Please try again later");
      }
      if (resJson.meta && resJson.meta.message) {
        const takingToken = resJson.meta.message;
        const newToken = takingToken.substring(98)
        // Update the token in local storage or where you store 
        user.accessToken=newToken
        localStorage.setItem("user", JSON.stringify(user));
      }

      toast.success("Profile Updated");
      
    } catch (err: any) {
      toast.error("Error", err?.message);
      console.log(err);
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
                        placeholder="Usernamee"
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
            <div className="flex sm:items-center gap-4 flex-col sm:flex-row">
              <Label className="sm:text-[18px] text-[14px] font-[600] md:min-w-[130px] sm:min-w-[100px]">
                Website
              </Label>

              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputCompany
                        type="text"
                        placeholder=""
                        {...field}
                        defaultValue={userDate?.website || ""}
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
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputCompany
                          type="text"
                          placeholder="City"
                          {...field}
                          defaultValue={userDate?.city || ""}
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

                    <FormMessage />
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
