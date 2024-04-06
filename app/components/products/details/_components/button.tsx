"use client";

import { cn } from "@/lib/utils";
import { NextPage } from "next";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  className?: string;
  icon?: IconType;
  onclick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button: NextPage<ButtonProps> = ({
  label,
  disabled,
  outline,
  small,
  className,
  onclick,
  icon: Icon,
}) => {
  return (
    <button
      onClick={(e) => onclick(e)}
      className={cn(
        "text-md flex w-full items-center justify-center gap-2 rounded-md border-2 border-slate-700 bg-slate-700 px-4 py-3 font-semibold text-white hover:opacity-80",
        disabled && "cursor-not-allowed opacity-70",
        outline && "bg-white text-slate-700",
        small && "border-[1px] px-2 py-1 text-sm",
        className,
      )}
      disabled={disabled}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};
