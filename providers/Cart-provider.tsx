"use client";

import { CartContextProvider } from "@/hooks/use-cart";
import { NextPage } from "next";

interface Props {
  children: React.ReactNode;
}

const CartProvider: NextPage<Props> = ({ children }) => {
  return (
    <>
      <CartContextProvider>{children}</CartContextProvider>
    </>
  );
};

export default CartProvider;
