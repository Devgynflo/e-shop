import { cn } from "@/lib/utils";
import { NextPage } from "next";
import { IconType } from "react-icons";

interface NavbarItemsProps {
  isSelected?: boolean;
  icon: IconType;
  label: string;
}

export const NavbarItems: NextPage<NavbarItemsProps> = ({
  isSelected,
  label,
  icon: Icon,
}) => {
  return (
    <div
      className={cn(
        "flex cursor-pointer items-center justify-center gap-1 border-b-2 border-transparent p-2 text-center text-slate-500 transition hover:text-slate-800",
        isSelected && "border-slate-800 text-slate-800 ",
      )}
    >
      <Icon size={20} />
      <div className="flex-no-wrap overflow-x-auto text-center text-sm font-medium">
        {label}
      </div>
    </div>
  );
};
