import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUserStore from "@/store/user-store";
import { UserService } from "@/services/user-service";
import { toast } from "sonner";

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  const [editedPhoneNumber, setEditedPhoneNumber] = useState(
    formData.phoneNumber
  );
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPhoneNumber(e.target.value);
    setIsEditing(e.target.value !== formData.phoneNumber);
  };

  const { user } = useUserStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: [`user-${user?.id as number}`],
    queryFn: () => UserService.getUser(user?.id as number),
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setFormData({
        name: data.name as string,
        email: data.email as string,
        phoneNumber: data.phone as string,
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
      phoneNumber: editedPhoneNumber,
    }));
    setIsEditing(false);
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
            readOnly
            className="bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            value={formData.email}
            readOnly
            className="bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            value={editedPhoneNumber}
            onChange={handlePhoneNumberChange}
          />
        </div>

        <Button
          type="button"
          onClick={handleSaveChanges}
          disabled={!isEditing || updateUserMutation.isPending}
          className="ml-auto right mt-4 bg-blue-700"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default AdminProfile;
