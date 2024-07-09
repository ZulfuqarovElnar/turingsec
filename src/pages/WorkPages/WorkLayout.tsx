import { Outlet, useNavigate } from "react-router";
import Navbar from "../../components/shared/WorkerShared/Navbar";
import { useCurrentUser } from "../../context/CurrentUser";
import { useEffect, useState } from "react"; // Import useState

import SpinnerLoader from "../../components/component/SpinnerLoader";

export default function WorkLayout() {
  const [load, setLoad] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, 1000);
  }, []); // useEffect sadece ilk renderde çalışsın diye boş dependency array kullanıldı

  useEffect(() => {
    if (currentUser && load) {
    
    }
  }, [currentUser, load, navigate]); // currentUser veya load değiştiğinde useEffect tekrar çalışsın

  // Render the component only if currentUser is defined and activated
  if (!load) {
    return (
      <div className="flex items-center justify-center bg-[#1E1E1E] h-screen">
        <SpinnerLoader />
      </div>
    );
  }
  return (
    <div className="font-sans relative md:ml-[270px] ml-[74px] flex">
      <Navbar />
      <Outlet />
    </div>
  );
}
