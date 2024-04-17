import { cn } from "@/lib/utils";
import { NextPage } from "next";
import { IconType } from "react-icons";

interface ActionBtnProps {
  icon: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

export const ActionBtn: NextPage<ActionBtnProps> = ({
  icon: Icon,
  onClick,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex h-[30] w-10 cursor-pointer items-center justify-center rounded border border-slate-400 text-slate-700",
        disabled && "cursor-not-allowed opacity-50",
      )}
    >
      <Icon size={18} />
    </button>
  );
};
