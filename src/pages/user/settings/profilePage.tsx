import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Avatar from "../../assets/image.jfif"

interface UserProfileProps {
  initialData?: {
    firstName?: string;
    lastName?: string;
    group?: string;
    email?: string;
    detailedAddress?: string;
    phoneNumber?: string;
    avatarUrl?: string;
  };
  onSave?: (data: any) => void;
}

const ProfilePage: React.FC<UserProfileProps> = ({ 
  initialData = {}, 
  onSave 
}) => {
  const [formData, setFormData] = useState({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    group: initialData.group || '',
    email: initialData.email || '',
    detailedAddress: initialData.detailedAddress || '',
    phoneNumber: initialData.phoneNumber || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave && onSave(formData);
  };

  return (
    <div className=" flex p-6 gap-18">
      <div className="flex flex-col items-center gap-2 ">
        <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center">
          <img 
            src={initialData.avatarUrl || Avatar} 
            alt="Profile"
            className='w-24 h-24 rounded-full' 
          />
        </div>
        <Button 
          className=" text-[13px] h-[20px] bg-blue-700 rounded-lg "
        >
          Change Picture
        </Button>
      </div>

      <div className="space-y-4 flex flex-col w-[474px]">
        <div>
            <label htmlFor="firstName">First Name</label>
            <input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className='block bg-gray-300 w-full p-1 rounded-lg'
            />
        </div>
        <div>
            <label htmlFor="lastName">Last Name</label>
            <input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className='block bg-gray-300 w-full p-1 rounded-lg'
            />
        </div>

        <div>
          <label htmlFor="group">Group</label>
          <input
            id="group"
            name="group"
            value={formData.group}
            onChange={handleInputChange}
            placeholder="Group"
            className='block bg-gray-300 w-full p-1 rounded-lg'
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
            className='block bg-gray-300 w-full p-1 rounded-lg'
          />
        </div>

        <div>
          <label htmlFor="detailedAddress">Detailed Address</label>
          <input
            id="detailedAddress"
            name="detailedAddress"
            value={formData.detailedAddress}
            onChange={handleInputChange}
            placeholder="Detailed Address"
            className='block bg-gray-300 w-full p-1 rounded-lg'
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
            className='block bg-gray-300 w-full p-1 rounded-lg'
          />
        </div>

        <Button 
          onClick={handleSave} 
          className="w-[25%] ml-auto mt-4 bg-blue-700"
        >
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;