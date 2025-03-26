import NavBar from "@/components/ui/navBar";
import SideBar from "@/components/ui/sideBar";
import DashboardIcon from "../assets/icons/category.svg"
import ContributionIcon from "../assets/icons/money-add.svg";
import RefreshIcon from "../assets/icons/refresh-2.svg";
import SettingIcon from "../assets/icons/setting.svg"
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
    
    const items = [
        { icon: DashboardIcon, label: "Dashboard", path: "/" },
        { icon: ContributionIcon, label: "Contributions", path: "/contributions" },
        { icon: RefreshIcon, label: "Rotation Schedule", path: "/schedule" },
        { icon: SettingIcon, label: "Settings", path: "/settings" },
    ];
      
      
    const handleLogout = () => {
        console.log("User logged out");
        // Add logout logic here
    };

    return (
        <main className="flex relative">
         
            <div className="flex-1 h-screen relative">
                <SideBar items={items} onLogout={handleLogout}/>
                <NavBar />
                <div className="mt-8 w-full md:max-w-[80%] md:absolute md:right-0 md:left-auto">
                    <Outlet />
                </div>
            </div>
            
        </main>
    )
}