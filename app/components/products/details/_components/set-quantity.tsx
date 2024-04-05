"use client";

import { CardProductType } from "@/@types";
import { NextPage } from "next";

interface SetQuantityProps {
  cartCounter?: boolean;
  cardProduct: CardProductType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}

export const SetQuantity: NextPage<SetQuantityProps> = ({
  cartCounter,
  cardProduct,
  handleQtyIncrease,
  handleQtyDecrease,
}) => {
  return (
    <div className="flex items-center gap-8">
      {!cartCounter && <div className="font-semibold uppercase">quantity:</div>}
      <div className="flex items-center gap-4 text-base">
        <button
          onClick={handleQtyDecrease}
          className="rounded-sm border-[1.2px] border-slate-300 px-2"
        >
          -
        </button>
        <div>{cardProduct.quantity}</div>
        <button
          onClick={handleQtyIncrease}
          className="rounded-sm border-[1.2px] border-slate-300 px-2"
        >
          +
        </button>
      </div>
    </div>
  );
};
