import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from 'lucide-react';
import { Label } from "@/components/ui/label";

const AdminProfile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Thrift Management Admin',
    email: 'thriftmanagement@gmail.com',
    phoneNumber: '09087654321',
    password: 'initialPassword'
  });

  const [editedPhoneNumber, setEditedPhoneNumber] = useState(formData.phoneNumber);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPhoneNumber(e.target.value);
    setIsEditing(e.target.value !== formData.phoneNumber);
  };

  const handleSaveChanges = () => {
    setFormData(prev => ({
      ...prev,
      phoneNumber: editedPhoneNumber
    }));
    setIsEditing(false);
  };

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

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input 
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              readOnly
              className="bg-gray-100 cursor-not-allowed pr-10"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <Button 
          type="button"
          onClick={handleSaveChanges}
          disabled={!isEditing}
          className="ml-auto right mt-4 bg-blue-700"
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default AdminProfile;