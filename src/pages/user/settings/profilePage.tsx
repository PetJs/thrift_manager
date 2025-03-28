import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Avatar from "@/assets/image.jfif";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import useUserStore from "@/store/user-store";
import { UserService } from "@/services/user-service";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const ProfilePage = () => {
  const queryClient = new QueryClient();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  const { user } = useUserStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: [`user`],
    queryFn: () => UserService.getUser(user?.id as number),
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      setFormData({
        name: data.name as string,
        email: data.email as string,
        address: data.address as string,
        phoneNumber: data.phone as string,
      });
    }
  }, [data]);

  const updateUserMutation = useMutation({
    mutationFn: () => UserService.updateUser(user?.id as number, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("profile updated successfully");
    },
    onError: () => {
      toast.error("unable to update profile");
    },
  });

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    updateUserMutation.mutate();
  };

  return (
    <div className=" flex p-6 gap-18">
      <div className="flex flex-col items-center gap-2 ">
        <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
          <img src={Avatar} alt="Profile" className="w-24 h-24 rounded-full" />
        </div>
        <Button className=" text-[13px] h-[20px] bg-blue-700 rounded-lg ">
          Change Picture
        </Button>
      </div>

      <div className="space-y-4 flex flex-col w-[474px]">
        <div>
          <label htmlFor="name">First Name</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="block bg-gray-300 w-full p-1 rounded-lg"
          />
        </div>
        {/* <div>
          <label htmlFor="group">Group</label>
          <input
            id="group"
            name="group"
            value={formData.group}
            onChange={handleInputChange}
            placeholder="Group"
            className="block bg-gray-300 w-full p-1 rounded-lg"
          />
        </div> */}

        <div>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address"
            className="block bg-gray-300 w-full p-1 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="address">Detailed Address</label>
          <input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Detailed Address"
            className="block bg-gray-300 w-full p-1 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="Phone Number"
            className="block bg-gray-300 w-full p-1 rounded-lg"
          />
        </div>

        <Button
          onClick={handleSave}
          className="w-[25%] ml-auto mt-4 bg-blue-700"
          disabled={updateUserMutation.isPending}
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
