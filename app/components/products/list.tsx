import { ProductsParams, getProducts } from "@/actions/products";
import { NullData } from "@/app/components/null-data";
import { NextPage } from "next";
import { ProductCard } from "./card";

interface ProductListProps {
  searchParams: ProductsParams;
}

export const ProductList: NextPage<ProductListProps> = async ({
  searchParams,
}) => {
  const products = await getProducts(searchParams);

  if (!products.length) {
    return (
      <NullData title="Aucun produits. Cliquez sur 'All' pour remettre à zéro le filtre." />
    );
  }

  // Fisher-Yates shuffle algorithm
  function shuffeArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  }

  const shuffledProducts = shuffeArray(products);

  return (
    <section className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {shuffledProducts.map((product: any) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </section>
  );
};
