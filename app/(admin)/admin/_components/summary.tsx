"use client";

import { Heading } from "@/app/components/heading";
import { formatPrice } from "@/utils/format-price";
import { formatNumber } from "@/utils/formatNumber";
import { Order, Product, User } from "@prisma/client";
import { NextPage } from "next";
import { useEffect, useState } from "react";

interface SummaryProps {
  orders: Order[];
  products: Product[];
  users: User[];
}

type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
  };
};

export const Summary: NextPage<SummaryProps> = ({
  orders,
  products,
  users,
}) => {
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    sale: {
      label: "Total Sale",
      digit: 0,
    },
    products: {
      label: "Total Products",
      digit: 0,
    },
    orders: {
      label: "Total Orders",
      digit: 0,
    },
    paidOrders: {
      label: "Paid Orders",
      digit: 0,
    },
    unpaidOrders: {
      label: "Unpaid Orders",
      digit: 0,
    },
    users: {
      label: "Total Users",
      digit: 0,
    },
  });

  useEffect(() => {
    setSummaryData((prev) => {
      let tempData = { ...prev };

      const totalSale = orders.reduce((acc, cur) => {
        if (cur.status === "complete") {
          return (acc += cur.amount);
        } else {
          return acc;
        }
      }, 0);

      const paidOrders = orders.filter((order) => {
        return order.status === "complete";
      });

      const unpaidOrders = orders.filter((order) => {
        return order.status === "pending";
      });

      tempData.sale.digit = totalSale;
      tempData.orders.digit = orders.length;
      tempData.paidOrders.digit = paidOrders.length;
      tempData.unpaidOrders.digit = unpaidOrders.length;
      tempData.products.digit = products.length;
      tempData.users.digit = users.length;

      return tempData;
    });
  }, [orders, products, users]);

  const summaryKeys = Object.keys(summaryData);

  return (
    <div className="m-auto max-w-[1150px]">
      <div className="mb-4 mt-8">
        <Heading title="Stats" center />
      </div>
      <div className="grid max-h-[50vh] grid-cols-2 gap-3 overflow-y-auto">
        {summaryKeys &&
          summaryKeys.map((key) => (
            <div
              key={key}
              className="flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition hover:bg-slate-100"
            >
              <div className="text-xl font-bold md:text-4xl">
                {summaryData[key].label === "Total Sale" ? (
                  <>{formatPrice(summaryData[key].digit / 100)}</>
                ) : (
                  <>{formatNumber(summaryData[key].digit)}</>
                )}
              </div>
              <div>{summaryData[key].label}</div>
            </div>
          ))}
      </div>
    </div>
  );
};
