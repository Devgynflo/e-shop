"use server";

import { getUserByEmail } from "@/data/db/user";
import { dbAuth } from "@/lib/prisma/db";
import { RegisterSchema } from "@/schemas";

import bcrypt from "bcryptjs";
import * as z from "zod";

export const register_actions = async (
  values: z.infer<typeof RegisterSchema>,
) => {
  const validationFields = RegisterSchema.safeParse(values);

  if (!validationFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { email, name, password } = validationFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUserByEmail = await getUserByEmail(email);

  if (existingUserByEmail) {
    return {
      error: "Something went wrong!",
    };
  }

  const data = await dbAuth.user.create({
    data: {
      name,
      email,
      hashedPassword,
    },
  });

  return {
    success: {
      message: "User created",
      name: data.name,
      email: data.email,
      hashedPassword: data.hashedPassword,
    },
  };
};
