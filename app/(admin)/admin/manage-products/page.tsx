import { getProducts } from "@/actions/products";
import { Container } from "@/app/components/container";
import { Heading } from "@/app/components/heading";
import { NextPage } from "next";
import { ManageProductsClient } from "../../../components/admin/manage-products-client";

interface ManageProductsPageProps {}

const ManageProductsPage: NextPage<ManageProductsPageProps> = async ({}) => {
  const products = await getProducts({ category: null });

  return (
    <div className="pt-8">
      <Container>
        <div className="mb-4 mt-8">
          <Heading title="Manage Products" center />
        </div>
        <ManageProductsClient products={products} />
      </Container>
    </div>
  );
};

export default ManageProductsPage;
