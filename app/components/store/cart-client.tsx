"use client";

import { CardProductType, SafeUser } from "@/@types";
import { Heading } from "@/app/components/heading";
import { Button } from "@/app/components/products/details/_components/button";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/utils/format-price";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { MdArrowBack } from "react-icons/md";
import { CartItemContent } from "./cart-content";

interface CartClientProps {
  currentUser: SafeUser | null;
}

export const CartClient: NextPage<CartClientProps> = ({ currentUser }) => {
  const { cartProducts, handleRemoveAllProducts, cartTotalAmount } = useCart();
  const router = useRouter();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <Suspense>
        <section className="flex flex-col items-center">
          <div className="text-2xl">Your cart is empty</div>
          <div>
            <Link
              href="/"
              className="mt-2 flex items-center gap-2 text-slate-500"
            >
              <MdArrowBack size={20} />
              <span>Start Shopping</span>
            </Link>
          </div>
        </section>
      </Suspense>
    );
  }

  return (
    <Suspense>
      <section>
        <Heading title="Shopping Cart" center />
        <div className="mt-8 grid grid-cols-5 items-center gap-4 pb-2 text-xs">
          <div className="col-span-2 justify-self-start uppercase">Product</div>
          <div className="justify-self-center uppercase">Price</div>
          <div className="justify-self-center uppercase">Quantity</div>
          <div className="justify-self-end uppercase">Total</div>
        </div>
        <div>
          {cartProducts.map((product: CardProductType) => (
            <CartItemContent key={product.id} item={product} />
          ))}
        </div>
        <div className="flex justify-between gap-4 border-t-[1.5px] border-slate-200 py-4">
          <div className="w-[100px]">
            <Button
              label="Clear Cart"
              onclick={handleRemoveAllProducts}
              small
              outline
            />
          </div>
          <div className="flex flex-col items-start gap-1 text-sm">
            <div className="flex w-full justify-between text-base font-semibold">
              <span>Subtotal</span>
              <span>{formatPrice(cartTotalAmount)}</span>
            </div>
            <p className="text-slate-500">
              Taxes and shipping calculate at checkout
            </p>
            {currentUser ? (
              <Button
                onclick={() => {
                  router.push("/checkout");
                }}
                label="Checkout"
              />
            ) : (
              <Button
                outline
                onclick={() => {
                  router.push("/login");
                }}
                label="Login"
              />
            )}

            <Link
              href="/"
              className="mt-2 flex items-center gap-2 text-slate-500"
            >
              <MdArrowBack size={20} />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </section>
    </Suspense>
  );
};