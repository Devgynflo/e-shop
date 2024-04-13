import { cn } from "@/lib/utils";
import { NextPage } from "next";
import { IconType } from "react-icons";

interface OrderStatusProps {
  text: string;
  icon: IconType;
  bg: string;
  color: string;
}

export const OrderStatus: NextPage<OrderStatusProps> = ({
  text,
  icon: Icon,
  bg,
  color,
}) => {
  return (
    <div className={cn("flex items-center gap-1 rounded px-1", bg, color)}>
      {text}
      <Icon size={15} />
    </div>
  );
};
