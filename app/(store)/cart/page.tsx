import { Container } from "@/app/components/container";
import { NextPage } from "next";
import { CartClient } from "./_components/cart-client";

interface Props {}

const CartPage: NextPage<Props> = ({}) => {
  return (
    <div className="pt-8">
      <Container>
        <CartClient />
      </Container>
    </div>
  );
};

export default CartPage;
