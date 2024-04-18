import { NextPage } from "next";

interface FormWrapProps {
  children: React.ReactNode;
}

export const FormWrap: NextPage<FormWrapProps> = ({ children }) => {
  return (
    <div className="flex h-full min-h-fit items-center justify-center pb-12 pt-24">
      <div className="flex w-full max-w-[650px] flex-col items-center gap-y-4 rounded-md p-4 shadow-xl shadow-slate-200 md:p-8">
        {children}
      </div>
    </div>
  );
};
