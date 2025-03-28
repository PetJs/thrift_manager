import React, { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Switch } from '@/components/ui/switch';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const AdminGeneralSetting = () => {
  const [groupLimit, setGroupLimit] = useState("12");
  const [paymentDeadline, setPaymentDeadline] = useState("Last 7 days");
  const [automatedReminders, setAutomatedReminders] = useState(true);
  const group = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const handleSaveChanges = () => {
    console.log({
      groupLimit,
      paymentDeadline,
      automatedReminders
    });
  };

  return (
    <div className="max-w-md p-6 space-y-6 flex flex-col">
      <div className="space-y-2">
        <Label>Group Limit</Label>
        <Select 
          value={groupLimit} 
          onValueChange={setGroupLimit}
        >
          <SelectTrigger className='w-full'>
            <SelectValue placeholder="Select group limit" />
          </SelectTrigger>
          <SelectContent>
            {group.map((limit) => (
              <SelectItem key={limit} value={limit.toString()}>
                {limit}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-6 mb-6 ">
        <Label>Payment Deadline</Label>
        <div className="flex items-center justify-between bg-gray-300 p-1 rounded-lg">
          <span>{paymentDeadline}</span>
          <Button variant="ghost" size="sm">Edit</Button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-12 bg-gray-300 p-2 rounded-lg">
        <Label htmlFor="automated-reminders">Automated Reminders</Label>
        <Switch
          id="automated-reminders"
          checked={automatedReminders}
          onCheckedChange={setAutomatedReminders}
        />
      </div>

      <Button 
        onClick={handleSaveChanges} 
        className="bg-blue-700 ml-auto"
      >
        Save Changes
      </Button>
    </div>
  );
};

export default AdminGeneralSetting;