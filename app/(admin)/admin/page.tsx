import { getUsers } from "@/actions/get-users";
import { getOrders } from "@/actions/orders";
import { getProducts } from "@/actions/products";
import { Container } from "@/app/components/container";
import { NextPage } from "next";
import { Summary } from "./_components/summary";

interface AdminPageProps {}

const AdminPage: NextPage<AdminPageProps> = async ({}) => {
  /* const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers(); */

  const [products, orders, users] = await Promise.all([
    getProducts({ category: null }),
    getOrders(),
    getUsers(),
  ]);
  return (
    <Container>
      <div className="pt-8">
        <Summary products={products} orders={orders} users={users} />
      </div>
    </Container>
  );
};

export default AdminPage;
