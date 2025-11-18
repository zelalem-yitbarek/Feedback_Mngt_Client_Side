import Image from "next/image";
import Navbar from "./components/NavBar";
import DashboardCards from "./components/Dashboardcrads";
import RecentUpdates from "./components/RecentUpdate";
import Announcements from "./components/Announcment";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
    <Navbar/>
    <DashboardCards/>
    <RecentUpdates/>
    <Announcements/>
    <Footer/>
    </>
  );
}
