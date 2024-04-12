"use client";

import { cn } from "@/lib/utils";
import { NextPage } from "next";
import { IconType } from "react-icons";

interface CategoryInputProps {
  selected?: boolean;
  label: string;
  icon: IconType;
  onClick: (value: string) => void;
}

export const CategoryInput: NextPage<CategoryInputProps> = ({
  selected,
  label,
  icon: Icon,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={cn(
        "flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-slate-200 p-4 transition hover:border-slate-500",
        selected && "border-slate-500",
      )}
    >
      <Icon size={30} />
      <div className="font-medium">{label}</div>
    </div>
  );
};
