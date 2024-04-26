import { useState } from "react";
import HactivityLine from "../../components/component/Worker/HactivityLine";
export default function Hactivity() {
  const [page, setPage] = useState(1);
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
  return (
    <div className="text-white flex-1 flex flex-col overflow-hidden min-h-screen relative">
      <section className="   font-[800] bg-[#1F44CC] h-[124px] flex items-center justify-center overflow-hidden ">
        <img
          src="/assets/iconnav7.svg"
          alt=""
          className="absolute z-[20] lg:-left-[10%] md:-left-[27%] sm:-left-[100px] top-0 w-[294px] md:w-[302px] -left-[150px]  "
        />
        <p className="md:text-[30px] text-[20px]">Hactivity</p>
        <img
          src="/assets/iconnav8.svg"
          alt=""
          className="absolute z-[20] md:-right-[0] top-0 sm:-right-[10%] -right-[20%]   overflow-hidden w-[244px] md:w-[232px]"
        />
      </section>
      <div className=" bg-[#1F44CC]  w-full absolute top-0 left-0 h-[30px] text-white"></div>

      <div className="bg-[#1E1E1E] flex-1 lg:px-20 sm:px-8 px-3  py-16">
        <div className="mt-8 rounded-[20px] overflow-hidden">
          {fakeData.map((data, i) => (
            <HactivityLine
              data={data}
              index={i}
              page={page}
              setPage={setPage}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
