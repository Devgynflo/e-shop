import { dbAuth } from "@/lib/prisma/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = dbAuth.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};
