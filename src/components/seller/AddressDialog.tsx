import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AddressType } from "../../types/seller";

type AddressDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  addresses: AddressType[];
  onAddressSelect: (index: number) => void;
  onUseAddress: () => void;
};

export default function AddressDialog({
  open,
  onOpenChange,
  addresses,
  onAddressSelect,
  onUseAddress,
}: AddressDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-between">
            Your saved addresses
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {addresses.map((address, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="radio"
                value={index}
                id={`saved-address-${index}`}
                name="address"
                onChange={() => onAddressSelect(index)}
              />
              <label htmlFor={`saved-address-${index}`} className="text-sm">
                {Object.values(address).join(", ")}
              </label>
            </div>
          ))}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button
              className="bg-yellow-400 text-black hover:bg-yellow-500"
              onClick={onUseAddress}
            >
              Use this address
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
