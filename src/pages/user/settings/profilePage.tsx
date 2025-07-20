import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Avatar from "@/assets/image.jfif";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useUserStore from "@/store/user-store";
import { UserService } from "@/services/user-service";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewImage, setPreviewImage] = useState<string>(Avatar); // Preview image URL

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
    avatar: "", // To send to backend
  });

  const { user } = useUserStore();

  const { data, isLoading, isError } = useQuery({
    queryKey: [`user`],
    queryFn: () => UserService.getUser(user?.id as number),
  });

  useEffect(() => {
    if (data) {
      setFormData({
        name: data.name,
        email: data.email,
        address: data.address,
        phoneNumber: data.phone,
        avatar: data.avatar || Avatar,
      });
      setPreviewImage(data.avatar || Avatar);
    }
  }, [data]);

  const updateUserMutation = useMutation({
    mutationFn: () => UserService.updateUser(user?.id as number, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Profile updated successfully");
    },
    onError: () => {
      toast.error("Unable to update profile");
    },
  });

  if (isError) return <div>Something went wrong</div>;
  if (isLoading)
    return (
      <div className="flex items-center flex-col justify-center h-[80vh]">
        <Loader2 className="w-16 h-16 animate-spin" />
        <h1 className="text-lg">Loading...</h1>
      </div>
    );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
      setFormData((prev) => ({ ...prev, avatar: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    updateUserMutation.mutate();
  };

  return (
    <div className="flex p-6 gap-18">
      <div className="flex flex-col items-center gap-2">
        <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
          <img src={previewImage} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
        </div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
        <Button
          className="text-[13px] h-[20px] bg-blue-700 rounded-lg"
          onClick={() => fileInputRef.current?.click()}
        >
          Change Picture
        </Button>
      </div>

      <div className="space-y-4 flex flex-col w-[474px]">
        <div>
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="block bg-gray-300 w-full p-1 rounded-lg"
          />
        </div>

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
