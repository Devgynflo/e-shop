import { dbAuth } from "@/lib/prisma/db";

export interface ProductsParams {
  category?: string | null;
  searchTerm?: string | null;
}

export async function getProducts(params: ProductsParams) {
  try {
    const { category, searchTerm } = params;
    let searchString = searchTerm;

    if (!searchTerm) {
      searchString = "";
    }

    console.log("🚀 ~ getProducts ~ searchTerm:", searchTerm);

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
    console.log("🚀 ~ getProducts ~ products:", products);

    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getProductById(id: string) {
  try {
    const product = await dbAuth.product.findUnique({
      where: {
        id,
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
    return product;
  } catch (error: any) {
    throw new error(error);
  }
}
