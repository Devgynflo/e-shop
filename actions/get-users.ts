import { dbAuth } from "@/lib/prisma/db";

export async function getUsers() {
  try {
    const users = await dbAuth.user.findMany();

    return users;
  } catch (error: any) {
    throw new Error(error);
  }
}
