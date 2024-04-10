"use client";

import { useCart } from "@/hooks/use-cart";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface CheckoutClientPageProps {}

const CheckoutClientPage: NextPage<CheckoutClientPageProps> = ({}) => {
  const router = useRouter();
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
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

  return <>Checkout</>;
};

export default CheckoutClientPage;
