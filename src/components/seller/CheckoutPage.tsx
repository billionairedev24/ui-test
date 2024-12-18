import React, { useEffect, useState } from "react";

import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import convertToSubCurrency from "@/lib/converToSubCurrency";
import { Button } from "../ui/button";
import LoadingSpinner from "../util/spinner";

function CheckoutPage({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string | null | undefined>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const [clientSecret, setClientSecret] = useState("");
  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: convertToSubCurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) return;

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message ?? "");
      setIsLoading(false);
      return;
    }
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        // return_url: "",
        // Make sure to change this to your payment completion page
        return_url: `http://localhost:3000/seller/onboard/entity-details`,

        // how to make it remain on page and add the steps in the next controller
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setErrorMessage(error.message);
    } else {
      setErrorMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex flex-col justify-center items-center w-full">
        <LoadingSpinner style="w-8 h-8" />
      </div>
    );
  }
  return (
    <form
      className="flex flex-col justify-center items-center gap-5"
      onSubmit={handleSubmit}
    >
      <div className="bg-white w-full flex justify-center items-center py-6 px-6">
        {clientSecret && <PaymentElement className="bg-white w-full" />}
      </div>

      {errorMessage && <div>{errorMessage}</div>}
      <Button
        disabled={!stripe || isLoading}
        className="w-full bg-yellow-400 text-black hover:bg-yellow-500 mt-1"
        // type="submit"
      >
        {!isLoading ? `Pay Platform Fee $${amount}` : "Processing..."}
      </Button>
    </form>
  );
}

export default CheckoutPage;
