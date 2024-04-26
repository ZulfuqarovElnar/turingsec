import toast from "react-hot-toast";
import { useCurrentCompany } from "../../context/CurrentCompany";
import { Button } from "../../components/ui/button";

export default function CompanyProfile() {
  const { currentCompany } = useCurrentCompany();

  return (
    <div className="text-white flex-1 flex flex-col overflow-hidden relative ">
      <section className="   font-[800] bg-[#1F44CC] h-[124px] flex items-center justify-center overflow-hidden ">
        <img
          src="/assets/iconnav9.svg"
          alt=""
          className="absolute z-[20] lg:-left-[10%] md:-left-[24%] sm:-left-[100px] top-0 w-[284px] md:w-[332px] -left-[130px]  "
        />
        <p className="md:text-[30px] text-[20px]"> Profile</p>
        <img
          src="/assets/iconnav10.svg"
          alt=""
          className="absolute z-[20] md:-right-[0] top-0 sm:-right-[7%] -right-[10%]   overflow-hidden w-[174px] md:w-[182px] "
        />
      </section>
      <div className=" bg-[#1F44CC]  w-full absolute top-0 left-0 h-[30px]">
        ssdd
      </div>

      <div className="bg-[#1E1E1E] flex-1 lg:px-20 sm:px-8 px-3  py-16">
        <div className="bg-[url('/assets/images/companyprofileimage.png')] md:h-[200px] h-auto bg-cover bg-center relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative flex md:items-center items-stretch flex-col md:flex-row h-full lg:pl-16 py-10 md:py-0 md:pl-8 md:pr-0 sm:px-[15%] px-4 gap-6 ">
            <button className="bg-[#BDBDBD] rounded-full absolute z-20 right-5 top-5 p-[10px]">
              <img src="/assets/blackpen.svg" alt="edit" />
            </button>
            <div className="hexagon4 m-auto md:m-0">
              <img src="/assets/images/profileimage.jpeg" alt="" />
            </div>

            <div className="flex flex-col items-center   mb-4 md:mb-0 md:block">
              <h2 className="font-[600] text-[25px]">{currentCompany?.name}</h2>
              <p className="sm:text-[20px] text-[18px] font-[400]">
                Business title
              </p>
              <div className="flex items-center gap-2">
                <img src="/assets/flag.svg" className="w-[18px] " />
                <p className="text-[16px] font-[400]">City</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:px-16 px-4">
          <h2 className="text-[20px] sm:text-[25px] font-[600] sm:font-[700] my-8">
            About Company
          </h2>
          <p className="font-[400] sm:text-[20px] text-[18px] max-w-[800px]">
            Provide detailed information about the company, including its
            history, founding date, key milestones, and any notable
            achievements. This helps establish credibility and builds trust with
            visitors. In the context of cybersecurity, it's essential to
            reassure visitors about the security measures your company has in
            place to protect their data. This could include encryption
            protocols, compliance with industry standards (such as GDPR or
            HIPAA), regular security audits, and any other relevant security
            practices.
          </p>
          <div className=" rounded-[20px] overflow-hidden"></div>
          <div>
            <h2 className="text-[18px] sm:text-[20px] font-[600] sm:font-[700] my-8">
              Contact
            </h2>
            <ul className="space-y-4 max-w-[100px]">
              <a href="#" className="flex items-center gap-3">
                <img src="/assets/github.svg" alt="" />
                <p className="text-[18px] font-[600]">Github</p>
              </a>
              <a href="#" className="flex items-center gap-3">
                <img src="/assets/twitter.svg" alt="" />
                <p className="text-[18px] font-[600]">Twitter</p>
              </a>
              <a href="#" className="flex items-center gap-3">
                <img src="/assets/website.svg" alt="" />
                <p className="text-[18px] font-[600]">Website</p>
              </a>
              <a href="#" className="flex items-center gap-3">
                <img src="/assets/linkedin.svg" alt="" />
                <p className="text-[18px] font-[600]">Linkedin</p>
              </a>
            </ul>
          </div>{" "}
          <Button
            className="hover:scale-110 transition-all duration-300  rounded-xl  w-[200px] h-[50px] sm:h-[50px]   sm:w-[200px] bg-[#2451F5] text-white  sm:text-[18px] font-[600] text-[16px]   hover:bg-[#2451F5] mt-8 gap-4"
            onClick={() => {
              localStorage.removeItem("company");
              toast.success("logout");
              setTimeout(() => {
                window.location.href = "/";
              }, 500);
            }}
          >
            <img src="/assets/logout.svg" alt="" />
            <p>Logout</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
