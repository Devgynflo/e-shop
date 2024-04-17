import { getCurrentUser } from "@/actions/get-current-user";
import { NextPage } from "next";
import { AddRating } from "./add-rating";
import { List } from "./list";

interface ProductRatingsProps {
  product: any;
}

export const ProductRatings: NextPage<ProductRatingsProps> = async ({
  product,
}) => {
  const user = await getCurrentUser();

  return (
    <div className="mt-20 flex flex-col gap-4">
      <AddRating product={product} user={user} />
      <List product={product} />
    </div>
  );
};
