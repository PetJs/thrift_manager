import { useState } from "react";
import Card from "@/components/ui/card";
import DollarIcon from "@/assets/icons/dollar-square.svg";
import People from "@/assets/icons/people.svg";
import NotifsBing from "@/assets/icons/notification-bing.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserService } from "@/services/user-service";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import PaymentModal from "@/components/payment-modal";

export default function Dashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard-data"],
    queryFn: UserService.dashboardData,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [contributionId, setContributionId] = useState<number | null>(null);

  const fundMutation = useMutation({
    mutationFn: async () => {
      if (contributionId && amount) {
        return UserService.fundContribution(contributionId, parseFloat(amount));
      }
      throw new Error("Invalid data");
    },
    onSuccess: () => {
      toast.success("Payment successful!");
      setIsModalOpen(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Payment failed. Try again. Ensure you're in group");
    },
  });

  const handleMakePayment = () => {
    setContributionId(data?.contribution ? data.contribution.id : null);
    setIsModalOpen(true);
  };

  const handleSubmitPayment = () => {
    if (amount) {
      fundMutation.mutate();
    } else {
      toast.error("Please enter an amount.");
    }
  };

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
            <Card
              icon={
                <img
                  src={DollarIcon}
                  alt="Dollar Icon"
                  className="w-[20px] h-[20px]"
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
                  alt="People Icon"
                  className="w-[20px] h-[20px]"
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
                  alt="Notification Icon"
                  className="w-[20px] h-[20px]"
                />
              }
              amount={data.countdown}
              description="Countdown to Deadline"
              actionText="Make Payment"
              onActionClick={handleMakePayment}
              disabled={data.is_my_turn}
            />
          </div>

          {/* Upcoming Payouts */}
          <div className="text-[22px] font-medium mb-4">
            <h2>Upcoming Payments</h2>
          </div>
          <div className="flex flex-col gap-4">
            {data.upcoming_payouts.length > 0 ? (
              data.upcoming_payouts.map((payout, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md"
                >
                  <div>
                    <p className="text-lg font-semibold">{payout.name}</p>
                    <p className="text-sm text-gray-600">
                      Position: {payout.position}
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-blue-600">
                      ${payout.amount}
                    </p>
                    <p className="text-sm text-gray-600">
                      {new Date(payout.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No upcoming payments.</p>
            )}
          </div>

          {/* Payment Modal */}
          <PaymentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            amount={amount}
            setAmount={setAmount}
            onSubmit={handleSubmitPayment}
            isLoading={fundMutation.isPending}
          />
        </>
      )}
    </>
  );
}
