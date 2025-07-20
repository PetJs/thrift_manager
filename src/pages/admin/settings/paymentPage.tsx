import MasterCard from "@/assets/icons/mastercard.svg";
import Delete from "@/assets/icons/delete.svg";
import Card from "@/assets/icons/card.svg";
import Vector from "@/assets/icons/Vector.svg";
import CustomTable from "@/components/ui/table";


type Status = "received" | "pending";
const transactionData = [
    { memberName: "John Doe", group: 1, amount: "N10,000", dateAndTime: { date: "29/08/25", time: "2: 29: 58 PM" }, status: "received" },
    { memberName: "John Doe", group: 2, amount: "N10,000", dateAndTime: { date: "29/08/25", time: "2: 29: 58 PM" }, status: "pending" },
    { memberName: "John Doe", group: 7, amount: "N10,000", dateAndTime:  { date: "29/08/25", time: "2: 29: 58 PM" }, status: "pending" },
  ];
  
  
  const transactionLogs = [
    { header: "Group Number", accessor: "memberName" },
    { header: "Group", accessor: "group" },
    { header: "Payout Month", accessor: "amount" },
    {
        header: "Last paid/Date paid", 
        accessor: "dateAndTime",
        render: (dateAndTime: { date: string, time: string } | null) => {
          if (!dateAndTime) return '-';
          return (
            <div className="text-[14px] ">{dateAndTime.date} | {dateAndTime.time}</div>
          );
        }
      },
    {
      header: "Status",
      accessor: "status",
      render: (status: string) => {
        const colors: Record<Status, string>  = {
          pending: "bg-yellow-100 text-yellow-700",
          received: "bg-blue-100 text-green-700",
        };
        return <span className={`px-3 py-1 rounded-full text-sm ${colors[status as Status]}`}>{status}</span>;
      },
    },
  ];



const AdminPayment = ()=>{

    return (
        <>
        <div className="p-2 max-w-md">
            {/* Manage Card Section */}
            <div className="mb-4 ">
                <label className="block text-gray-700 text-sm font-medium mb-2">Manage Card</label>
                <div className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow-sm">
                    <div className="flex items-center gap-3">
                        <img
                        src={MasterCard}
                        alt="Mastercard Logo"
                        className="w-8 h-8"
                        />
                        <span className="text-gray-700 font-medium">****9818</span>
                    </div>
                    <button className="text-red-500 hover:text-red-600">
                        <img src={Delete} alt="" />
                    </button>
                </div>
            </div>

            {/* Add New Credit/Debit Card Section */}
            <div className="mb-6 ">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                Add New Credit / Debit Card
                </label>
                <div className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow-sm cursor-pointer">
                    <div className="flex gap-3">
                        <img src={Card} alt="" />
                        <select
                            className="appearance-none bg-transparent text-gray-700 font-medium cursor-pointe"
                        >
                            <option value="" disabled selected hidden>
                            Add New Card
                            </option>
                            <option value="visa">Visa</option>
                            <option value="mastercard">MasterCard</option>
                            <option value="amex">American Express</option>
                        </select>
                    </div>
                    <img src={Vector} alt="" />
                </div>
            </div>
        </div>

        <div className="mb-6 flex items-center gap-4">
        <h2 className="text-[22px] font-semibold mb-4">Members Transaction Log</h2>
        <hr className="w-[780px] border-gray-300 border-1" />
        </div>

        <CustomTable columns={transactionLogs} data={transactionData} />
        </>
    )
}

export default AdminPayment;