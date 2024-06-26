import zod from "zod";

const envSchema = zod.object({
  DATABASE_URL: zod.string().min(1),
  GOOGLE_CLIENT_ID: zod.string().min(1),
  GOOGLE_CLIENT_SECRET: zod.string().min(1),
  NEXT_AUTH_URL: zod.string().min(1),
  NEXT_AUTH_SECRET: zod.string().min(1),
  STRIPE_SECRET: zod.string().min(1),
  STRIPE_WEBHOOK_SECRET: zod.string().min(1),
});

export const env = envSchema.parse(process.env);
