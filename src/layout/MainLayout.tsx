import BottomNavigation from "@/components/BottomNavigation";
import DesktopSidebar from "@/components/DesktopSidebar";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-white">
      <DesktopSidebar />
      <div className="flex flex-col flex-1 min-h-screen md:pb-0 pb-20">
        <Outlet />
      </div>
      <BottomNavigation />
    </div>
  );
};

export default MainLayout;
