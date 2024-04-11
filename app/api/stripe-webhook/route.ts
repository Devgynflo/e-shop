import { env } from "@/lib/env";
import { dbAuth } from "@/lib/prisma/db";
import { NextApiResponse } from "next";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_SECRET, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request, res: NextApiResponse) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  if (!signature) {
    return res.status(400).send("Missing the stripe signature");
  }
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    return res.status(400).send("Webhook Error");
  }

  switch (event.type) {
    case "charge.succeeded":
      const charge: any = event.data.object as Stripe.Charge;

      if (typeof charge.payment_intent === "string") {
        await dbAuth.order.update({
          where: { paymentIntentId: charge.payment_intent },
          data: {
            status: "complete",
            address: charge.shipping?.address,
          },
        });
      }
      break;
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new NextResponse(null, { status: 200 });
}
