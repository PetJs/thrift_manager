import SettingNav from "@/components/ui/settings-nav";
import { Outlet } from "react-router-dom";

export default function SettingLayout() {
    

    const settingItems = [
        { label: "My Profile", path: "/settings/profile" },
        { label: "Payment and Bank Details", path: "/settings/payment-details" },
        { label: "Rotation Schedule", path: "/schedule" },
        { label: "Settings", path: "/pro" },
    ]
      
    return (
        <main className="flex relative">
            <div className="flex-1  relative">
                    <div>
                        <h2>Settings</h2>
                        <SettingNav items={settingItems}/>
                    </div>
                    <Outlet />
            </div>
        </main>
    )
}