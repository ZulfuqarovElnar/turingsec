import { Outlet, useNavigate } from "react-router";
import Navbar from "../../components/shared/WorkerShared/Navbar";
import { useCurrentUser } from "../../context/CurrentUser";
import { useEffect, useState } from "react";
import CompanyNavbar from "../../components/shared/Company/CompanyNavbar";
import SpinnerLoader from "../../components/component/SpinnerLoader";
import { useCurrentCompany } from "../../context/CurrentCompany";

export default function MainLayout() {
  const [load, setLoad] = useState(false);
  setTimeout(() => {
    setLoad(true);
  }, 1000);
  const navigate = useNavigate();
  const { currentCompany } = useCurrentCompany();

  // Add loading state
  useEffect(() => {
    console.log(currentCompany, load);
    if (!currentCompany?.id && load) {
      navigate("/");
      // setLoad(true);
    }
  }, [currentCompany, load]);

  if (!load) {
    return (
      <div className="flex items-center justify-center bg-[#1E1E1E] h-screen">
        <SpinnerLoader />
      </div>
    );
  }

  return (
    <div className="font-sans relative md:ml-[270px] ml-[74px] flex">
      <CompanyNavbar />
      <Outlet />
    </div>
  );
}
