import { CardProductType } from "@/@types";
import { getCurrentUser } from "@/actions/get-current-user";
import { env } from "@/lib/env";
import { dbAuth } from "@/lib/prisma/db";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_SECRET, {
  apiVersion: "2023-10-16",
});

const calculateOrderAmount = (items: CardProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return acc + itemTotal;
  }, 0);

  return totalPrice;
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { items, payment_intent_id } = body;

  const total = Math.round(calculateOrderAmount(items) * 100);
  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: "eur",
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    products: {
      id: items[0].id,
      name: items[0].name,
      description: items[0].description,
      price: items[0].price,
      brand: items[0].brand,
      category: items[0].category,
      quantity: items[0].quantity,
      selectedImg: items[0].selectedImg,
    },
  };

  if (payment_intent_id) {
    const current_intent =
      await stripe.paymentIntents.retrieve(payment_intent_id);

    if (current_intent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: total },
      );
      // update the order
      const [existing_order, update_order] = await Promise.all([
        dbAuth.order.findFirst({
          where: { paymentIntentId: payment_intent_id },
        }),
        dbAuth.order.update({
          where: { paymentIntentId: payment_intent_id },
          data: { amount: total, products: items },
        }),
      ]);

      if (!existing_order) {
        return NextResponse.error();
      }

      return NextResponse.json({ paymentIntent: updated_intent });
    }
  } else {
    // create the intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "eur",
      automatic_payment_methods: { enabled: true },
    });
    // create the order
    orderData.paymentIntentId = paymentIntent.id;

    await dbAuth.order.create({
      data: orderData,
    });

    return NextResponse.json({ paymentIntent });
  }

  // Return a default response (e.g, on error response) if none of the condition are met
  return NextResponse.error();
}
