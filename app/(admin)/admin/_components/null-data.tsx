import { NextPage } from "next";

interface NullDataProps {
  title: string;
}

export const NullData: NextPage<NullDataProps> = ({ title }) => {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center text-xl">
      <p className="font-medium">{title}</p>
    </div>
  );
};
