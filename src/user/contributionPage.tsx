import CustomTable from "@/components/ui/table";
import SideBar from "@/components/ui/sideBar"
import DashboardIcon from "../assets/icons/category.svg"
import ContributionIcon from "../assets/icons/money-add.svg";
import RefreshIcon from "../assets/icons/refresh-2.svg";
import SettingIcon from "../assets/icons/setting.svg"
import NavBar from "@/components/ui/navBar";

type Status = "Paid" | "Pending" | "Upcoming";
const paymentData = [
  { month: "January", amount: "NGN10,000", status: "Paid", datePaid: "20th Jan, 2025", receiptLink: "#" },
  { month: "February", amount: "NGN10,000", status: "Pending", datePaid: "20th Jan, 2025", receiptLink: "#" },
  { month: "March", amount: "NGN10,000", status: "Paid", datePaid: "20th Jan, 2025", receiptLink: "#" },
  { month: "April", amount: "NGN10,000", status: "Upcoming", datePaid: "20th Jan, 2025", receiptLink: "#" },
];

const columns = [
  { header: "Month", accessor: "month" },
  { header: "Amount", accessor: "amount" },
  {
    header: "Status",
    accessor: "status",
    render: (status: string) => {
      const colors: Record<Status, string> = {
        Paid: "bg-green-100 text-green-700",
        Pending: "bg-yellow-100 text-yellow-700",
        Upcoming: "bg-blue-100 text-blue-700",
      };
      return <div className={` rounded-lg text-center  text-sm ${colors[status as Status]}`}>{status}</div>;
    },
  },
  { header: "Date Paid", accessor: "datePaid" },
  {
    header: "Receipt",
    accessor: "receiptLink",
    render: (link: string) => (
      <a href={link} className="text-blue-600 underline">
        Download Receipt
      </a>
    ),
  },
];

const ContributionPage = () => {
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
                <div className="mb-6">
                    <h2 className="text-[22px] font-semibold mb-4">Contributions</h2>
                    <p className="text-[18px]">Status for this month: Pending</p>
                </div>

                <div className="flex items-center text-center gap-3" >
                    <h2 className="text-[22px] font-medium mb-4">Contribution History</h2>
                    <hr className="w-[859px] border-gray-500 border-1" />
                </div>
                <CustomTable columns={columns} data={paymentData} />  
            </div>
        </div>
    </div>
    )
};

export default ContributionPage;
