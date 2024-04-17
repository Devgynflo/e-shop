"use client";

import { categories } from "@/utils/categories";
import { NextPage } from "next";
import { usePathname, useSearchParams } from "next/navigation";
import { Container } from "../container";
import { CaterogyItem } from "./category-item";

interface CategoriesProps {}

export const Categories: NextPage<CategoriesProps> = ({}) => {
  const params = useSearchParams();
  const getParams = params.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="flex items-center justify-between overflow-x-auto pt-4">
          {categories.map((category) => (
            <CaterogyItem
              key={category.label}
              icon={category.icon}
              label={category.label}
              selected={
                category.label === getParams ||
                (getParams === null && category.label === "All")
              }
            />
          ))}
        </div>
      </Container>
    </div>
  );
};
