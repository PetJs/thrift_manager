import SettingNav from "@/components/ui/settings-nav";
import { Outlet } from "react-router-dom";

export default function AdminSettingsLayout() {
    

    const settingItems = [
        { label: "My Profile", path: "/admin/settings/profile" },
        { label: "Payment and Bank Details", path: "/admin/settings/payment-details" },
        { label: "Notification Prefrences", path: "/admin/settings/notification" },
        { label: "Security Settings", path: "/admin/settings/security" },
        { label: "General Settings", path: "/admin/settings/general" },
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