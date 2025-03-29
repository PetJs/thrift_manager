import { useState } from "react";
import { useQueries } from "@tanstack/react-query";
import { AdminService } from "@/services/admin-service";
import Card from "@/components/ui/card";
import PaymentNotifCard from "@/components/ui/paymentNotifCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader, Loader2, AlertCircle } from "lucide-react";
import DollarIcon from "@/assets/icons/dollar-square.svg";
import People from "@/assets/icons/people.svg";
import NotifsBing from "@/assets/icons/notification-bing.svg";

export default function AdminDashboard() {
  const [selectValue, setSelectValue] = useState<string | null>(null);
  const [selectedGroup, setSelectedGroup] = useState<string>("");

  const [dashboardQuery, groupsQuery, payoutQuery] = useQueries({
    queries: [
      {
        queryKey: ["admin-dashboard"],
        queryFn: AdminService.getDashboard,
      },
      {
        queryKey: ["groups"],
        queryFn: AdminService.getGroups,
      },
      {
        queryKey: ["payout", selectValue],
        queryFn: () =>
          selectValue ? AdminService.getPayoutSchedule(selectValue) : null,
        enabled: !!selectValue, // Runs only when a group is selected
      },
    ],
  });

  const {
    data: details,
    isLoading: isLoadingDashboard,
    isError: isErrorDashboard,
  } = dashboardQuery;
  const {
    data: groups,
    isLoading: isLoadingGroups,
    isError: isErrorGroups,
  } = groupsQuery;
  const {
    data: payout,
    isLoading: isLoadingPayout,
    isError: isErrorPayout,
  } = payoutQuery;

  // Handle group selection
  const handleGroupSelect = (value: string) => {
    setSelectValue(value);
    const groupName = groups?.find((g) => g.id.toString() === value)?.name;
    setSelectedGroup(groupName || "");
  };

  return (
    <>
      <div className="text-[22px] font-semibold mb-4">
        <h2>Admin Dashboard</h2>
      </div>

      {/* Dashboard Stats */}
      {isLoadingDashboard ? (
        <div className="w-full flex items-center justify-center">
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
        </div>
      ) : isErrorDashboard ? (
        <div className="text-red-500 flex items-center gap-2">
          <AlertCircle className="w-6 h-6" />
          Failed to load dashboard data. Please try again.
        </div>
      ) : details ? (
        <div className="flex gap-4 mb-24">
          <Card
            icon={
              <img
                src={DollarIcon}
                alt="Dollar Icon"
                className="w-[20px] h-[20px]"
              />
            }
            header="Total Members"
            current={`Current Members: ${details.current_members}`}
            next={`New Members This Month: ${details.new_members}`}
            tag="This Month"
            className="bg-blue-600 text-white"
          />
          <Card
            icon={
              <img
                src={DollarIcon}
                alt="Dollar Icon"
                className="w-[20px] h-[20px]"
              />
            }
            header="Total Groups"
            current={`Current Groups: ${details.current_groups}`}
            next={`Active Groups: ${details.active_groups}`}
            tag="This Month"
            className="bg-blue-600 text-white"
          />
          <Card
            icon={
              <img
                src={People}
                alt="People Icon"
                className="w-[20px] h-[20px]"
              />
            }
            header="Finances"
            current={`Total Contributions: NGN ${details.total_contribution}`}
            next={`Total Payouts: ${details.total_payouts}`}
            tag="This Month"
            className="bg-blue-600 text-white"
          />
          <Card
            icon={
              <img
                src={NotifsBing}
                alt="Notification Icon"
                className="w-[20px] h-[20px]"
              />
            }
            header="Contributions"
            current={`Current Members: ${details.members_contributed}`}
            next={`Members pending: ${details.members_contribution_pending}`}
            tag="This Month"
            className="bg-blue-600 text-white"
          />
        </div>
      ) : null}

      {/* Group Selection & Payout Schedule */}
      <div className="text-[22px] font-medium mb-4">
        <h2>Payout Schedule</h2>
        <div className="w-64">
          {isLoadingGroups ? (
            <div className="flex items-center gap-2 text-blue-500">
              <Loader className="w-6 h-6 animate-spin" />
              Loading groups...
            </div>
          ) : isErrorGroups ? (
            <div className="text-red-500 flex items-center gap-2">
              <AlertCircle className="w-6 h-6" />
              Failed to load groups. Please try again.
            </div>
          ) : groups && groups.length > 0 ? (
            <Select onValueChange={handleGroupSelect} value={selectValue || ""}>
              <SelectTrigger className="w-[250px] bg-white text-black border border-gray-300">
                <SelectValue placeholder="Select a group" />
              </SelectTrigger>
              <SelectContent>
                {groups.map((group) => (
                  <SelectItem key={group.id} value={group.id.toString()}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <p className="text-gray-500">No groups available.</p>
          )}
        </div>
      </div>

      {/* Selected Group Display */}
      {selectedGroup && (
        <div className="text-lg text-blue-600 font-semibold mt-2">
          Selected Group: {selectedGroup}
        </div>
      )}

      {/* Payout Information */}
      <div className="flex gap-6 mt-4">
        {isLoadingPayout ? (
          <div className="flex items-center gap-2 text-blue-500">
            <Loader className="w-6 h-6 animate-spin" />
            Loading payout details...
          </div>
        ) : isErrorPayout ? (
          <div className="text-red-500 flex items-center gap-2">
            <AlertCircle className="w-6 h-6" />
            Failed to load payout schedule. Please try again.
          </div>
        ) : payout ? (
          <PaymentNotifCard
            recipient={payout.next_recipient}
            amount={payout.amount}
            date={payout.date}
          />
        ) : (
          <p className="text-gray-500">No payout details available.</p>
        )}
      </div>
    </>
  );
}
