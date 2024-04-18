import { getCurrentUser } from "@/actions/get-current-user";
import { Container } from "@/app/components/container";
import { NextPage } from "next";
import { CartClient } from "../../components/store/cart-client";

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
