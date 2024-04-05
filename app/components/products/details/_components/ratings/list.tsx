import { Avatar } from "@/app/components/avatar";
import { Heading } from "@/app/components/heading";
import { product } from "@/data/product-seed";
import { Rating } from "@mui/material";
import moment from "moment";
import { NextPage } from "next";

interface ListProps {
  product: any;
}

export const List: NextPage<ListProps> = ({}) => {
  return (
    <div>
      <Heading title="Product Review" />
      <div className="mt-2 text-sm">
        {product.reviews ? (
          product.reviews.map((review) => (
            <div key={review.id} className="max-w-[400px]">
              <div className="flex items-center gap-2">
                <Avatar src={review.user.image} />
                <div className="font-semibold">{review.user.name}</div>
                <div className="font-light">
                  {moment(review.createdDate).fromNow()}
                </div>
              </div>
              <div className="mt-2">
                <Rating value={review.rating} readOnly />
                <div className="ml-2">{review.comment}</div>
                <hr className="my-4" />
              </div>
            </div>
          ))
        ) : (
          <p>No reviews</p>
        )}
      </div>
    </div>
  );
};
