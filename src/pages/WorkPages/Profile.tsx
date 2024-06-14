import toast from "react-hot-toast";
import ProfileLine from "../../components/component/Worker/ProfileLine";
import { Button } from "../../components/ui/button";
import { useCurrentUser } from "../../context/CurrentUser";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";

interface UserData {
  backgroundImageId: string | null;
  bio: string | null;
  city: string | null;
  country: string;
  first_name: string;
  github: string | null;
  id: number;
  imageId: string | null;
  last_name: string;
  linkedin: string | null;
  twitter: string | null;
  userId: number;
  website: string | null;
}

export default function Profile() {
  const { currentUser } = useCurrentUser();
  const [userImage, setUserImage] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [userDate, setUserDate] = useState<UserData | null>(null);

  const fakeData = [
    {
      bugtag: "Tag name",
      huntername: "Username",
      date: "Fri.26 Jan 2024",
      country: "az",
      status: "New",
    },
    {
      bugtag: "Tag name",
      huntername: "Username",
      date: "Fri.26 Jan 2024",
      country: "az",
      status: "New",
    },
    {
      bugtag: "Tag name",
      huntername: "Username",
      date: "Fri.26 Jan 2024",
      country: "az",
      status: "New",
    },
    {
      bugtag: "Tag name",
      huntername: "Username",
      date: "Fri.26 Jan 2024",
      country: "az",
      status: "New",
    },
    {
      bugtag: "Tag name",
      huntername: "Username",
      date: "Fri.26 Jan 2024",
      country: "az",
      status: "New",
    },
    {
      bugtag: "Tag name",
      huntername: "Username",
      date: "Fri.26 Jan 2024",
      country: "az",
      status: "New",
    },
    {
      bugtag: "Tag name",
      huntername: "Username",
      date: "Fri.26 Jan 2024",
      country: "az",
      status: "Resolve",
    },
    {
      bugtag: "Tag name",
      huntername: "Username",
      date: "Fri.26 Jan 2024",
      country: "az",
      status: "New",
    },
    {
      bugtag: "Tag name",
      huntername: "Username",
      date: "Fri.26 Jan 2024",
      country: "az",
      status: "Accepted",
    },
    {
      bugtag: "Tag name",
      huntername: "Username",
      date: "Fri.26 Jan 2024",
      country: "az",
      status: "New",
    },
    {
      bugtag: "Tag name",
      huntername: "Username",
      date: "Fri.26 Jan 2024",
      country: "az",
      status: "Accepted",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDataString = localStorage.getItem("user");
        console.log("userData:", userDataString);
  
        if (userDataString) {
          const userData = JSON.parse(userDataString);
          const { id } = userData;
          const apiUrl = process.env.REACT_APP_API_BASE_URL;
          if (id) {
            const res = await fetch(`${apiUrl}/api/hacker/${id}`);
            const responseData = await res.json();
            const fetchedData = responseData.data;
            console.log("User data from hacker API:", fetchedData);
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
  
            setUserImage(URL.createObjectURL(userImageBlob));
            setBackgroundImage(URL.createObjectURL(backgroundImageBlob));
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
  }, [currentUser?.userId]);
  
  
  const navigate = useNavigate();

  return (
    <div className="text-white flex-1 flex flex-col overflow-hidden relative">
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

      <div className="bg-[#1E1E1E] flex-1 lg:px-20 sm:px-8 px-3  py-16">
        <div
          className={`md:h-[200px] h-auto bg-cover bg-center relative rounded-3xl overflow-hidden`}
        >
          <img
            src={
              backgroundImage
              ? backgroundImage
              :"/assets/images/profilebackgroundimage.png"
            }
            alt=""
            className="w-full h-full object-cover object-center absolute inset-0"
          />
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="relative flex md:items-center items-stretch flex-col md:flex-row h-full lg:pl-16 py-10 md:py-0 md:pl-8 md:pr-0 sm:px-[15%] px-4 gap-6 ">
            <button
              className="bg-[#1F44CC] rounded-full absolute z-20 right-5 top-5 p-[5px]"
              onClick={() => navigate("/work/settings")}
            >
              <img src="/assets/pen.svg" alt="edit" />
            </button>
            <div className="hexagon4 m-auto md:m-0">
              <img
                src={userImage ? userImage : "assets/images/profileimage.jpeg"}
                alt=""
              />
            </div>
              <div className="">
              <div className="flex justify-between mb-4 md:mb-0 md:block">
                <h2 className="font-[600] sm:text-[25px] text-[20px]">
                  {userDate?.first_name || "Username"}
                </h2>
                <div className="flex items-center gap-2">
                  <img src="/assets/flag.svg" className="w-[18px] " alt="Profil resmi"/>
                  <p className="text-[16px] font-[400]">
                  {userDate?.country || "city"}
                  </p>
                </div>
              </div>
              <div className="flex justify-between mt-2 gap-8">
                <div className="flex items-center flex-col">
                  <p className="text-[16px] sm:text-[18px] font-[600] sm:font-[700]">
                    Point
                  </p>
                  <p className="text-[16px] sm:text-[18px] font-[600] sm:font-[700]">
                    {" "}
                    0000
                  </p>
                </div>
                <div className="flex items-center flex-col">
                  <p className="text-[16px] sm:text-[18px] font-[600] sm:font-[700]">
                    Reports
                  </p>
                  <p className="text-[16px] sm:text-[18px] font-[600] sm:font-[700]">
                    {" "}
                    000
                  </p>
                </div>
                <div className="flex items-center flex-col">
                  <p className="text-[16px] sm:text-[18px] font-[600] sm:font-[700]">
                    Rank
                  </p>
                  <p className="text-[16px] sm:text-[18px] font-[600] sm:font-[700]">
                    {" "}
                    1st
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-[18px] sm:text-[20px] font-[600] sm:font-[700] mt-8 mb-4">
            Bio
          </h2>
          <p className="sm:text-[20px] text-[14px] font-[400]">
            {currentUser?.bio ||
              "Provide detailed information about the company, including its  history, founding date, key milestones, and any notable achievements. This helps establish credibility and builds trust with visitors."}
          </p>
        </div>
        <h2 className="text-[18px] sm:text-[20px] font-[600] sm:font-[700] my-8">
          Hactivity
        </h2>
        <div className=" rounded-[20px] overflow-hidden">
          {fakeData.map((data, i) => (
            <ProfileLine key={i} data={data} index={i} />
          ))}
        </div>
        <div>
          <h2 className="text-[18px] sm:text-[20px] font-[600] sm:font-[700] my-8">
            Contact
          </h2>
          <ul className="space-y-4 max-w-[100px]">
            <li>
              <a href="#" className="flex items-center gap-3">
                <img src="/assets/github.svg" alt="" />
                <p className="text-[18px] font-[600]">Github</p>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3">
                <img src="/assets/twitter.svg" alt="" />
                <p className="text-[18px] font-[600]">Twitter</p>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3">
                <img src="/assets/website.svg" alt="" />
                <p className="text-[18px] font-[600]">Website</p>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-3">
                <img src="/assets/linkedin.svg" alt="" />
                <p className="text-[18px] font-[600]">Linkedin</p>
              </a>
            </li>
          </ul>
        </div>
        <Button
          className="hover:scale-110 transition-all duration-300  rounded-xl  w-[200px] h-[50px] sm:h-[50px]   sm:w-[200px] bg-[#2451F5] text-white  sm:text-[18px] font-[600] text-[16px]   hover:bg-[#2451F5] mt-8 gap-4"
          onClick={() => {
            localStorage.removeItem("user");
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
  );
}
