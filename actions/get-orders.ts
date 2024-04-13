import { dbAuth } from "@/lib/prisma/db";

export default async function getOrders() {
  try {
    const orders = await dbAuth.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createDate: "desc",
      },
    });
    return orders;
  } catch (error: any) {
    throw new Error(error);
  }
}
