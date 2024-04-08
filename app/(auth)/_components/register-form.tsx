"use client";

import { Heading } from "@/app/components/heading";
import { Inputs } from "@/app/components/inputs";
import { Button } from "@/app/components/products/details/_components/button";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineGoogle } from "react-icons/ai";

interface RegisterFormProps {}

export const RegisterForm: NextPage<RegisterFormProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log("🚀 ~ data:", data);
  };

  return (
    <>
      <Heading title="Sign up for E~Shop" />
      <Button
        outline
        label="Sign up with Google"
        icon={AiOutlineGoogle}
        onclick={() => {}}
      />
      <hr className="h-px w-full bg-slate-300" />
      <Inputs
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type={"text"}
      />
      <Inputs
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type={"text"}
      />
      <Inputs
        id="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type={"password"}
      />
      <Button
        label={isLoading ? "Loading..." : "Sign up"}
        onclick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Already have an account ?{" "}
        <Link className="underline" href={"/login"}>
          Log in
        </Link>
      </p>
    </>
  );
};
