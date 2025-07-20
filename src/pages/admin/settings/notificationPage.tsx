import { useState } from "react";

interface AdminNotifsState {
  lowContributions: boolean;
  failedPayouts: boolean;
  inactiveMembers: boolean;
  groupActivityUpdates: boolean;
}

export default function AdminNotifs() {
  const [reminders, setReminders] = useState<AdminNotifsState>({
    lowContributions: true,
    failedPayouts: false,
    inactiveMembers: true,
    groupActivityUpdates: true,
  });

  const handleToggle = (
    section: "reminders" ,
    key: keyof AdminNotifsState 
  ) => {
    if (section === "reminders") {
      setReminders((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
    } 
  };

  return (
    <div className="p-4 space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Admin Alerts</h3>
        <div className="space-y-3 mt-4 w-[495px]">
          {Object.entries(reminders).map(([key, value]) => (
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
                  handleToggle("reminders", key as keyof AdminNotifsState)
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
    </div>
  );
}
