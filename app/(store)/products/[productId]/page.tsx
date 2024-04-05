import { Container } from "@/app/components/container";
import { ProductDetails } from "@/app/components/products/details";
import { ProductRatings } from "@/app/components/products/details/_components/ratings";
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
        <ProductDetails product={product} />
        <ProductRatings product={product} />
      </Container>
    </section>
  );
};

export default ProductPage;
