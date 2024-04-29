import { Link, useLocation } from "react-router-dom";
import { useCurrentUser, CurrentUser  } from "../../../context/CurrentUser";
import { useEffect, useState } from "react";

export default function Navbar() {
  const url = `/${useLocation().pathname.split("/")[2]}`;
  const { isAuthenticated } = useCurrentUser()  as CurrentUser;
  const [userImage, setUserImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataString = localStorage.getItem("user");
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          const { id} = userData;
        if (id) {
          const res2 = await fetch(
            `http://localhost:5000/api/image-for-hacker/download/${id}`
          );
  
          const userImageBlob = await res2.blob();
          setUserImage(URL.createObjectURL(userImageBlob));
        } else {
          // Kullanıcı giriş yapmamışsa veya currentUser.id yoksa, varsayılan resmi yükle
          setUserImage("/assets/images/default_profile_image.jpg");
        }} else {
          console.log("Kullanıcı oturum açmamış veya userId depolanmamış.");
        }
      } catch (error) {
        console.log(error);
        // Resim yüklenirken hata olursa, varsayılan resmi yükle
        setUserImage("/assets/images/default_profile_image.jpg");
      }
    };
  
    fetchData();
  }, []);
  
  


  return (
    <div className="bg-[#023059] py-14   z-30 md:w-[270px] w-[74px] left-0 fixed h-screen">
      <ul className="">
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
              className="md:w-[32px] w-[34px] m-auto md:m-0"
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
              className="md:w-[32px] w-[34px] m-auto md:m-0"
            />
            <p className="hidden md:block">Programs</p>
          </Link>
          <Link
            to={"hactivity"}
            className={`flex items-center text-white text-[22px] gap-5 font-[600] ${
              url == "/hactivity" ? "bg-[#2451F5]" : ""
            } py-3  md:rounded-full rounded-[30px] md:px-10 px-2`}
          >
            <img
              src="/assets/icon19.svg"
              alt=""
              className="md:w-[32px] w-[34px] m-auto md:m-0"
            />
            <p className="hidden md:block">Hactivity</p>
          </Link>
          <Link
            to={"ranking"}
            className={`flex items-center text-white text-[22px] gap-5 font-[600] ${
              url == "/ranking" ? "bg-[#2451F5]" : ""
            } py-3  md:rounded-full rounded-[30px] md:px-10 px-2`}
          >
            <img
              src="/assets/icon20.svg"
              alt=""
              className="md:w-[32px] w-[34px] m-auto md:m-0"
            />
            <p className="hidden md:block">Ranking</p>
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
              className="md:w-[32px] w-[34px] m-auto md:m-0"
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
              <img
                src={userImage ? userImage : "/assets/images/profileimage.jpeg"}
                alt=""
              />
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