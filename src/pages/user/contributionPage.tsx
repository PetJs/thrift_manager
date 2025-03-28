import CustomTable from "@/components/ui/table";
import { UserService } from "@/services/user-service";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

type Status = "Paid" | "Pending" | "Upcoming";

const paymentData = [
  {
    start_date: "January",
    amount: "NGN10,000",
    status: "Paid",
    end_date: "20th Jan, 2025",
    receiptLink: "#",
  },
  {
    start_date: "February",
    amount: "NGN10,000",
    status: "Pending",
    end_date: "20th Jan, 2025",
    receiptLink: "#",
  },
  {
    start_date: "March",
    amount: "NGN10,000",
    status: "Paid",
    end_date: "20th Jan, 2025",
    receiptLink: "#",
  },
  {
    start_date: "April",
    amount: "NGN10,000",
    status: "Upcoming",
    end_date: "20th Jan, 2025",
    receiptLink: "#",
  },
];

const columns = [
  {
    header: "Month",
    accessor: "start_date",
    render: (start_date: Date) => {
      return (
        <p>{new Date(start_date).toLocaleString("en", { month: "long" })}</p>
      );
    },
  },
  { header: "Amount", accessor: "amount" },
  {
    header: "Status",
    accessor: "status",
    render: (status: string) => {
      const colors: Record<Status, string> = {
        Paid: "bg-green-100 text-green-700",
        Pending: "bg-yellow-100 text-yellow-700",
        Upcoming: "bg-blue-100 text-blue-700",
      };
      return (
        <div
          className={` rounded-lg text-center  text-sm ${
            colors[status as Status]
          }`}
        >
          {status}
        </div>
      );
    },
  },
  { header: "Date Paid", accessor: "end_date" },
  {
    header: "Receipt",
    accessor: "receiptLink",
    render: (link: string) => (
      <a href={link} className="text-blue-600 underline">
        Download Receipt
      </a>
    ),
  },
];

const ContributionPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["contributions"],
    queryFn: UserService.getContributions,
  });

  const currentMonth = new Date().toLocaleString("en", { month: "long" });
  const currentMonthStatus =
    paymentData.find((item) => item.start_date === currentMonth)?.status ||
    "Unknown";

  if (isLoading) {
    return (
      <div className="flex items-center flex-col justify-center h-[80vh]">
        <Loader2 className="w-16 h-16 animate-spin" />
        <h1 className="text-lg">Loading...</h1>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-[22px] font-semibold mb-4">Contributions</h2>
        <p className="text-[18px]">
          Status for this month: {currentMonthStatus}
        </p>
      </div>
      <div className="flex items-center text-center gap-3">
        <h2 className="text-[22px]  mb-4">Contribution History</h2>
        <hr className="w-[859px] border-gray-300 border-1" />
      </div>
      {data && <CustomTable columns={columns} data={data} />}
    </>
  );
};

export default ContributionPage;
