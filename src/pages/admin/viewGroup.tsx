import { Button } from "@/components/ui/button";
import CustomTable from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import Hamburger from "@/assets/icons/hamburger.svg";
import { Link, useParams } from "react-router-dom";

type Status = "pending" | "unpaid"| "paid";


const data = [
    {
        id: 0,
        name: 'Sylvia Mgbo-Chigbo',
        email: 'sylvbg@gmail.com',
        status: 'pending',
        date_created: 'January'
    },
    {
        id: 1,
        name: 'Sylvia Mgbo-Chigbo',
        email: 'sylvbg@gmail.com',
        status: 'paid',
        date_created: 'January'
    },
    {
        id: 2,
        name: 'Sylvia Mgbo-Chigbo',
        email: 'sylvbg@gmail.com',
        status: 'pending',
        date_created: 'January'
    },
    {
        id: 3,
        name: 'Sylvia Mgbo-Chigbo',
        email: 'sylvbg@gmail.com',
        status: 'pending',
        date_created: 'January'
    },
    {
        id: 4,
        name: 'Sylvia Mgbo-Chigbo',
        email: 'sylvbg@gmail.com',
        status: 'paid',
        date_created: 'January'
    },
    {
        id: 5,
        name: 'Sylvia Mgbo-Chigbo',
        email: 'sylvbg@gmail.com',
        status: 'pending',
        date_created: 'January'
    },
    {
        id: 6,
        name: 'Sylvia Mgbo-Chigbo',
        email: 'sylvbg@gmail.com',
        status: 'unpaid',
        date_created: 'January'
    },
]


const contributionColumns = [
  { header: "Member Name", accessor: "name" },
  { header: "Email", accessor: "email" },
  { header: 'Position', accessor: 'position'},
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
        unpaid: "bg-yellow-100 text-yellow-700",
        paid: "bg-blue-100 text-blue-700",
        pending: 'bg-'
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
            <DropdownMenuItem>View Contributions</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

const ViewGroups = () => {
    const { id } = useParams<{ id: string }>();

  return (
    <article>
      <div className="mb-6 flex items-center gap-6">
        <h1 className="text-[22px] font-semibold mb-4 text-black/30">
            <Link to='/admin/groups'>
                All Groups 
            </Link>
        </h1>
        <h2 className="text-[22px] font-semibold mb-4">
            View Group {id}
        </h2>
        <hr className="w-[950px] border-gray-300 border-1" />
      </div>
      <CustomTable columns={contributionColumns} data={data} />
        {/* {isLoading ? (
          <div className="flex items-center flex-col justify-center h-[80vh]">
            <Loader2 className="w-16 h-16 animate-spin" />
            <h1 className="text-lg">Loading...</h1>
          </div>
        ) : (
          data && <CustomTable columns={contributionColumns} data={data} />
        )} */}
    </article>
  );
};

export default ViewGroups;


