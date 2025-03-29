import { useState, useEffect } from "react";
import Card from "@/components/ui/card";
import DollarIcon from "@/assets/icons/dollar-square.svg";
import People from "@/assets/icons/people.svg";
import NotifsBing from "@/assets/icons/notification-bing.svg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserService } from "@/services/user-service";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import useUserStore from "@/store/user-store";
import { PAYSTACK_PUBLIC_KEY } from "@/lib/constant";
import { formatToNaira } from "@/lib/types";

export default function Dashboard() {
  const [, setPaymentAmount] = useState<number | null>(null);

  // Load Paystack script
  useEffect(() => {
    if (!document.getElementById("paystack-script")) {
      const script = document.createElement("script");
      script.id = "paystack-script";
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;

      script.onload = () => console.log("Paystack script loaded successfully");
      script.onerror = () => toast.error("Payment system could not be loaded");

      document.body.appendChild(script);
    }
  }, []);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["dashboard-data"],
    queryFn: UserService.dashboardData,
  });

  const fundContributionMutation = useMutation({
    mutationFn: async ({
      contribution_id,
      amount,
    }: {
      contribution_id: number;
      amount: number;
    }) => UserService.fundContribution(contribution_id, amount),
    onSuccess: () => {
      toast.success("Contribution funded successfully!");
      refetch();
    },
    onError: () => {
      toast.error("Failed to fund contribution.");
    },
  });

  const { user } = useUserStore();

  const handleMakePayment = () => {
    if (!data?.contribution) {
      toast.error("No contribution found.");
      return;
    }

    // Prompt user for amount
    const userInput = window.prompt("Enter the amount to contribute:");

    if (!userInput) {
      toast.info("Payment canceled.");
      return;
    }

    const amount = parseFloat(userInput);

    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    setPaymentAmount(amount);

    if (!(window as any).PaystackPop) {
      toast.error("Payment system is not ready. Please try again.");
      return;
    }

    const paystack = (window as any).PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: user?.email,
      amount: amount * 100,
      currency: "NGN",
      callback: function () {
        toast.info("Processing payment...");

        try {
          const req = {
            contribution_id: data.contribution.id,
            amount: amount,
          };
          console.log(req);
          fundContributionMutation.mutate(req);
        } catch (error) {
          console.error(error);
          toast.error("Error processing contribution.");
        }
      },
      onClose: () => {
        toast.info("Transaction was not completed.");
      },
    });

    paystack.openIframe();
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
              amount={formatToNaira(data.wallet.amount)}
              description="Wallet Balance"
            />
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
        </>
      )}
    </>
  );
}
