"use client";

import { cn } from "@/lib/utils";
import { getAverageScore } from "@/utils/average-score";
import { Rating } from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";

interface ProductDetailsProps {
  product?: any;
}

export type CardProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  selectImg: SelectedImgType;
  quantity: number;
  price: number;
};

export type SelectedImgType = {
  color: string;
  colorCode: string;
  image: string;
};

const Horizontal = () => {
  return <hr className="my-2 w-[30%]" />;
};

export const ProductDetails: NextPage<ProductDetailsProps> = ({ product }) => {
  const average = getAverageScore(product.reviews);
  const [cardProduct, setCardproduct] = useState<CardProductType>({
    ...product,
    quantity: 1,
    selectImg: { ...product.images[0] },
  });

  return (
    <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
      <aside>images</aside>
      <article className="flex flex-col gap-1 text-sm text-slate-500">
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
        <div>
          <span className="font-semibold uppercase">color: </span>
        </div>
        <Horizontal />
        <div>
          <span className="font-semibold uppercase">quantity: </span>
        </div>
      </article>
    </div>
  );
};
