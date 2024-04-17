import { getCurrentUser } from "@/actions/get-current-user";
import { dbAuth } from "@/lib/prisma/db";
import { Review } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { comment, rating, product, userId } = body;

  const deliveredOrder = currentUser.orders.some(
    (order) =>
      order.products.find((item) => item.id === product.id) && // check if product exist
      order.deliveryStatus === "delivered",
  );

  // Check if review product exist
  const userReview = product.reviews.find((review: Review) => {
    return review.userId === currentUser.id;
  });

  if (userReview || !deliveredOrder) {
    throw NextResponse.error();
  }

  const review = await dbAuth.review.create({
    data: {
      userId,
      productId: product.id,
      rating,
      comment,
    },
  });

  return NextResponse.json(review);
}
