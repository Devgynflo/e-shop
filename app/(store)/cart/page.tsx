import { getCurrentUser } from "@/actions/getCurrentUser";
import { Container } from "@/app/components/container";
import { NextPage } from "next";
import { CartClient } from "./_components/cart-client";

interface CartPageProps {}

const CartPage: NextPage<CartPageProps> = async ({}) => {
  const currentUser = await getCurrentUser();

  return (
    <div className="pt-8">
      <Container>
        <CartClient currentUser={currentUser} />
      </Container>
    </div>
  );
};

export default CartPage;
