import { useEffect, useState } from "react";
import Box from "../../components/component/Worker/Box";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const percentage = 66;
export default function Dashboard() {
  const [lengthres, setLengthres] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const userString = localStorage.getItem("user");
       
      if (!userString) {
        // Handle case where user data is not found in localStorage
        console.error("User data not found in localStorage");
        return;
      }

      const user = JSON.parse(userString);
      
      const accessToken = user.accessToken || '';
    

      try {
        const apiUrl = import.meta.env.VITE_APP_BASE_URL;
        const res = await fetch(
          `${apiUrl}/api/auth/programs`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!res.ok) { 
          throw new Error("Wrong response");
        }

        const data = await res.json();
        setLengthres(data.length);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  
  return (
    <div className="text-white flex-1 flex flex-col overflow-hidden relative">
      <section className="   font-[800] bg-[#200F23] h-[124px] flex items-center justify-center overflow-hidden ">
        <img
          src="/assets/iconnav1.svg"
          alt=""
          className="absolute z-[20] lg:-left-[10%] md:-left-[34%] sm:-left-[100px] top-0 w-[294px] md:w-[392px] -left-[150px]  "
        />
        <p className="md:text-[30px] text-[20px]"> DASHBOARD</p>
        <img
          src="/assets/iconnav2.svg"
          alt=""
          className="absolute z-[20] md:-right-[60px] top-0 lg:right-0 sm:-right-[10%] -right-[20%]   overflow-hidden w-[204px] md:w-[242px]"
        />
      </section>

      <div className="bg-[url(/assets/images/bg-hacker.png)] bg-center bg-no-repeat bg-cover flex-1 lg:px-20 sm:px-8 px-3 py-16">
        {/* <h1 className="font-[600] text-[25px] mb-2">No Reports Found</h1> */}
        <p className="text-[20px] font-[400]">
          Discover the programs and start hunting to report your first
          vulnerability
        </p>
        <div className="my-8 grid gap-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-2 xl:w-[60%] w-full ">
          <Box text="Max Bounty" />
          <Box text="Total Bounty" data={lengthres} />
          <Box text="Average Bounty" />
          <Box text="Submitted Reports" />
          <Box text="Collaborated Reports" />
          <Box text="Closed Reports" />
        </div>
        <div className="flex flex-sm-col items-center justify-around bg-[#885389] rounded-[20px] border-[#2451F5] py-[40px] px-[20px]">
          {/* <Box text="Report Bounty" />
          <Box text="Accepted invitations for Bug Bounty" />
          <Box text="Accepted invitations for Bug Bounty" /> */}
         <div style={{ width: 100 }} className="text-center">
         <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              strokeLinecap: 'round',
              textSize: '16px',
              pathColor: `#660867`,
              textColor: '#fff',
              trailColor: '#3D0436',
            })}/>
            <p className="my-2 text-[16px] font-[600]">Success Rate</p>
          </div>
          
          <div className={`flex items-center `}>
              <div className="flex flex-col items-center" >
                <div className="flex items-center gap-4 my-5">
                  <div className="bg-[#3D0436] h-[8px] w-[80px] rounded-full">
                    <div
                        className={`bg-[#FFDE31] h-[8px] w-[60px] rounded-full`}
                    ></div>
                  </div>
                  <p className="sm:text-[18px] text-[14px] font-[500]">
                        Low
                  </p>
                </div>
                <div className="w-[40px] flex items-center justify-center text-[16px] font-[500] h-[40px] bg-[#3D0436] rounded-full">6</div>
              </div>
          </div>

          <div className={`flex items-center `}>
              <div className="flex flex-col items-center" >
                <div className="flex items-center gap-4 my-5">
                <div className="bg-[#3D0436] h-[8px] w-[80px] rounded-full">
                    <div
                      className={`bg-[#2342E3] h-[8px] w-[60px] rounded-full`}
                    ></div>
                  </div>

                  <p className="sm:text-[18px] text-[14px] font-[500]">
                    Medium
                  </p>
                </div>
                <div className="w-[40px] flex items-center justify-center text-[16px] font-[500] h-[40px] bg-[#3D0436] rounded-full">6</div>
              </div>
          </div>

          <div className={`flex items-center `}>
              <div className="flex flex-col items-center" >
                <div className="flex items-center gap-4 my-5">
                <div className="bg-[#3D0436] h-[8px] w-[80px] rounded-full">
                    <div
                      className={`bg-[#5AFF31] h-[8px] w-[60px] rounded-full`}
                    ></div>
                  </div>

                  <p className="sm:text-[18px] text-[14px] font-[500]">High</p>
                
                </div>
                <div className="w-[40px] flex items-center justify-center text-[16px] font-[500] h-[40px] bg-[#3D0436] rounded-full">6</div>
              </div>
          </div>

          <div className={`flex items-center `}>
              <div className="flex flex-col items-center" >
                <div className="flex items-center gap-4 my-5">
                <div className="bg-[#3D0436] h-[8px] w-[80px] rounded-full">
                    <div
                      className={`bg-[#E32323] h-[8px] w-[60px] rounded-full`}
                    ></div>
                  </div>

                  <p className="sm:text-[18px] text-[14px] font-[500]">
                    Critical
                  </p>
                </div>
                <div className="w-[40px] flex items-center justify-center text-[16px] font-[500] h-[40px] bg-[#3D0436] rounded-full">6</div>
              </div>
          </div>
          
          
          
        </div>
      </div>
    </div>
  );
}
