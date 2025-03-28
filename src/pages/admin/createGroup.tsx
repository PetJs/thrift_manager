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
  onSubmit: (groupData: {
    name: string;
    contributionAmount: string;
    description: string;
  }) => void;
  disabled: boolean;
};

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  disabled,
}) => {
  const [name, setGroupName] = useState("");
  const [contributionAmount, setContributionAmount] = useState("");
  const [description, setDescription] = useState<string>("");

  const handleSubmit = () => {
    onSubmit({ name, contributionAmount, description });
    setGroupName("");
    setContributionAmount("");
    setDescription("");
    onClose();
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
            <label htmlFor="name" className="block text-sm font-medium">
              Group Name
            </label>
            <Input
              id="name"
              placeholder="Enter group name"
              value={name}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="contributionAmount"
              className="block text-sm font-medium"
            >
              Contribution Amount
            </label>
            <Input
              id="contributionAmount"
              placeholder="Enter amount"
              value={contributionAmount}
              onChange={(e) => setContributionAmount(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium">
              Description
            </label>
            <Input
              id="description"
              placeholder=""
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mt-4 ml-auto">
            <Button
              onClick={handleSubmit}
              className="bg-blue-700"
              disabled={disabled}
            >
              Create Group
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupModal;
