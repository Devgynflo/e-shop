import { products } from "@/data/products-seed";
import { NextPage } from "next";
import { ProductCard } from "./card";

interface ProductListProps {}

export const ProductList: NextPage<ProductListProps> = ({}) => {
  return (
    <section className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </section>
  );
};
