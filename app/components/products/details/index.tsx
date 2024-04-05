"use client";

import { CardProductType, SelectedImgType } from "@/@types";
import { cn } from "@/lib/utils";
import { getAverageScore } from "@/utils/average-score";
import { Rating } from "@mui/material";
import { NextPage } from "next";
import { useCallback, useState } from "react";
import { Button } from "./_components/button";
import { ProductImage } from "./_components/product-image";
import { SetProductColor } from "./_components/set-color";
import { SetQuantity } from "./_components/set-quantity";

interface ProductDetailsProps {
  product?: any;
}

const Horizontal = () => {
  return <hr className="my-2 w-[30%]" />;
};

export const ProductDetails: NextPage<ProductDetailsProps> = ({ product }) => {
  const average = getAverageScore(product.reviews);
  const [cardProduct, setCardProduct] = useState<CardProductType>({
    ...product,
    quantity: 1,
    selectImg: { ...product.images[0] },
  });
  const handleColorSelect = useCallback((value: SelectedImgType) => {
    setCardProduct((prev) => {
      return { ...prev, selectImg: value };
    });
  }, []);

  const handleQtyIncrease = useCallback(() => {
    setCardProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 };
    });
  }, []);

  const handleQtyDecrease = useCallback(() => {
    setCardProduct((prev) => {
      if (prev.quantity === 1) {
        return { ...prev, quantity: 1 };
      }
      return { ...prev, quantity: prev.quantity - 1 };
    });
  }, []);

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
      <aside>
        <ProductImage
          product={product}
          cardProduct={cardProduct}
          handleColorSelect={handleColorSelect}
        />
      </aside>

      <article className="flex flex-col gap-2 text-sm text-slate-500">
        <h2 className="text-3xl font-medium text-slate-700">{product.name}</h2>
        <div className="flex items-center gap-2">
          <Rating value={average} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold uppercase">category: </span>{" "}
          {product.category}
        </div>
        <div>
          <span className="font-semibold uppercase">brand: </span>{" "}
          {product.brand}
        </div>
        <div className={cn(product.inStock ? "text-teal-500" : "text-red-500")}>
          {product.inStock ? "In stock" : "Out of stock"}
        </div>
        <Horizontal />
        <SetProductColor
          images={product.images}
          cardProduct={cardProduct}
          handleColorSelect={handleColorSelect}
        />
        <Horizontal />
        <SetQuantity
          cardProduct={cardProduct}
          handleQtyDecrease={handleQtyDecrease}
          handleQtyIncrease={handleQtyIncrease}
        />
        <Horizontal />

        <Button label="Add to cart" onclick={() => {}} />
      </article>
    </div>
  );
};
