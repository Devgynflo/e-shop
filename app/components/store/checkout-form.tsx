"use client";

import { Heading } from "@/app/components/heading";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/utils/format-price";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

export const CheckoutForm: NextPage<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  const { cartTotalAmount, handleRemoveAllProducts, handleSetPaymentIntent } =
    useCart();
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const formatedPrice = formatPrice(cartTotalAmount);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }
    handleSetPaymentSuccess(false);
  }, [stripe, clientSecret, handleSetPaymentSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Checkout Success");

          handleRemoveAllProducts();
          handleSetPaymentSuccess(true);
          handleSetPaymentIntent(null);
        }

        setIsLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6 ">
        <Heading title="Enter your details to complete checkout" />
        <h2 className="mb-2  font-semibold">Adresse</h2>
        <AddressElement
          options={{ mode: "shipping", allowedCountries: ["FR"] }}
        />
        <h2 className="mb-2 mt-4 font-semibold">Information du paiement</h2>
        <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
        <div className="py-4 text-center text-2xl font-bold text-slate-700">
          Total: {formatedPrice}
        </div>
        <Button
          disabled={isLoading && !elements}
          onClick={() => {}}
          className="w-full"
        >
          {isLoading ? "Chargement..." : "Commander"}
        </Button>
      </div>
    </form>
  );
};
