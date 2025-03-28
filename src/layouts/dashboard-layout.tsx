import NavBar from "@/components/ui/navBar";
import SideBar from "@/components/ui/sideBar";
import DashboardIcon from "../assets/icons/category.svg";
import ContributionIcon from "../assets/icons/money-add.svg";
import RefreshIcon from "../assets/icons/refresh-2.svg";
import SettingIcon from "../assets/icons/setting.svg";
import { Outlet } from "react-router-dom";
import useUserStore from "@/store/user-store";

export default function DashboardLayout() {
//   const items = [
//     { icon: DashboardIcon, label: "Dashboard", path: "/users/dashboard" },
//     { icon: ContributionIcon, label: "Contributions", path: "/users/contributions" },
//     { icon: RefreshIcon, label: "Rotation Schedule", path: "/users/schedule" },
//     { icon: SettingIcon, label: "Settings", path: "/users/settings/profile" },
//   ];

    const adminitems = [
        { icon: DashboardIcon, label: "Dashboard", path: "/admin/dashboard" },
        { icon: RefreshIcon, label: "Rotation Schedule", path: "/admin/schedule" },
        { icon: ContributionIcon, label: "Groups", path: "/admin/groups" },
        { icon: SettingIcon, label: "Settings", path: "/admin/settings/profile" },
    ];

  const { reset } = useUserStore();

  const handleLogout = () => {
    console.log("User logged out");
    reset();
  };

  return (
    <main className="flex relative">
      <div className="flex-1 h-screen relative">
        {/* <SideBar items={items} className=" text-white" onLogout={handleLogout} />  */}
        <SideBar items={adminitems} className=" text-white" onLogout={handleLogout} /> 
        <NavBar />
        <div className="mt-8 mr-4 w-full md:max-w-[80%] md:absolute md:right-0 md:left-auto">
          <Outlet />
        </div>
      </div>
    </main>
  );
}
