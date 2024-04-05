import { NextPage } from "next";
import { List } from "./list";

interface ProductRatingsProps {
  product: any;
}

export const ProductRatings: NextPage<ProductRatingsProps> = ({ product }) => {
  return (
    <div className="mt-20 flex flex-col gap-4">
      <div>Add Rating</div>
      <List product={product} />
    </div>
  );
};
