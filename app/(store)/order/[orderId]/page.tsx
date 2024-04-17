import { getCurrentUser } from "@/actions/get-current-user";
import { getOrderByOrderId } from "@/actions/orders";
import { Container } from "@/app/components/container";
import { NextPage } from "next";
import { OrderDetails } from "../_components/order-details";

interface OrderPageByOrderIdProps {
  params: {
    orderId: string;
  };
}

const OrderPageByOrderId: NextPage<OrderPageByOrderIdProps> = async ({
  params: { orderId },
}) => {
  const order = await getOrderByOrderId(orderId);
  const currentUser = await getCurrentUser();

  if (
    currentUser &&
    currentUser.id !== order?.userId &&
    currentUser.role === "USER"
  ) {
    return null;
  }

  if (!order) {
    return null;
  }

  return (
    <section className="p-8">
      <Container>
        <OrderDetails order={order} />
      </Container>
    </section>
  );
};

export default OrderPageByOrderId;
