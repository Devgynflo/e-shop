"use client";

import { CardProductType, SelectedImgType } from "@/@types";
import { cn } from "@/lib/utils";
import { NextPage } from "next";

interface SetProductColorProps {
  images: SelectedImgType[];
  cardProduct: CardProductType;
  handleColorSelect: (value: SelectedImgType) => void;
}

export const SetProductColor: NextPage<SetProductColorProps> = ({
  images,
  cardProduct,
  handleColorSelect,
}) => {
  return (
    <div className="flex items-center gap-4">
      <span className="font-semibold uppercase">color:</span>
      <div className="flex gap-1">
        {images.map((img) => (
          <div
            onClick={() => handleColorSelect(img)}
            key={img.colorCode}
            className={cn(
              "flex size-7 items-center justify-center rounded-full border-teal-300",
              cardProduct.selectedImg.color === img.color && "border-[1.5px]",
            )}
          >
            <div
              className="size-5 cursor-pointer rounded-full border-[1.2px] border-slate-300"
              style={{ background: img.colorCode }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
