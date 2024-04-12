import { getCurrentUser } from "@/actions/getCurrentUser";
import { dbAuth } from "@/lib/prisma/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await request.json();
  console.log("🚀 ~ POST ~ body:", body);
  const { name, description, price, brand, category, inStock, images } = body;

  const product = await dbAuth.product.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      brand,
      category,
      inStock,
      images,
    },
  });

  return NextResponse.json(product);
}
