import ReportElement from "../../components/component/Company/ReportElement";
import { useGetReportsForCompanies } from "../../queryies/useGetReportsForCompany";
import { Link } from "react-router-dom";

export default function ReportCompany() {
  const { data, isError } = useGetReportsForCompanies();
  // console.log(data);
  return (
    <div className="text-white flex-1 flex flex-col overflow-hidden relative h-screen">
      <section className="font-[800] bg-[#200F23] h-[124px] flex items-center justify-center overflow-hidden ">
        <img
          src="/assets/iconnav11.svg"
          alt=""
          className="absolute z-[20] lg:-left-[10%] md:-left-[20%] sm:-left-[70px] top-0 w-[224px] md:w-[262px] -left-[100px]  "
        />
        <p className="md:text-[30px] text-[20px]"> Reports</p>
        <img
          src="/assets/iconnav12.svg"
          alt=""
          className="absolute z-[20] md:-right-[60px] top-0 lg:right-0 sm:-right-[10%] -right-[10%]   overflow-hidden w-[144px] md:w-[182px]"
        />
      </section>

      <div className="bg-[#1E1E1E] h-full flex-1 lg:px-20 sm:px-8 px-3  py-16">
        <h2 className="sm:text-[25px] font-[700] text-[20px] mb-6">
          Incoming Reports
        </h2>
        
        <div className="grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-4 ">
          {/* {isPending && <p>Loading...</p>} */}
          {isError && <p>Error</p>}
         
          {data && Array.isArray(data) && data.map((user) => (
            user.reports.map((report) => (
                <Link to={`single-report/${report.id}`} key={report.id}>
                <ReportElement
                  key={report.id}
                  name={user.user.username}
                  img={user.userImgUrl}
                />
                </Link>
            ))
          ))}

        </div>
      </div>
    </div>
  );
}
