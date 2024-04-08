"use client";

import { Heading } from "@/app/components/heading";
import { Inputs } from "@/app/components/inputs";
import { Button } from "@/app/components/products/details/_components/button";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineGoogle } from "react-icons/ai";

interface LoginFormProps {}

export const LoginForm: NextPage<LoginFormProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log("🚀 ~ data:", data);
  };

  return (
    <>
      <Heading title="Sign in to E~Shop" />
      <Button
        outline
        label="Continue with Google"
        icon={AiOutlineGoogle}
        onclick={() => {}}
      />
      <hr className="h-px w-full bg-slate-300" />
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
        label={isLoading ? "Loading..." : "Login"}
        onclick={handleSubmit(onSubmit)}
      />
      <p className="text-sm">
        Do not have an account ?{" "}
        <Link className="underline" href={"/register"}>
          Sign up
        </Link>
      </p>
    </>
  );
};
