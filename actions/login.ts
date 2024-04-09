"use server";

//import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/db/user";

import { LoginSchema } from "@/schemas";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validationFields = LoginSchema.safeParse(values);

  if (!validationFields.success) {
    return {
      error: "Invalid fields!",
    };
  }

  const { email, password } = validationFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.hashedPassword) {
    return { error: "User not found" };
  }

  try {
    /* await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    }); */
    return {
      success: "User connected !",
    };
  } catch (error) {
    console.log("🚀 ~ login ~ error:", error);
    throw error;
  }
};
