"use client";

import { NextPage } from "next";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface CustomCheckboxProps {
  id: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
}

export const CustomCheckbox: NextPage<CustomCheckboxProps> = ({
  id,
  label,
  disabled,
  register,
}) => {
  return (
    <div className="flex w-full items-center gap-2">
      <input
        type="checkbox"
        id={id}
        disabled={disabled}
        {...register(id)}
        className="cursor-pointer"
      />
      <label htmlFor={id} className="cursor-pointer font-medium">
        {label}
      </label>
    </div>
  );
};
