import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";

interface ReminderState {
  emailReminder?: boolean;
  smsReminder?: boolean;
  whatsappReminder?: boolean;
  twoFactorAuth?: boolean
}

export default function SecuritySetting() {
  const [twoFactorAuth, setTwoFactorAuth] = useState<ReminderState>({
    twoFactorAuth: false,
  });

  const handleToggle = (key: keyof ReminderState) => {
      setTwoFactorAuth((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
  };

  return (
    <div className="p-4 space-y-6 flex flex-col w-[495px]">
        <div className="mb-4 ">
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow-sm">
                <div className="flex items-center ">
                    <span className="font-medium">**********</span>
                </div>
                <Link to="/settings/change-password" className="text-blue-700">Change</Link>
            </div>
        </div>
      {/* Set Two Factor Authentication*/}
      <div>
        <p className="text-sm ">Two-Factor Authetication</p>
        <div className="space-y-3 mt-4 ">
          {Object.entries(twoFactorAuth).map(([key, value]) => (
            <div
              key={key}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-lg"
            >
              <span className="text-gray-700 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </span>
              <button
                className={`w-12 h-6 flex items-center rounded-full p-1 ${
                  value ? "bg-blue-500" : "bg-gray-300"
                }`}
                onClick={() =>
                  handleToggle(key as keyof ReminderState)
                }
              >
                <span
                  className={`h-4 w-4 bg-white rounded-full transform ${
                    value ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
      <Button  
          className="w-[25%] ml-auto mt-4 bg-blue-700"
        >
          Save Changes
        </Button>
    </div>
  );
}
