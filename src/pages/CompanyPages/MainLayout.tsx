import { Outlet, useNavigate } from "react-router";
import Navbar from "../../components/shared/WorkerShared/Navbar";
import { useCurrentUser } from "../../context/CurrentUser";
import { useEffect, useState } from "react";
import CompanyNavbar from "../../components/shared/Company/CompanyNavbar";
import SpinnerLoader from "../../components/component/SpinnerLoader";
import { useCurrentCompany } from "../../context/CurrentCompany";

export default function MainLayout() {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const { currentCompany } = useCurrentCompany();

  // Component mount edildiğinde load durumunu true yap
  useEffect(() => {
    setLoad(true);
  }, []);

  // currentCompany ve load durumuna göre yönlendirme yap
  useEffect(() => {
    if (currentCompany !== undefined && load) {
      if (!currentCompany?.id) {
        navigate("/company/dashboard");
      }
    }
  }, [currentCompany, load, navigate]);

  // Eğer bileşen yüklenmediyse, yükleme ekranını göster
  if (!load) {
    return (
      <div className="flex items-center justify-center bg-[#1E1E1E] h-screen">
        <SpinnerLoader />
      </div>
    );
  }

  // Bileşen yüklendiyse, ana içeriği göster
  return (
    <div className="font-sans relative md:ml-[270px] ml-[74px] flex">
      <CompanyNavbar />
      <Outlet />
    </div>
  );
}
