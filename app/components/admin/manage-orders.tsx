"use client";

import { formatPrice } from "@/utils/format-price";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { ExtendedOrder } from "@/@types";
import { ActionBtn } from "@/app/components/action-btn";
import { OrderStatus } from "@/app/components/order-status";
import axios from "axios";
import moment from "moment";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";
import {
  MdAccessTimeFilled,
  MdDeliveryDining,
  MdDone,
  MdRemoveRedEye,
} from "react-icons/md";

interface ManageOrdersClientProps {
  orders: ExtendedOrder[];
}

export const ManageOrdersClient: NextPage<ManageOrdersClientProps> = ({
  orders,
}) => {
  let rows: any = [];
  const router = useRouter();

  const handleDeliver = useCallback(
    (id: string) => {
      axios
        .put("/api/order", {
          id,
          deliveryStatus: "delivered",
        })
        .then((_res) => {
          toast.success("Commande délivrée");
          router.refresh();
        })
        .catch((error: any) => {
          toast.error("Quelque chose ne va pas !");
          //console.log("error", error);
        });
    },
    [router],
  );
  const handleDispatch = useCallback(
    (id: string) => {
      axios
        .put("/api/order", {
          id,
          deliveryStatus: "dispatched",
        })
        .then((_res) => {
          toast.success("Commande envoyé");
          router.refresh();
        })
        .catch((error: any) => {
          toast.error("Quelque chose ne va pas !");
          //console.log("error", error);
        });
    },
    [router],
  );

  if (orders) {
    rows = orders.map((order) => {
      return {
        id: order.id,
        customer: order.user.name,
        amount: formatPrice(order.amount / 100),
        paymentStatus: order.status,
        date: moment(order.createDate).fromNow(),
        deliveryStatus: order.deliveryStatus,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "customer", headerName: "Nom du client", width: 130 },
    {
      field: "amount",
      headerName: "Montant (EUR)",
      width: 130,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.amount}</div>
        );
      },
    },
    {
      field: "paymentStatus",
      headerName: "Paiement",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.row.paymentStatus === "pending" && (
              <OrderStatus
                text="en attente"
                bg="bg-slate-200"
                color="text-slate-700"
                icon={MdAccessTimeFilled}
              />
            )}

            {params.row.paymentStatus === "complete" && (
              <OrderStatus
                text="payé"
                bg="bg-purple-200"
                color="text-purple-700"
                icon={MdDone}
              />
            )}
          </div>
        );
      },
    },

    {
      field: "deliveredStatus",
      headerName: "Reception",
      width: 130,
      renderCell: (params) => {
        return (
          <div>
            {params.row.deliveryStatus === "pending" && (
              <OrderStatus
                text="en attente"
                bg="bg-slate-200"
                color="text-slate-700"
                icon={MdAccessTimeFilled}
              />
            )}

            {params.row.deliveryStatus === "dispatched" && (
              <OrderStatus
                text="envoyé"
                bg="bg-purple-200"
                color="text-purple-700"
                icon={MdDeliveryDining}
              />
            )}

            {params.row.deliveryStatus === "delivered" && (
              <OrderStatus
                text="reception"
                bg="bg-green-200"
                color="text-green-700"
                icon={MdDone}
              />
            )}
          </div>
        );
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 130,
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex w-full justify-between gap-4 ">
            <ActionBtn
              icon={MdDeliveryDining}
              onClick={() => handleDispatch(params.row.id)}
            />
            <ActionBtn
              icon={MdDone}
              onClick={() => handleDeliver(params.row.id)}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/order/${params.row.id}`);
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <div className="m-auto max-w-[1150px] text-xl">
      <div className=" h-[600px] w-full ">
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </div>
    </div>
  );
};
