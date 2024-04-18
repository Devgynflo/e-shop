import { Heading } from "@/app/components/heading";
import { OrderStatus } from "@/app/components/order-status";
import { formatPrice } from "@/utils/format-price";
import { Order } from "@prisma/client";
import moment from "moment";
import { NextPage } from "next";
import { MdAccessTimeFilled, MdDone } from "react-icons/md";
import { OrderItem } from "./order-item";

interface OrderDetailsProps {
  order: Order;
}

export const OrderDetails: NextPage<OrderDetailsProps> = ({ order }) => {
  return (
    <div className="m-auto flex max-w-[1150px] flex-col gap-2">
      <div className="mt-8">
        <Heading title="Order Details" />
      </div>
      <div>Order ID: {order.id}</div>
      <div>
        Total Amount :{" "}
        <span className="font-bold">{formatPrice(order.amount / 100)}</span>
      </div>
      <div className="flex items-center gap-2">
        <div>Payment Status:</div>
        <div>
          {order.status === "pending" && (
            <OrderStatus
              bg="bg-slate-200"
              color="text-slate-700"
              icon={MdAccessTimeFilled}
              text="pending"
            />
          )}

          {order.status === "complete" && (
            <OrderStatus
              text="completed"
              bg="bg-purple-200"
              color="text-purple-700"
              icon={MdDone}
            />
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div>Delivery Status:</div>
        <div>
          {order.deliveryStatus === "pending" && (
            <OrderStatus
              bg="bg-slate-200"
              color="text-slate-700"
              icon={MdAccessTimeFilled}
              text="pending"
            />
          )}

          {order.deliveryStatus === "dispatched" && (
            <OrderStatus
              bg="bg-purple-200"
              color="text-purple-700"
              icon={MdDone}
              text="dispatched"
            />
          )}

          {order.deliveryStatus === "delivered" && (
            <OrderStatus
              text="delivered"
              bg="bg-green-200"
              color="text-green-700"
              icon={MdDone}
            />
          )}
        </div>
      </div>
      <div>Date: {moment(order.createDate).fromNow()}</div>
      <div>
        <h2 className="mb-2 mt-4 font-semibold">Product ordered</h2>
        <div className="grid grid-cols-5 items-center gap-4 pb-2 text-xs">
          <div className="col-span-2 justify-self-start">PRODUCT</div>
          <div className="justify-self-center">PRICE</div>
          <div className="justify-self-center">QTY</div>
          <div className="justify-self-start">TOTAL</div>
        </div>
        {order.products &&
          order.products.map((item) => (
            <OrderItem
              key={item.id}
              product={item}
              orderTotalAmount={order.amount}
            />
          ))}
      </div>
    </div>
  );
};
