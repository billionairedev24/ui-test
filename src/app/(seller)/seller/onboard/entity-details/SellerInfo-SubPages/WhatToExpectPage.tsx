import { Label } from "@/components/ui/label";
import {
  BookCheckIcon,
  CheckCheckIcon,
  CheckCircle2,
  CheckIcon,
} from "lucide-react";

function WhatToExpectPage() {
  return (
    <div className="space-y-4 border border-gray-200 rounded-lg p-4 mt-4">
      <h2 className="text-xl font-bold">Payment information</h2>

      <div className="bank-info">
        <p className="mb-5">
          You will need the following information to complete the next section:
        </p>

        <fieldset className="border-b">
          <Label>Bank Account Information</Label>
          <div className="mt-5 pb-1 flex flex-col gap-y-4 bg-yellow-50/40 px-4 py-3 mb-2">
            <div className="flex gap-x-2">
              <CheckIcon />{" "}
              <span>
                A valid <strong>bank account number</strong> which will be used
                to easily deposit and withdraw money between your bank account
                and your Account payments account
              </span>
            </div>
            <div className="flex gap-x-2">
              <CheckIcon />{" "}
              <span>
                Your bank account shoul be in the name of the{" "}
                <strong>primary contact</strong>or{" "}
                <strong>business name</strong> provided to AfroTransact
              </span>
            </div>
            <div className="flex gap-x-2">
              <CheckIcon />{" "}
              <span>
                To verify your bank account you will need your{" "}
                <strong>online banking credentials</strong> or provide
                AfroTransact with a <strong>bank statement</strong>
              </span>
            </div>
          </div>
        </fieldset>
        <fieldset className="border-b mt-16">
          <Label>Credit Card Information</Label>
          <div className="mt-5 pb-1 flex flex-col gap-y-4 bg-yellow-50/40 px-4 py-3 mb-2">
            <div className="flex gap-x-2">
              <CheckIcon />{" "}
              <span>
                A valid <strong>credit or debit card number</strong> which will
                be used to pay your monthly fee
              </span>
            </div>
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default WhatToExpectPage;
