import { Container } from "@/app/components/container";
import { HomeBanner } from "@/app/components/home-banner";
import { ProductList } from "@/app/components/products/list";

export default function Home() {
  return (
    <div className="p-8">
      <Container>
        <HomeBanner />
        <ProductList />
      </Container>
    </div>
  );
}
