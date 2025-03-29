import Card from "@/components/ui/card";
import DollarIcon from "@/assets/icons/dollar-square.svg";
import People from "@/assets/icons/people.svg";
import NotifsBing from "@/assets/icons/notification-bing.svg";

import { useQuery } from "@tanstack/react-query";
import { UserService } from "@/services/user-service";
import { Loader2 } from "lucide-react";

export default function Dashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dasboard-data"],
    queryFn: UserService.dashboardData,
  });

  console.log(data);

  if (isLoading) {
    return (
      <div className="flex items-center flex-col justify-center h-[80vh]">
        <Loader2 className="w-16 h-16 animate-spin" />
        <h1 className="text-lg">Loading...</h1>
      </div>
    );
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <>
      <div className="text-[22px] font-semibold mb-4">
        <h2>DashBoard</h2>
      </div>
      {data && (
        <>
          <div className="flex gap-4 mb-24">
            {/* <Card
              icon={
                <img
                  src={DollarIcon}
                  alt="Dollar Icon"
                  className="w-[20px] h-[20px] "
                />
              }

            /> */}
            <Card
              icon={
                <img
                  src={DollarIcon}
                  alt="Dollar Icon"
                  className="w-[20px] h-[20px] "
                />
              }
              amount={data.amount_contributed}
              description="Total Amount Contributed"
              tag="This Year"
            />
            <Card
              icon={
                <img
                  src={People}
                  alt="Dollar Icon"
                  className="w-[20px] h-[20px] "
                />
              }
              amount={data.member_contribution_status}
              description="Members' Contribution Status"
              tag={data.group?.name}
            />
            <Card
              icon={
                <img
                  src={NotifsBing}
                  alt="Dollar Icon"
                  className="w-[20px] h-[20px] "
                />
              }
              amount={data.countdown}
              description="Countdown to Deadline"
              actionText="Make Payment"
              onActionClick={() => alert("Payment Process Initiated!")}
              disabled={data.is_my_turn}
            />
          </div>
        </>
      )}

      <div className="text-[22px] font-medium mb-4">
        <h2>Upcoming Payments</h2>
      </div>
      <div className="flex gap-6 "></div>
    </>
  );
}
