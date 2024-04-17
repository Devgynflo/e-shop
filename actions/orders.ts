import { dbAuth } from "@/lib/prisma/db";

export async function getOrders() {
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

export async function getOrderByOrderId(id: string) {
  try {
    const orderById = await dbAuth.order.findUnique({
      where: {
        id,
      },
    });
    return orderById;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getOrdersByUserId(userId: string) {
  try {
    const orderByUserId = await dbAuth.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        user: true,
      },
      orderBy: {
        createDate: "desc",
      },
    });
    return orderByUserId;
  } catch (error: any) {
    throw new Error(error);
  }
}
