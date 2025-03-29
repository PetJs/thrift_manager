import CustomTable from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { AdminService } from "@/services/admin-service";
import { Loader, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Hamburger from "@/assets/icons/hamburger.svg";
import { toast } from "sonner";

type Status = "Paid" | "Unpaid";
type RStatus = "Upcoming" | "Received";

const AdminSchedule = () => {
  const [selectValue, setSelectValue] = useState("");
  const sendPayoutMutation = useMutation({
    mutationFn: AdminService.disburseFund,
    onError: (err) => {
      console.error("Unable to send payout", err);
      toast.error("Unable to send payout");
    },
    onSuccess: () => {
      toast.success("Payout sent");
    },
  });

  const sendReminderMutation = useMutation({
    mutationFn: AdminService.sendReminder,
    onError: (err) => {
      console.error("Unable to send reminder", err);
      toast.error("Unable to send reminder");
    },
    onSuccess: () => {
      toast.success("Reminder sent");
    },
  });

  const payoutColumns = useMemo(
    () => [
      { header: "Position", accessor: "position" },
      { header: "Amount", accessor: "amount" },
      { header: "Payout Month", accessor: "end_date" },
      {
        header: "Contribution Status",
        accessor: "status",
        render: (status: string) => {
          const colors: Record<Status, string> = {
            Unpaid: "bg-red-100 text-red-700",
            Paid: "bg-green-100 text-green-700",
          };
          return (
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                colors[status as Status]
              }`}
            >
              {status}
            </span>
          );
        },
      },
      {
        header: "Payout Status",
        accessor: "payout_status",
        render: (status: string) => {
          const colors: Record<RStatus, string> = {
            Received: "bg-blue-100 text-blue-700",
            Upcoming: "bg-yellow-100 text-yellow-700",
          };
          return (
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                colors[status as RStatus]
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
        render: (id: string) => {
          if (!id) return <span>No data</span>;

          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-gray-500">
                  <img src={Hamburger} alt="hamburger.svg" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => sendReminderMutation.mutate(parseInt(id))}
                >
                  Send Reminder
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Mark as Closed")}>
                  Deduct Automatically
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    console.log("sending payout");
                    sendPayoutMutation.mutate(parseInt(id));
                  }}
                >
                  Send Payout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [sendPayoutMutation, sendReminderMutation]
  );

  const { data: groups, isLoading } = useQuery({
    queryKey: ["groups"],
    queryFn: AdminService.getGroups,
  });

  const { data: details, isLoading: isGroupDataLoading } = useQuery({
    queryKey: ["contributions", selectValue],
    queryFn: () => AdminService.getContributionById(parseInt(selectValue)),
    enabled: !!selectValue,
  });

  return (
    <div>
      <div className="mb-6 flex flex-col gap-2">
        <h2 className="text-[22px] font-semibold mb-4">Rotation Schedule</h2>
        <div className="w-32">
          {isLoading ? (
            <div>
              <Loader className="w-12 h-12 animate-spin text-blue-500 p-2" />
              Loading groups
            </div>
          ) : (
            groups && (
              <Select
                onValueChange={(v) => setSelectValue(v)}
                value={selectValue}
              >
                <SelectTrigger className="w-[250px] text-white">
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((group, i) => (
                    <SelectItem value={group.id.toString()} key={i}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )
          )}
        </div>
        <div className="flex gap-4">
          <div className="bg-white shadow-md rounded-lg flex justify-center flex-col p-2 w-[295px] h-[96px] ">
            <p>Target| Month</p>
            <p className="text-[18px] font-semibold text-black">NGN ###/###</p>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 w-[295px] h-[96px] flex flex-col justify-center ">
            <p>Payout Member| Month</p>
            <p className="text-[18px] font-semibold text-black">
              Name | X Position
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center text-center gap-3">
        <h2 className="text-[22px] mb-4">Rotation Schedule List</h2>
        <hr className="w-[859px] border-gray-300 border-1" />
      </div>
      {isGroupDataLoading ? (
        <div className="flex justify-center w-full">
          <Loader2 className="  w-14 h-14 text-blue-400 animate-spin" />
        </div>
      ) : details && details.length > 0 ? (
        <CustomTable columns={payoutColumns} data={details} />
      ) : (
        <div className="text-center">No Data found, switch groups</div>
      )}
    </div>
  );
};

export default AdminSchedule;
