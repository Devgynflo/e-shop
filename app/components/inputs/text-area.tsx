"use client";

import { cn } from "@/lib/utils";
import { NextPage } from "next";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TextAreaProps {
  label: string;
  id: string;

  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export const TextArea: NextPage<TextAreaProps> = ({
  id,
  label,
  errors,
  register,
  required,
  disabled,
}) => {
  return (
    <div className="relative  w-full">
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        className={cn(
          "peer h-[150px] w-full rounded-md border-2 border-slate-400 bg-white p-4 pt-6 font-light outline-none transition focus:border-slate-400 disabled:cursor-not-allowed disabled:opacity-70",
          errors[id] && "border-rose-400 focus:border-rose-400",
        )}
      />
      <label
        htmlFor={id}
        className={cn(
          "text-md peer-placeholder-shown::scale-100 absolute left-4 top-5 z-10 origin-[0] -translate-y-3 transform cursor-text text-slate-400 duration-150 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-4 peer-focus:scale-75",
          errors[id] && "text-rose-500 ",
        )}
      >
        {label}
      </label>
    </div>
  );
};
