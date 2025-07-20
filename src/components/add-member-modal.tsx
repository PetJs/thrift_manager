"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { AdminService } from "@/services/admin-service";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Search } from "lucide-react";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    userId: number;
    position: number;
    isAdmin: boolean;
    isOwner: boolean;
    isManager: boolean;
  }) => void;
  disabled: boolean;
}

const AddMemberModal = ({
  isOpen,
  onClose,
  onSubmit,
  disabled,
}: AddMemberModalProps) => {
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [position, setPosition] = useState<string>("1");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [isManager, setIsManager] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all users
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: AdminService.getAllUsers,
    enabled: isOpen,
  });

  // Filter users based on search query
  const filteredUsers =
    users?.filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  const handleSubmit = () => {
    if (!selectedUser) {
      return;
    }

    onSubmit({
      userId: selectedUser,
      position: Number.parseInt(position),
      isAdmin,
      isOwner,
      isManager,
    });
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedUser(null);
      setPosition("1");
      setIsAdmin(false);
      setIsOwner(false);
      setIsManager(false);
      setSearchQuery("");
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add Member to Group</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="search">Search Users</Label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="search"
                placeholder="Search by name or email"
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-2 max-h-[200px] overflow-y-auto border rounded-md p-2">
            {isLoading ? (
              <div className="flex justify-center items-center h-20">
                <Loader2 className="h-6 w-6 animate-spin text-gray-500" />
              </div>
            ) : filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className={`p-2 rounded-md cursor-pointer flex items-center gap-2 ${
                    selectedUser === user.id
                      ? "bg-blue-100"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedUser(user.id)}
                >
                  <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                No users found
              </div>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="position">Position</Label>
            <Input
              id="position"
              type="number"
              min="1"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label>Roles</Label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="is-admin"
                  checked={isAdmin}
                  onCheckedChange={(checked) => setIsAdmin(checked === true)}
                />
                <Label htmlFor="is-admin" className="cursor-pointer">
                  Admin
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="is-owner"
                  checked={isOwner}
                  onCheckedChange={(checked) => setIsOwner(checked === true)}
                />
                <Label htmlFor="is-owner" className="cursor-pointer">
                  Owner
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="is-manager"
                  checked={isManager}
                  onCheckedChange={(checked) => setIsManager(checked === true)}
                />
                <Label htmlFor="is-manager" className="cursor-pointer">
                  Manager
                </Label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={disabled || !selectedUser}
            className="bg-blue-700"
          >
            {disabled ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add Member"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberModal;
