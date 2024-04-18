export const revalidate = 0;

import { ProductsParams } from "@/actions/products";
import { Container } from "@/app/components/container";
import { HomeBanner } from "@/app/components/home-banner";
import { ProductList } from "@/app/components/products/list";

interface HomeProps {
  searchParams: ProductsParams;
}

export default function Home({ searchParams }: HomeProps) {
  return (
    <div className="p-8">
      <Container>
        <HomeBanner />
        <ProductList searchParams={searchParams} />
      </Container>
    </div>
  );
}
