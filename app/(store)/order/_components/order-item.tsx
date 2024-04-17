import { CardProductType } from "@/@types";
import { formatPrice } from "@/utils/format-price";
import { truncateText } from "@/utils/truncate-text";
import { NextPage } from "next";
import Image from "next/image";

interface OrderItemProps {
  product: CardProductType;
  orderTotalAmount: number;
}

export const OrderItem: NextPage<OrderItemProps> = ({
  product,
  orderTotalAmount,
}) => {
  return (
    <div className="grid grid-cols-5 items-center gap-4 border-t-[1.5px] border-slate-200 py-4 text-xs md:text-sm">
      <div className="col-span-2 flex gap-2 justify-self-start md:gap-4">
        <div className="relative aspect-square w-[70px]">
          <Image
            src={product.selectedImg.image}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex flex-col gap-1">
          <div>{truncateText(product.name)}</div>
          <div>{product.selectedImg.color}</div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(product.price)}</div>
      <div className="justify-self-center">{product.quantity}</div>
      <div className="justify-self-start font-semibold">
        {(product.price * product.quantity).toFixed(2)}
      </div>
    </div>
  );
};
