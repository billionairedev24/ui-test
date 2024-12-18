import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

function PendingBankVerification() {
  return (
    <div className="space-y-4 border border-gray-200 rounded-lg p-4 mt-4">
      <Label className="pb-4 w-full">Bank account verification pending</Label>
      <hr></hr>

      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-bold text-blue-700">
              Bank account verification pending{" "}
            </p>
            <p className="mt-2 text-sm text-blue-700">
              The financial institution you have selected is not eligible for
              instant verification. You will be required to upload a bank
              account statemenet later during registration to complete manual
              bank account verification. Please click Continue to proceed with
              the next steps in registration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PendingBankVerification;
