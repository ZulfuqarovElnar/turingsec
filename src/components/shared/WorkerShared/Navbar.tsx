import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetUserData } from "../../../queryies/useGetUserData";

export default function Navbar() {

  const url = `/${useLocation().pathname.split("/")[2]}`;
  const [userImage, setUserImage] = useState("/assets/images/default_profile_image.jpg");
  const { data: currentUser } = useGetUserData();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataString = localStorage.getItem("user");
        if (userDataString) {
          //const userData = JSON.parse(userDataString);
          const id=currentUser?.hackerId;
          const apiUrl = import.meta.env.VITE_APP_BASE_URL;
          if (id) {
            const res2 = await fetch(`${apiUrl}/api/image-for-hacker/download/${id}`);
            if (res2.ok) {
              const userImageBlob = await res2.blob();
              setUserImage(URL.createObjectURL(userImageBlob));
            } else {
              // If image not found, set default image
              setUserImage("/assets/images/default_profile_image.jpg");
            }
          } else {
            // If user id not found, set default image
            setUserImage("/assets/images/default_profile_image.jpg");
          }
        } else {
          console.log("Kullanıcı oturum açmamış veya userId depolanmamış.");
          // If user data not found, set default image
          setUserImage("/assets/images/default_profile_image.jpg");
        }
      } catch (error) {
        console.log(error);
        // If any error occurs, set default image
        setUserImage("/assets/images/default_profile_image.jpg");
      }
    };

    fetchData();
  }, [currentUser?.hackerId, userImage]);


  
  


  return (
    <div className="bg-[#3D0436] py-14 z-30 md:w-[270px] w-[74px] left-0 fixed h-screen">
      <ul className="">
        <li>
          <Link className="hidden md:block px-10 " to={"/"}>
            <img src="/assets/images/newlogo.png" alt="logo" width={200} />
          </Link>
        </li>
        <li>
          <Link to={"/"} className="block md:hidden">
            <img
              src="/assets/newsmalllogo.png"
              alt="logo"
              width={45}
              className="m-auto"
            />
          </Link>
        </li>
        <li className="mt-10">
          <Link
            to={"dashboard"}
            className={`flex items-center text-[22px] gap-5 font-[600]  ${
              url == "/dashboard" ? "bg-[#FFDE31] text-dark" : "text-white"
            } py-3  md:rounded-full rounded-[30px] md:px-10 px-2`}
          >
            <img
              src="/assets/icon17.svg"
              alt=""
              className="md:w-[32px] w-[34px] m-auto md:m-0 "
            />
            <p className="hidden md:block">Dashboard</p>
          </Link>
        </li>
        <li>
          <Link
            to={"programs"}
            className={`flex items-center  text-[22px] gap-5 font-[600] ${
              url == "/programs" ? "bg-[#FFDE31] text-dark" : "text-white"
            } py-3  md:rounded-full rounded-[30px] md:px-10 px-2`}
          >
            <img
              src="/assets/icon18.svg"
              alt=""
              className="md:w-[32px] w-[34px] m-auto md:m-0"
            />
            <p className="hidden md:block">Programs</p>
          </Link>
        </li>
        <li>
          <Link
            to={"hactivity"}
            className={`flex items-center  text-[22px] gap-5 font-[600] ${
              url == "/hactivity" ? "bg-[#FFDE31] text-dark" : "text-white"
            } py-3  md:rounded-full rounded-[30px] md:px-10 px-2`}
          >
            <img
              src="/assets/icon19.svg"
              alt=""
              className="md:w-[32px] w-[34px] m-auto md:m-0"
            />
            <p className="hidden md:block">Hactivity</p>
          </Link>
        </li>
        <li>
          <Link
            to={"ranking"}
            className={`flex items-center  text-[22px] gap-5 font-[600] ${
              url == "/ranking" ? "bg-[#FFDE31] text-dark" : "text-white"
            } py-3  md:rounded-full rounded-[30px] md:px-10 px-2`}
          >
            <img
              src="/assets/icon20.svg"
              alt=""
              className="md:w-[32px] w-[34px] m-auto md:m-0"
            />
            <p className="hidden md:block">Ranking</p>
          </Link>
        </li>
        <li>
          <Link
            to={"report"}
            className={`flex items-center  text-[22px] gap-5 font-[600] ${
              url == "/report" ? "bg-[#FFDE31] text-dark" : "text-white"
            } py-3  md:rounded-full rounded-[30px] md:px-10 px-2`}
          >
            <img
              src="/assets/icon21.svg"
              alt=""
              className="md:w-[32px] w-[34px] m-auto md:m-0"
            />
            <p className="hidden md:block">Report</p>
          </Link>
        </li>
        <li>
          <Link
            to={"profile"}
            className={`flex items-center  text-[22px] gap-5 font-[600] ${
              url == "/profile" ? "bg-[#FFDE31] text-dark" : "text-white"
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
        </li>
      </ul>
      <ul>
        <li>
          <Link
            to={"notifications"}
            className={`flex items-center  text-[22px] gap-5 font-[600] ${
              url == "/notifications" ? "bg-[#FFDE31] text-dark" : "text-white"
            } py-3  md:rounded-full rounded-[30px] md:px-10 px-2`}
          >
            <img
              src="/assets/icon24.svg"
              alt=""
              className="md:w-[32px] w-[34px] m-auto md:m-0"
            />
            <p className="hidden md:block">Notifications</p>
          </Link>
        </li>
        <li>
          <Link
            to={"inbox"}
            className={`flex items-center  text-[22px] gap-5 font-[600] ${
              url == "/inbox" ? "bg-[#FFDE31] text-dark" : "text-white"
            } py-3  md:rounded-full rounded-[30px] md:px-10 px-2`}
          >
            <img
              src="/assets/icon25.svg"
              alt=""
              className="md:w-[32px] w-[34px] m-auto md:m-0"
            />
            <p className="hidden md:block">Inbox</p>
          </Link>
        </li>
        <li>
          <Link
            to={"settings"}
            className={`flex items-center  text-[22px] gap-5 font-[600] ${
              url == "/settings" ? "bg-[#FFDE31] text-dark" : "text-white"
            } py-3  md:rounded-full rounded-[30px] md:px-10 px-2`}
          >
            <img
              src="/assets/icon23.svg"
              alt=""
              className="md:w-[32px] w-[34px] m-auto md:m-0"
            />
            <p className="hidden md:block">Settings</p>
          </Link>
        </li>
      </ul>
    </div>
  );
}