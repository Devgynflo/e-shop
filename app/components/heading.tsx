import { cn } from "@/lib/utils";
import { NextPage } from "next";

interface HeadingProps {
  title: string;
  center?: boolean;
}

export const Heading: NextPage<HeadingProps> = ({ title, center }) => {
  return (
    <div className={cn(center && "text-center")}>
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
};
