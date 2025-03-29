import { Button } from "@/components/ui/button";
import CustomTable from "@/components/ui/table";
import CreateGroupModal from "./createGroup";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import Hamburger from "@/assets/icons/hamburger.svg";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AdminService } from "@/services/admin-service";
import { Loader2 } from "lucide-react";
import useUserStore from "@/store/user-store";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { Group, TableColumn } from "@/lib/types";

type Status = "active" | "inactive";

const payoutColumns: TableColumn[] = [
  { header: "Group Number", accessor: "id" },
  { header: "Name", accessor: "name" },
  {
    header: "Payout Month",
    accessor: "date_created",
    render: (date_created: Date) => {
      const month = new Date(date_created).toLocaleString("en", {
        month: "long",
      });
      return <p>{month}</p>;
    },
  },
  {
    header: "Status",
    accessor: "status",
    render: (status: string) => {
      const colors: Record<Status, string> = {
        inactive: "bg-yellow-100 text-yellow-700",
        active: "bg-blue-100 text-blue-700",
      };
      return (
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            colors[status as "active" | "inactive"]
          }`}
        >
          {status}
        </span>
      );
    },
  },
  {
    header: "",
    accessor: "id",
    render: (id: Group) => {
      if (!id) return <span>No data</span>;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-gray-500">
              <img src={Hamburger} alt="hamburger.svg" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link to={`/admin/groups/${id}`}>
              <DropdownMenuItem>View Group</DropdownMenuItem>
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
      );
    },
  },
];

const GroupsPage = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["groups"],
    queryFn: AdminService.getGroups,
  });

  const createGroupMutation = useMutation({
    mutationFn: AdminService.createGroup,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
      toast.success("group created successfully");
    },
    onError(err) {
      toast.error(
        // @ts-expect-error - ""
        (err as AxiosError).response?.data.message || "Something went wrong"
      );
    },
  });

  const { user } = useUserStore();

  const handleCreateGroup = (groupData: {
    name: string;
    contributionAmount: string;
    description: string;
  }) => {
    createGroupMutation.mutate({
      ...groupData,
      contribution_amount: groupData.contributionAmount,
      status: "active",
      created_by: user?.id as number,
    });
  };

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center gap-6">
        <h2 className="text-[22px] font-semibold mb-4">All Groups</h2>
        <hr className="w-[950px] border-gray-300 border-1" />
      </div>
      <div className="flex flex-col pb-20">
        <Button
          className="ml-auto bg-blue-700 mb-8 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          Create New Group
        </Button>
        {isLoading ? (
          <div className="flex items-center flex-col justify-center h-[80vh]">
            <Loader2 className="w-16 h-16 animate-spin" />
            <h1 className="text-lg">Loading...</h1>
          </div>
        ) : (
          data && <CustomTable columns={payoutColumns} data={data} />
        )}
        <CreateGroupModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateGroup}
          disabled={createGroupMutation.isPending}
        />
      </div>
    </div>
  );
};

export default GroupsPage;
