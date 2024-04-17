import { getCurrentUser } from "@/actions/get-current-user";
import { dbAuth } from "@/lib/prisma/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const body = await request.json();

  const { id, deliveryStatus } = body;

  const order = await dbAuth.order.update({
    where: {
      id,
    },
    data: {
      deliveryStatus,
    },
  });

  return NextResponse.json(order);
}
