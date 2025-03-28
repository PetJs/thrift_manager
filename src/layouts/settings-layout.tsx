import SettingNav from "@/components/ui/settings-nav";
import { Outlet } from "react-router-dom";

export default function SettingLayout() {
    

    const settingItems = [
        { label: "My Profile", path: "/users/settings/profile" },
        { label: "Payment and Bank Details", path: "/users/settings/payment-details" },
        { label: "Notification Prefrences", path: "/users/settings/notification" },
        { label: "Security Settings", path: "/users/settings/security" },
    ]
      
    return (
        <main className="flex relative">
            <div className="flex-1 relative">
                    <div>
                        <h2 className="text-[22px] font-bold">Settings</h2>
                        <SettingNav items={settingItems}/>
                    </div>
                    <Outlet />
            </div>
        </main>
    )
}