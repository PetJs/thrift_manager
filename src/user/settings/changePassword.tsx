import React, { useState } from 'react';
import { Button } from "@/components/ui/button";

interface ChangePasswordProps {
  initialData?: {
    newPassword?: string;
    confirmPassword?: string;
  };
  onSave?: (data: any) => void;
}

const ChangePassowordPage: React.FC<ChangePasswordProps> = ({ 
  initialData = {}, 
  onSave 
}) => {
  const [formData, setFormData] = useState({
    newPassword: initialData.newPassword || '',
    confirmPassword: initialData.confirmPassword || '',
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
    <div className="p-6">
      <div className="space-y-4 flex flex-col w-[474px]">
        <div>
            <label htmlFor="newPassword">New Password</label>
            <input
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
                placeholder="*********"
                className='block bg-gray-300 w-full p-2 rounded-lg'
            />
        </div>
        <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="*********"
                className='block bg-gray-300 w-full p-2 rounded-lg'
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

export default ChangePassowordPage;