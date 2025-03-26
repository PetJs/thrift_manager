import CustomTable from "@/components/ui/table";


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
  
  const SchedulePage = () => {
    return (
        <div>
            <CustomTable columns={payoutColumns} data={payoutData} />
        </div>     
    )
  }
  
  export default SchedulePage;
  