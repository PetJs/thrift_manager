import { useState } from "react";

interface ReminderState {
  emailReminder: boolean;
  smsReminder: boolean;
  whatsappReminder: boolean;
}

export default function Reminders() {
  const [reminders, setReminders] = useState<ReminderState>({
    emailReminder: true,
    smsReminder: false,
    whatsappReminder: true,
  });

  const [payoutNotifications, setPayoutNotifications] = useState<ReminderState>({
    emailReminder: true,
    smsReminder: false,
    whatsappReminder: true,
  });

  const handleToggle = (
    section: "reminders" | "payoutNotifications",
    key: keyof ReminderState // Fixed type for `key`
  ) => {
    if (section === "reminders") {
      setReminders((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
    } else if (section === "payoutNotifications") {
      setPayoutNotifications((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Payment Deadline Reminders */}
      <div>
        <h3 className="text-lg font-semibold">Payment Deadline Reminders</h3>
        <p className="text-sm text-gray-500">You must select at least 1</p>
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
                  handleToggle("reminders", key as keyof ReminderState)
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

      {/* Monthly Payout Notifications */}
      <div>
        <h3 className="text-lg font-semibold">Monthly Payout Notifications</h3>
        <div className="space-y-3 mt-4 w-[495px]">
          {Object.entries(payoutNotifications).map(([key, value]) => (
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
                  handleToggle("payoutNotifications", key as keyof ReminderState)
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
