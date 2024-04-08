import { cn } from "@/lib/utils";
import { NextPage } from "next";

interface HeadingProps {
  title: string;
  className?: string;
  center?: boolean;
}

export const Heading: NextPage<HeadingProps> = ({
  title,
  center,
  className,
}) => {
  return (
    <div className={cn(center && "text-center", className)}>
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
};
