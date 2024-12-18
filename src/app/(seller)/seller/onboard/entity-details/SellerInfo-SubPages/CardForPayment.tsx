import { AlertCircle } from "lucide-react";
import React, { SetStateAction, useState } from "react";
interface CardForPaymentProps {
  setShowNext: React.Dispatch<SetStateAction<boolean>>;
}

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import convertToSubCurrency from "@/lib/converToSubCurrency";
import CheckoutPage from "@/components/seller/CheckoutPage";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
  : Promise.reject(new Error("Stripe Publishable Key is missing"));

function CardForPayment({ setShowNext }: CardForPaymentProps) {
  const [platformFee, setPlatformFee] = useState(39.99);
  return (
    <div className="space-y-4 border border-gray-200 rounded-lg p-4 mt-4">
      <div className=" w-[95%] bg-blue-50 border-l-4 border-blue-400 p-4 ml-6 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-2 flex flex-col gap-6">
            <h3>Monthly Subscription Fee</h3>
            <p className="text-sm text-blue-700">
              You will be charged a Professional selling subscription fee of
              39.99 USD for the first month. You will continue to be charged
              this fee each month if you have active listings. If you do not
              have active listings, you will not be charged a subscription fee
              in that month.
            </p>
          </div>
        </div>
      </div>
      {/* STRIP PAYMENT INTERFACE BELOW */}

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubCurrency(platformFee),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={platformFee} />
      </Elements>
    </div>
  );
}

export default CardForPayment;
