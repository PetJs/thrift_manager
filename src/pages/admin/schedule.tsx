import CustomTable from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";



type Status = "Paid" | "Unpaid" ;
type RStatus = "Upcoming" | "Received";
const payoutData = [
    { position: "1st", memberName: "John Doe", payoutMonth: "20th Jan, 2025", contributionStatus: "Unpaid", payoutStatus: "Received" },
    { position: "1st", memberName: "John Doe", payoutMonth: "20th Jan, 2025", contributionStatus: "Paid", payoutStatus: "Received" },
    { position: "1st", memberName: "John Doe", payoutMonth: "20th Jan, 2025", contributionStatus: "Paid", payoutStatus: "Upcoming" },
  ];
  
  const payoutColumns = [
    { header: "Position", accessor: "position" },
    { header: "Member Name", accessor: "memberName" },
    { header: "Payout Month", accessor: "payoutMonth" },
    {
      header: "Contribution Status",
      accessor: "contributionStatus",
      render: (status: string) => {
        const colors: Record<Status, string> = {
          Unpaid: "bg-red-100 text-red-700",
          Paid: "bg-green-100 text-green-700",
        };
        return <span className={`px-3 py-1 rounded-full text-sm ${colors[status as Status]}`}>{status}</span>;
      },
    },
    {
      header: "Payout Status",
      accessor: "payoutStatus",
      render: (status: string) => {
        const colors: Record<RStatus, string>  = {
          Received: "bg-blue-100 text-blue-700",
          Upcoming: "bg-yellow-100 text-yellow-700",
        };
        return <span className={`px-3 py-1 rounded-full text-sm ${colors[status as RStatus]}`}>{status}</span>;
      },
    },
  ];
  
  const AdminSchedule = () => {
    const handleSelect = (value: string) => {
        console.log("Selected value:", value);
    };
    return (
        <div>
            <div className="mb-6 flex flex-col gap-2">
              <h2 className="text-[22px] font-semibold mb-4">Rotation Schedule</h2>
              <div className="w-32">
                    <Select onValueChange={handleSelect} >
                        <SelectTrigger className="w-full bg-gray-300 text-white">
                            <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="group1">Group 1</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex gap-4">
                    <div className="bg-white shadow-md rounded-lg flex justify-center flex-col p-2 w-[295px] h-[96px] ">
                        <p>Target| Month</p>
                        <p className="text-[18px] font-semibold text-black">NGN ###/###</p>
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4 w-[295px] h-[96px] flex flex-col justify-center ">
                        <p>Payout Member| Month</p>
                        <p className="text-[18px] font-semibold text-black">Name | X Position</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center text-center gap-3" >
                <h2 className="text-[22px] mb-4">Rotation Schedule List</h2>
                <hr className="w-[859px] border-gray-300 border-1" />
            </div>
            <CustomTable columns={payoutColumns} data={payoutData} />
        </div>     
    )
  }
  
  export default AdminSchedule;
  