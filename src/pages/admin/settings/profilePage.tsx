import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUserStore from "@/store/user-store";
import { UserService } from "@/services/user-service";
import { toast } from "sonner";

const AdminProfile = () => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const { user } = useUserStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: [`user-${user?.id as number}`],
    queryFn: () => UserService.getUser(user?.id as number),
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name as string,
        email: data.email as string,
        phone: data.phone as string,
      });
    }
  }, [data]);

  const updateUserMutation = useMutation({
    mutationFn: () => UserService.updateUser(user?.id as number, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user-${user?.id as number}"],
      });
      toast.success("profile updated successfully");
    },
    onError: () => {
      toast.error("unable to update profile");
    },
  });

  const handleSaveChanges = () => {
    setFormData((prev) => ({
      ...prev,
    }));
    updateUserMutation.mutate();
  };

  if (isError) {
    return <div>Something went wrong</div>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center flex-col justify-center h-[80vh]">
        <Loader2 className="w-16 h-16 animate-spin" />
        <h1 className="text-lg">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="max-w-md p-6">
      <form className="space-y-4 flex flex-col ">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            value={formData.email}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            value={formData.phone}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                phone: e.target.value,
              }));
            }}
          />
        </div>

        <Button
          type="button"
          onClick={handleSaveChanges}
          disabled={updateUserMutation.isPending}
          className="ml-auto right mt-4 bg-blue-700"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default AdminProfile;
