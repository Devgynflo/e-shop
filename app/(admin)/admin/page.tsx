import { GraphData } from "@/@types";
import { getGraphData } from "@/actions/get-graph-data";
import { getUsers } from "@/actions/get-users";
import { getOrders } from "@/actions/orders";
import { getProducts } from "@/actions/products";
import { Container } from "@/app/components/container";
import { NextPage } from "next";
import { BarGraph } from "./_components/bar-graph";
import { Summary } from "./_components/summary";

interface AdminPageProps {}

const AdminPage: NextPage<AdminPageProps> = async ({}) => {
  const [products, orders, users] = await Promise.all([
    getProducts({ category: null }),
    getOrders(),
    getUsers(),
  ]);

  const graphData = await getGraphData();

  return (
    <Container>
      <div className="pt-8">
        <Summary products={products} orders={orders} users={users} />
      </div>
      <div className="mx-auto mt-4 max-w-[1150px]">
        <BarGraph data={graphData as GraphData[]} />
      </div>
    </Container>
  );
};

export default AdminPage;
