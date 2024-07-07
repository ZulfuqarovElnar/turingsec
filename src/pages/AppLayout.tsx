import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

export default function AppLayout() {
  return (
    <div className="font-sans bg-[url(/assets/images/gauze-01.png)] bg-center	bg-no-repeat	bg-cover	">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
