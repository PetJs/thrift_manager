import SideBar from "@/components/ui/sideBar"
import DashboardIcon from "../assets/icons/category.svg"
import ContributionIcon from "../assets/icons/money-add.svg";
import RefreshIcon from "../assets/icons/refresh-2.svg";
import SettingIcon from "../assets/icons/setting.svg"
import NavBar from "@/components/ui/navBar";
import Card from "@/components/ui/card";
import DollarIcon from "../assets/icons/dollar-square.svg"
import People from "../assets/icons/people.svg"
import NotifsBing from "../assets/icons/notification-bing.svg"
import PaymentNotifCard from "@/components/ui/paymentNotifCard";



export default function Dashboard(){
    const data = [
        { recipient: "John Doe", date: "April 20th" },
        { recipient: "Christian Dior", date: "May 20th" },
        { recipient: "You", date: "Jun 20th" },
    ];


    const items = [
        { icon: DashboardIcon, label: "Dashboard", path: "/" },
        { icon: ContributionIcon, label: "Contributions", path: "/contribution-page" },
        { icon: RefreshIcon, label: "Rotation Schedule", path: "/schedule-page" },
        { icon: SettingIcon, label: "Settings", path: "/settings" },
    ];
      
      
    const handleLogout = () => {
        console.log("User logged out");
        // Add logout logic here
    };
        
    return (
        <div className="flex relative">
            <SideBar items={items} onLogout={handleLogout}/>
            <div className="flex-1 h-screen">
                <NavBar/>
                <div className="mt-8 ml-64">
                    <div className="text-[22px] font-semibold mb-4">
                        <h2>DashBoard</h2>
                    </div>
                    <div className="flex gap-4 mb-24">
                        <Card
                            icon={<img src={DollarIcon} alt="Dollar Icon" className="w-[20px] h-[20px] " />}
                            amount="₦0"
                            description="Amount Contributed This Month"
                        />
                        <Card
                            icon={<img src={DollarIcon} alt="Dollar Icon" className="w-[20px] h-[20px] " />}
                            amount="₦100,000"
                            description="Total Amount Contributed"
                            tag="This Year"
                            className="bg-blue-600 text-white"
                        />
                        <Card
                            icon={<img src={People} alt="Dollar Icon" className="w-[20px] h-[20px] " />}
                            amount="10/12 have Contributed"
                            description="Members' Contribution Status"
                            tag="Group 5"
                            className="text-blue-500 text-[15px]"
                        />
                        <Card
                            icon={<img src={NotifsBing} alt="Dollar Icon" className="w-[20px] h-[20px] " />}
                            amount="5 Days Left!"
                            description="Countdown to Deadline"
                            actionText="Make Payment"
                            onActionClick={() => alert("Payment Process Initiated!")}
                        />
                    </div>
                    <div className="text-[22px] font-medium mb-4">
                        <h2>Upcoming Payments</h2>
                    </div>
                    <div className="flex gap-6 ">
                        {data.map((item, index) => (
                            <PaymentNotifCard
                            key={index}
                            recipient={item.recipient}
                            date={item.date}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}