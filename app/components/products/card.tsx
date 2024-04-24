"use client";

import { getAverageScore } from "@/utils/average-score";
import { formatPrice } from "@/utils/format-price";
import { truncateText } from "@/utils/truncate-text";
import { Rating } from "@mui/material";
import { StarIcon } from "lucide-react";
import { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: any;
}

export const ProductCard: NextPage<ProductCardProps> = ({ product }) => {
  const router = useRouter();

  const averageReview = getAverageScore(product.reviews);

  return (
    <article
      className="col-span-1 cursor-pointer rounded-sm border border-slate-200 bg-slate-50 p-2 text-center text-sm transition hover:scale-105"
      onClick={() => router.push(`/products/${product.id}`)}
    >
      <div className="flex w-full flex-col items-center gap-1">
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            fill
            className="h-full w-full object-contain"
            src={product.images[0].image}
            alt={product.description}
            sizes="100%"
          />
        </div>
        <div className="mt-4">{truncateText(product.name)}</div>
        <div>
          <Rating
            readOnly
            value={averageReview}
            precision={0.5}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
        </div>
        <div>{product.reviews.length} notes</div>
        <div className="font-semibold">{formatPrice(product.price)}</div>
      </div>
    </article>
  );
};
