import { getCurrentUser } from "@/actions/get-current-user";
import { dbAuth } from "@/lib/prisma/db";
import { NextResponse } from "next/server";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } },
) {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN") {
    return NextResponse.error();
  }

  const deletedProduct = await dbAuth.product.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(deletedProduct);
}
