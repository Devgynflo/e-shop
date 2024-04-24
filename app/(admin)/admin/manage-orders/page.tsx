import { getOrders } from "@/actions/orders";
import { Container } from "@/app/components/container";
import { Heading } from "@/app/components/heading";
import { NextPage } from "next";
import { ManageOrdersClient } from "../../../components/admin/manage-orders";

interface ManageOrdersPageProps {}

const ManageOrdersPage: NextPage<ManageOrdersPageProps> = async ({}) => {
  const orders = await getOrders();
  return (
    <div className="pt-8">
      <Container>
        <div className="mb-4 mt-8">
          <Heading title="Gestion des commandes" center />
        </div>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default ManageOrdersPage;
