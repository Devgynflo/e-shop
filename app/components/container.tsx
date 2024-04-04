import { NextPage } from "next";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container: NextPage<ContainerProps> = ({ children }) => {
  return (
    <div className="mx-auto max-w-[1920px] px-4 md:px-2 xl:px-20">
      {children}
    </div>
  );
};
