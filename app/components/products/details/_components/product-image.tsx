"use client";

import { CardProductType, SelectedImgType } from "@/@types";
import { cn } from "@/lib/utils";
import { NextPage } from "next";
import Image from "next/image";

interface ProductImageProps {
  cardProduct: CardProductType;
  product: any;
  handleColorSelect: (value: SelectedImgType) => void;
}

export const ProductImage: NextPage<ProductImageProps> = ({
  cardProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div className=" grid h-full max-h-[500px] min-h-[300px] grid-cols-6 gap-2 sm:min-h-[400px] ">
      <div className="flex h-full max-h-[500px] min-h-[300px] cursor-pointer flex-col items-center justify-center gap-4 border sm:min-h-[400px]">
        {product.images.map((item: SelectedImgType) => (
          <div
            onClick={() => handleColorSelect(item)}
            key={item.colorCode}
            className={cn(
              "relative aspect-square w-4/5 rounded border-teal-300",
              cardProduct.selectedImg.color === item.color && "border-[1.5px]",
            )}
          >
            <Image
              priority
              sizes="100%"
              src={item.image}
              alt={product.name}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
      <div className="relative col-span-5 aspect-square">
        <Image
          sizes="100%"
          priority
          src={cardProduct.selectedImg.image}
          alt={cardProduct.name}
          fill
          className="h-full max-h-[500px] min-h-[300px] w-full object-contain sm:min-h-[400px]"
        />
      </div>
    </div>
  );
};
