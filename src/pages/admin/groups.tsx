import { Button } from "@/components/ui/button";
import CustomTable from "@/components/ui/table";
import CreateGroupModal from "./createGroup";
import { useState } from "react";
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import Hamburger from "@/assets/icons/hamburger.svg"
import { Link } from "react-router-dom";


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
        if (!paymentRecord) return "-";
        return (
          <div className="flex flex-col text-left">
            <div className="text-[18px] font-semibold">
              {paymentRecord.name} | {paymentRecord.position}
            </div>
            <div>{paymentRecord.date}</div>
          </div>
        );
      },
    },
    {
      header: "Status",
      accessor: "status",
      render: (status: string) => {
        const colors: Record<Status, string> = {
          Inactive: "bg-blue-100 text-blue-700",
          Active: "bg-yellow-100 text-yellow-700",
        };
        return (
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              colors[status as "Active" | "Inactive"]
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "",
      accessor: "actions",
      render: () => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-gray-500">
              <img src={Hamburger} alt="hamburger.svg" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link to="/admin/settings/profile">
                <DropdownMenuItem
                >
                View Group
                </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={() => console.log("Mark as Inactive")}>
              Mark as Inactive
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Mark as Closed")}>
              Mark as Closed
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Send Reminder")}>
              Send Reminder
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];
  
  const GroupsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCreateGroup = (groupData: {
        groupNumber: string;
        contributionAmount: string;
        members: string[];
    }) => {
        console.log("New Group Created:", groupData);
    };
    return (
        <div>
            <div className="mb-6 flex items-center gap-6">
              <h2 className="text-[22px] font-semibold mb-4">All Groups</h2>
              <hr className="w-[950px] border-gray-300 border-1" />
            </div>
            <div className="flex flex-col">
                <Button className="ml-auto bg-blue-700 mb-8 cursor-pointer" onClick={() => setIsModalOpen(true)}>Create New Group</Button>
                <CustomTable columns={payoutColumns} data={payoutData} />
                <CreateGroupModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleCreateGroup}
                />
            </div>
        </div>     
    )
  }
  
  export default GroupsPage;
  