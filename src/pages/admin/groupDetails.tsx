import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminService } from "@/services/admin-service";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import AddMemberModal from "@/components/add-member-modal";
import CustomTable from "@/components/ui/table";
import { AxiosError } from "axios";

const memberColumns = [
  { header: "Member ID", accessor: "id" },
  {
    header: "User",
    accessor: "user",
  },
  {
    header: "Position",
    accessor: "position",
  },
  {
    header: "Admin",
    accessor: "is_admin",
    render: (admin: boolean) => {
      return <div>{admin ? "Yes" : "No"}</div>;
    },
  },
  {
    header: "Manager",
    accessor: "is_manager",
    render: (manager: boolean) => {
      return <div>{manager ? "Yes" : "No"}</div>;
    },
  },
  {
    header: "Owner",
    accessor: "is_owner",
    render: (owner: boolean) => {
      return <div>{owner ? "Yes" : "No"}</div>;
    },
  },
  {
    header: "Status",
    accessor: "status",
    render: (status: string) => {
      const colors: Record<string, string> = {
        active: "bg-green-100 text-green-700",
        inactive: "bg-red-100 text-red-700",
        pending: "bg-yellow-100 text-yellow-700",
      };
      return (
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            colors[status.toLowerCase()] || "bg-gray-100 text-gray-700"
          }`}
        >
          {status}
        </span>
      );
    },
  },
];

const GroupDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch group details
  const {
    data: group,
    isLoading: isLoadingGroup,
    isError: isGroupError,
  } = useQuery({
    queryKey: ["group", id],
    queryFn: () => AdminService.getGroupById(Number(id)),
    enabled: !!id,
  });

  // Fetch group members
  const {
    data: members,
    isLoading: isLoadingMembers,
    isError: isMembersError,
  } = useQuery({
    queryKey: ["group-members", id],
    queryFn: () => AdminService.getGroupMembers(Number(id)),
    enabled: !!id,
  });

  // Add member mutation
  const addMemberMutation = useMutation({
    mutationFn: AdminService.addMemberToGroup,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["group-members", id] });
      toast.success("Member added successfully");
      setIsModalOpen(false);
    },
    onError(err) {
      toast.error(
        // @ts-expect-error - "TODO: fix error"
        (err as AxiosError).response?.data?.message || "Failed to add member"
      );
    },
  });

  const handleAddMember = (memberData: {
    userId: number;
    position: number;
    isAdmin: boolean;
    isOwner: boolean;
    isManager: boolean;
  }) => {
    addMemberMutation.mutate({
      position: memberData.position,
      is_admin: memberData.isAdmin,
      is_owner: memberData.isOwner,
      is_manager: memberData.isManager,
      status: "active",
      user: memberData.userId,
      group: Number(id),
    });
  };

  if (isLoadingGroup || isLoadingMembers) {
    return (
      <div className="flex items-center flex-col justify-center h-[80vh]">
        <Loader2 className="w-16 h-16 animate-spin" />
        <h1 className="text-lg">Loading...</h1>
      </div>
    );
  }

  if (isGroupError || isMembersError) {
    return <div className="p-6">Failed to load group details</div>;
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">{group?.name}</h2>
        <div className="flex gap-4 text-gray-600 mb-4">
          <p>Group ID: {group?.id}</p>
          <p>Status: {group?.status}</p>
          <p>Contribution Amount: ${group?.contribution_amount}</p>
        </div>
        <p className="text-gray-700">Info: {group?.description}</p>
      </div>

      <div className="border-t pt-6 mt-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Group Members</h3>
          <Button
            className="bg-blue-700"
            onClick={() => setIsModalOpen(true)}
            disabled={addMemberMutation.isPending}
          >
            {addMemberMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Member"
            )}
          </Button>
        </div>

        {members && members.length > 0 ? (
          <CustomTable columns={memberColumns} data={members} />
        ) : (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No members in this group yet</p>
          </div>
        )}
      </div>

      <AddMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddMember}
        disabled={addMemberMutation.isPending}
      />
    </div>
  );
};

export default GroupDetailsPage;
