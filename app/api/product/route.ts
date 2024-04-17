import { getCurrentUser } from "@/actions/get-current-user";
import { dbAuth } from "@/lib/prisma/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await request.json();

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

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await request.json();

  const { id, inStock } = body;

  const toggleInStock = await dbAuth.product.update({
    where: {
      id,
    },
    data: {
      inStock,
    },
  });

  return NextResponse.json(toggleInStock);
}
