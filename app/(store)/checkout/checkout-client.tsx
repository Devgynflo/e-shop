"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/use-cart";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CheckoutForm } from "./checkout-form";

interface CheckoutClientPageProps {}

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISH_KEY as string,
);

const CheckoutClientPage: NextPage<CheckoutClientPageProps> = ({}) => {
  const router = useRouter();
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  console.log("🚀 ~ paymentIntent:", paymentIntent);
  console.log("🚀 ~ clientSecret:", clientSecret);

  useEffect(() => {
    // TODO: Create a paymentIntnet as soon as the page tools
    if (cartProducts) {
      setError(false);
      setLoading(true);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 401) {
            return router.push("/login");
          }

          return res.json();
        })
        .then((data: any) => {
          setClientSecret(data.paymentIntent.client_secret);
          handleSetPaymentIntent(data.paymentIntent.id);
        })
        .catch((error: any) => {
          setError(true);
          console.log("[CHECKOUT_CLIENT]", error);
          toast.error("Something went wrong !");
        });
    }
  }, [cartProducts, paymentIntent, router, handleSetPaymentIntent]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
    },
  };

  const handleSetpaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);

  return (
    <div className="w-full">
      {clientSecret && cartProducts && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetpaymentSuccess}
          />
        </Elements>
      )}

      {loading && <div className="text-center">Loading Checkout</div>}
      {error && <div className="text-center text-rose-500">Error Checkout</div>}
      {paymentSuccess && (
        <div className="flex flex-col items-center gap-4">
          <div className="text-center text-teal-500">Payment Success</div>
          <div className="w-full max-w-[220px]">
            <Button
              onClick={() => router.push("/order")}
              className="text-center"
            >
              View your order
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutClientPage;
