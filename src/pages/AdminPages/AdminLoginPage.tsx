import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { formSchemaAdminLogin } from "../../lib/schemas";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

type LoginFormValues = {
  usernameOrEmail: string;
  password: string;
};

export default function AdminLoginPage() {

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchemaAdminLogin),
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  const navigate = useNavigate();


  async function onSubmit(values: LoginFormValues) {
    try {
      const apiUrl = import.meta.env.VITE_APP_BASE_URL;
  
      console.log("Submitting values:", values);
  
      const response = await fetch(`${apiUrl}/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          usernameOrEmail: values.usernameOrEmail,
          password: values.password,
        }),
      });
  
      const result = await response.json();
  
      if (!response.ok || result.status !== "OK") {
        // Displaying error message if response is not OK or status is not "OK"
        toast.error(result.meta?.message || "Login failed");
        console.error("Error logging in:", result.meta?.message || response.statusText);
        return;
      }
  
      console.log("Login successful:", result);
  
      toast.success(result.meta.message);
  
      // Store adminAccessToken and adminId in localStorage
      localStorage.setItem("adminAccessToken", result.data.accessToken);
      localStorage.setItem("adminId", JSON.stringify(result.data.userInfo.id));
  
      setTimeout(() => {
        navigate("/admin");
      }, 1000);
  
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
  
  
  

  return (
    <div className="flex flex-col justify-between xl:pb-40 pb-4 sm:py-28 text-white lg:flex-row items-center bg-[url(/assets/images/bg-2.png)]  bg-center	bg-no-repeat	bg-cover dark:bg-inherit sm:px-16 py-20 px-8">
      <div className="lg:w-[60%] w-auto">
        <div className="">
          <h2 className="font-[700] sm:text-[45px] text-[28px] mb-2">
            Admin Login
          </h2>
          <p className="font-[400] sm:text-[20px] mb-8 text-[18px]">
            Access the admin panel to manage system settings, users, and reports.
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 sm:w-[450px] m-auto lg:m-0 w-[317px]"
            >
              <FormField
                control={form.control}
                name="usernameOrEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Username or Email"
                        {...field}
                        className="bg-linear-contact rounded-xl h-[60px] autocomplete-none outline-none border-none placeholder:text-white pl-8 focus-visible:ring-0 focus-visible:ring-offset-1"
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
                        className="bg-linear-contact rounded-xl h-[60px] autocomplete-none outline-none pl-8 border-none placeholder:text-white focus-visible:ring-0 focus-visible:ring-offset-1"
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
