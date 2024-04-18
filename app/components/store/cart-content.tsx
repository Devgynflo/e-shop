"use client";

import { CardProductType } from "@/@types";
import { SetQuantity } from "@/app/components/products/details/_components/set-quantity";
import { useCart } from "@/hooks/use-cart";
import { formatPrice } from "@/utils/format-price";
import { truncateText } from "@/utils/truncate-text";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

interface CartContentProps {
  item: CardProductType;
}

export const CartItemContent: NextPage<CartContentProps> = ({ item }) => {
  const {
    removeProductToCart,
    increaseProductQuantity,
    decreaseProductQuantity,
  } = useCart();
  return (
    <div className="grid grid-cols-5 gap-4 border border-slate-200 py-4 text-xs md:text-sm">
      <div className="col-span-2 flex gap-2 justify-self-start md:gap-4">
        <Link href={`/product/${item.id}`}>
          <div className="relative aspect-square w-[70px]">
            <Image
              src={item.selectedImg.image}
              alt={item.name}
              className="object-contain"
              fill
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}>
            <div>{truncateText(item.name)}</div>
          </Link>
          <div>{item.selectedImg.color}</div>
          <div className="w-[70px]">
            <button
              className="text-slate-500 underline"
              onClick={() => removeProductToCart(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-end">
        <SetQuantity
          cartCounter
          cardProduct={item}
          handleQtyIncrease={() => increaseProductQuantity(item)}
          handleQtyDecrease={() => decreaseProductQuantity(item)}
        />
      </div>
      <div className="justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};
