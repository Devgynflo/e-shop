import { getCurrentUser } from "@/actions/get-current-user";
import { getOrdersByUserId } from "@/actions/orders";
import { Container } from "@/app/components/container";
import { Heading } from "@/app/components/heading";
import { NextPage } from "next";
import { redirect } from "next/navigation";
import { OrderClient } from "../../components/store/order-client";

interface ManageOrdersPageProps {}

const ManageOrdersPage: NextPage<ManageOrdersPageProps> = async ({}) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/");
  }

  const orders = await getOrdersByUserId(currentUser.id);

  return (
    <div className="pt-8">
      <Container>
        <div className="mb-4 mt-8">
          <Heading title="Your Orders" center />
          <OrderClient orders={orders} />
        </div>
      </Container>
    </div>
  );
};

export default ManageOrdersPage;
