import SideBar from "@/components/ui/sideBar"
import DashboardIcon from "../assets/icons/category.svg"
import ContributionIcon from "../assets/icons/money-add.svg";
import RefreshIcon from "../assets/icons/refresh-2.svg";
import NavBar from "@/components/ui/navBar";

const items = [
  { icon: DashboardIcon, label: "Dashboard", path: "/" },
  { icon: ContributionIcon, label: "Contributions", path: "/contributions" },
  { icon: RefreshIcon, label: "Rotation Schedule", path: "/rotation" },
  { icon: RefreshIcon, label: "Settings", path: "/settings" },
];


const handleLogout = () => {
    console.log("User logged out");
    // Add logout logic here
};
  

export default function Dashboard(){
    return (
        <div className="flex">
            <SideBar items={items} onLogout={handleLogout}/>
            <div className="flex-1">
                <NavBar/>
            </div>
        </div>
    )
}