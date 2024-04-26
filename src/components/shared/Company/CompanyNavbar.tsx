import { Link, useLocation } from "react-router-dom";

export default function CompanyNavbar() {
  const url = `/${useLocation().pathname.split("/")[2]}`;

  return (
    <div className="bg-[#023059] py-14 h-screen fixed  z-30 md:w-[270px] w-[74px] left-0">
      <ul>
        <Link className="hidden md:block px-10 " to={"/"}>
          <img src="/assets/images/newlogo.png" alt="logo" width={200} />
        </Link>
        <Link to={"/"} className="block md:hidden">
          <img
            src="/assets/newsmalllogo.png"
            alt="logo"
            width={45}
            className="m-auto"
          />
        </Link>
        <div className="mt-10 ">
          <Link
            to={"dashboard"}
            className={`flex items-center text-white text-[22px] gap-5 font-[600]  ${
              url == "/dashboard" ? "bg-[#2451F5]" : ""
            } py-3  md:rounded-full rounded-[30px] md:px-10 px-2`}
          >
            <img
              src="/assets/icon17.svg"
              alt=""
              className="md:w-[32px] w-[40px] m-auto md:m-0"
            />
            <p className="hidden md:block">Dashboard</p>
          </Link>
          <Link
            to={"programs"}
            className={`flex items-center text-white text-[22px] gap-5 font-[600] ${
              url == "/programs" ? "bg-[#2451F5]" : ""
            } py-3  md:rounded-full rounded-[30px] md:px-10 px-2`}
          >
            <img
              src="/assets/icon18.svg"
              alt=""
              className="md:w-[32px] w-[40px] m-auto md:m-0"
            />
            <p className="hidden md:block">Programs</p>
          </Link>

          <Link
            to={"report"}
            className={`flex items-center text-white text-[22px] gap-5 font-[600] ${
              url == "/report" ? "bg-[#2451F5]" : ""
            } py-3  md:rounded-full rounded-[30px] md:px-10 px-2`}
          >
            <img
              src="/assets/icon21.svg"
              alt=""
              className="md:w-[32px] w-[40px] m-auto md:m-0"
            />
            <p className="hidden md:block">Report</p>
          </Link>
          <Link
            to={"profile"}
            className={`flex items-center text-white text-[22px] gap-5 font-[600] ${
              url == "/profile" ? "bg-[#2451F5]" : ""
            } py-3  md:rounded-full rounded-[30px] md:px-10 px-2`}
          >
            <div className="hexagon6 m-auto md:m-0">
              <img src="/assets/images/profileimage.jpeg" alt="" />
            </div>
            <p className="hidden md:block">Profile</p>
          </Link>
        </div>
        <div className="mt-14">
          <Link
            to={"notifications"}
            className={`flex items-center text-white text-[22px] gap-5 font-[600] ${
              url == "/notifications" ? "bg-[#2451F5]" : ""
            } py-3  md:rounded-full rounded-[30px] md:px-10 px-2`}
          >
            <img
              src="/assets/icon24.svg"
              alt=""
              className="md:w-[32px] w-[34px] m-auto md:m-0"
            />
            <p className="hidden md:block">Notifications</p>
          </Link>
          <Link
            to={"inbox"}
            className={`flex items-center text-white text-[22px] gap-5 font-[600] ${
              url == "/inbox" ? "bg-[#2451F5]" : ""
            } py-3  md:rounded-full rounded-[30px] md:px-10 px-2`}
          >
            <img
              src="/assets/icon25.svg"
              alt=""
              className="md:w-[32px] w-[34px] m-auto md:m-0"
            />
            <p className="hidden md:block">Inbox</p>
          </Link>
          <Link
            to={"settings"}
            className={`flex items-center text-white text-[22px] gap-5 font-[600] ${
              url == "/settings" ? "bg-[#2451F5]" : ""
            } py-3  md:rounded-full rounded-[30px] md:px-10 px-2`}
          >
            <img
              src="/assets/icon23.svg"
              alt=""
              className="md:w-[32px] w-[34px] m-auto md:m-0"
            />
            <p className="hidden md:block">Settings</p>
          </Link>
        </div>
      </ul>
    </div>
  );
}
