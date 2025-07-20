import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: string;
  setAmount: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const PaymentModal = ({
  isOpen,
  onClose,
  amount,
  setAmount,
  onSubmit,
  isLoading,
}: PaymentModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle>Make Payment</DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-4">
          <label className="text-gray-700 text-sm font-medium">
            Enter Amount
          </label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-2 border rounded"
          />
          <Button
            onClick={onSubmit}
            disabled={isLoading || !amount}
            className="w-full"
          >
            {isLoading ? "Processing..." : "Confirm Payment"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
