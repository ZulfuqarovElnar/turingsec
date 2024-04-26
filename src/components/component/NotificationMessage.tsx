import { Button } from "../ui/button";

export default function NotificationMessage() {
  return (
    <div className="xl:p-16 sm:p-10 px-4 py-8">
      <p className="sm:text-[20px] text-[18px] font-[400] mb-2">26.02.2024</p>
      <p className="sm:text-[22px] text-[18px] font-[600] my-4">
        Update profile 80% updated
      </p>
      <p className="sm:text-[20px] text-[16px] font-[300] ">
        We are reaching out to inform you about an important update regarding
        your profile on our cybersecurity platform. In our ongoing efforts to
        enhance security measures and ensure the integrity of user accounts, we
        are implementing a mandatory profile update
      </p>
      <h3 className="sm:text-[20px] text-[18px] font-[500] my-6">
        How to Update Your Profile
      </h3>
      <div className="flex justify-between flex-wrap xl:flex-nowrap">
        <div className="flex-col  justify-center gap-4 text-center sm:w-[200px] w-[130px]">
          <h2 className="sm:text-[25px] text-[20px] font-[700]">1</h2>
          <p className="sm:text-[20px] text-[16px] font-[300]">
            Log in to your account on
          </p>
        </div>
        <div className="flex-col  justify-center gap-4 text-center sm:w-[200px] w-[130px]">
          <h2 className="sm:text-[25px] text-[20px] font-[700]">2</h2>
          <p className="sm:text-[20px] text-[16px] font-[300]">
            Navigate to the "Profile" or "Account Settings" section.
          </p>
        </div>
        <div className="flex-col  justify-center gap-4 text-center lg:w-[200px] sm:w-[250px] w-[170px]  xl:m-0 m-auto">
          <h2 className="sm:text-[25px] text-[20px] font-[700]">3</h2>
          <p className="sm:text-[20px] text-[16px] font-[300]">
            Review and update all necessary fields, including but not limited
            to:
          </p>
        </div>
      </div>
      <div className="mt-8">
        <Button className="hover:scale-110 transition-all duration-300 rounded-xl h-[45px]  sm:h-[50px] w-full sm:w-[220px] bg-[#2451F5] text-white  sm:text-[18px] font-[600] text-[16px]   hover:bg-[#2451F5]">
          Update profile
        </Button>
      </div>
    </div>
  );
}
