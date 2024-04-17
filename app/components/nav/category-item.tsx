"use client";

import { cn } from "@/lib/utils";
import { NextPage } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { default as qs, default as queryString } from "query-string";
import { useCallback } from "react";
import { IconType } from "react-icons";

interface CaterogyItemProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

export const CaterogyItem: NextPage<CaterogyItemProps> = ({
  label,
  icon: Icon,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    if (label === "All") {
      router.push("/");
    } else {
      let currentQuery = {};
      if (params) {
        currentQuery = qs.parse(params.toString());
      }
      const updatedQuery: any = {
        ...currentQuery,
        category: label,
      };

      const url = queryString.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        {
          skipNull: true,
        },
      );

      router.push(url);
    }
  }, [label, router, params]);

  return (
    <div
      onClick={handleClick}
      className={cn(
        "flex cursor-pointer items-center justify-center gap-1 border-b-2 border-transparent p-2 text-center text-slate-500 transition hover:text-slate-800",
        selected && "border-b-slate-800 text-slate-800",
      )}
    >
      <Icon size={20} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};
