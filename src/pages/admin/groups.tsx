import { Button } from "@/components/ui/button";
import CustomTable from "@/components/ui/table";

type Status = "Active" | "Inactive";
const payoutData = [
    { groupNo: "1", members: 12, dateCreated: "28/9/23", paymentRecord: { name: "John Doe", position: "4th Position", date: "23/09/2024" }, status: "Active" },
    { groupNo: "2", members: 12, dateCreated: "28/9/23", paymentRecord: { name: "Jane Smith", position: "2nd Position", date: "22/09/2024" }, status: "Inactive" },
    { groupNo: "3", members: 12, dateCreated: "28/9/23", paymentRecord: null, status: "Inactive" },
  ];
  
  
  const payoutColumns = [
    { header: "Group Number", accessor: "groupNo" },
    { header: "Members", accessor: "members" },
    { header: "Payout Month", accessor: "dateCreated" },
    {
        header: "Last paid/Date paid", 
        accessor: "paymentRecord",
        render: (paymentRecord: { name: string, position: string, date: string } | null) => {
          if (!paymentRecord) return '-';
          return (
            <div className="flex flex-col text-left">
              <div className="text-[18px] font-semibold">{paymentRecord.name} | {paymentRecord.position}</div>
              <div>{paymentRecord.date}</div>
            </div>
          );
        }
      },
    {
      header: "Status",
      accessor: "status",
      render: (status: string) => {
        const colors: Record<Status, string>  = {
          Inactive: "bg-blue-100 text-blue-700",
          Active: "bg-yellow-100 text-yellow-700",
        };
        return <span className={`px-3 py-1 rounded-full text-sm ${colors[status as Status]}`}>{status}</span>;
      },
    },
  ];
  
  const GroupsPage = () => {
    return (
        <div>
            <div className="mb-6 flex items-center gap-6">
              <h2 className="text-[22px] font-semibold mb-4">All Groups</h2>
              <hr className="w-[950px] border-gray-300 border-1" />
            </div>
            <div className="flex flex-col">
                <Button className="ml-auto bg-blue-700 mb-8">Create New Group</Button>
                <CustomTable columns={payoutColumns} data={payoutData} />
            </div>
        </div>     
    )
  }
  
  export default GroupsPage;
  