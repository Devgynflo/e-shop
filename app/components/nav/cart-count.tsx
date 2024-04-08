"use client";
import { useCart } from "@/hooks/use-cart";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { CiShoppingCart } from "react-icons/ci";

interface CartCountProps {}

export const CartCount: NextPage<CartCountProps> = ({}) => {
  const { cartTotalQty } = useCart();
  const router = useRouter();
  return (
    <div
      className="relative cursor-pointer"
      onClick={() => {
        router.push("/cart");
      }}
    >
      <div className="text-3xl">
        <CiShoppingCart />
      </div>

      <span className="absolute right-[-10px] top-[-10px] flex size-5 items-center justify-center rounded-full bg-slate-700 text-sm text-white">
        {cartTotalQty}
      </span>
    </div>
  );
};
