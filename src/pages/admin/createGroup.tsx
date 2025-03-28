import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type CreateGroupModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (groupData: { groupNumber: string; contributionAmount: string; members: string[] }) => void;
};

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [groupNumber, setGroupNumber] = useState("");
  const [contributionAmount, setContributionAmount] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [currentMember, setCurrentMember] = useState("");

  const addMember = () => {
    if (currentMember.trim() && !members.includes(currentMember)) {
      setMembers([...members, currentMember.trim()]);
      setCurrentMember("");
    }
  };

  const removeMember = (member: string) => {
    setMembers(members.filter((m) => m !== member));
  };

  const handleSubmit = () => {
    onSubmit({ groupNumber, contributionAmount, members });
    onClose();
    setGroupNumber("");
    setContributionAmount("");
    setMembers([]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create a New Group</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <div className="space-y-6 flex flex-col">
          <div>
            <label htmlFor="groupNumber" className="block text-sm font-medium">
              Group Number
            </label>
            <Input
              id="groupNumber"
              placeholder="Enter group number"
              value={groupNumber}
              onChange={(e) => setGroupNumber(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="contributionAmount" className="block text-sm font-medium">
              Contribution Amount
            </label>
            <Input
              id="contributionAmount"
              placeholder="Enter amount (e.g., NGN 120,000)"
              value={contributionAmount}
              onChange={(e) => setContributionAmount(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="addMembers" className="block text-sm font-medium">
              Add Members
            </label>
            <div className="flex items-center space-x-2">
              <Input
                id="addMembers"
                placeholder="Enter member name"
                value={currentMember}
                onChange={(e) => setCurrentMember(e.target.value)}
              />
              <Button onClick={addMember} className="bg-blue-700">Add</Button>
            </div>
            <div className="mt-2 space-y-1">
              {members.map((member) => (
                <div key={member} className="flex items-center justify-between">
                  <span>{member}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeMember(member)}>
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 ml-auto">
            <Button onClick={handleSubmit} className="bg-blue-700">
              Create Group
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupModal;
