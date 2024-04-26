import { Outlet } from "react-router";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

export default function AppLayout() {
  return (
    <div className="font-sans">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
