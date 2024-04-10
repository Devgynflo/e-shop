"use client";

import { CardProductType, SelectedImgType } from "@/@types";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { getAverageScore } from "@/utils/average-score";
import { Rating } from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { MdCheckCircle } from "react-icons/md";
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
  const router = useRouter();
  const average = getAverageScore(product.reviews);
  // Hooks
  const { handleProductToCart, cartProducts } = useCart();
  // State
  const [isProductInCart, setIsProductInCart] = useState(false);
  const [cardProduct, setCardProduct] = useState<CardProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    price: product.price,
    quantity: 1,
    selectedImg: { ...product.images[0] },
  });

  useEffect(() => {
    setIsProductInCart(false);
    if (cartProducts) {
      const existingProductInCart = cartProducts.find(
        (item) => item.id === product.id,
      );
      if (existingProductInCart) {
        return setIsProductInCart(true);
      }
    }
  }, [cartProducts, product.id]);

  const handleColorSelect = useCallback((value: SelectedImgType) => {
    setCardProduct((prev) => {
      return { ...prev, selectedImg: value };
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

        {isProductInCart ? (
          <>
            <p className="mb-2 flex items-center gap-2 text-slate-500">
              <MdCheckCircle size={20} className="text-teal-500" />
              <span>Product already added in your cart</span>
            </p>
            <div>
              <Button
                className="max-w-[300px]"
                label="View Cart"
                outline
                onclick={() => router.push("/cart")}
              />
            </div>
          </>
        ) : (
          <>
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

            <Button
              className="max-w-[300px]"
              label="Add to cart"
              onclick={() => handleProductToCart(cardProduct)}
            />
          </>
        )}
      </article>
    </div>
  );
};
