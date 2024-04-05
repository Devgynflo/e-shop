import { Container } from "@/app/components/container";
import { ProductDetails } from "@/app/components/products/details";
import { product } from "@/data/product-seed";
import { NextPage } from "next";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: NextPage<ProductPageProps> = ({
  params,
}: ProductPageProps) => {
  return (
    <section className="p-8">
      <Container>
        <ProductDetails product={product}></ProductDetails>
      </Container>
    </section>
  );
};

export default ProductPage;
