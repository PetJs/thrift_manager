import SettingNav from "@/components/ui/settings-nav";
import { Outlet } from "react-router-dom";

export default function SettingLayout() {
    

    const settingItems = [
        { label: "My Profile", path: "/settings/profile" },
        { label: "Contributions", path: "/contributions" },
        { label: "Rotation Schedule", path: "/schedule" },
        { label: "Settings", path: "/pro" },
    ]
      
    return (
        <main className="flex relative">
            <div className="flex-1 h-screen relative">
                    <div>
                        <h2>Settings</h2>
                        <SettingNav items={settingItems}/>
                    </div>
                    <Outlet />
            </div>
        </main>
    )
}