import * as z from "zod";

const message = "Champ requis !";

export const RegisterSchema = z.object({
  email: z.string().email({ message }),
  password: z.string().min(6, {
    message: "6 caracteres minimun requis",
  }),
  name: z.string().min(1, { message }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message }),
  password: z.string().min(1, {
    message,
  }),
});
