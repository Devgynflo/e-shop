import { NextPage } from "next";

interface FooterListProps {
  children: React.ReactNode;
}

export const FooterList: NextPage<FooterListProps> = ({ children }) => {
  return (
    <div className="mb-6 flex w-full flex-col gap-2 sm:w-1/2 md:w-1/4 lg:w-1/6">
      {children}
    </div>
  );
};
