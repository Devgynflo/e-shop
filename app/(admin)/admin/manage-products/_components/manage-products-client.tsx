"use client";

import { formatPrice } from "@/utils/format-price";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { Product } from "@prisma/client";
import { NextPage } from "next";
import { MdDone } from "react-icons/md";
import { OrderStatus } from "../../_components/order-status";

interface ManageProductsClientProps {
  products: Product[];
}

export const ManageProductsClient: NextPage<ManageProductsClientProps> = ({
  products,
}) => {
  let rows: any = [];

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
      headerName: "Price (EUR)",
      width: 100,
      renderCell: (params) => {
        return (
          <div className="font-bold text-slate-800">{params.row.price}</div>
        );
      },
    },
    { field: "category", headerName: "Category", width: 100 },
    { field: "brand", headerName: "BRAND", width: 100 },
    {
      field: "inStock",
      headerName: "In Stock",
      width: 120,
      renderCell: (params) => {
        return (
          <div>
            {params.row.inStock === true ? (
              <OrderStatus
                text="In Stock"
                bg="bg-teal-200"
                color="text-teal-700"
                icon={MdDone}
              />
            ) : (
              <OrderStatus
                text="Out of stock"
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
        return <div>Action</div>;
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
        />
      </div>
    </div>
  );
};
