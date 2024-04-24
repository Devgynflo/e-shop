"use client";

import { NextPage } from "next";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface SearchbarProps {}

export const Searchbar: NextPage<SearchbarProps> = ({}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (!data) return router.push("/");

    const url = queryString.stringifyUrl(
      { url: "/", query: { searchTerm: data.searchTerm } },
      { skipNull: true },
    );
    reset();
    router.push(url);
  };
  return (
    <div className="flex items-center">
      <input
        {...register("searchTerm")}
        className="w-80 rounded-l-md border border-gray-300 p-2 focus:border-[0.5px] focus:border-slate-500 focus:outline-none"
        autoComplete="off"
        type="text"
        placeholder="Explorer E~Shop"
      />
      <button
        className="rounded-r-md bg-slate-700 p-2 text-white hover:opacity-80"
        onClick={handleSubmit(onSubmit)}
      >
        Recherchez...
      </button>
    </div>
  );
};
