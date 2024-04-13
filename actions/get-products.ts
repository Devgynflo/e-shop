import { dbAuth } from "@/lib/prisma/db";

export interface ProductsParams {
  category?: string | null;
  searchTerm?: string | null;
}

export default async function getProducts(params: ProductsParams) {
  try {
    const { category, searchTerm } = params;
    let searchString = searchTerm;

    if (!searchTerm) {
      searchString = "";
    }

    let query: any = {};
    if (category) {
      query.category = category;
    }

    const products = await dbAuth.product.findMany({
      where: {
        ...query,
        OR: [
          {
            name: {
              contains: searchString,
              mode: "insensitive",
            },
            description: {
              contains: searchString,
              mode: "insensitive",
            },
          },
        ],
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdDate: "desc",
          },
        },
      },
    });

    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}
