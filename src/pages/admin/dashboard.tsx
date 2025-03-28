import Card from "@/components/ui/card";
import DollarIcon from "@/assets/icons/dollar-square.svg"
import People from "@/assets/icons/people.svg"
import NotifsBing from "@/assets/icons/notification-bing.svg"
import PaymentNotifCard from "@/components/ui/paymentNotifCard";

export default function AdminDashboard() {
    const data = [
        { recipient: "John Doe", date: "April 20th", amount: "#80,000" },
    ];

    return (
        <>
            <div className="text-[22px] font-semibold mb-4">
                <h2>DashBoard</h2>
            </div>
            <div className="flex gap-4 mb-24">
                <Card
                    icon={<img src={DollarIcon} alt="Dollar Icon" className="w-[20px] h-[20px] " />}
                    header="Total Members"
                    current="Current Members: 200"
                    next="New Members This Month: 15"
                    tag="This Year"
                    className="bg-blue-600 text-white"
                />
                <Card
                    icon={<img src={DollarIcon} alt="Dollar Icon" className="w-[20px] h-[20px] " />}
                    header="Total Members"
                    current="Current Members: 200"
                    next="New Members This Month: 15"
                    tag="This Year"
                    className="bg-blue-600 text-white"
                />
                <Card
                    icon={<img src={People} alt="Dollar Icon" className="w-[20px] h-[20px] " />}
                    header="Total Members"
                    current="Current Members: 200"
                    next="New Members This Month: 15"
                    tag="This Year"
                    className="bg-blue-600 text-white"
                />
                <Card
                    icon={<img src={NotifsBing} alt="Dollar Icon" className="w-[20px] h-[20px] " />}
                    header="Total Members"
                    current="Current Members: 200"
                    next="New Members This Month: 15"
                    tag="This Year"
                    className="bg-blue-600 text-white"
                />
            </div>
            <div className="text-[22px] font-medium mb-4">
                <h2>Payout Schedule</h2>
            </div>
            <div className="flex gap-6 ">
                {data.map((item, index) => (
                    <PaymentNotifCard
                        key={index}
                        recipient={item.recipient}
                        amount={item.amount}
                        date={item.date}
                    />
                ))}
            </div>
        </>
    )
}