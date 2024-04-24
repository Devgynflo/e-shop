"use client";

import { formatPrice } from "@/utils/format-price";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import FirebaseApp from "@/lib/firebase/firebase";
import { Product } from "@prisma/client";
import axios from "axios";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { NextPage } from "next";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import toast from "react-hot-toast";
import { MdCached, MdDelete, MdDone, MdRemoveRedEye } from "react-icons/md";
import { ActionBtn } from "../action-btn";
import { OrderStatus } from "../order-status";

interface ManageProductsClientProps {
  products: Product[];
}

export const ManageProductsClient: NextPage<ManageProductsClientProps> = ({
  products,
}) => {
  let rows: any = [];
  const router = useRouter();
  const storage = getStorage(FirebaseApp);

  const handleToggleStock = useCallback(
    (id: string, inStock: boolean) => {
      axios
        .put("/api/product", {
          id,
          inStock: !inStock,
        })
        .then((res) => {
          toast.success("Produit mis à jour");
          router.refresh();
        })
        .catch((error) => {
          toast.error("Quelque chose ne va pas!");
          //console.log("Error handleToggleStock", error);
        });
    },
    [router],
  );

  const handleDelete = useCallback(
    async (id: string, images: any[]) => {
      toast.success("Suppression du produit. Patientez...");

      const handleImageDelete = async () => {
        try {
          for (const item of images) {
            if (item.image) {
              const imageRef = ref(storage, item.image);
              await deleteObject(imageRef);
            }
          }
        } catch (error) {
          return console.log("Deleting images error ", error);
        }
      };

      await handleImageDelete();
      axios
        .delete(`/api/products/${id}`)
        .then((res) => {
          toast.success("Produit supprimé");
          router.refresh();
        })
        .catch((error) => {
          toast.error("Quelque chose ne vas pas !");
          //console.log("Error handleDelete", error);
        });
    },
    [storage, router],
  );

  if (products) {
    rows = products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: formatPrice(product.price),
        category: product.category,
        brand: product.brand,
        inStock: product.inStock,
        images: product.images,
      };
    });
  }

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 220 },
    { field: "name", headerName: "Name", width: 220 },
    {
      field: "price",
      headerName: "Prix (EUR)",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.price}</div>
        );
      },
    },
    { field: "categorie", headerName: "Category", width: 100 },
    { field: "marque", headerName: "BRAND", width: 100 },
    {
      field: "inStock",
      headerName: "En stock",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            {params.row.inStock === true ? (
              <OrderStatus
                text="En stock"
                bg="bg-teal-200"
                color="text-teal-700"
                icon={MdDone}
              />
            ) : (
              <OrderStatus
                text="Epuisé"
                bg="bg-rose-200"
                color="text-rose-700"
                icon={MdDone}
              />
            )}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="flex w-full justify-between gap-4 ">
            <ActionBtn
              icon={MdCached}
              onClick={() =>
                handleToggleStock(params.row.id, params.row.inStock)
              }
            />
            <ActionBtn
              icon={MdDelete}
              onClick={() => handleDelete(params.row.id, params.row.images)}
            />
            <ActionBtn
              icon={MdRemoveRedEye}
              onClick={() => {
                router.push(`/products/${params.row.id}`);
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
